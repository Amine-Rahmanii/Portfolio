# Portfolio Spatial - Configuration de déploiement

## Optimisations pour GitHub Pages

### Cache Headers (recommandé pour .htaccess si supporté)
```
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### Notes de déploiement
- Tous les chemins sont relatifs
- Three.js chargé via CDN
- Compatible avec l'hébergement statique
- Optimisé pour mobile et desktop
