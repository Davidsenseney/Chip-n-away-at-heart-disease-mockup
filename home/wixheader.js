import { createClient, OAuthStrategy, media } from '@wix/sdk';
import { items } from '@wix/data';

const clientId = import.meta.env.VITE_WIX_CLIENT_ID;
// Initialize the Wix Client
const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: clientId
  })
});

/**
 * Convert any common Wix CMS image field shape into a public https URL.
 * Handles: https strings, wix:image:// strings, and image objects.
 */
function resolveWixImage(value) {
  if (!value) return '';

  // Already a usable web URL
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
    return value;
  }

  // Object forms returned by some CMS / media responses
  if (typeof value === 'object') {
    if (typeof value.url === 'string' && /^https?:\/\//i.test(value.url)) {
      return value.url;
    }
    // Prefer nested media identifiers
    return resolveWixImage(value.src || value.id || value.fileUrl || value.uri || '');
  }

  if (typeof value !== 'string') return '';

  // Manual parse for wix:image://v1/<fileId>/<filename>#...
  if (value.startsWith('wix:image://v1/')) {
    const withoutProtocol = value.replace('wix:image://v1/', '');
    const fileId = withoutProtocol.split('/')[0].split('#')[0];
    if (fileId) {
      return `https://static.wixstatic.com/media/${fileId}`;
    }
  }

  // Legacy image:// prefix
  if (value.startsWith('image://v1/')) {
    const fileId = value.replace('image://v1/', '').split('/')[0].split('#')[0];
    if (fileId) {
      return `https://static.wixstatic.com/media/${fileId}`;
    }
  }

  // Official SDK helper as a final fallback
  try {
    const result = media.getImageUrl(value);
    if (result?.url) return result.url;
  } catch {
    // ignore and fall through
  }

  return '';
}

function setBackgroundImage(elementId, imageValue) {
  const el = document.getElementById(elementId);
  const url = resolveWixImage(imageValue);
  if (!el || !url) return false;
  el.style.backgroundImage = `url("${url}")`;
  el.style.backgroundSize = 'cover';
  el.style.backgroundPosition = 'center';
  el.style.backgroundRepeat = 'no-repeat';
  return true;
}

function setImageSrc(elementId, imageValue) {
  const el = document.getElementById(elementId);
  const url = resolveWixImage(imageValue);
  if (!el || !url) return false;
  el.src = url;
  return true;
}

async function loadHomepageData() {
  try {
    const response = await wixClient.items.query('home_editables').find();

    if (response.items.length === 0) {
      console.warn('Wix CMS: no items found in home_editables');
      return;
    }

    const data = response.items[0];

    // Debug: inspect image fields in DevTools Console after refresh (do not paste these by hand)
    console.log('Wix CMS item keys:', Object.keys(data));
    console.log('Wix CMS aboutImage raw:', data.aboutImage);
    console.log('Wix CMS bannerImage raw:', data.bannerImage);

    // --- HERO SECTION ---
    if (data.heroTitle) {
      const el = document.getElementById('hero-title');
      if (el) el.textContent = data.heroTitle;
    }

    if (data.heroDescription) {
      const descEl = document.getElementById('hero-description');
      if (descEl) descEl.textContent = data.heroDescription;
    }

    // Support a few common field-key variants from the CMS
    const bannerValue = data.bannerImage || data.banner_image || data.banner;
    if (bannerValue) {
      const ok = setBackgroundImage('banner-image', bannerValue);
      if (!ok) console.warn('Wix CMS: could not resolve banner image', bannerValue);
    }

    // --- ABOUT SECTION ---
    if (data.aboutTitle) {
      const el = document.getElementById('about_title');
      if (el) el.textContent = data.aboutTitle;
    }
    if (data.aboutBody) {
      const el = document.getElementById('about-body');
      if (el) el.innerHTML = data.aboutBody;
    }

    const aboutValue = data.aboutImage || data.about_image || data.aboutImg;
    if (aboutValue) {
      const ok = setImageSrc('about-image', aboutValue);
      if (!ok) console.warn('Wix CMS: could not resolve about image', aboutValue);
    }

    // --- QUOTE ---
    if (data.quoteText) {
      const el = document.getElementById('quote-text');
      if (el) el.textContent = data.quoteText;
    }
    if (data.quoteAuthor) {
      const el = document.getElementById('quote-author');
      if (el) el.textContent = data.quoteAuthor;
    }
    if (data.quoteRole) {
      const el = document.getElementById('quote-role');
      if (el) el.textContent = data.quoteRole;
    }

    // --- IMPACT DASHBOARD ---
    if (data.updated) {
      const el = document.getElementById('updated');
      if (el) el.textContent = `Updated ${data.updated}`;
    }
    if (data.livesReached != null) {
      const el = document.getElementById('lives-reached');
      if (el) el.textContent = data.livesReached;
    }
    if (data.carShows != null) {
      const el = document.getElementById('car-shows');
      if (el) el.textContent = data.carShows;
    }
    if (data.screeningsGiven != null) {
      const el = document.getElementById('screenings-given');
      if (el) el.textContent = data.screeningsGiven;
    }
    if (data.yearsOfService != null) {
      const el = document.getElementById('years-of-service');
      if (el) el.textContent = data.yearsOfService;
    }

    // --- CLOSING STATEMENT ---
    if (data.closingStatement) {
      const el = document.getElementById('closing-statement');
      if (el) el.innerHTML = data.closingStatement;
    }
  } catch (error) {
    console.error('Error fetching Wix CMS data:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadHomepageData);
