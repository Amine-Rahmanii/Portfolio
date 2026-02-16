import * as THREE from 'three';
import { SOLAR_SYSTEM_CONFIG, CONTROLS_CONFIG, ENVIRONMENT_CONFIG } from './config.js';

// Vérification de l'import Three.js
if (!THREE || !THREE.Vector3) {
    throw new Error('Three.js n\'a pas pu être chargé dans SpaceshipControls');
}

class SpaceshipControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        
        // État du vaisseau
        this.velocity = new THREE.Vector3();
        this.angularVelocity = new THREE.Vector2();
        this.speed = 0;
        this.isAccelerating = false;
        
        // Système de tremblement de caméra
        this.cameraShake = {
            basePosition: new THREE.Vector3(),
            intensity: 0,
            frequency: 0,
            time: 0,
            idleShake: CONTROLS_CONFIG.cameraShake.idle,
            normalShake: CONTROLS_CONFIG.cameraShake.normal,
            boostShake: CONTROLS_CONFIG.cameraShake.boost
        };
        
        // État des touches
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
            accelerate: false
        };
        
        // État de la souris
        this.mouse = {
            x: 0,
            y: 0,
            isLocked: false
        };
        
        // Mobile touch state (tracks by touch identifier for multi-touch)
        this.touch = {
            isActive: false,
            touchId: null,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            deltaX: 0,
            deltaY: 0,
            sensitivity: 0.003
        };
        
        // Détection mobile
        this.isMobile = this.detectMobile();
        
        // Système audio pour les bruits de déplacement
        this.audio = {
            context: null,
            thrusterSound: null,
            isPlaying: false,
            volume: 0.08, // Volume plus doux
            lastMovementState: false
        };
        
        // État des contrôles
        this.enabled = true;
        
        this.init();
        this.initAudio();
    }
    
    init() {
        this.bindEvents();
        
        // Afficher les contrôles mobiles si on est sur mobile
        if (this.isMobile) {
            this.showMobileControls();
        }
        
        // Ne pas demander le pointer lock au démarrage
        // this.requestPointerLock();
    }
    
    initAudio() {
        try {
            // Créer le contexte audio
            this.audio.context = new (window.AudioContext || window.webkitAudioContext)();
            
            // Créer un son de propulseur synthétique
            this.createThrusterSound();
        } catch (error) {
            console.warn('Audio non supporté:', error);
        }
    }
    
    createThrusterSound() {
        if (!this.audio.context) return;
        
        // Créer les oscillateurs pour un son de propulseur plus naturel
        const oscillator1 = this.audio.context.createOscillator();
        const oscillator2 = this.audio.context.createOscillator();
        const noiseGain = this.audio.context.createGain();
        const gainNode = this.audio.context.createGain();
        const filterNode = this.audio.context.createBiquadFilter();
        const lowpassNode = this.audio.context.createBiquadFilter();
        
        // Configuration des oscillateurs - fréquences plus basses
        oscillator1.type = 'triangle'; // Plus doux que sawtooth
        oscillator1.frequency.setValueAtTime(35, this.audio.context.currentTime); // Plus bas
        
        oscillator2.type = 'sine'; // Sine wave pour la douceur
        oscillator2.frequency.setValueAtTime(55, this.audio.context.currentTime); // Plus bas
        
        // Ajouter du bruit blanc pour plus de réalisme
        const bufferSize = 4096;
        const buffer = this.audio.context.createBuffer(1, bufferSize, this.audio.context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noiseSource = this.audio.context.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;
        
        // Configuration du filtre principal - plus de graves
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(400, this.audio.context.currentTime); // Plus bas
        filterNode.Q.setValueAtTime(2, this.audio.context.currentTime); // Q plus faible pour plus de douceur
        
        // Filtre additionnel pour le bruit
        lowpassNode.type = 'lowpass';
        lowpassNode.frequency.setValueAtTime(200, this.audio.context.currentTime);
        lowpassNode.Q.setValueAtTime(1, this.audio.context.currentTime);
        
        // Configuration du gain pour le bruit
        noiseGain.gain.setValueAtTime(0.02, this.audio.context.currentTime); // Très faible
        
        // Configuration du gain principal
        gainNode.gain.setValueAtTime(0, this.audio.context.currentTime);
        
        // Connexions
        oscillator1.connect(filterNode);
        oscillator2.connect(filterNode);
        noiseSource.connect(lowpassNode);
        lowpassNode.connect(noiseGain);
        noiseGain.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audio.context.destination);
        
        // Démarrer les sources
        oscillator1.start();
        oscillator2.start();
        noiseSource.start();
        
        // Stocker les références
        this.audio.thrusterSound = {
            oscillator1,
            oscillator2,
            noiseSource,
            gainNode,
            filterNode,
            noiseGain
        };
    }
    
    playThrusterSound() {
        if (!this.audio.thrusterSound || this.audio.isPlaying) return;
        
        const gainNode = this.audio.thrusterSound.gainNode;
        const currentTime = this.audio.context.currentTime;
        
        // Fade in plus doux et plus long
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(this.audio.volume, currentTime + 0.3);
        
        this.audio.isPlaying = true;
    }
    
    stopThrusterSound() {
        if (!this.audio.thrusterSound || !this.audio.isPlaying) return;
        
        const gainNode = this.audio.thrusterSound.gainNode;
        const currentTime = this.audio.context.currentTime;
        
        // Fade out plus doux et plus long
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.5);
        
        this.audio.isPlaying = false;
    }
    
    updateThrusterSound(speed, isAccelerating) {
        if (!this.audio.thrusterSound) return;
        
        const { oscillator1, oscillator2, filterNode } = this.audio.thrusterSound;
        const currentTime = this.audio.context.currentTime;
        
        // Moduler la fréquence très subtilement
        const baseFreq1 = 35 + (speed * 8); // Variation plus douce
        const baseFreq2 = 55 + (speed * 12); // Variation plus douce
        
        // Effet boost plus subtil
        const boostMultiplier = isAccelerating ? 1.2 : 1; // Plus doux
        
        // Transitions plus fluides des fréquences
        oscillator1.frequency.linearRampToValueAtTime(baseFreq1 * boostMultiplier, currentTime + 0.1);
        oscillator2.frequency.linearRampToValueAtTime(baseFreq2 * boostMultiplier, currentTime + 0.1);
        
        // Moduler le filtre plus subtilement
        const filterFreq = 400 + (speed * 30) + (isAccelerating ? 100 : 0); // Variation plus douce
        filterNode.frequency.linearRampToValueAtTime(Math.min(filterFreq, 800), currentTime + 0.1);
    }
    
    bindEvents() {
        // Événements clavier
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
        
        // Événements souris
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('click', (event) => this.onDocumentClick(event));
        document.addEventListener('contextmenu', (event) => this.onRightClick(event));
        document.addEventListener('mousedown', (event) => this.onMouseDown(event));
        document.addEventListener('mouseup', (event) => this.onMouseUp(event));
        
        // Événements tactiles pour mobile
        if (this.isMobile) {
            this.domElement.addEventListener('touchstart', (event) => this.onTouchStart(event), { passive: false });
            this.domElement.addEventListener('touchmove', (event) => this.onTouchMove(event), { passive: false });
            this.domElement.addEventListener('touchend', (event) => this.onTouchEnd(event), { passive: false });
            
            // Empêcher le zoom et les gestes par défaut
            document.addEventListener('touchmove', (event) => {
                if (event.scale !== 1) { event.preventDefault(); }
            }, { passive: false });
            
            document.addEventListener('gesturestart', (event) => {
                event.preventDefault();
            });
        }
        
        // Pointer Lock
        document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
    }
    
    onKeyDown(event) {
        switch(event.code) {
            case 'ArrowUp':
                this.keys.forward = true;
                break;
            case 'ArrowDown':
                this.keys.backward = true;
                break;
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
            case 'Space':
                this.keys.up = true;
                event.preventDefault();
                break;
            case 'KeyC':
                this.keys.down = true;
                break;
        }
    }
    
    onKeyUp(event) {
        switch(event.code) {
            case 'ArrowUp':
                this.keys.forward = false;
                break;
            case 'ArrowDown':
                this.keys.backward = false;
                break;
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'ArrowRight':
                this.keys.right = false;
                break;
            case 'Space':
                this.keys.up = false;
                break;
            case 'KeyC':
                this.keys.down = false;
                break;
        }
    }
    
    onMouseMove(event) {
        if (!this.mouse.isLocked) return;
        
        const sensitivity = CONTROLS_CONFIG.rotation.sensitivity;
        
        this.angularVelocity.x -= event.movementY * sensitivity;
        this.angularVelocity.y -= event.movementX * sensitivity;
        
        // Limiter la rotation verticale
        this.angularVelocity.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.angularVelocity.x));
    }
    
    requestPointerLock() {
        if (this.enabled && !this.isModalOpen()) {
            this.domElement.requestPointerLock();
        }
    }
    
    forcePointerLock() {
        // Force le pointer lock même si les vérifications échouent
        this.domElement.requestPointerLock();
    }
    
    onPointerLockChange() {
        this.mouse.isLocked = document.pointerLockElement === this.domElement;
    }
    
    onMouseDown(event) {
        if (event.button === 2) { // Clic droit
            this.keys.accelerate = true;
            event.preventDefault();
        }
    }
    
    onMouseUp(event) {
        if (event.button === 2) { // Clic droit
            this.keys.accelerate = false;
            event.preventDefault();
        }
    }
    
    onRightClick(event) {
        // Empêcher le menu contextuel
        event.preventDefault();
        return false;
    }
    
    // Méthodes pour les contrôles tactiles
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    }
    
    onTouchStart(event) {
        event.preventDefault();

        // Already tracking a camera touch
        if (this.touch.isActive) return;

        const touch = event.changedTouches[0];
        this.touch.isActive = true;
        this.touch.touchId = touch.identifier;
        this.touch.startX = touch.clientX;
        this.touch.startY = touch.clientY;
        this.touch.currentX = touch.clientX;
        this.touch.currentY = touch.clientY;
    }
    
    onTouchMove(event) {
        if (!this.touch.isActive) return;

        event.preventDefault();

        // Find our tracked camera touch by identifier
        let cameraTouch = null;
        for (let i = 0; i < event.touches.length; i++) {
            if (event.touches[i].identifier === this.touch.touchId) {
                cameraTouch = event.touches[i];
                break;
            }
        }
        if (!cameraTouch) return;

        this.touch.deltaX = cameraTouch.clientX - this.touch.currentX;
        this.touch.deltaY = cameraTouch.clientY - this.touch.currentY;

        this.touch.currentX = cameraTouch.clientX;
        this.touch.currentY = cameraTouch.clientY;

        this.angularVelocity.y -= this.touch.deltaX * this.touch.sensitivity;
        this.angularVelocity.x -= this.touch.deltaY * this.touch.sensitivity;
        this.angularVelocity.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.angularVelocity.x));
    }
    
    onTouchEnd(event) {
        event.preventDefault();

        // Only release if our tracked camera touch ended
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === this.touch.touchId) {
                this.touch.isActive = false;
                this.touch.touchId = null;
                this.touch.deltaX = 0;
                this.touch.deltaY = 0;
                break;
            }
        }
    }
    
    showMobileControls() {
        const mobileControls = document.querySelector('.mobile-controls');
        if (mobileControls) {
            mobileControls.style.display = 'block';
        }
        
        // Créer une interface tactile virtuelle pour les déplacements
        this.createVirtualControls();
    }
    
    createVirtualControls() {
        // Créer un conteneur pour les contrôles virtuels
        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'virtual-controls';
        controlsContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            z-index: 1000;
            pointer-events: none;
        `;
        
        // Joystick virtuel pour les déplacements
        const joystickContainer = document.createElement('div');
        joystickContainer.style.cssText = `
            width: 100px;
            height: 100px;
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid rgba(0, 255, 255, 0.3);
            border-radius: 50%;
            position: relative;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        `;
        
        const joystickKnob = document.createElement('div');
        joystickKnob.style.cssText = `
            width: 30px;
            height: 30px;
            background: rgba(0, 255, 255, 0.6);
            border: 1px solid #00ffff;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: none;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
        `;
        
        joystickContainer.appendChild(joystickKnob);
        
        // Conteneur des boutons à droite
        const rightControls = document.createElement('div');
        rightControls.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            pointer-events: auto;
        `;
        
        // Bouton d'interaction principal
        const interactButton = document.createElement('div');
        interactButton.id = 'mobile-interact-button';
        interactButton.style.cssText = `
            width: 70px;
            height: 70px;
            background: rgba(0, 255, 100, 0.2);
            border: 2px solid rgba(0, 255, 100, 0.5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ff64;
            font-weight: bold;
            font-size: 11px;
            user-select: none;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 15px rgba(0, 255, 100, 0.3);
            opacity: 0.5;
            transition: all 0.3s ease;
            text-align: center;
            line-height: 1.2;
        `;
        interactButton.innerHTML = '🪐<br>VISIT';
        
        // Conteneur pour boutons secondaires
        const secondaryButtons = document.createElement('div');
        secondaryButtons.style.cssText = `
            display: flex;
            gap: 8px;
        `;
        
        // Bouton boost
        const boostButton = document.createElement('div');
        boostButton.style.cssText = `
            width: 50px;
            height: 50px;
            background: rgba(255, 100, 100, 0.2);
            border: 2px solid rgba(255, 100, 100, 0.5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff6464;
            font-weight: bold;
            font-size: 10px;
            user-select: none;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 10px rgba(255, 100, 100, 0.3);
        `;
        boostButton.textContent = '🚀';
        
        // Boutons montée/descente
        const verticalContainer = document.createElement('div');
        verticalContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 6px;
        `;
        
        const upButton = document.createElement('div');
        upButton.style.cssText = `
            width: 40px;
            height: 40px;
            background: rgba(0, 255, 255, 0.2);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ffff;
            font-weight: bold;
            user-select: none;
            backdrop-filter: blur(10px);
            font-size: 16px;
        `;
        upButton.textContent = '↑';
        
        const downButton = document.createElement('div');
        downButton.style.cssText = `
            width: 40px;
            height: 40px;
            background: rgba(0, 255, 255, 0.2);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ffff;
            font-weight: bold;
            user-select: none;
            backdrop-filter: blur(10px);
            font-size: 16px;
        `;
        downButton.textContent = '↓';
        
        verticalContainer.appendChild(upButton);
        verticalContainer.appendChild(downButton);
        secondaryButtons.appendChild(boostButton);
        secondaryButtons.appendChild(verticalContainer);
        
        rightControls.appendChild(interactButton);
        rightControls.appendChild(secondaryButtons);
        
        controlsContainer.appendChild(joystickContainer);
        controlsContainer.appendChild(rightControls);
        document.body.appendChild(controlsContainer);
        
        // Gestion du joystick
        this.setupJoystick(joystickContainer, joystickKnob);
        
        // Gestion des boutons
        this.setupMobileButtons(boostButton, upButton, downButton, interactButton);
        
        // Stocker la référence du bouton d'interaction
        this.interactButton = interactButton;
    }
    
    setupJoystick(container, knob) {
        let isDragging = false;
        let centerX, centerY;
        let joystickTouchId = null;

        const startDrag = (event) => {
            isDragging = true;
            const rect = container.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;

            // Track this specific touch
            if (event.changedTouches) {
                joystickTouchId = event.changedTouches[0].identifier;
            }

            container.style.background = 'rgba(0, 255, 255, 0.25)';
            container.style.borderColor = 'rgba(0, 255, 255, 0.6)';
            knob.style.background = 'rgba(0, 255, 255, 0.9)';
            knob.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.6)';
        };

        const drag = (event) => {
            if (!isDragging) return;

            let clientX, clientY;
            if (event.touches) {
                // Find our joystick touch by identifier
                let found = false;
                for (let i = 0; i < event.touches.length; i++) {
                    if (event.touches[i].identifier === joystickTouchId) {
                        clientX = event.touches[i].clientX;
                        clientY = event.touches[i].clientY;
                        found = true;
                        break;
                    }
                }
                if (!found) return;
            } else {
                clientX = event.clientX;
                clientY = event.clientY;
            }
            
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 35; // rayon du container - rayon du knob
            
            let x = deltaX;
            let y = deltaY;
            
            if (distance > maxDistance) {
                x = (deltaX / distance) * maxDistance;
                y = (deltaY / distance) * maxDistance;
            }
            
            knob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            
            // Convertir en commandes de mouvement
            const normalizedX = x / maxDistance;
            const normalizedY = y / maxDistance;
            
            // Réinitialiser les touches
            this.keys.forward = false;
            this.keys.backward = false;
            this.keys.left = false;
            this.keys.right = false;
            
            // Appliquer les nouvelles directions avec seuil plus bas pour mobile
            if (Math.abs(normalizedY) > 0.15) {
                if (normalizedY < 0) this.keys.forward = true;
                else this.keys.backward = true;
            }
            
            if (Math.abs(normalizedX) > 0.15) {
                if (normalizedX < 0) this.keys.left = true;
                else this.keys.right = true;
            }
        };
        
        const endDrag = (event) => {
            // For touch events, only end if our specific joystick touch ended
            if (event.changedTouches) {
                let found = false;
                for (let i = 0; i < event.changedTouches.length; i++) {
                    if (event.changedTouches[i].identifier === joystickTouchId) {
                        found = true;
                        break;
                    }
                }
                if (!found) return;
            }

            isDragging = false;
            joystickTouchId = null;
            knob.style.transform = 'translate(-50%, -50%)';
            container.style.background = 'rgba(0, 255, 255, 0.1)';
            container.style.borderColor = 'rgba(0, 255, 255, 0.3)';
            knob.style.background = 'rgba(0, 255, 255, 0.6)';
            knob.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.4)';

            this.keys.forward = false;
            this.keys.backward = false;
            this.keys.left = false;
            this.keys.right = false;
        };
        
        // Événements tactiles
        container.addEventListener('touchstart', startDrag, { passive: true });
        document.addEventListener('touchmove', drag, { passive: true });
        document.addEventListener('touchend', endDrag, { passive: true });
        
        // Événements souris pour les tests sur desktop
        container.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
    }
    
    setupMobileButtons(boostButton, upButton, downButton, interactButton) {
        // Bouton boost
        const startBoost = () => {
            this.keys.accelerate = true;
            boostButton.style.background = 'rgba(255, 100, 100, 0.4)';
            boostButton.style.boxShadow = '0 0 20px rgba(255, 100, 100, 0.6)';
        };
        
        const endBoost = () => {
            this.keys.accelerate = false;
            boostButton.style.background = 'rgba(255, 100, 100, 0.2)';
            boostButton.style.boxShadow = '0 0 10px rgba(255, 100, 100, 0.3)';
        };
        
        boostButton.addEventListener('touchstart', startBoost, { passive: true });
        boostButton.addEventListener('touchend', endBoost, { passive: true });
        boostButton.addEventListener('mousedown', startBoost);
        boostButton.addEventListener('mouseup', endBoost);
        
        // Bouton monter
        const startUp = () => {
            this.keys.up = true;
            upButton.style.background = 'rgba(0, 255, 255, 0.4)';
        };
        
        const endUp = () => {
            this.keys.up = false;
            upButton.style.background = 'rgba(0, 255, 255, 0.2)';
        };
        
        upButton.addEventListener('touchstart', startUp, { passive: true });
        upButton.addEventListener('touchend', endUp, { passive: true });
        upButton.addEventListener('mousedown', startUp);
        upButton.addEventListener('mouseup', endUp);
        
        // Bouton descendre
        const startDown = () => {
            this.keys.down = true;
            downButton.style.background = 'rgba(0, 255, 255, 0.4)';
        };
        
        const endDown = () => {
            this.keys.down = false;
            downButton.style.background = 'rgba(0, 255, 255, 0.2)';
        };
        
        downButton.addEventListener('touchstart', startDown, { passive: true });
        downButton.addEventListener('touchend', endDown, { passive: true });
        downButton.addEventListener('mousedown', startDown);
        downButton.addEventListener('mouseup', endDown);
        
        // Bouton d'interaction
        const handleInteraction = () => {
            // Déclencher un événement d'interaction personnalisé
            const interactionEvent = new CustomEvent('mobileInteraction', {
                bubbles: true,
                detail: { source: 'mobile' }
            });
            document.dispatchEvent(interactionEvent);
        };
        
        interactButton.addEventListener('touchstart', handleInteraction, { passive: true });
        interactButton.addEventListener('click', handleInteraction);
    }
    
    // Méthode pour mettre à jour l'état du bouton d'interaction
    updateInteractionButton(canInteract, planetName) {
        if (!this.interactButton) return;
        
        if (canInteract) {
            this.interactButton.style.opacity = '1';
            this.interactButton.style.background = 'rgba(0, 255, 100, 0.4)';
            this.interactButton.style.borderColor = 'rgba(0, 255, 100, 0.8)';
            this.interactButton.style.boxShadow = '0 0 20px rgba(0, 255, 100, 0.6)';
            this.interactButton.innerHTML = `🪐<br>${planetName || 'VISIT'}`;
        } else {
            this.interactButton.style.opacity = '0.5';
            this.interactButton.style.background = 'rgba(0, 255, 100, 0.2)';
            this.interactButton.style.borderColor = 'rgba(0, 255, 100, 0.5)';
            this.interactButton.style.boxShadow = '0 0 15px rgba(0, 255, 100, 0.3)';
            this.interactButton.innerHTML = '🪐<br>VISIT';
        }
    }
    
    onDocumentClick(event) {
        // Clic gauche pour demander le pointer lock ou interaction
        if (event.button !== 0) return; // Seulement clic gauche
        
        // Ne pas demander le pointer lock si les contrôles sont désactivés
        if (!this.enabled) {
            return;
        }
        
        // Ne pas demander le pointer lock si un modal est ouvert
        if (this.isModalOpen()) {
            return;
        }
        
        // Ne pas demander le pointer lock si on clique sur un élément interactif
        if (event.target.tagName.match(/BUTTON|A|INPUT|SELECT|TEXTAREA/i) ||
            event.target.onclick ||
            event.target.closest('button') ||
            event.target.closest('.modal') ||
            event.target.closest('#help-button') ||
            event.target.closest('#virtual-controls')) {
            return;
        }
        
        // Si la souris est verrouillée, le clic gauche sert pour l'interaction
        if (this.mouse.isLocked) {
            // L'interaction sera gérée par InteractionManager
            return;
        }
        
        // Ne pas demander le pointer lock sur mobile
        if (this.isMobile) {
            return;
        }
        
        this.requestPointerLock();
    }
    
    isModalOpen() {
        const modals = document.querySelectorAll('.modal');
        for (const modal of modals) {
            if (modal.style.display === 'block' || 
                window.getComputedStyle(modal).display === 'block') {
                return true;
            }
        }
        
        // Vérifier le modal de bienvenue
        const welcomeModal = document.querySelector('[style*="position: fixed"][style*="z-index: 2500"]');
        if (welcomeModal) {
            return true;
        }
        
        return false;
    }
    
    // Méthodes pour désactiver/réactiver les contrôles
    disableControls() {
        this.enabled = false;
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
    }
    
    enableControls() {
        this.enabled = true;
    }

    update(deltaTime) {
        this.updateMovement(deltaTime);
        this.updateRotation(deltaTime);
        this.updateCameraShake(deltaTime);
        this.updateUI();
    }
    
    updateMovement(deltaTime) {
        const config = CONTROLS_CONFIG.movement;
        
        // Direction du mouvement basée sur l'orientation de la caméra
        const direction = new THREE.Vector3();
        
        if (this.keys.forward) direction.z -= 1;
        if (this.keys.backward) direction.z += 1;
        if (this.keys.left) direction.x -= 1;
        if (this.keys.right) direction.x += 1;
        if (this.keys.up) direction.y += 1;
        if (this.keys.down) direction.y -= 1;
        
        // Normaliser la direction
        if (direction.length() > 0) {
            direction.normalize();
            
            // Appliquer la rotation de la caméra au vecteur de direction
            direction.applyQuaternion(this.camera.quaternion);
            
            // Calculer la vitesse
            let currentSpeed = config.speed;
            if (this.keys.accelerate) {
                currentSpeed *= config.acceleration;
                this.isAccelerating = true;
            } else {
                this.isAccelerating = false;
            }
            
            // Appliquer le mouvement
            this.velocity.add(direction.multiplyScalar(currentSpeed * deltaTime));
            
            // Limiter la vitesse maximale
            if (this.velocity.length() > config.maxSpeed) {
                this.velocity.normalize().multiplyScalar(config.maxSpeed);
            }
        }
        
        // Décélération
        this.velocity.multiplyScalar(config.deceleration);
        
        // Sauvegarder la position de base avant d'appliquer le mouvement
        this.cameraShake.basePosition.copy(this.camera.position).add(this.velocity);
        
        // Appliquer le mouvement à la caméra
        this.camera.position.add(this.velocity);
        
        // Calculer la vitesse actuelle pour l'UI
        this.speed = this.velocity.length();
        
        // Gestion audio des propulseurs
        const isMoving = direction.length() > 0;
        
        // Initialiser l'audio si nécessaire (après interaction utilisateur)
        if (this.audio.context && this.audio.context.state === 'suspended') {
            this.audio.context.resume();
        }
        
        if (isMoving && !this.audio.lastMovementState) {
            // Commencer le son des propulseurs
            this.playThrusterSound();
        } else if (!isMoving && this.audio.lastMovementState) {
            // Arrêter le son des propulseurs
            this.stopThrusterSound();
        }
        
        // Mettre à jour le son en fonction de la vitesse
        if (isMoving) {
            this.updateThrusterSound(this.speed, this.isAccelerating);
        }
        
        this.audio.lastMovementState = isMoving;
    }
    
    updateRotation(deltaTime) {
        const smoothing = CONTROLS_CONFIG.rotation.smoothing;
        
        // Appliquer la rotation
        this.camera.rotation.x = THREE.MathUtils.lerp(
            this.camera.rotation.x,
            this.angularVelocity.x,
            smoothing
        );
        
        this.camera.rotation.y = THREE.MathUtils.lerp(
            this.camera.rotation.y,
            this.angularVelocity.y,
            smoothing
        );
        
        // Maintenir l'ordre des rotations
        this.camera.rotation.order = 'YXZ';
    }
    
    updateCameraShake(deltaTime) {
        this.cameraShake.time += deltaTime;
        
        // Déterminer le type de tremblement selon l'état du vaisseau
        let shakeConfig;
        
        if (this.isAccelerating) {
            // Mode boost - tremblement intense
            shakeConfig = this.cameraShake.boostShake;
        } else if (this.speed > 0.5) {
            // Mode normal - tremblement modéré
            shakeConfig = this.cameraShake.normalShake;
        } else {
            // Mode idle - tremblement léger
            shakeConfig = this.cameraShake.idleShake;
        }
        
        // Interpoler vers la nouvelle intensité et fréquence
        this.cameraShake.intensity = THREE.MathUtils.lerp(
            this.cameraShake.intensity,
            shakeConfig.intensity,
            deltaTime * 3
        );
        this.cameraShake.frequency = THREE.MathUtils.lerp(
            this.cameraShake.frequency,
            shakeConfig.frequency,
            deltaTime * 3
        );
        
        // Calculer le tremblement avec des patterns différents
        const shakeX = Math.sin(this.cameraShake.time * this.cameraShake.frequency) * this.cameraShake.intensity;
        const shakeY = Math.cos(this.cameraShake.time * this.cameraShake.frequency * 0.7) * this.cameraShake.intensity;
        const shakeZ = Math.sin(this.cameraShake.time * this.cameraShake.frequency * 1.3) * this.cameraShake.intensity * 0.5;
        
        // Ajouter des harmoniques pour un effet plus naturel
        const harmonic1 = Math.sin(this.cameraShake.time * this.cameraShake.frequency * 2.1) * this.cameraShake.intensity * 0.3;
        const harmonic2 = Math.cos(this.cameraShake.time * this.cameraShake.frequency * 3.7) * this.cameraShake.intensity * 0.2;
        
        // Appliquer le tremblement à la position de la caméra
        this.camera.position.x += shakeX + harmonic1;
        this.camera.position.y += shakeY + harmonic2;
        this.camera.position.z += shakeZ;
        
        // Ajouter un léger tremblement de rotation pour plus de réalisme
        const rotationShake = this.cameraShake.intensity * 0.1;
        this.camera.rotation.z += Math.sin(this.cameraShake.time * this.cameraShake.frequency * 1.5) * rotationShake;
    }
    
    updateUI() {
        // Mettre à jour l'interface utilisateur
        const speedElement = document.getElementById('speed-value');
        if (speedElement) {
            speedElement.textContent = this.speed.toFixed(1);
        }
        
        const posElements = {
            x: document.getElementById('pos-x'),
            y: document.getElementById('pos-y'),
            z: document.getElementById('pos-z')
        };
        
        if (posElements.x) posElements.x.textContent = this.camera.position.x.toFixed(0);
        if (posElements.y) posElements.y.textContent = this.camera.position.y.toFixed(0);
        if (posElements.z) posElements.z.textContent = this.camera.position.z.toFixed(0);
        
        // Mettre à jour l'état du moteur
        this.updateEngineStatus();
    }
    
    updateEngineStatus() {
        const engineElement = document.getElementById('engine-status');
        if (!engineElement) return;
        
        // Déterminer l'état du moteur basé sur les mouvements
        const isMoving = Object.values(this.keys).some(key => key);
        
        if (this.keys.accelerate && isMoving) {
            engineElement.textContent = 'BOOST';
            engineElement.className = 'boost';
        } else if (isMoving) {
            engineElement.textContent = 'NORMAL';
            engineElement.className = 'normal';
        } else {
            engineElement.textContent = 'IDLE';
            engineElement.className = 'idle';
        }
    }
    
    getPosition() {
        return this.camera.position.clone();
    }
    
    getDirection() {
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.camera.quaternion);
        return direction;
    }
}

export default SpaceshipControls;
