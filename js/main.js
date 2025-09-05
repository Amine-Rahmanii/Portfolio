import * as THREE from 'three';
import SpaceshipControls from './SpaceshipControls.js';
import SolarSystem from './SolarSystem.js';
import InteractionManager from './InteractionManager.js';
import { ENVIRONMENT_CONFIG } from './config.js';

// Gestion globale des erreurs
window.addEventListener('unhandledrejection', function(event) {
    console.error('Erreur non gérée:', event.reason);
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
        loadingText.innerHTML = `
            <div style="color: #ff6666;">
                ❌ Erreur de chargement: ${event.reason?.message || 'Erreur inconnue'}
                <br><button onclick="location.reload()" style="margin-top: 10px; padding: 5px 15px; background: #00ffff; color: #000; border: none; border-radius: 3px; cursor: pointer;">Recharger</button>
            </div>
        `;
    }
    event.preventDefault();
});

class SpacePortfolio {
    constructor() {
        // Détection mobile
        this.isMobile = this.detectMobile();
        
        // Timeout de chargement
        this.loadingTimeout = setTimeout(() => {
            this.showError('Le chargement prend trop de temps. Vérifiez votre connexion internet.');
        }, 30000); // 30 secondes
        
        // Éléments DOM
        this.container = document.body;
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingProgress = document.getElementById('loading-progress');
        this.loadingText = document.getElementById('loading-text');
        
        // Three.js
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        
        // Composants du jeu
        this.controls = null;
        this.solarSystem = null;
        this.interactionManager = null;
        
        // État
        this.isLoaded = false;
        this.loadingProgressValue = 0;
        
        this.init();
    }
    
    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Détection spécifique iOS
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        
        // Détection Android
        const isAndroid = /android/i.test(userAgent);
        
        // Détection générale mobile
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        // Détection par taille d'écran et support tactile
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        return isIOS || isAndroid || isMobileUA || (hasTouch && isSmallScreen);
    }
    
    setupMobileInterface() {
        if (this.isMobile) {
            // Afficher les contrôles mobiles
            const mobileControls = document.querySelector('.mobile-controls');
            const desktopControls = document.getElementById('controls-info');
            
            if (mobileControls) {
                mobileControls.style.display = 'block';
            }
            if (desktopControls) {
                desktopControls.style.display = 'none';
            }
            
            // Ajuster la qualité de rendu pour mobile
            if (this.renderer) {
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                
                // Réduire la résolution sur mobile pour de meilleures performances
                const canvas = this.renderer.domElement;
                const rect = canvas.getBoundingClientRect();
                this.renderer.setSize(rect.width * 0.8, rect.height * 0.8, false);
            }
            
            // Désactiver les effets visuels coûteux sur mobile
            if (this.solarSystem && this.solarSystem.stars) {
                this.solarSystem.stars.visible = false;
            }
            
            // Ajuster les contrôles pour touch
            if (this.controls) {
                this.controls.mouseSensitivity *= 0.7; // Réduire la sensibilité tactile
            }
        }
    }
    
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }
    
    async init() {
        try {
            // Vérifier le support WebGL
            if (!this.checkWebGLSupport()) {
                this.showError("WebGL n'est pas supporté sur cet appareil. Veuillez utiliser un navigateur compatible.");
                return;
            }
            
            this.showLoading("Initialisation du moteur 3D...");
            await this.initThreeJS();
            
            this.showLoading("Création du système solaire...");
            await this.initSolarSystem();
            
            this.showLoading("Configuration des contrôles...");
            await this.initControls();
            
            this.showLoading("Préparation de l'interface...");
            await this.initInteractions();
            
            this.showLoading("Finalisation...");
            await this.finishLoading();
            
            this.startRenderLoop();
            
        } catch (error) {
            console.error('Erreur lors de l\'initialisation:', error);
            this.showError('Erreur lors du chargement du portfolio');
        }
    }
    
    async initThreeJS() {
        // Scène
        this.scene = new THREE.Scene();
        
        // Caméra
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );
        this.camera.position.set(0, 50, 100);
        
        // Renderer avec optimisations iOS
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: !this.isMobile, // Désactiver antialiasing sur mobile
            alpha: false, // Pas de transparence pour de meilleures performances
            powerPreference: this.isMobile ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false // Permettre WebGL même si performances réduites
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Configuration pixelRatio pour iOS
        if (this.isMobile) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } else {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        // Désactiver les ombres sur mobile pour de meilleures performances
        this.renderer.shadowMap.enabled = !this.isMobile;
        if (!this.isMobile) {
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
        
        // Couleur de fond et brouillard
        const fogConfig = ENVIRONMENT_CONFIG.fog;
        this.scene.background = new THREE.Color(fogConfig.color);
        this.scene.fog = new THREE.Fog(fogConfig.color, fogConfig.near, fogConfig.far);
        
        this.container.appendChild(this.renderer.domElement);
        
        // Gestion du redimensionnement
        window.addEventListener('resize', () => this.onWindowResize());
        
        await this.delay(300);
    }
    
    async initSolarSystem() {
        this.solarSystem = new SolarSystem(this.scene);
        await this.delay(500);
    }
    
    async initControls() {
        this.controls = new SpaceshipControls(this.camera, this.renderer.domElement);
        await this.delay(200);
    }
    
    async initInteractions() {
        this.interactionManager = new InteractionManager(this.camera, this.solarSystem, this.controls);
        await this.delay(200);
    }
    
    async finishLoading() {
        // Nettoyer le timeout
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
        }
        
        await this.delay(500);
        this.setupMobileInterface();
        this.hideLoading();
        this.isLoaded = true;
        
        // Afficher le message de bienvenue après un court délai
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 2000);
    }
    
    showWelcomeMessage() {
        // Afficher le message de bienvenue à chaque chargement
        // Désactiver temporairement les contrôles
        if (this.controls) {
            this.controls.disableControls();
        }
        
        const welcomeDiv = document.createElement('div');
        welcomeDiv.id = 'welcome-modal';
        welcomeDiv.className = 'welcome-modal';
        welcomeDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 20, 40, 0.95);
            border: 2px solid #00ffff;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            z-index: 2500;
            backdrop-filter: blur(15px);
            animation: fadeIn 0.5s ease;
            max-width: 400px;
            color: #00ffff;
            pointer-events: auto;
        `;
        
        welcomeDiv.innerHTML = `
            <h2 style="margin-bottom: 20px; color: #00aaff;">🚀 Bienvenue, Explorateur !</h2>
            <p style="margin-bottom: 15px; line-height: 1.5;">
                Vous êtes maintenant aux commandes d'un vaisseau spatial.
                Utilisez les <strong>flèches directionnelles</strong> pour vous déplacer, le <strong>clic droit</strong> pour accélérer et approchez-vous des planètes !
            </p>
            <p style="margin-bottom: 20px; line-height: 1.5; color: #ffaa00;">
                🌍 <strong>Explorez les planètes pour découvrir mon portfolio !</strong>
            </p>
            <p style="margin-bottom: 20px; font-size: 14px; color: #ffaa00;">
                💡 Cliquez sur le <strong>?</strong> en haut à droite pour obtenir de l'aide
            </p>
            <button id="start-exploration" style="
                background: #00ffff;
                color: #000;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">
                🎮 Commencer l'exploration
            </button>
        `;
        
        // Ajouter un overlay pour empêcher les clics en dehors
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 2499;
            pointer-events: auto;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(welcomeDiv);
        
        // Gérer le clic sur le bouton
        document.getElementById('start-exploration').addEventListener('click', () => {
            welcomeDiv.remove();
            overlay.remove();
            
            // Réactiver les contrôles et forcer le pointer lock
            if (this.controls) {
                this.controls.enableControls();
                // Attendre un peu puis forcer le pointer lock
                setTimeout(() => {
                    this.controls.forcePointerLock();
                }, 100);
            }
        });
        
        // Ajouter l'animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
        `;
        document.head.appendChild(style);
    }
    
    startRenderLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (!this.isLoaded) return;
            
            const deltaTime = this.clock.getDelta();
            
            // Mise à jour des composants
            this.controls.update(deltaTime);
            this.solarSystem.update(deltaTime);
            this.interactionManager.update();
            
            // Rendu
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    showLoading(text) {
        this.loadingProgressValue += 20;
        this.loadingProgressValue = Math.min(this.loadingProgressValue, 100);
        
        if (this.loadingText) {
            this.loadingText.textContent = text;
        }
        
        if (this.loadingProgress) {
            this.loadingProgress.style.width = `${this.loadingProgressValue}%`;
        }
    }
    
    hideLoading() {
        if (this.loadingScreen) {
            this.loadingScreen.style.transition = 'opacity 1s ease';
            this.loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 1000);
        }
    }
    
    showError(message) {
        console.error('Portfolio Error:', message);
        
        if (this.loadingText) {
            this.loadingText.innerHTML = `
                <div style="color: #ff6666; text-align: center;">
                    <p>❌ ${message}</p>
                    <div style="margin-top: 15px; font-size: 12px;">
                        <p>Solutions possibles :</p>
                        <ul style="list-style: none; padding: 0; margin: 10px 0;">
                            <li>• Vérifiez votre connexion internet</li>
                            <li>• Utilisez un navigateur récent</li>
                            <li>• Activez JavaScript</li>
                            <li>• Rechargez la page</li>
                        </ul>
                        <button onclick="location.reload()" style="
                            background: #00ffff; 
                            color: #000; 
                            border: none; 
                            padding: 10px 20px; 
                            border-radius: 5px; 
                            cursor: pointer;
                            margin-top: 10px;
                        ">
                            🔄 Recharger la page
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Cacher la barre de progression en cas d'erreur
        if (this.loadingProgress) {
            this.loadingProgress.style.background = '#ff0000';
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Méthodes publiques pour l'interaction externe
    navigateToPlanet(planetName) {
        if (this.interactionManager) {
            this.interactionManager.navigateToPlanet(planetName, this.camera, this.controls);
        }
    }
    
    openPlanetInfo(planetName) {
        if (this.interactionManager) {
            this.interactionManager.forceInteraction(planetName);
        }
    }
    
    getCameraPosition() {
        return this.camera ? this.camera.position.clone() : null;
    }
    
    getPlanets() {
        return this.solarSystem ? this.solarSystem.getAllPlanets() : [];
    }
}

// Initialisation automatique au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Correction pour l'accès à la barre de progression
    const loadingProgressBar = document.getElementById('loading-progress');
    
    window.spacePortfolio = new SpacePortfolio();
    
    // Exposer les méthodes publiques
    window.navigateToPlanet = (planetName) => {
        window.spacePortfolio.navigateToPlanet(planetName);
    };
    
    window.openPlanetInfo = (planetName) => {
        window.spacePortfolio.openPlanetInfo(planetName);
    };
    
    // Messages de débogage
    console.log('🚀 Portfolio Spatial initialisé');
    console.log('Contrôles: WASD pour se déplacer, Souris pour regarder, Shift pour accélérer, E pour interagir');
});

export default SpacePortfolio;
