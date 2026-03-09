// GPA Assistant - Popup Script

document.addEventListener('DOMContentLoaded', () => {
  const pageInfoEl = document.getElementById('page-info');
  const btnScrape = document.getElementById('btn-scrape');
  const btnExport = document.getElementById('btn-export');
  const autoScrapeCheckbox = document.getElementById('auto-scrape');
  const notificationsCheckbox = document.getElementById('notifications');

  // Charger les paramètres
  chrome.storage.local.get(['settings'], (result) => {
    if (result.settings) {
      autoScrapeCheckbox.checked = result.settings.autoScrape || false;
      notificationsCheckbox.checked = result.settings.notifications !== false;
    }
  });

  // Obtenir les infos de la page actuelle
  const updatePageInfo = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'getPageInfo' }, (response) => {
          if (chrome.runtime.lastError) {
            pageInfoEl.innerHTML = `
              <div><strong>URL:</strong> ${tab.url}</div>
              <div style="color: #999; margin-top: 4px;">Extension non active sur cette page</div>
            `;
            return;
          }
          
          if (response) {
            const typeEmoji = {
              'twitter': '🐦',
              'facebook': '📘',
              'linkedin': '💼',
              'instagram': '📸',
              'google-maps': '🗺️',
              'google-business': '🏢',
              'other': '🌐'
            };
            
            pageInfoEl.innerHTML = `
              <div><strong>${typeEmoji[response.pageType] || '🌐'} Type:</strong> ${response.pageType}</div>
              <div style="margin-top: 4px; word-break: break-all;"><strong>URL:</strong> ${response.url}</div>
            `;
          }
        });
      }
    });
  };

  updatePageInfo();

  // Scraper la page
  btnScrape.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'scrape' }, (response) => {
          if (response && response.success) {
            // Sauvegarder les données
            chrome.storage.local.get(['scrapedData'], (result) => {
              const data = result.scrapedData || [];
              data.push({
                timestamp: new Date().toISOString(),
                ...response.data
              });
              chrome.storage.local.set({ scrapedData: data });
            });
            
            showFeedback(btnScrape, '✅ Données récupérées!', 'success');
            console.log('Données scrapées:', response.data);
          } else {
            showFeedback(btnScrape, '❌ Erreur', 'error');
          }
        });
      }
    });
  });

  // Exporter les données
  btnExport.addEventListener('click', () => {
    chrome.storage.local.get(['scrapedData'], (result) => {
      if (result.scrapedData && result.scrapedData.length > 0) {
        const dataStr = JSON.stringify(result.scrapedData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `gpa-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        showFeedback(btnExport, '✅ Exporté!', 'success');
      } else {
        showFeedback(btnExport, '⚠️ Aucune donnée', 'error');
      }
    });
  });

  // Boutons réseaux sociaux
  const socialButtons = {
    'btn-twitter': 'https://twitter.com',
    'btn-facebook': 'https://facebook.com',
    'btn-linkedin': 'https://linkedin.com',
    'btn-instagram': 'https://instagram.com'
  };

  Object.entries(socialButtons).forEach(([btnId, url]) => {
    document.getElementById(btnId)?.addEventListener('click', () => {
      chrome.tabs.create({ url });
    });
  });

  // Boutons Google
  document.getElementById('btn-gmaps')?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.google.com/maps' });
  });

  document.getElementById('btn-gbusiness')?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://business.google.com' });
  });

  // Paramètres
  autoScrapeCheckbox.addEventListener('change', () => {
    saveSettings();
  });

  notificationsCheckbox.addEventListener('change', () => {
    saveSettings();
  });

  const saveSettings = () => {
    chrome.storage.local.set({
      settings: {
        autoScrape: autoScrapeCheckbox.checked,
        notifications: notificationsCheckbox.checked
      }
    });
  };

  // Feedback visuel
  const showFeedback = (btn, message, type) => {
    const originalText = btn.innerHTML;
    btn.innerHTML = message;
    btn.classList.add(type);
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove(type);
    }, 2000);
  };
});
