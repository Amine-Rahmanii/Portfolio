# Portfolio Système Solaire - Exploration Spatiale 🚀

## 🌐 Accès Direct
**🚀 Explorez le portfolio en direct :** [https://amine-rahmanii.github.io/Portfolio/](https://amine-rahmanii.github.io/Portfolio/)

Une expérience portfolio interactive en 3D où vous explorez le système solaire à bord d'un vaisseau spatial. Chaque planète représente une section différente du portfolio.

## 🎮 Guide d'utilisation

### **Comment naviguer dans l'espace :**

#### 🖥️ **Sur ordinateur :**
- **Flèches directionnelles** : Déplacer le vaisseau spatial
  - `↑` : Avancer
  - `↓` : Reculer  
  - `←` : Aller à gauche
  - `→` : Aller à droite
- **Souris** : Regarder autour de vous (cliquez pour verrouiller la vue)
- **Espace** : Monter
- **C** : Descendre
- **Clic droit** : Mode boost (déplacement rapide)
- **Clic gauche** : Interagir avec les planètes
- **?** : Bouton d'aide (en haut à droite de l'écran)

#### 📱 **Sur mobile/tablette :**
- **Glisser** : Regarder autour de vous
- **Approche automatique** : Naviguez près des planètes pour déclencher l'interaction
- **Interface optimisée** : HUD adaptatif selon la taille d'écran

### **Interface du cockpit :**

#### 🎛️ **Panneau gauche :**
- **Vitesse** : Vitesse actuelle du vaisseau (U/s = Unités par seconde)
- **État moteur** : 
  - `IDLE` : Au repos (tremblement léger)
  - `NORMAL` : Déplacement standard
  - `BOOST` : Accélération maximale (effet visuel intense)
- **Position** : Coordonnées X, Y, Z dans l'espace

#### 🎯 **Panneau droit :**
- **Cible** : Planète la plus proche
- **Distance** : Distance jusqu'à la cible en kilomètres

#### ⭕ **Centre :**
- **Réticule** : Visée centrale
- **Prompt d'interaction** : Apparaît quand vous êtes près d'une planète

### **Exploration des planètes :**

Chaque planète contient des informations sur différents aspects du portfolio :

1. **🔥 Mercure** : À propos / Présentation
2. **🌅 Vénus** : Compétences techniques  
3. **🌍 Terre** : Projets principaux
4. **🔴 Mars** : Expérience professionnelle
5. **🌪️ Jupiter** : Formations et certifications
6. **💍 Saturne** : Contact et liens

## ✨ Fonctionnalités

- **Navigation 3D immersive** : Contrôlez votre vaisseau spatial avec WASD et la souris
- **Système solaire interactif** : 6 planètes représentant différentes sections du portfolio
- **Interface futuriste** : HUD de vaisseau spatial avec informations de navigation
- **Contenu riche** : Informations détaillées sur chaque planète/section
- **Responsive** : Compatible desktop et mobile
- **Performance optimisée** : WebGL avec Three.js

## 🌟 Sections du Portfolio

- **Mercure** - Présentation personnelle
- **Vénus** - Compétences techniques
- **Terre** - Projets réalisés
- **Mars** - Expériences professionnelles
- **Jupiter** - Formation et certifications
- **Saturne** - Contact et réseaux

## 🎮 Contrôles

| Touche/Action | Fonction |
|---------------|----------|
| `WASD` | Déplacement du vaisseau |
| `Souris` | Rotation de la vue |
| `Shift` | Accélération |
| `Espace` | Montée |
| `C` | Descente |
| `E` | Interaction avec les planètes |
| `Échap` | Fermer les modals |

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- Un navigateur moderne supportant WebGL

### Installation
```bash
# Cloner le projet
git clone [votre-repo]
cd portfolio-solar-system

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Alternative sans Node.js
Ouvrez simplement `index.html` dans votre navigateur (certains navigateurs peuvent bloquer les modules ES6 en local).

## 🛠️ Technologies Utilisées

- **Three.js** - Moteur 3D WebGL
- **JavaScript ES6+** - Logique de l'application
- **HTML5/CSS3** - Structure et style
- **WebGL** - Rendu 3D accéléré

## 📁 Structure du Projet

```
portfolio-solar-system/
├── index.html              # Point d'entrée
├── package.json            # Configuration npm
├── css/
│   └── style.css           # Styles principaux
├── js/
│   ├── main.js             # Point d'entrée JavaScript
│   ├── config.js           # Configuration du système
│   ├── SpaceshipControls.js # Contrôles du vaisseau
│   ├── SolarSystem.js      # Gestion du système solaire
│   └── InteractionManager.js # Gestion des interactions
└── README.md               # Documentation
```


**Bon voyage spatial ! 🚀✨**
