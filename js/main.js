import * as THREE from 'three';
import SpaceshipControls from './SpaceshipControls.js';
import SolarSystem from './SolarSystem.js';
import InteractionManager from './InteractionManager.js';
import { ENVIRONMENT_CONFIG } from './config.js';

// Global error handling
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled error:', event.reason);
    const loadingText = document.getElementById('loading-text');
    if (loadingText) {
        loadingText.innerHTML = `
            <div style="color: #ff6666;">
                ❌ Loading error: ${event.reason?.message || 'Unknown error'}
                <br><button onclick="location.reload()" style="margin-top: 10px; padding: 5px 15px; background: #00ffff; color: #000; border: none; border-radius: 3px; cursor: pointer;">Reload</button>
            </div>
        `;
    }
    event.preventDefault();
});

class SpacePortfolio {
    constructor() {
        // Mobile detection
        this.isMobile = this.detectMobile();

        // Loading timeout
        this.loadingTimeout = setTimeout(() => {
            this.showError('Loading is taking too long. Please check your internet connection.');
        }, 30000); // 30 seconds

        // DOM elements
        this.container = document.body;
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingProgress = document.getElementById('loading-progress');
        this.loadingText = document.getElementById('loading-text');
        
        // Three.js
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        
        // Game components
        this.controls = null;
        this.solarSystem = null;
        this.interactionManager = null;
        
        // State
        this.isLoaded = false;
        this.loadingProgressValue = 0;
        
        this.init();
    }
    
    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // iOS-specific detection
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        
        // Android detection
        const isAndroid = /android/i.test(userAgent);
        
        // General mobile detection
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        // Detection by screen size and touch support
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        return isIOS || isAndroid || isMobileUA || (hasTouch && isSmallScreen);
    }
    
    setupMobileInterface() {
        if (this.isMobile) {
            // Show mobile controls
            const mobileControls = document.querySelector('.mobile-controls');
            const desktopControls = document.getElementById('controls-info');
            
            if (mobileControls) {
                mobileControls.style.display = 'block';
            }
            if (desktopControls) {
                desktopControls.style.display = 'none';
            }
            
            // Adjust render quality for mobile
            if (this.renderer) {
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                
                // Reduce resolution on mobile for better performance
                const canvas = this.renderer.domElement;
                const rect = canvas.getBoundingClientRect();
                this.renderer.setSize(rect.width * 0.8, rect.height * 0.8, false);
            }
            
            // Disable expensive visual effects on mobile
            if (this.solarSystem && this.solarSystem.stars) {
                this.solarSystem.stars.visible = false;
            }
            
            // Adjust controls for touch
            if (this.controls) {
                this.controls.mouseSensitivity *= 0.7; // Reduce touch sensitivity
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
            // Check WebGL support
            if (!this.checkWebGLSupport()) {
                this.showError("WebGL is not supported on this device. Please use a compatible browser.");
                return;
            }

            this.showLoading("Initializing 3D engine...");
            await this.initThreeJS();

            this.showLoading("Creating solar system...");
            await this.initSolarSystem();

            this.showLoading("Configuring controls...");
            await this.initControls();

            this.showLoading("Preparing interface...");
            await this.initInteractions();

            this.showLoading("Finalizing...");
            await this.finishLoading();
            
            this.startRenderLoop();
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Error loading the portfolio');
        }
    }
    
    async initThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );
        this.camera.position.set(0, 50, 100);
        
        // Renderer with iOS optimizations
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: !this.isMobile, // Disable antialiasing on mobile
            alpha: false, // No transparency for better performance
            powerPreference: this.isMobile ? "low-power" : "high-performance",
            failIfMajorPerformanceCaveat: false // Allow WebGL even with reduced performance
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // pixelRatio configuration for iOS
        if (this.isMobile) {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } else {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        // Disable shadows on mobile for better performance
        this.renderer.shadowMap.enabled = !this.isMobile;
        if (!this.isMobile) {
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
        
        // Background color and fog
        const fogConfig = ENVIRONMENT_CONFIG.fog;
        this.scene.background = new THREE.Color(fogConfig.color);
        this.scene.fog = new THREE.Fog(fogConfig.color, fogConfig.near, fogConfig.far);
        
        this.container.appendChild(this.renderer.domElement);
        
        // Resize handling
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
        // Clear timeout
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
        }
        
        await this.delay(500);
        this.setupMobileInterface();
        this.hideLoading();
        this.isLoaded = true;
        
        // Show welcome message after a short delay
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 2000);
    }
    
    showWelcomeMessage() {
        // Show welcome message on every load
        // Temporarily disable controls
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
            <h2 style="margin-bottom: 20px; color: #00aaff;">🚀 Welcome, Explorer!</h2>
            <p style="margin-bottom: 15px; line-height: 1.5;">
                You are now at the controls of a spaceship.
                Use the <strong>arrow keys</strong> to move, <strong>right click</strong> to boost, and get closer to the planets!
            </p>
            <p style="margin-bottom: 20px; line-height: 1.5; color: #ffaa00;">
                🌍 <strong>Explore the planets to discover my portfolio!</strong>
            </p>
            <p style="margin-bottom: 20px; font-size: 14px; color: #ffaa00;">
                💡 Click the <strong>?</strong> button in the top right for help
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
                🎮 Start Exploration
            </button>
        `;
        
        // Add overlay to prevent clicks outside
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
        
        // Handle button click
        document.getElementById('start-exploration').addEventListener('click', () => {
            welcomeDiv.remove();
            overlay.remove();
            
            // Re-enable controls and force pointer lock
            if (this.controls) {
                this.controls.enableControls();
                // Wait a bit then force pointer lock
                setTimeout(() => {
                    this.controls.forcePointerLock();
                }, 100);
            }
        });
        
        // Add CSS animation
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
            
            // Update components
            this.controls.update(deltaTime);
            this.solarSystem.update(deltaTime);
            this.interactionManager.update();
            
            // Render
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
                        <p>Possible solutions:</p>
                        <ul style="list-style: none; padding: 0; margin: 10px 0;">
                            <li>• Check your internet connection</li>
                            <li>• Use a modern browser</li>
                            <li>• Enable JavaScript</li>
                            <li>• Reload the page</li>
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
                            🔄 Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Hide progress bar on error
        if (this.loadingProgress) {
            this.loadingProgress.style.background = '#ff0000';
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Public methods for external interaction
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

// Auto-initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fix for progress bar access
    const loadingProgressBar = document.getElementById('loading-progress');
    
    window.spacePortfolio = new SpacePortfolio();
    
    // Expose public methods
    window.navigateToPlanet = (planetName) => {
        window.spacePortfolio.navigateToPlanet(planetName);
    };
    
    window.openPlanetInfo = (planetName) => {
        window.spacePortfolio.openPlanetInfo(planetName);
    };
    
    // Debug messages
    console.log('🚀 Space Portfolio initialized');
    console.log('Controls: WASD to move, Mouse to look, Shift to boost, E to interact');
});

export default SpacePortfolio;
