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
        
        // Si la planète est Terre (section Projets), injecter dynamiquement les projets GitHub manquants
        if (planet.name === 'Terre') {
            this.injectGitHubProjects({ username: 'Amine-Rahmanii' });
        }
        
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

    // Récupère les noms de dépôts GitHub déjà référencés dans le contenu actuel du modal
    getExistingRepoNamesFromModal(username) {
        try {
            const anchors = Array.from(this.modalBody.querySelectorAll('a[href*="github.com/" + username + "/"]'));
            const names = new Set();
            anchors.forEach(a => {
                try {
                    const url = new URL(a.href);
                    const parts = url.pathname.split('/').filter(Boolean);
                    const idx = parts.findIndex(p => p.toLowerCase() === username.toLowerCase());
                    if (idx !== -1 && parts[idx + 1]) {
                        names.add(parts[idx + 1]);
                    }
                } catch (_) { /* ignore malformed URLs */ }
            });
            return names;
        } catch (_) {
            return new Set();
        }
    }

    // Injecte une section listant les dépôts publics GitHub non encore inclus dans le contenu
    async injectGitHubProjects({ username }) {
        // Éviter les doublons si la section a déjà été ajoutée
        if (document.getElementById('github-projects-section')) return;

        const section = document.createElement('div');
        section.id = 'github-projects-section';
        section.style.marginTop = '20px';
        section.style.padding = '15px';
        section.style.border = '1px solid #00ffff';
        section.style.borderRadius = '8px';
        section.style.background = 'rgba(0, 255, 255, 0.08)';

        const title = document.createElement('h3');
        title.textContent = 'Autres projets publics (GitHub)';
        title.style.marginTop = '0';
        section.appendChild(title);

        const status = document.createElement('div');
        status.id = 'github-projects-status';
        status.textContent = 'Chargement des dépôts GitHub…';
        status.style.color = '#aaddff';
        status.style.fontStyle = 'italic';
        section.appendChild(status);

        const list = document.createElement('div');
        list.id = 'github-projects-list';
        list.style.display = 'grid';
        list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
        list.style.gap = '12px';
        list.style.marginTop = '10px';
        section.appendChild(list);

        this.modalBody.appendChild(section);

        // Construire l’URL de l’API GitHub
        const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=updated`;

        try {
            const response = await fetch(apiUrl, { headers: { 'Accept': 'application/vnd.github+json' } });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const repos = await response.json();

            // Récupérer les dépôts déjà inclus dans le contenu actuel
            const existing = this.getExistingRepoNamesFromModal(username);

            // Filtrer: dépôts non fork, publics, non déjà listés
            const filtered = repos
                .filter(r => !r.fork && !existing.has(r.name))
                .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

            if (filtered.length === 0) {
                status.textContent = "Aucun autre dépôt public à afficher.";
                return;
            }

            status.remove();

            // Limiter à 12 éléments pour la lisibilité
            const toShow = filtered.slice(0, 12);

            toShow.forEach(repo => {
                const card = document.createElement('div');
                card.style.border = '1px solid rgba(0,255,255,0.3)';
                card.style.borderRadius = '6px';
                card.style.padding = '10px';
                card.style.background = 'rgba(0, 0, 0, 0.25)';

                const name = document.createElement('div');
                name.innerHTML = `<strong>${repo.name}</strong>`;
                name.style.marginBottom = '6px';
                card.appendChild(name);

                if (repo.description) {
                    const desc = document.createElement('div');
                    desc.textContent = repo.description;
                    desc.style.color = '#cccccc';
                    desc.style.fontSize = '0.9em';
                    desc.style.minHeight = '2.5em';
                    card.appendChild(desc);
                }

                const meta = document.createElement('div');
                meta.style.display = 'flex';
                meta.style.flexWrap = 'wrap';
                meta.style.gap = '8px';
                meta.style.margin = '8px 0';

                if (repo.language) {
                    const lang = document.createElement('span');
                    lang.textContent = repo.language;
                    lang.style.background = 'rgba(0,255,255,0.12)';
                    lang.style.border = '1px solid rgba(0,255,255,0.25)';
                    lang.style.borderRadius = '3px';
                    lang.style.padding = '2px 6px';
                    meta.appendChild(lang);
                }

                const stars = document.createElement('span');
                stars.textContent = `★ ${repo.stargazers_count}`;
                stars.style.background = 'rgba(255, 215, 0, 0.12)';
                stars.style.border = '1px solid rgba(255, 215, 0, 0.25)';
                stars.style.borderRadius = '3px';
                stars.style.padding = '2px 6px';
                meta.appendChild(stars);

                const updated = document.createElement('span');
                const date = new Date(repo.pushed_at);
                updated.textContent = `Maj: ${date.toLocaleDateString()}`;
                updated.style.color = '#aaaaaa';
                updated.style.fontSize = '0.85em';
                meta.appendChild(updated);

                card.appendChild(meta);

                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = 'Voir sur GitHub';
                link.style.display = 'inline-block';
                link.style.marginTop = '4px';
                link.style.textDecoration = 'none';
                link.style.color = '#000';
                link.style.fontWeight = 'bold';
                link.style.background = 'linear-gradient(45deg, #00ffff, #00aaff)';
                link.style.padding = '6px 10px';
                link.style.borderRadius = '4px';
                card.appendChild(link);

                list.appendChild(card);
            });
        } catch (err) {
            status.textContent = "Impossible de charger les dépôts GitHub (connexion ou limite API).";
            status.style.color = '#ff8888';
        }
    }
}

export default InteractionManager;
