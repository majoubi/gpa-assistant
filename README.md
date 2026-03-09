# GPA Assistant - Extension Chrome

Extension Chrome pour automatiser les tâches sur les réseaux sociaux, Google Business et Google Maps.

## 🚀 Fonctionnalités

- **Scraping** : Récupérer des données sur n'importe quelle page web
- **Réseaux sociaux** : Support Twitter/X, Facebook, LinkedIn, Instagram
- **Google Business** : Interactions avec Google Business et Google Maps
- **Export** : Exporter les données collectées en JSON
- **Auto-scrape** : Option pour scraper automatiquement les pages visitées

## 📦 Installation (Mode développeur)

1. Ouvrir Chrome et aller sur `chrome://extensions/`
2. Activer le "Mode développeur" en haut à droite
3. Cliquer sur "Charger l'extension non empaquetée"
4. Sélectionner le dossier `chrome-extension-gpa`

## 🛠️ Structure du projet

```
chrome-extension-gpa/
├── manifest.json      # Configuration de l'extension
├── background.js      # Service worker (background tasks)
├── content.js         # Script injecté sur toutes les pages
├── popup.html         # Interface popup de l'extension
├── popup.css          # Styles du popup
├── popup.js           # Logique du popup
└── icons/             # Icônes de l'extension
```

## 🔧 Permissions utilisées

- `activeTab` : Accès à l'onglet actif
- `tabs` : Gestion des onglets
- `scripting` : Injection de scripts
- `storage` : Sauvegarde des données
- `host_permissions: <all_urls>` : Accès à toutes les pages web

## 📖 Utilisation

1. Cliquer sur l'icône de l'extension dans la barre Chrome
2. Le popup affiche le type de page actuelle
3. Utiliser "Scraper la page" pour collecter des données
4. Utiliser "Exporter les données" pour télécharger un fichier JSON

## 🔄 Développement

Pour modifier l'extension :
1. Modifier les fichiers
2. Aller sur `chrome://extensions/`
3. Cliquer sur le bouton refresh de l'extension

## 📝 TODO

- [ ] Ajouter des icônes personnalisées
- [ ] Scraping avancé pour chaque réseau social
- [ ] Automatisation Google Business
- [ ] Export CSV en plus de JSON
- [ ] Filtrage et recherche dans les données
