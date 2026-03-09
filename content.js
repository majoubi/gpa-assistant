// GPA Assistant - Content Script
// Ce script s'exécute sur toutes les pages web

(function() {
  'use strict';

  console.log('GPA Assistant chargé sur:', window.location.href);

  // Détecter le type de page
  const getPageType = () => {
    const url = window.location.href;
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('linkedin.com')) return 'linkedin';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('google.com/maps') || url.includes('google.fr/maps')) return 'google-maps';
    if (url.includes('business.google.com')) return 'google-business';
    return 'other';
  };

  // Scraper des données selon les sélecteurs
  const scrapeData = (selectors) => {
    const results = {};
    for (const [key, selector] of Object.entries(selectors)) {
      const elements = document.querySelectorAll(selector);
      results[key] = Array.from(elements).map(el => ({
        text: el.textContent?.trim(),
        href: el.href || null,
        html: el.outerHTML
      }));
    }
    return results;
  };

  // Scraper spécifique aux réseaux sociaux
  const scrapeSocialMedia = () => {
    const pageType = getPageType();
    let data = { type: pageType, url: window.location.href };

    switch (pageType) {
      case 'twitter':
        data.tweets = Array.from(document.querySelectorAll('article[data-testid="tweet"]')).map(tweet => ({
          text: tweet.textContent,
          author: tweet.querySelector('[data-testid="User-Name"]')?.textContent
        }));
        break;

      case 'facebook':
        data.posts = Array.from(document.querySelectorAll('[role="article"]')).map(post => ({
          text: post.textContent
        }));
        break;

      case 'google-maps':
        data.places = Array.from(document.querySelectorAll('[role="feed"] > div > div > a')).map(place => ({
          name: place.getAttribute('aria-label'),
          href: place.href
        }));
        break;

      case 'google-business':
        data.businessInfo = {
          name: document.querySelector('h1')?.textContent,
          address: document.querySelector('[data-item-id*="address"]')?.textContent,
          rating: document.querySelector('[role="img"][aria-label*="étoiles"]')?.getAttribute('aria-label')
        };
        break;
    }

    return data;
  };

  // Remplir un formulaire automatiquement
  const fillForm = (data) => {
    for (const [selector, value] of Object.entries(data)) {
      const el = document.querySelector(selector);
      if (el) {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  // Cliquer sur un élément
  const clickElement = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.click();
      return true;
    }
    return false;
  };

  // Écouter les messages du background ou popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
      case 'scrape':
        const data = request.selectors 
          ? scrapeData(request.selectors)
          : scrapeSocialMedia();
        sendResponse({ success: true, data });
        break;

      case 'fillForm':
        fillForm(request.data);
        sendResponse({ success: true });
        break;

      case 'click':
        const clicked = clickElement(request.selector);
        sendResponse({ success: clicked });
        break;

      case 'getPageInfo':
        sendResponse({
          url: window.location.href,
          title: document.title,
          pageType: getPageType()
        });
        break;

      default:
        sendResponse({ error: 'Action inconnue' });
    }
    return true;
  });

  // Injecter un indicateur visuel que l'extension est active
  const showNotification = (message) => {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 999999;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  };

})();
