# Politique de Sécurité - GPA Assistant

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité de sécurité, merci de la signaler en ouvrant une **Issue** sur ce repository.

## Versions supportées

| Version | Supportée |
| ------- | --------- |
| 1.0.x   | ✅ Oui     |

## Sécurité de l'extension

### Données traitées

Cette extension Chrome traite les données suivantes:

1. **Contenu des pages web visitées**
   - Utilisé uniquement pour le scraping
   - Jamais envoyé à des serveurs externes

2. **Données de stockage local**
   - Stockées dans `chrome.storage.local`
   - Accessibles uniquement par l'extension
   - Supprimées lors de la désinstallation de l'extension

3. **Fichiers exportés**
   - Générés localement lors de l'export
   - Aucune transmission réseau

### Mesures de sécurité

- **Pas de serveur backend**: L'extension fonctionne 100% en local
- **Pas de tracking**: Aucun analytics ni télémétrie
- **Code source ouvert**: Vérifiable et auditable
- **Manifest V3**: Utilise les standards de sécurité actuels de Chrome

### Permissions expliquées

| Permission | Pourquoi elle est nécessaire |
|------------|------------------------------|
| `<all_urls>` | Permet au content script de s'exécuter sur n'importe quelle page pour le scraping |
| `scripting` | Permet d'injecter dynamiquement du code pour des opérations de scraping avancées |
| `storage` | Permet de sauvegarder les données scrapées localement |
| `tabs` | Permet de lire l'URL et le titre des onglets |
| `activeTab` | Permet d'interagir avec l'onglet actif |
| `alarms` | Permet de planifier des tâches (fonctionnalité future) |
| `notifications` | Permet d'afficher des notifications système |

### Bonnes pratiques recommandées

1. **Vérifiez le code** avant d'installer l'extension
2. **Désinstallez** l'extension si vous ne l'utilisez plus
3. **Exportez et supprimez** régulièrement vos données scrapées
4. **Ne scrappez pas** de données sensibles (mots de passe, infos bancaires)

## Limitations connues

- L'extension peut ne pas fonctionner sur certaines pages protégées (pages Chrome internes, stores, etc.)
- Les sélecteurs CSS pour le scraping peuvent changer si les sites mettent à jour leur interface
- Le scraping intensif peut être bloqué par certains sites

---

Dernière mise à jour: Mars 2026
