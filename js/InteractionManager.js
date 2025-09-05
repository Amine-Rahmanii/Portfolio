class InteractionManager {
    constructor(camera, solarSystem, spaceshipControls = null) {
        this.camera = camera;
        this.solarSystem = solarSystem;
        this.spaceshipControls = spaceshipControls;
        this.currentTarget = null;
        this.interactionDistance = 100;
        this.clickCountAfterModal = 0;
        this.isModalJustClosed = false;
        
        this.modal = document.getElementById('planet-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.closeButton = document.getElementById('close-modal');
        this.interactionPrompt = document.getElementById('interaction-prompt');
        this.targetName = document.getElementById('target-name');
        this.targetDistance = document.getElementById('target-distance');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Interaction par clic gauche
        document.addEventListener('click', (event) => {
            // Seulement pour les clics gauches (button 0)
            if (event.button !== 0) {
                return;
            }
            
            // Si le modal vient d'être fermé, compter les clics gauches uniquement
            if (this.isModalJustClosed) {
                this.clickCountAfterModal++;
                
                // Les deux premiers clics servent à reprendre le contrôle, pas à interagir
                if (this.clickCountAfterModal <= 2) {
                    return;
                }
                
                // À partir du troisième clic, réactiver les interactions
                if (this.clickCountAfterModal >= 3) {
                    this.isModalJustClosed = false;
                    this.clickCountAfterModal = 0;
                }
            }
            
            // Seulement si c'est un clic gauche et que la souris est verrouillée
            if (document.pointerLockElement && this.currentTarget && !this.isModalJustClosed) {
                this.interactWithPlanet(this.currentTarget.planet);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        
        // Interaction mobile via événement personnalisé
        document.addEventListener('mobileInteraction', (event) => {
            if (this.currentTarget && !this.isModalJustClosed) {
                this.interactWithPlanet(this.currentTarget.planet);
            }
        });
        
        // Fermeture du modal avec Échap
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
        
        // Fermeture du modal
        this.closeButton.addEventListener('click', () => this.closeModal());
        
        // Fermeture en cliquant à l'extérieur
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    update() {
        const cameraPosition = this.camera.position;
        const nearestPlanet = this.solarSystem.getNearestPlanet(cameraPosition, this.interactionDistance);
        
        if (nearestPlanet) {
            this.currentTarget = nearestPlanet;
            this.showInteractionPrompt(nearestPlanet.planet, nearestPlanet.distance);
            
            // Mettre à jour le bouton d'interaction mobile
            if (this.spaceshipControls && this.spaceshipControls.updateInteractionButton) {
                this.spaceshipControls.updateInteractionButton(true, nearestPlanet.planet.name);
            }
        } else {
            this.currentTarget = null;
            this.hideInteractionPrompt();
            
            // Mettre à jour le bouton d'interaction mobile
            if (this.spaceshipControls && this.spaceshipControls.updateInteractionButton) {
                this.spaceshipControls.updateInteractionButton(false);
            }
        }
    }
    
    showInteractionPrompt(planet, distance) {
        this.interactionPrompt.style.display = 'block';
        
        // Mettre à jour les informations de la cible
        this.targetName.textContent = planet.name;
        this.targetDistance.textContent = `${distance.toFixed(0)} km`;
        
        // Animation de pulsation pour attirer l'attention
        this.interactionPrompt.style.animation = 'pulse 2s infinite';
    }
    
    hideInteractionPrompt() {
        this.interactionPrompt.style.display = 'none';
        this.targetName.textContent = 'Aucune';
        this.targetDistance.textContent = '-- km';
    }
    
    interactWithPlanet(planet) {
        const content = planet.userData.content;
        
        if (!content) return;
        
        // Remplir le modal avec le contenu de la planète
        this.modalTitle.textContent = content.title;
        this.modalBody.innerHTML = content.description;
        
        // Afficher le modal
        this.showModal();
    }
    
    showModal() {
        this.modal.style.display = 'block';
        
        // Animation d'ouverture
        this.modal.style.opacity = '0';
        requestAnimationFrame(() => {
            this.modal.style.transition = 'opacity 0.3s ease';
            this.modal.style.opacity = '1';
        });
        
        // Désactiver les contrôles du vaisseau
        document.exitPointerLock();
    }
    
    closeModal() {
        // Marquer que le modal vient d'être fermé
        this.isModalJustClosed = true;
        this.clickCountAfterModal = 0;
        
        // Animation de fermeture
        this.modal.style.transition = 'opacity 0.3s ease';
        this.modal.style.opacity = '0';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            // Réactiver les contrôles du vaisseau en demandant le pointer lock
            this.reactivateControls();
        }, 300);
    }
    
    reactivateControls() {
        // Réactiver le pointer lock pour les contrôles du vaisseau
        // Utiliser un petit délai pour s'assurer que l'état du DOM est stabilisé
        setTimeout(() => {
            // Essayer de réactiver automatiquement le pointer lock
            if (!document.pointerLockElement) {
                document.body.requestPointerLock();
            }
        }, 100);
    }
    
    // Méthode pour obtenir la planète ciblée
    getCurrentTarget() {
        return this.currentTarget;
    }
    
    // Méthode pour forcer l'interaction avec une planète spécifique
    forceInteraction(planetName) {
        const planet = this.solarSystem.getPlanetByName(planetName);
        if (planet) {
            this.interactWithPlanet(planet);
        }
    }
    
    // Méthode pour naviguer directement vers une planète
    navigateToPlanet(planetName, camera, controls) {
        const planet = this.solarSystem.getPlanetByName(planetName);
        if (!planet) return;
        
        // Calculer la position d'approche de la planète
        const planetPosition = planet.position.clone();
        const approachDistance = planet.userData.orbitRadius ? 50 : 100;
        
        // Direction d'approche (depuis le centre vers la planète)
        const approachDirection = planetPosition.clone().normalize();
        const approachPosition = planetPosition.clone().sub(
            approachDirection.multiplyScalar(approachDistance)
        );
        
        // Animation de déplacement de la caméra
        this.animateCameraMovement(camera, approachPosition, 2000);
    }
    
    animateCameraMovement(camera, targetPosition, duration) {
        const startPosition = camera.position.clone();
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolation avec easing
            const easedProgress = this.easeInOutCubic(progress);
            
            camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

export default InteractionManager;
