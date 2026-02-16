// Solar system configuration
export const SOLAR_SYSTEM_CONFIG = {
    // Sun at the center
    sun: {
        name: "Sun",
        position: [0, 0, 0],
        radius: 50,
        color: 0xffaa00,
        emissive: 0xff6600,
        intensity: 1.5
    },
    
    // Planets with their portfolio sections
    planets: [
        {
            name: "Mercury",
            section: "About",
            position: [200, 0, 0],
            orbitRadius: 200,
            radius: 8,
            color: 0x8c7853,
            emissive: 0x2a1a0a,
            speed: 0.02,
            rotationSpeed: 0.05,
            texture: 'rocky',
            atmosphere: false,
            rings: false,
            content: {
                title: "About - Amine Rahmani",
                description: `
                    <h3>👋 Hi, I'm Amine Rahmani</h3>
                    <p>Digital native passionate about new technologies, design, engineering, and entrepreneurship.</p>

                    <h3>🌟 My Mission</h3>
                    <p>Turning creative ideas into innovative digital solutions, combining strategic vision and technical expertise to create outstanding user experiences.</p>

                    <h3>📞 Contact</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">📞 <strong>Phone:</strong> +33 7 82 75 43 54</li>
                        <li style="padding: 5px 0;">📧 <strong>Email:</strong> amine.rahmani21@neoma-bs.com</li>
                    </ul>

                    <h3>🌍 Languages</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">🌍 <strong>French:</strong> Native</li>
                        <li style="padding: 5px 0;">🌍 <strong>English:</strong> Advanced</li>
                        <li style="padding: 5px 0;">🌍 <strong>Spanish:</strong> Intermediate</li>
                    </ul>
                `
            }
        },
        {
            name: "Venus",
            section: "Education",
            position: [300, 0, 0],
            orbitRadius: 300,
            radius: 12,
            color: 0xffa500,
            emissive: 0x331a00,
            speed: 0.015,
            rotationSpeed: -0.02,
            texture: 'cloudy',
            atmosphere: true,
            atmosphereColor: 0xffaa00,
            rings: false,
            content: {
                title: "Education & Academic Background",
                description: `
                    <p style="margin-bottom: 20px; color: #cccccc; font-style: italic;">
                        My academic journey has given me a solid foundation in digital management and emerging technologies,
                        combining strategic vision and technical expertise to create innovative solutions.
                    </p>

                    <h3>🌟 Current Education</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff; margin: 0 0 10px 0;">NEOMA BUSINESS SCHOOL</h4>
                        <p style="margin: 5px 0;"><strong>Master TEMA</strong></p>
                        <p style="margin: 5px 0;">Digital Management, 4th year</p>
                        <p style="margin: 5px 0; color: #ffaa00;"><em>2021 - 2026</em></p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #aaaaaa;">
                            Specialized program in digital management and emerging technologies,
                            combining strategic vision and technological innovation for the businesses of tomorrow.
                        </p>
                    </div>

                    <h3>🌟 Previous Education</h3>
                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00; margin: 0 0 10px 0;">EFREI PARIS</h4>
                        <p style="margin: 5px 0;"><strong>Engineering Immersion Semester</strong></p>
                        <p style="margin: 5px 0;">Marketing & Data, 2nd year</p>
                        <p style="margin: 5px 0; color: #00aaff;"><em>2022</em></p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #aaaaaa;">
                            Renowned engineering school offering a solid technical education
                            with a specialization in digital marketing and data analysis.
                        </p>
                    </div>
                `
            }
        },
        {
            name: "Earth",
            section: "Projects",
            position: [400, 0, 0],
            orbitRadius: 400,
            radius: 15,
            color: 0x4a90e2,
            emissive: 0x001122,
            speed: 0.01,
            rotationSpeed: 0.03,
            texture: 'earth',
            atmosphere: true,
            atmosphereColor: 0x87ceeb,
            rings: false,
            continents: true,
            clouds: true,
                content: {
                title: "My Projects",
                description: `
                          <h3>🌟 AI Cost Prediction System</h3>
                          <p>Artificial intelligence system for engineering project cost prediction with 85%+ accuracy. Uses Random Forest and advanced machine learning algorithms to analyze 3,245 projects and identify the 15+ most influential factors in cost variation.</p>
                          <div style="margin: 10px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                                <a href="https://github.com/Amine-Rahmanii/ai-cost-prediction-system" target="_blank" 
                                    style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Code GitHub
                                </a>
                                <a href="https://github.com/Amine-Rahmanii/ai-cost-prediction-system/tree/main/notebooks" target="_blank" 
                                    style="background: linear-gradient(45deg, #f5f5f5, #e0e0e0); color: #333; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; border: 1px solid #bbb;">
                                    📓 Jupyter Notebooks
                                </a>
                          </div>

                          <h3>🌟 NVIDIA Sentiment Analysis</h3>
                          <p>Real-time sentiment analysis web application using AI and machine learning. Interactive Streamlit interface for analyzing opinions and emotions in text.</p>
                          <div style="margin: 10px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                                <a href="https://nvidia-sentiment-analysiss.streamlit.app/" target="_blank" 
                                    style="background: linear-gradient(45deg, #76b900, #007fff); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Streamlit Live
                                </a>
                                <a href="https://github.com/Amine-Rahmanii/nvidia-sentiment-analysis" target="_blank" 
                                    style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Code GitHub
                                </a>
                          </div>

                          <h3>🌟 Financial Instruments Classifier</h3>
                          <p>Machine learning application for automatic classification of financial instruments. Uses AI algorithms to analyze and categorize different types of financial assets with an intuitive Streamlit interface.</p>
                          <div style="margin: 10px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                                <a href="https://financialinstrumentsclassifier.streamlit.app/" target="_blank" 
                                    style="background: linear-gradient(45deg, #ff6b35, #f7931e); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Streamlit Live
                                </a>
                                <a href="https://github.com/Amine-Rahmanii/financial-instruments-classifier" target="_blank" 
                                    style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Code GitHub
                                </a>
                          </div>
                    
                          <h3>Customer 360 Dashboard</h3>
                          <p>Interactive dashboard exploring Brazilian e-commerce data (Olist) to track 360&deg; customer KPIs, logistics performance, and satisfaction.</p>
                          <div style="margin: 10px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                                <a href="https://amine-rahmanii-customer-360-dashboard-app-rtzbsx.streamlit.app/" target="_blank"
                                    style="background: linear-gradient(45deg, #76b900, #007fff); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Streamlit Live
                                </a>
                                <a href="https://github.com/Amine-Rahmanii/Customer-360-Dashboard" target="_blank"
                                    style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Code GitHub
                                </a>
                          </div>
                    
                          <h3>Customer Service Ticket Tracking</h3>
                          <p>Salesforce Service Cloud &amp; Jira integration to synchronize tickets, automate support workflows, and provide centralized reporting.</p>
                          <div style="margin: 10px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                                <a href="https://amine-rahmanii-suivi-des-tickets-service-client-int--app-z0e2us.streamlit.app/" target="_blank"
                                    style="background: linear-gradient(45deg, #76b900, #007fff); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Streamlit Live
                                </a>
                                <a href="https://github.com/Amine-Rahmanii/Suivi-des-tickets-Service-Client-Int-gration-Salesforce-Jira" target="_blank"
                                    style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                    🌐 Code GitHub
                                </a>
                          </div>
                    
                    <h3>🌟 Research & Development Projects</h3>
                    <div style="background: rgba(128,0,255,0.1); padding: 15px; border-left: 4px solid #8000ff; margin: 10px 0;">
                        <h4 style="color: #8000ff; margin: 0 0 10px 0;">Artificial Intelligence & Prediction</h4>
                        <ul style="margin: 10px 0; color: #cccccc;">
                            <li><strong>🌐 AI Cost Prediction:</strong> AI system with 85%+ accuracy using Random Forest on 3,245 engineering projects</li>
                            <li><strong>🌐 Predictive Analytics:</strong> Identification of 15+ influential factors in project cost variation</li>
                            <li><strong>🌐 Supervised Models:</strong> Implementation of Random Forest, Gradient Boosting for asset price prediction</li>
                            <li><strong>🌐 Feature Engineering:</strong> Creation of technical indicators and financial data transformation</li>
                            <li><strong>🌐 Performance Evaluation:</strong> MAE, RMSE, R² metrics to optimize results</li>
                        </ul>

                        <h4 style="color: #8000ff; margin: 15px 0 10px 0;">Technologies Used:</h4>
                        <p style="color: #cccccc; margin: 5px 0;">
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Python</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Pandas</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">NumPy</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Scikit-learn</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Plotly</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Streamlit</span>
                        </p>
                    </div>
                    
                    <h3>Interactive Space Portfolio</h3>
                    <p>Immersive 3D application using Three.js to explore a solar system portfolio. Spaceship navigation with a futuristic interface.</p>

                `
            }
        },
        {
            name: "Mars",
            section: "Experience",
            position: [550, 0, 0],
            orbitRadius: 550,
            radius: 13,
            color: 0xcd5c5c,
            emissive: 0x2a0a0a,
            speed: 0.008,
            rotationSpeed: 0.025,
            texture: 'rocky',
            atmosphere: true,
            atmosphereColor: 0x8b4513,
            rings: false,
            polarCaps: true,
            content: {
                title: "Professional Experience",
                description: `
                    <h3>🌟 Management Assistant</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff; margin: 0 0 10px 0;">RAMAFRUITS - Ris-Orangis</h4>
                        <p style="margin: 5px 0; color: #ffaa00;"><em>February 2025 - August 2025</em></p>

                        <h5 style="color: #00aaff;">Key responsibilities:</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Logistics management:</strong> Inventory and supplier order management</li>
                            <li><strong>Organizational support:</strong> Route and process optimization</li>
                            <li><strong>Business analysis:</strong> Sales tracking and customer relations</li>
                            <li><strong>Financial management:</strong> Cash flow monitoring and accounting reporting</li>
                            <li><strong>CSR strategy:</strong> Anti-waste initiatives and sustainable development</li>
                        </ul>
                    </div>

                    <h3>🌟 Executive Assistant</h3>
                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00; margin: 0 0 10px 0;">OMNYE STUDIO - Paris</h4>
                        <p style="margin: 5px 0; color: #00aaff;"><em>June 2023 - December 2023</em></p>

                        <h5 style="color: #ffaa00;">Responsibilities:</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Digital marketing:</strong> Campaign planning and coordination</li>
                            <li><strong>Partnerships:</strong> Strategic collaboration support</li>
                            <li><strong>Coordination:</strong> Resource management and development</li>
                            <li><strong>Competitive intelligence:</strong> Market analysis</li>
                        </ul>
                    </div>

                    <h3>🌟 Community Manager</h3>
                    <div style="background: rgba(0,255,170,0.1); padding: 15px; border-left: 4px solid #00ffaa; margin: 10px 0;">
                        <h4 style="color: #00ffaa; margin: 0 0 10px 0;">TeachR - Paris</h4>
                        <p style="margin: 5px 0; color: #00aaff;"><em>May 2022 - July 2022</em></p>

                        <h5 style="color: #00ffaa;">Achievements:</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Creative content:</strong> Facebook & Instagram editorial planning</li>
                            <li><strong>Visual production:</strong> Design of visuals and GIFs</li>
                            <li><strong>Influencer marketing:</strong> Co-creation of sponsored posts</li>
                            <li><strong>TikTok growth:</strong> Organic growth strategy</li>
                        </ul>
                    </div>
                `
            }
        },
        {
            name: "Jupiter",
            section: "Skills",
            position: [750, 0, 0],
            orbitRadius: 750,
            radius: 25,
            color: 0xffa500,
            emissive: 0x331a00,
            speed: 0.005,
            rotationSpeed: 0.08,
            texture: 'gas_giant',
            atmosphere: true,
            atmosphereColor: 0xd2691e,
            rings: false,
            bands: true,
            redSpot: true,
            content: {
                title: "Skills & Certifications",
                description: `
                    <h3>🛠️ Technical Skills</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff;">Adobe Suite</h4>
                        <p>Advanced proficiency in Adobe Suite (Photoshop, Illustrator, InDesign)</p>
                    </div>

                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00;">Python & SQL</h4>
                        <p>Programming, data manipulation, automation, SQL queries</p>
                    </div>

                    <div style="background: rgba(0,255,170,0.1); padding: 15px; border-left: 4px solid #00ffaa; margin: 10px 0;">
                        <h4 style="color: #00ffaa;">Microsoft Office</h4>
                        <p>Advanced Excel (pivot tables, Power Query), PowerPoint, Word</p>
                    </div>

                    <div style="background: rgba(170,0,255,0.1); padding: 15px; border-left: 4px solid #aa00ff; margin: 10px 0;">
                        <h4 style="color: #aa00ff;">Visual Studio Code</h4>
                        <p>Multi-language development and programming</p>
                    </div>

                    <div style="background: rgba(0,200,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff;">CRM</h4>
                        <p>Salesforce, Microsoft Dynamics 365, Zoho CRM, Pipedrive, Freshsales — customer relationship management, segmentation, reporting</p>
                    </div>

                    <div style="background: rgba(255,120,0,0.1); padding: 15px; border-left: 4px solid #ff7800; margin: 10px 0;">
                        <h4 style="color: #ff7800;">Applied Statistics</h4>
                        <p>Statistical tests, regression, sampling, exploratory analysis</p>
                    </div>

                    <div style="background: rgba(0,180,120,0.1); padding: 15px; border-left: 4px solid #00b478; margin: 10px 0;">
                        <h4 style="color: #00b478;">Collaboration Tools</h4>
                        <p>Notion, Trello, Slack, Microsoft Teams, Google Workspace, Confluence</p>
                    </div>

                    <div style="background: rgba(255,200,0,0.1); padding: 15px; border-left: 4px solid #ffc800; margin: 10px 0;">
                        <h4 style="color: #ffc800;">Agile Tools</h4>
                        <p>Jira, Azure DevOps, Monday.com — Scrum, Kanban, user stories</p>
                    </div>

                    <h3>📜 Certifications</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">✅ <strong>Supervised Machine Learning</strong> (DeepLearning.AI)</li>
                        <li style="padding: 5px 0;">✅ <strong>Introduction to Financial Markets</strong> (Yale University / Coursera)</li>
                        <li style="padding: 5px 0;">✅ <strong>Scikit-learn for Machine Learning</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Intro to Machine Learning</strong> (Kaggle)</li>
                        <li style="padding: 5px 0;">✅ <strong>Machine Learning Fundamentals</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Python for Data Science</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Agile Project Management Fundamentals</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>IELTS 6.5</strong> (British Council)</li>
                    </ul>

                    <h3>🚀 Advanced Skills</h3>
                    <div style="background: rgba(128,0,255,0.1); padding: 15px; border-left: 4px solid #8000ff; margin: 10px 0;">
                        <h4 style="color: #8000ff;">Machine Learning & AI</h4>
                        <p>scikit-learn, pandas, NumPy, predictive modeling, anomaly detection</p>
                    </div>

                    <div style="background: rgba(255,100,100,0.1); padding: 15px; border-left: 4px solid #ff6464; margin: 10px 0;">
                        <h4 style="color: #ff6464;">Quantitative Finance</h4>
                        <p>Financial market analysis, risk management, instrument classification</p>
                    </div>

                    <div style="background: rgba(0,200,200,0.1); padding: 15px; border-left: 4px solid #00c8c8; margin: 10px 0;">
                        <h4 style="color: #00c8c8;">Web Development</h4>
                        <p>JavaScript, Three.js, HTML/CSS, interactive 3D applications</p>
                    </div>

                    <div style="background: rgba(100,255,100,0.1); padding: 15px; border-left: 4px solid #64ff64; margin: 10px 0;">
                        <h4 style="color: #64ff64;">Data Visualization</h4>
                        <p>Streamlit, interactive dashboards, exploratory analysis</p>
                    </div>

                    <h3>🤝 Soft Skills</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">• Clear and educational communication</li>
                        <li style="padding: 5px 0;">• Analytical and rigorous mindset</li>
                        <li style="padding: 5px 0;">• Adaptability</li>
                        <li style="padding: 5px 0;">• Initiative and autonomy</li>
                        <li style="padding: 5px 0;">• Team spirit</li>
                        <li style="padding: 5px 0;">• Project management</li>
                    </ul>
                `
            }
        },
        {
            name: "Saturn",
            section: "Contact",
            position: [950, 0, 0],
            orbitRadius: 950,
            radius: 22,
            color: 0xffd700,
            emissive: 0x332200,
            speed: 0.003,
            rotationSpeed: 0.06,
            texture: 'gas_giant',
            atmosphere: true,
            atmosphereColor: 0xffec8c,
            rings: true,
            ringColor: 0xdddddd,
            ringInnerRadius: 30,
            ringOuterRadius: 50,
            bands: true,
            content: {
                title: "Contact Me",
                description: `
                    <h3>Contact Information</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Phone:</strong> +33 7 82 75 43 54</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Email:</strong> amine.rahmani21@neoma-bs.com</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Location:</strong> France</p>
                    </div>

                    <h3>🌐 Professional Links</h3>
                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <div style="margin: 10px 0;">
                            <a href="https://amine-rahmanii.github.io/Portfolio/" target="_blank" 
                               style="background: linear-gradient(45deg, #00aaff, #0088cc); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 5px 5px 0; font-weight: bold;">
                               🌐 Portfolio 3D
                            </a>
                            <a href="https://github.com/Amine-Rahmanii" target="_blank" 
                               style="background: linear-gradient(45deg, #333, #555); color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px 5px 5px 0; font-weight: bold;">
                               🌐 GitHub
                            </a>
                        </div>
                    </div>

                    <h3>🌐 Availability</h3>
                    <div style="background: rgba(0,255,100,0.1); padding: 15px; border-left: 4px solid #00ff64; margin: 10px 0;">
                        <p style="color: #00ff64; font-weight: bold; margin: 5px 0;">
                            🌐 Looking for a 6-month internship starting January 2026
                        </p>
                    </div>
                          
                `
            }
        }
    ]
};

// Controls configuration
export const CONTROLS_CONFIG = {
    movement: {
        speed: 2.0,
        acceleration: 1.5,
        deceleration: 0.95,
        maxSpeed: 10.0
    },
    rotation: {
        sensitivity: 0.002,
        smoothing: 0.1
    },
    interaction: {
        maxDistance: 100,
        activationKey: 'KeyE'
    },
    cameraShake: {
        idle: {
            intensity: 0.002,
            frequency: 2.0,
            description: "Minimal spaceship vibrations at rest"
        },
        normal: {
            intensity: 0.008,
            frequency: 5.0,
            description: "Moderate vibrations during navigation"
        },
        boost: {
            intensity: 0.025,
            frequency: 12.0,
            description: "Intense vibrations in boost mode"
        }
    }
};

// Environment configuration
export const ENVIRONMENT_CONFIG = {
    starField: {
        count: 5000,
        spread: 2000,
        size: 1.0
    },
    lighting: {
        ambient: {
            color: 0x111122,
            intensity: 0.3
        },
        sun: {
            color: 0xffffff,
            intensity: 1.0,
            castShadow: true
        }
    },
    fog: {
        color: 0x000011,
        near: 500,
        far: 1500
    }
};
