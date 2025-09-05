import * as THREE from 'three';

export class TextureManager {
    constructor() {
        this.textures = {};
        this.loader = new THREE.TextureLoader();
    }

    // Créer une texture procédurale pour Mercure
    createMercuryTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Base grise
        ctx.fillStyle = '#8c7853';
        ctx.fillRect(0, 0, 512, 256);

        // Cratères
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 256;
            const size = 5 + Math.random() * 30;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, '#5a4a3a');
            gradient.addColorStop(0.7, '#7a6a5a');
            gradient.addColorStop(1, '#8c7853');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture procédurale pour Vénus
    createVenusTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Base orange/jaune
        const gradient = ctx.createLinearGradient(0, 0, 0, 256);
        gradient.addColorStop(0, '#ffcc66');
        gradient.addColorStop(0.5, '#ff9933');
        gradient.addColorStop(1, '#cc6600');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 256);

        // Motifs nuageux
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 256;
            const width = 50 + Math.random() * 100;
            const height = 20 + Math.random() * 40;
            
            ctx.fillStyle = `rgba(255, 200, 100, ${0.3 + Math.random() * 0.4})`;
            ctx.fillRect(x, y, width, height);
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture détaillée pour la Terre
    createEarthTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Océans - bleu plus vif
        ctx.fillStyle = '#006994';
        ctx.fillRect(0, 0, 1024, 512);

        // Continents - vert plus visible
        ctx.fillStyle = '#2d5016';
        
        // Amérique du Nord - plus grande et détaillée
        ctx.beginPath();
        ctx.moveTo(80, 120);
        ctx.lineTo(200, 100);
        ctx.lineTo(220, 140);
        ctx.lineTo(250, 160);
        ctx.lineTo(200, 200);
        ctx.lineTo(150, 220);
        ctx.lineTo(100, 200);
        ctx.lineTo(80, 160);
        ctx.closePath();
        ctx.fill();

        // Amérique du Sud
        ctx.beginPath();
        ctx.moveTo(150, 230);
        ctx.lineTo(180, 250);
        ctx.lineTo(170, 350);
        ctx.lineTo(140, 380);
        ctx.lineTo(120, 340);
        ctx.lineTo(130, 280);
        ctx.closePath();
        ctx.fill();

        // Groenland
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(200, 80, 40, 30);
        
        // Europe - plus détaillée
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(450, 120, 80, 60);
        ctx.fillRect(480, 100, 30, 20); // Scandinavie
        
        // Afrique - forme plus reconnaissable
        ctx.beginPath();
        ctx.moveTo(450, 180);
        ctx.lineTo(520, 180);
        ctx.lineTo(540, 220);
        ctx.lineTo(530, 300);
        ctx.lineTo(480, 350);
        ctx.lineTo(440, 320);
        ctx.lineTo(430, 240);
        ctx.closePath();
        ctx.fill();

        // Asie - plus grande
        ctx.fillRect(550, 100, 250, 120);
        ctx.fillRect(600, 220, 150, 80);
        
        // Inde
        ctx.beginPath();
        ctx.moveTo(620, 220);
        ctx.lineTo(650, 220);
        ctx.lineTo(660, 260);
        ctx.lineTo(640, 280);
        ctx.lineTo(620, 270);
        ctx.closePath();
        ctx.fill();

        // Australie
        ctx.fillRect(750, 320, 100, 50);

        // Antarctique
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 450, 1024, 62);

        // Ajouter des îles et détails
        ctx.fillStyle = '#2d5016';
        // Îles britanniques
        ctx.fillRect(430, 130, 15, 20);
        // Japon
        ctx.fillRect(800, 160, 12, 40);
        // Madagascar
        ctx.fillRect(560, 300, 8, 25);
        // Nouvelle-Zélande
        ctx.fillRect(900, 380, 6, 20);

        // Ajouter de la végétation (forêts)
        ctx.fillStyle = '#1a3309';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            ctx.fillRect(x, y, 3, 3);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        return texture;
    }

    // Créer une texture pour Mars
    createMarsTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Base rouge
        ctx.fillStyle = '#cd5c5c';
        ctx.fillRect(0, 0, 512, 256);

        // Calottes polaires
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 512, 30);
        ctx.fillRect(0, 226, 512, 30);

        // Vallées et cratères
        ctx.strokeStyle = '#8b0000';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 512, Math.random() * 256);
            ctx.lineTo(Math.random() * 512, Math.random() * 256);
            ctx.stroke();
        }

        // Cratères
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 256;
            const size = 3 + Math.random() * 15;
            
            ctx.fillStyle = '#8b0000';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Variation de couleur
        for (let y = 0; y < 256; y++) {
            const alpha = 0.1 + 0.2 * Math.sin(y * 0.02);
            ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
            ctx.fillRect(0, y, 512, 1);
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture pour Jupiter
    createJupiterTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Bandes colorées
        const bandColors = [
            '#ffcc99', '#ff9966', '#cc6633',
            '#ffaa77', '#dd8855', '#bb6644'
        ];

        const bandHeight = 256 / bandColors.length;
        
        bandColors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, index * bandHeight, 512, bandHeight);
            
            // Ajouter des turbulences
            for (let x = 0; x < 512; x += 2) {
                const turbulence = 10 * Math.sin(x * 0.02) * Math.sin(index * 2);
                ctx.fillStyle = color;
                ctx.fillRect(x, index * bandHeight + turbulence, 2, bandHeight);
            }
        });

        // Grande Tache Rouge
        const spotX = 350;
        const spotY = 120;
        const spotWidth = 80;
        const spotHeight = 40;
        
        const gradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotWidth/2);
        gradient.addColorStop(0, '#8b0000');
        gradient.addColorStop(0.7, '#cd5c5c');
        gradient.addColorStop(1, '#ff6347');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(spotX, spotY, spotWidth/2, spotHeight/2, 0, 0, Math.PI * 2);
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture pour Saturne
    createSaturnTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Bandes plus subtiles que Jupiter
        const bandColors = [
            '#ffe4b5', '#ffd700', '#daa520',
            '#ffebcd', '#f0e68c', '#daa520'
        ];

        const bandHeight = 256 / bandColors.length;
        
        bandColors.forEach((color, index) => {
            ctx.fillStyle = color;
            ctx.fillRect(0, index * bandHeight, 512, bandHeight);
            
            // Turbulences plus douces
            for (let x = 0; x < 512; x += 4) {
                const turbulence = 5 * Math.sin(x * 0.01) * Math.sin(index * 1.5);
                ctx.fillStyle = color;
                ctx.fillRect(x, index * bandHeight + turbulence, 4, bandHeight);
            }
        });

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture de nuages pour la Terre
    createCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Fond transparent
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.fillRect(0, 0, 1024, 512);

        // Systèmes nuageux plus réalistes
        // Nuages équatoriaux
        for (let x = 0; x < 1024; x += 20) {
            const y = 256 + Math.sin(x * 0.01) * 30;
            const size = 40 + Math.random() * 60;
            const opacity = 0.4 + Math.random() * 0.4;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Nuages tempérés
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 1024;
            const y = 100 + Math.random() * 120; // Zone tempérée nord
            const size = 30 + Math.random() * 80;
            const opacity = 0.3 + Math.random() * 0.5;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Nuages tempérés sud
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * 1024;
            const y = 300 + Math.random() * 120;
            const size = 25 + Math.random() * 70;
            const opacity = 0.3 + Math.random() * 0.4;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cyclones/ouragans
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * 1024;
            const y = 150 + Math.random() * 200;
            const size = 40 + Math.random() * 30;
            
            // Spirale de nuages
            for (let angle = 0; angle < Math.PI * 4; angle += 0.3) {
                const spiralX = x + Math.cos(angle) * (angle * 3);
                const spiralY = y + Math.sin(angle) * (angle * 3);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(spiralX, spiralY, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        return texture;
    }

    // Créer une texture d'anneaux pour Saturne
    createRingTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const centerX = 128;
        const centerY = 128;

        // Créer des anneaux concentriques
        for (let r = 60; r < 120; r += 2) {
            const opacity = 0.3 + 0.5 * Math.sin(r * 0.1);
            const brightness = 200 + 55 * Math.sin(r * 0.05);
            
            ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une normal map pour ajouter du relief
    createNormalMap(type = 'rocky') {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Base neutre
        ctx.fillStyle = '#8080ff';
        ctx.fillRect(0, 0, 256, 128);

        if (type === 'rocky') {
            // Ajouter du relief rocheux
            for (let i = 0; i < 1000; i++) {
                const x = Math.random() * 256;
                const y = Math.random() * 128;
                const intensity = Math.random();
                
                ctx.fillStyle = `rgb(${Math.floor(128 + intensity * 127)}, ${Math.floor(128 + intensity * 127)}, 255)`;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Créer une texture de relief pour la Terre
    createEarthBumpMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Base (niveau de la mer)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 512, 256);

        // Montagnes et reliefs (blanc = élevé, noir = bas)
        ctx.fillStyle = '#ffffff';
        
        // Chaînes de montagnes principales
        // Rocheuses
        ctx.fillRect(80, 120, 15, 80);
        // Andes
        ctx.fillRect(130, 240, 10, 120);
        // Alpes
        ctx.fillRect(430, 140, 20, 15);
        // Himalayas
        ctx.fillRect(580, 150, 60, 20);
        
        // Relief moyen
        ctx.fillStyle = '#888888';
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 256;
            ctx.fillRect(x, y, 3, 3);
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Obtenir toutes les textures
    getAllTextures() {
        return {
            mercury: this.createMercuryTexture(),
            venus: this.createVenusTexture(),
            earth: this.createEarthTexture(),
            mars: this.createMarsTexture(),
            jupiter: this.createJupiterTexture(),
            saturn: this.createSaturnTexture(),
            clouds: this.createCloudTexture(),
            rings: this.createRingTexture(),
            normalRocky: this.createNormalMap('rocky'),
            earthBump: this.createEarthBumpMap()
        };
    }
}
