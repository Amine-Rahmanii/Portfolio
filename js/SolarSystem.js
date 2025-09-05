import * as THREE from 'three';
import { SOLAR_SYSTEM_CONFIG, ENVIRONMENT_CONFIG } from './config.js';
import { TextureManager } from './TextureManager.js';

// Vérification de l'import Three.js
if (!THREE || !THREE.Scene) {
    throw new Error('Three.js n\'a pas pu être chargé dans SolarSystem');
}

class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.planets = [];
        this.sun = null;
        this.starField = null;
        this.textureManager = new TextureManager();
        this.textures = this.textureManager.getAllTextures();
        
        this.init();
    }
    
    init() {
        this.createStarField();
        this.createSun();
        this.createPlanets();
        this.setupLighting();
    }
    
    createStarField() {
        const config = ENVIRONMENT_CONFIG.starField;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];
        
        for (let i = 0; i < config.count; i++) {
            positions.push(
                (Math.random() - 0.5) * config.spread,
                (Math.random() - 0.5) * config.spread,
                (Math.random() - 0.5) * config.spread
            );
            
            // Couleurs variées pour les étoiles
            const starType = Math.random();
            if (starType < 0.7) {
                // Étoiles blanches/bleutées
                colors.push(1, 1, 1);
            } else if (starType < 0.9) {
                // Étoiles jaunâtres
                colors.push(1, 1, 0.8);
            } else {
                // Étoiles rougeâtres
                colors.push(1, 0.8, 0.6);
            }
            
            // Tailles variées
            sizes.push(0.5 + Math.random() * 2);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: config.size,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: false
        });
        
        this.starField = new THREE.Points(geometry, material);
        this.scene.add(this.starField);
    }
    
    createSun() {
        const config = SOLAR_SYSTEM_CONFIG.sun;
        
        // Géométrie du soleil
        const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
        
        // Matériau émissif pour le soleil avec animation
        const material = new THREE.MeshBasicMaterial({
            color: config.color,
            emissive: config.emissive,
            emissiveIntensity: config.intensity
        });
        
        this.sun = new THREE.Mesh(geometry, material);
        this.sun.position.set(...config.position);
        this.sun.name = config.name;
        
        // Ajouter plusieurs halos de tailles différentes
        const haloSizes = [1.2, 1.5, 1.8];
        const haloOpacities = [0.4, 0.25, 0.15];
        const haloColors = [0xffaa00, 0xff8800, 0xff6600];
        
        haloSizes.forEach((size, index) => {
            const haloGeometry = new THREE.SphereGeometry(config.radius * size, 32, 32);
            const haloMaterial = new THREE.MeshBasicMaterial({
                color: haloColors[index],
                transparent: true,
                opacity: haloOpacities[index],
                side: THREE.BackSide
            });
            
            const halo = new THREE.Mesh(haloGeometry, haloMaterial);
            halo.userData.rotationSpeed = 0.001 * (index + 1);
            this.sun.add(halo);
        });
        
        // Ajouter des particules solaires
        this.createSolarParticles();
        
        this.scene.add(this.sun);
    }
    
    createSolarParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        
        for (let i = 0; i < particleCount; i++) {
            // Particules autour du soleil
            const radius = 60 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            
            // Couleurs chaudes pour les particules
            colors.push(1, 0.6 + Math.random() * 0.4, Math.random() * 0.3);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(geometry, material);
        particles.userData.rotationSpeed = 0.002;
        this.sun.add(particles);
    }
    
    createPlanets() {
        SOLAR_SYSTEM_CONFIG.planets.forEach((planetConfig, index) => {
            const planet = this.createPlanet(planetConfig);
            this.planets.push(planet);
            this.scene.add(planet);
            
            // Créer l'orbite visuelle
            this.createOrbitRing(planetConfig.orbitRadius);
        });
    }
    
    createPlanet(config) {
        // Groupe principal de la planète
        const planetGroup = new THREE.Group();
        
        // Géométrie de la planète
        const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
        
        // Matériau de base selon le type de planète
        let material;
        
        switch(config.texture) {
            case 'earth':
                material = this.createEarthMaterial(config);
                break;
            case 'gas_giant':
                material = this.createGasGiantMaterial(config);
                break;
            case 'cloudy':
                material = this.createCloudyMaterial(config);
                break;
            case 'rocky':
            default:
                material = this.createRockyMaterial(config);
                break;
        }
        
        const planet = new THREE.Mesh(geometry, material);
        planetGroup.add(planet);
        
        // Ajouter des caractéristiques spéciales
        if (config.atmosphere) {
            const atmosphere = this.createAtmosphere(config);
            planetGroup.add(atmosphere);
        }
        
        if (config.rings) {
            const rings = this.createRings(config);
            planetGroup.add(rings);
        }
        
        // Commenté : nuages de la Terre retirés pour plus de clarté
        // if (config.clouds && config.name === 'Terre') {
        //     const clouds = this.createClouds(config);
        //     planetGroup.add(clouds);
        // }
        
        if (config.redSpot && config.name === 'Jupiter') {
            const redSpot = this.createRedSpot(config, planet);
            planetGroup.add(redSpot);
        }
        
        // Ajouter un effet de glow pour certaines planètes
        if (config.name === 'Vénus' || config.name === 'Jupiter' || config.name === 'Terre') {
            const glow = this.createGlow(config);
            planetGroup.add(glow);
        }
        
        // Positionnement et données
        planetGroup.position.set(...config.position);
        planetGroup.name = config.name;
        planetGroup.userData = {
            section: config.section,
            content: config.content,
            orbitRadius: config.orbitRadius,
            speed: config.speed,
            rotationSpeed: config.rotationSpeed || 0.01,
            angle: Math.atan2(config.position[2], config.position[0]),
            planet: planet // Référence pour la rotation
        };
        
        return planetGroup;
    }
    
    createRockyMaterial(config) {
        let texture;
        
        switch(config.name) {
            case 'Mercure':
                texture = this.textures.mercury;
                break;
            case 'Mars':
                texture = this.textures.mars;
                break;
            default:
                texture = null;
        }
        
        const material = new THREE.MeshLambertMaterial({
            color: config.color,
            emissive: 0x000000, // Pas d'émission pour un éclairage naturel
            emissiveIntensity: 0.0
        });
        
        if (texture) {
            material.map = texture;
        }
        
        return material;
    }
    
    createEarthMaterial(config) {
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff, // Blanc pour ne pas teinter la texture
            emissive: 0x000000, // Pas d'émission pour un éclairage naturel
            emissiveIntensity: 0.0,
            map: this.textures.earth
        });
        
        return material;
    }
    
    createGasGiantMaterial(config) {
        let texture;
        
        switch(config.name) {
            case 'Jupiter':
                texture = this.textures.jupiter;
                break;
            case 'Saturne':
                texture = this.textures.saturn;
                break;
            default:
                texture = null;
        }
        
        const material = new THREE.MeshLambertMaterial({
            color: config.color,
            emissive: 0x000000, // Pas d'émission pour un éclairage naturel
            emissiveIntensity: 0.0
        });
        
        if (texture) {
            material.map = texture;
        }
        
        return material;
    }
    
    createCloudyMaterial(config) {
        const material = new THREE.MeshLambertMaterial({
            color: config.color,
            emissive: 0x000000, // Pas d'émission pour un éclairage naturel
            emissiveIntensity: 0.0,
            transparent: true,
            opacity: 0.9
        });
        
        if (config.name === 'Vénus') {
            material.map = this.textures.venus;
        }
        
        return material;
    }
    
    createAtmosphere(config) {
        const atmosphereGeometry = new THREE.SphereGeometry(config.radius * 1.1, 32, 32);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: config.atmosphereColor || config.color,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide
        });
        
        return new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    }
    
    createRings(config) {
        const ringGeometry = new THREE.RingGeometry(
            config.ringInnerRadius || config.radius * 1.5,
            config.ringOuterRadius || config.radius * 2.5,
            64
        );
        
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: config.ringColor || 0xaaaaaa,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        // Utiliser la texture d'anneaux pour Saturne
        if (config.name === 'Saturne') {
            ringMaterial.map = this.textures.rings;
            ringMaterial.transparent = true;
            ringMaterial.opacity = 0.8;
        }
        
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3; // Légère inclinaison
        
        return rings;
    }
    
    createClouds(config) {
        const cloudGeometry = new THREE.SphereGeometry(config.radius * 1.02, 32, 32);
        const cloudMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            map: this.textures.clouds
        });
        
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        clouds.userData.rotationSpeed = 0.005; // Rotation différente des nuages
        
        return clouds;
    }
    
    createRedSpot(config, planet) {
        // Grande tache rouge de Jupiter
        const spotGeometry = new THREE.SphereGeometry(config.radius * 0.15, 16, 16);
        const spotMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b0000,
            transparent: true,
            opacity: 0.8
        });
        
        const redSpot = new THREE.Mesh(spotGeometry, spotMaterial);
        redSpot.position.set(config.radius * 0.9, 0, config.radius * 0.3);
        
        return redSpot;
    }
    
    createGlow(config) {
        const glowGeometry = new THREE.SphereGeometry(config.radius * 1.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        
        return new THREE.Mesh(glowGeometry, glowMaterial);
    }
    
    createOrbitRing(radius) {
        const geometry = new THREE.RingGeometry(radius - 1, radius + 1, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = -Math.PI / 2;
        this.scene.add(ring);
    }
    
    setupLighting() {
        const config = ENVIRONMENT_CONFIG.lighting;
        
        // Lumière ambiante minimale pour un éclairage spatial réaliste
        const ambientLight = new THREE.AmbientLight(
            0x404040, // Couleur légèrement bleutée
            0.2 // Intensité pour voir les faces non éclairées
        );
        this.scene.add(ambientLight);
        
        // Lumière du soleil - SOURCE PRINCIPALE
        const sunLight = new THREE.PointLight(
            0xffffaa, // Couleur jaune-blanche du soleil
            5.0, // Intensité très élevée
            6000, // Portée large pour éclairer tout le système
            0.5 // Decay naturel de la lumière
        );
        sunLight.position.set(0, 0, 0); // Position exacte du soleil
        
        // Activer les ombres
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        sunLight.shadow.camera.near = 1;
        sunLight.shadow.camera.far = 6000;
        
        this.scene.add(sunLight);
        
        // Stocker la référence pour pouvoir l'ajuster si nécessaire
        this.sunLight = sunLight;
    }
    
    update(deltaTime) {
        // Animer les planètes sur leurs orbites
        this.planets.forEach(planetGroup => {
            const userData = planetGroup.userData;
            userData.angle += userData.speed * deltaTime;
            
            planetGroup.position.x = Math.cos(userData.angle) * userData.orbitRadius;
            planetGroup.position.z = Math.sin(userData.angle) * userData.orbitRadius;
            
            // Rotation de la planète sur elle-même
            if (userData.planet) {
                userData.planet.rotation.y += userData.rotationSpeed * deltaTime;
            }
            
            // Rotation des anneaux (plus lente)
            planetGroup.children.forEach(child => {
                if (child.geometry && child.geometry.type === 'RingGeometry') {
                    child.rotation.z += 0.001 * deltaTime;
                }
                
                // Rotation des nuages (différente de la planète)
                if (child.userData && child.userData.rotationSpeed) {
                    child.rotation.y += child.userData.rotationSpeed * deltaTime;
                }
            });
        });
        
        // Rotation du soleil et de ses effets
        if (this.sun) {
            this.sun.rotation.y += 0.005 * deltaTime;
            
            // Animer les halos et particules du soleil
            this.sun.children.forEach(child => {
                if (child.userData.rotationSpeed) {
                    child.rotation.y += child.userData.rotationSpeed * deltaTime;
                    child.rotation.x += child.userData.rotationSpeed * 0.5 * deltaTime;
                }
            });
        }
        
        // Animation subtile du champ d'étoiles
        if (this.starField) {
            this.starField.rotation.y += 0.0001 * deltaTime;
        }
    }
    
    getPlanetByName(name) {
        return this.planets.find(planet => planet.name === name);
    }
    
    getNearestPlanet(position, maxDistance = 100) {
        let nearest = null;
        let minDistance = maxDistance;
        
        this.planets.forEach(planet => {
            const distance = position.distanceTo(planet.position);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = planet;
            }
        });
        
        return nearest ? { planet: nearest, distance: minDistance } : null;
    }
    
    getAllPlanets() {
        return this.planets;
    }
}

export default SolarSystem;
