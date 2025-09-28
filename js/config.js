// Configuration du systÃƒÂ¨me solaire
export const SOLAR_SYSTEM_CONFIG = {
    // Soleil au centre
    sun: {
        name: "Soleil",
        position: [0, 0, 0],
        radius: 50,
        color: 0xffaa00,
        emissive: 0xff6600,
        intensity: 1.5
    },
    
    // PlanÃƒÂ¨tes avec leurs sections portfolio
    planets: [
        {
            name: "Mercure",
            section: "PrÃƒÂ©sentation",
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
                title: "Présentation - Amine Rahmani",
                description: `
                    <h3>👋 Bonjour, je suis Amine Rahmani</h3>
                    <p>Digital native passionné par les nouvelles technologies, le design, l'ingénierie et l'entrepreneuriat.</p>
                    
                    <h3>🌟 Ma Mission</h3>
                    <p>Transformer des idées créatives en solutions digitales innovantes, en combinant vision stratégique et expertise technique pour créer des expériences utilisateur exceptionnelles.</p>

                    <h3>📞 Contact</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">📞 <strong>Téléphone :</strong> +33 7 82 75 43 54</li>
                        <li style="padding: 5px 0;">📧 <strong>Email :</strong> amine.rahmani21@neoma-bs.com</li>
                    </ul>

                    <h3>🌍 Langues</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">🌍 <strong>Français :</strong> Natif</li>
                        <li style="padding: 5px 0;">🌍 <strong>Anglais :</strong> Avancé</li>
                        <li style="padding: 5px 0;">🌍 <strong>Espagnol :</strong> Intermédiaire</li>
                    </ul>
                `
            }
        },
        {
            name: "Vénus",
            section: "Formation",
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
                title: "Formation & Parcours Académique",
                description: `
                    <p style="margin-bottom: 20px; color: #cccccc; font-style: italic;">
                        Mon parcours académique m'a permis d'acquérir une solide base en management digital et en technologies émergentes, 
                        alliant vision stratégique et expertise technique pour créer des solutions innovantes.
                    </p>

                    <h3>🌟 Formation Actuelle</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff; margin: 0 0 10px 0;">NEOMA BUSINESS SCHOOL</h4>
                        <p style="margin: 5px 0;"><strong>Master TEMA</strong></p>
                        <p style="margin: 5px 0;">Digital Management, 4ème année</p>
                        <p style="margin: 5px 0; color: #ffaa00;"><em>2021 - 2026</em></p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #aaaaaa;">
                            Formation spécialisée en management digital et technologies émergentes, 
                            combinant vision stratégique et innovation technologique pour les entreprises de demain.
                        </p>
                    </div>

                    <h3>🌟 Formation Précédente</h3>
                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00; margin: 0 0 10px 0;">EFREI PARIS</h4>
                        <p style="margin: 5px 0;"><strong>Semestre d'immersion Ingénierie</strong></p>
                        <p style="margin: 5px 0;">Marketing & Data, 2ème année</p>
                        <p style="margin: 5px 0; color: #00aaff;"><em>2022</em></p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #aaaaaa;">
                            École d'ingénierie renommée offrant une formation technique solide 
                            avec une spécialisation en marketing digital et analyse de données.
                        </p>
                    </div>
                `
            }
        },
        {
            name: "Terre",
            section: "Projets",
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
                title: "Mes Projets",
                description: `
                          <h3>🌟 AI Cost Prediction System</h3>
                          <p>Système d'intelligence artificielle pour la prédiction des coûts de projets d'ingénierie avec une précision de 85%+. Utilise Random Forest et des algorithmes de machine learning avancés pour analyser 3,245 projets et identifier les 15+ facteurs les plus influents dans la variation des coûts.</p>
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

                          <h3>🌟 Analyse de Sentiment NVIDIA</h3>
                          <p>Application web d'analyse de sentiment en temps réel utilisant l'IA et le machine learning. Interface Streamlit interactive pour analyser les opinions et émotions dans les textes.</p>
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

                          <h3>🌟 Classificateur d'Instruments Financiers</h3>
                          <p>Application de machine learning pour la classification automatique d'instruments financiers. Utilise des algorithmes d'IA pour analyser et catégoriser différents types d'actifs financiers avec une interface Streamlit intuitive.</p>
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
                          <p>Dashboard interactif explorant les donn&eacute;es e-commerce br&eacute;siliennes (Olist) pour suivre les KPI client 360&deg;, performances logistiques et satisfaction.</p>
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
                    
                          <h3>Suivi des Tickets Service Client</h3>
                          <p>Intégration Salesforce Service Cloud &amp; Jira pour synchroniser les tickets, automatiser les workflows support et fournir un reporting centralisé.</p>
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
                    
                    <h3>🌟 Projets de Recherche & Développement</h3>
                    <div style="background: rgba(128,0,255,0.1); padding: 15px; border-left: 4px solid #8000ff; margin: 10px 0;">
                        <h4 style="color: #8000ff; margin: 0 0 10px 0;">Intelligence Artificielle & Prédiction</h4>
                        <ul style="margin: 10px 0; color: #cccccc;">
                            <li><strong>🌐 Prédiction des Coûts par IA :</strong> Système IA avec 85%+ de précision utilisant Random Forest sur 3,245 projets d'ingénierie</li>
                            <li><strong>🌐 Analyse Prédictive :</strong> Identification de 15+ facteurs influents dans la variation des coûts de projets</li>
                            <li><strong>🌐 Modèles Supervisés :</strong> Implémentation de Random Forest, Gradient Boosting pour la prédiction de prix d'actifs</li>
                            <li><strong>🌐 Feature Engineering :</strong> Création d'indicateurs techniques et transformation de données financières</li>
                            <li><strong>🌐 Évaluation de Performance :</strong> Métriques MAE, RMSE, R² pour optimiser les résultats</li>
                        </ul>

                        <h4 style="color: #8000ff; margin: 15px 0 10px 0;">Technologies Utilisées :</h4>
                        <p style="color: #cccccc; margin: 5px 0;">
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Python</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Pandas</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">NumPy</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Scikit-learn</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Plotly</span>
                            <span style="background: rgba(128,0,255,0.2); padding: 3px 8px; border-radius: 3px; margin: 2px;">Streamlit</span>
                        </p>
                    </div>
                    
                    <h3>Portfolio Spatial Interactif</h3>
                    <p>Application 3D immersive utilisant Three.js pour explorer un système solaire portfolio. Navigation en vaisseau spatial avec interface futuriste.</p>

                `
            }
        },
        {
            name: "Mars",
            section: "Expériences",
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
                title: "Expériences Professionnelles",
                description: `
                    <h3>🌟 Assistant Gestion</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff; margin: 0 0 10px 0;">RAMAFRUITS - Ris-Orangis</h4>
                        <p style="margin: 5px 0; color: #ffaa00;"><em>Février 2025 - Août 2025</em></p>
                        
                        <h5 style="color: #00aaff;">Missions principales :</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Pilotage logistique :</strong> Gestion des stocks et commandes fournisseurs</li>
                            <li><strong>Appui organisationnel :</strong> Optimisation des tournées et processus</li>
                            <li><strong>Analyse commerciale :</strong> Suivi des ventes et relation client</li>
                            <li><strong>Gestion financière :</strong> Suivi trésorerie et reporting expert-comptable</li>
                            <li><strong>Stratégie RSE :</strong> Initiatives anti-gaspillage et développement durable</li>
                        </ul>
                    </div>
                    
                    <h3>🌟 Executive Assistant</h3>
                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00; margin: 0 0 10px 0;">OMNYE STUDIO - Paris</h4>
                        <p style="margin: 5px 0; color: #00aaff;"><em>Juin 2023 - Décembre 2023</em></p>
                        
                        <h5 style="color: #ffaa00;">Missions :</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Marketing digital :</strong> Planification et coordination des campagnes</li>
                            <li><strong>Partenariats :</strong> Support aux collaborations stratégiques</li>
                            <li><strong>Coordination :</strong> Gestion des ressources et développement</li>
                            <li><strong>Veille concurrentielle :</strong> Analyse du marché</li>
                        </ul>
                    </div>
                    
                    <h3>🌟 Community Manager</h3>
                    <div style="background: rgba(0,255,170,0.1); padding: 15px; border-left: 4px solid #00ffaa; margin: 10px 0;">
                        <h4 style="color: #00ffaa; margin: 0 0 10px 0;">TeachR - Paris</h4>
                        <p style="margin: 5px 0; color: #00aaff;"><em>Mai 2022 - Juillet 2022</em></p>

                        <h5 style="color: #00ffaa;">Réalisations :</h5>
                        <ul style="margin: 10px 0;">
                            <li><strong>Contenu créatif :</strong> Planning éditorial Facebook & Instagram</li>
                            <li><strong>Production visuelle :</strong> Création de visuels et GIFs</li>
                            <li><strong>Influence :</strong> Co-création de publications sponsorisées</li>
                            <li><strong>Développement TikTok :</strong> Stratégie de croissance organique</li>
                        </ul>
                    </div>
                `
            }
        },
        {
            name: "Jupiter",
            section: "Compétences",
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
                title: "Compétences & Certifications",
                description: `
                    <h3>🛠️ Compétences Techniques</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff;">Pack Adobe</h4>
                        <p>Maîtrise avancée de la suite Adobe (Photoshop, Illustrator, InDesign)</p>
                    </div>

                    <div style="background: rgba(255,170,0,0.1); padding: 15px; border-left: 4px solid #ffaa00; margin: 10px 0;">
                        <h4 style="color: #ffaa00;">Python et SQL</h4>
                        <p>Programmation, manipulation de données, automatisation, requêtes SQL</p>
                    </div>

                    <div style="background: rgba(0,255,170,0.1); padding: 15px; border-left: 4px solid #00ffaa; margin: 10px 0;">
                        <h4 style="color: #00ffaa;">Pack Office</h4>
                        <p>Excel avancé (tableaux croisés, Power Query), PowerPoint, Word</p>
                    </div>

                    <div style="background: rgba(170,0,255,0.1); padding: 15px; border-left: 4px solid #aa00ff; margin: 10px 0;">
                        <h4 style="color: #aa00ff;">Visual Studio Code</h4>
                        <p>Développement et programmation multi-langages</p>
                    </div>

                    <div style="background: rgba(0,200,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <h4 style="color: #00aaff;">CRM</h4>
                        <p>Salesforce, Microsoft Dynamics 365, Zoho CRM, Pipedrive, Freshsales — gestion de la relation client, segmentation, reporting</p>
                    </div>

                    <div style="background: rgba(255,120,0,0.1); padding: 15px; border-left: 4px solid #ff7800; margin: 10px 0;">
                        <h4 style="color: #ff7800;">Statistiques appliquées</h4>
                        <p>Tests statistiques, régression, échantillonnage, analyse exploratoire</p>
                    </div>

                    <div style="background: rgba(0,180,120,0.1); padding: 15px; border-left: 4px solid #00b478; margin: 10px 0;">
                        <h4 style="color: #00b478;">Outils collaboratifs</h4>
                        <p>Notion, Trello, Slack, Microsoft Teams, Google Workspace, Confluence</p>
                    </div>

                    <div style="background: rgba(255,200,0,0.1); padding: 15px; border-left: 4px solid #ffc800; margin: 10px 0;">
                        <h4 style="color: #ffc800;">Outils Agile</h4>
                        <p>Jira, Azure DevOps, Monday.com — Scrum, Kanban, user stories</p>
                    </div>

                    <h3>📜 Certifications</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">✅ <strong>Supervised Machine Learning</strong> (DeepLearning.AI)</li>
                        <li style="padding: 5px 0;">✅ <strong>Introduction to Financial Markets</strong> (Yale University / Coursera)</li>
                        <li style="padding: 5px 0;">✅ <strong>Scikit-learn pour le machine learning</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Intro to Machine Learning</strong> (Kaggle)</li>
                        <li style="padding: 5px 0;">✅ <strong>Les fondements du machine learning</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Python pour la data science</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>Les fondements de la gestion de projet agile</strong> (LinkedIn)</li>
                        <li style="padding: 5px 0;">✅ <strong>IELTS 6.5</strong> (British Council)</li>
                    </ul>

                    <h3>🚀 Compétences Avancées</h3>
                    <div style="background: rgba(128,0,255,0.1); padding: 15px; border-left: 4px solid #8000ff; margin: 10px 0;">
                        <h4 style="color: #8000ff;">Machine Learning & IA</h4>
                        <p>scikit-learn, pandas, NumPy, modélisation prédictive, détection d'anomalies</p>
                    </div>

                    <div style="background: rgba(255,100,100,0.1); padding: 15px; border-left: 4px solid #ff6464; margin: 10px 0;">
                        <h4 style="color: #ff6464;">Finance Quantitative</h4>
                        <p>Analyse de marchés financiers, gestion des risques, classification d'instruments</p>
                    </div>

                    <div style="background: rgba(0,200,200,0.1); padding: 15px; border-left: 4px solid #00c8c8; margin: 10px 0;">
                        <h4 style="color: #00c8c8;">Développement Web</h4>
                        <p>JavaScript, Three.js, HTML/CSS, applications interactives 3D</p>
                    </div>

                    <div style="background: rgba(100,255,100,0.1); padding: 15px; border-left: 4px solid #64ff64; margin: 10px 0;">
                        <h4 style="color: #64ff64;">Data Visualization</h4>
                        <p>Streamlit, tableaux de bord interactifs, analyse exploratoire</p>
                    </div>

                    <h3>🤝 Soft Skills</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 5px 0;">• Communication claire et pédagogique</li>
                        <li style="padding: 5px 0;">• Esprit analytique et rigoureux</li>
                        <li style="padding: 5px 0;">• Adaptabilité</li>
                        <li style="padding: 5px 0;">• Initiative et autonomie</li>
                        <li style="padding: 5px 0;">• Esprit d'équipe</li>
                        <li style="padding: 5px 0;">• Gestion de projet</li>
                    </ul>
                `
            }
        },
        {
            name: "Saturne",
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
                title: "Contactez-moi",
                description: `
                    <h3>Informations de Contact</h3>
                    <div style="background: rgba(0,170,255,0.1); padding: 15px; border-left: 4px solid #00aaff; margin: 10px 0;">
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Téléphone :</strong> +33 7 82 75 43 54</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong>Email :</strong> amine.rahmani21@neoma-bs.com</p>
                        <p style="margin: 8px 0; font-size: 14px;"><strong> Localisation :</strong> France</p>
                    </div>

                    <h3>🌐 Liens Professionnels</h3>
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

                    <h3>🌐 Disponibilité</h3>
                    <div style="background: rgba(0,255,100,0.1); padding: 15px; border-left: 4px solid #00ff64; margin: 10px 0;">
                        <p style="color: #00ff64; font-weight: bold; margin: 5px 0;">
                            🌐 Recherche d'un stage de 6 mois à partir de janvier 2026
                        </p>
                    </div>
                          
                `
            }
        }
    ]
};

// Configuration des contrÃƒÂ´les
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
            description: "Vibrations minimales du vaisseau au repos"
        },
        normal: {
            intensity: 0.008,
            frequency: 5.0,
            description: "Vibrations modÃƒÂ©rÃƒÂ©es pendant la navigation"
        },
        boost: {
            intensity: 0.025,
            frequency: 12.0,
            description: "Vibrations intenses en mode accÃƒÂ©lÃƒÂ©ration"
        }
    }
};

// Configuration de l'environnement
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
