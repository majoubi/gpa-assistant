// GPA Assistant - Background Service Worker

// Écouter les messages depuis le popup ou content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message reçu:', request);

  switch (request.action) {
    case 'scrapePage':
      // Demander au content script de scraper la page
      chrome.tabs.sendMessage(sender.tab?.id || request.tabId, {
        action: 'scrape',
        selectors: request.selectors
      }, sendResponse);
      return true; // Keep channel open for async response

    case 'getTabInfo':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse({ tab: tabs[0] });
      });
      return true;

    case 'executeScript':
      // Exécuter un script sur une page
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        func: request.func,
        args: request.args || []
      }, (results) => {
        sendResponse({ results });
      });
      return true;

    default:
      sendResponse({ error: 'Action inconnue' });
  }
});

// Écouter les changements de tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab mise à jour:', tab.url);
  }
});

// Au démarrage de l'extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('GPA Assistant installé!');
  
  // Initialiser le storage
  chrome.storage.local.set({
    settings: {
      autoScrape: false,
      notifications: true
    },
    scrapedData: []
  });
});
