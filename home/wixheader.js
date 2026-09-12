import { createClient, OAuthStrategy, media } from '@wix/sdk';
import { items } from '@wix/data';

// Vite only exposes vars prefixed with VITE_
const clientId =
  import.meta.env.VITE_WIX_CLIENT_ID ||
  import.meta.env.VITE_CLIENT_ID ||
  import.meta.env.CLIENT_ID;

let wixClient = null;
try {
  if (clientId) {
    wixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({ clientId })
    });
  } else {
    console.warn('Wix client ID missing. Add VITE_WIX_CLIENT_ID to your .env file.');
  }
} catch (err) {
  console.error('Failed to initialize Wix client:', err);
}

/**
 * Convert any common Wix CMS image field shape into a public https URL.
 */
function resolveWixImage(value) {
  if (!value) return '';

  if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
    return value;
  }

  if (typeof value === 'object') {
    if (typeof value.url === 'string' && /^https?:\/\//i.test(value.url)) {
      return value.url;
    }
    return resolveWixImage(value.src || value.id || value.fileUrl || value.uri || '');
  }

  if (typeof value !== 'string') return '';

  if (value.startsWith('wix:image://v1/')) {
    const withoutProtocol = value.replace('wix:image://v1/', '');
    const fileId = withoutProtocol.split('/')[0].split('#')[0];
    if (fileId) return `https://static.wixstatic.com/media/${fileId}`;
  }

  if (value.startsWith('image://v1/')) {
    const fileId = value.replace('image://v1/', '').split('/')[0].split('#')[0];
    if (fileId) return `https://static.wixstatic.com/media/${fileId}`;
  }

  try {
    const result = media.getImageUrl(value);
    if (result?.url) return result.url;
  } catch {
    // ignore
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
  if (!wixClient) return;

  try {
    const response = await wixClient.items.query('home_editables').find();

    if (response.items.length === 0) {
      console.warn('Wix CMS: no items found in home_editables');
      return;
    }

    const data = response.items[0];

    if (data.heroTitle) {
      const el = document.getElementById('hero-title');
      if (el) el.textContent = data.heroTitle;
    }

    if (data.heroDescription) {
      const descEl = document.getElementById('hero-description');
      if (descEl) descEl.textContent = data.heroDescription;
    }

    const bannerValue = data.bannerImage || data.banner_image || data.banner;
    if (bannerValue) {
      const ok = setBackgroundImage('banner-image', bannerValue);
      if (!ok) console.warn('Wix CMS: could not resolve banner image', bannerValue);
    }

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

    if (data.closingStatement) {
      const el = document.getElementById('closing-statement');
      if (el) el.innerHTML = data.closingStatement;
    }
  } catch (error) {
    console.error('Error fetching Wix CMS data:', error);
  }
}

function setVolunteerFormStatus(message, isError = false) {
  const statusEl = document.getElementById('volunteer-form-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.toggle('text-apple-red', isError);
  statusEl.classList.toggle('text-apple-dark', !isError);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitBtn = form.querySelector('[type="submit"]');

  const firstname = document.getElementById('firstname')?.value?.trim() || '';
  const lastname = document.getElementById('lastname')?.value?.trim() || '';
  const email = document.getElementById('email')?.value?.trim() || '';
  const phonenumber = document.getElementById('phonenumber')?.value?.trim() || '';

  if (!firstname || !lastname || !email) {
    setVolunteerFormStatus('Please fill in first name, last name, and email.', true);
    return;
  }

  const formData = { firstname, lastname, email, phonenumber };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.value = 'Sending...';
    if (submitBtn.tagName === 'BUTTON') submitBtn.textContent = 'Sending...';
  }
  setVolunteerFormStatus('Sending your volunteer request...');

  try {
    const response = await fetch('https://www.chipnaway.com/_functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (response.ok && (result?.success !== false)) {
      setVolunteerFormStatus('Thanks! Your volunteer request was sent.');
      form.reset();
    } else {
      const errorMsg = result?.error || `Request failed (${response.status}). Please try again.`;
      setVolunteerFormStatus(errorMsg, true);
      console.error('Volunteer form error:', result || response.statusText);
    }
  } catch (err) {
    console.error('Network or fetch error:', err);
    setVolunteerFormStatus(
      'Could not reach the server. If you are on localhost, the Wix function may be blocking CORS.',
      true
    );
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.value = 'Submit';
      if (submitBtn.tagName === 'BUTTON') submitBtn.textContent = 'Submit';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Homepage CMS (no-op on pages without those elements)
  loadHomepageData();

  // Volunteer form — always bind when present
  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleFormSubmit);
    console.log('Volunteer form submit handler attached');
  }
});
