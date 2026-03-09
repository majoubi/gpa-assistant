# GPA Assistant - Extension Chrome

Extension Chrome pour automatiser les tâches sur les réseaux sociaux, Google Business et Google Maps.

## 🚀 Fonctionnalités

| Fonction | Description |
|----------|-------------|
| **Scraping** | Récupérer des données sur n'importe quelle page web |
| **Réseaux sociaux** | Support Twitter/X, Facebook, LinkedIn, Instagram |
| **Google Business** | Interactions avec Google Business et Google Maps |
| **Export JSON** | Exporter les données collectées en fichier JSON local |
| **Stockage local** | Données sauvegardées localement dans Chrome |

## 📦 Installation (Mode développeur)

1. Ouvrir Chrome et aller sur `chrome://extensions/`
2. Activer le **Mode développeur** (en haut à droite)
3. Cliquer sur **Charger l'extension non empaquetée**
4. Sélectionner le dossier du projet

## 🛠️ Structure du projet

```
chrome-extension-gpa/
├── manifest.json      # Configuration de l'extension (Manifest V3)
├── background.js      # Service worker (tâches en arrière-plan)
├── content.js         # Script injecté sur toutes les pages
├── popup.html         # Interface popup de l'extension
├── popup.css          # Styles du popup
├── popup.js           # Logique du popup
├── icons/             # Icônes de l'extension (optionnel)
└── README.md          # Cette documentation
```

## 🔐 Sécurité & Permissions

### Permissions utilisées

| Permission | Usage | Risque |
|------------|-------|--------|
| `<all_urls>` | Accès à toutes les pages web pour scraping | Moyen - nécessaire pour le fonctionnement |
| `activeTab` | Accès à l'onglet actif | Faible |
| `tabs` | Gestion des onglets | Faible |
| `scripting` | Injection de scripts de scraping | Moyen - contrôlé |
| `storage` | Stockage local des données | Faible |
| `alarms` | Tâches planifiées | Faible |
| `notifications` | Notifications système | Faible |

### Points de sécurité importants

✅ **Aucune donnée envoyée à l'extérieur**
- L'extension ne fait aucun appel réseau vers des serveurs externes
- Toutes les données restent en local sur votre machine

✅ **Stockage 100% local**
- Les données sont stockées dans `chrome.storage.local`
- L'export génère un fichier JSON téléchargé localement

✅ **Code ouvert et vérifiable**
- Tout le code source est visible et modifiable
- Pas de code obfusqué ou caché

⚠️ **Ce que l'extension peut faire**
- Lire le contenu des pages web que vous visitez
- Stocker ces informations localement
- Interagir avec les éléments des pages (clics, formulaires)

❌ **Ce que l'extension NE peut PAS faire**
- Envoyer des données à des serveurs externes
- Accéder à vos fichiers système
- Modifier vos paramètres Chrome
- Exécuter des commandes système

## 📖 Utilisation

### Ouvrir l'extension
Cliquer sur l'icône de l'extension dans la barre Chrome.

### Scraper une page
1. Naviguer sur la page souhaitée
2. Cliquer sur l'icône de l'extension
3. Cliquer sur **"📊 Scraper la page"**
4. Les données sont automatiquement sauvegardées

### Exporter les données
1. Cliquer sur **"💾 Exporter les données"**
2. Un fichier JSON est téléchargé

### Raccourcis réseaux sociaux
Les boutons dans le popup ouvrent directement les sites dans un nouvel onglet.

## 🔄 Développement

### Modifier l'extension
1. Modifier les fichiers sources
2. Aller sur `chrome://extensions/`
3. Cliquer sur le bouton **refresh** 🔄 de l'extension

### Voir les logs
- Ouvrir `chrome://extensions/`
- Cliquer sur **"Service worker"** pour voir les logs du background
- Sur une page web, ouvrir la console (F12) pour voir les logs du content script

### Structure des données scrapées

```json
{
  "timestamp": "2026-03-09T21:00:00.000Z",
  "type": "twitter|facebook|linkedin|instagram|google-maps|google-business|other",
  "url": "https://...",
  "tweets": [...],
  "posts": [...],
  "places": [...],
  "businessInfo": {...}
}
```

## 📝 TODO / Améliorations futures

- [ ] Ajouter des icônes personnalisées
- [ ] Scraping avancé pour chaque réseau social
- [ ] Automatisation Google Business (réponses aux avis)
- [ ] Export CSV en plus de JSON
- [ ] Filtrage et recherche dans les données
- [ ] Scheduling (scraping automatique à heures fixes)
- [ ] Intégration API externe (optionnel)

## 📜 Licence

Projet personnel - Usage libre.

## 👤 Auteur

Majoubi - [GitHub](https://github.com/majoubi)
