/**
 * Shared Wix headless client
 * -----------------------------------------------------------
 * One client for the whole site. Every page that talks to Wix
 * (CMS content, forms, donations) imports from here instead of
 * creating its own client.
 *
 * All values come from .env (see .env.example). Vite only exposes
 * variables prefixed with VITE_.
 */
import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { checkout, currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';

const env = import.meta.env;

// TODO(WIX): Headless OAuth client ID — Wix dashboard > Settings > Headless Settings.
export const WIX_CLIENT_ID =
  env.VITE_WIX_CLIENT_ID ||
  env.VITE_CLIENT_ID; // legacy name, kept so older .env files still work

// TODO(WIX): Base URL of the live Wix site (used for /_functions/* backend calls).
export const WIX_SITE_URL = (env.VITE_WIX_SITE_URL || 'https://www.chipnaway.com').replace(/\/+$/, '');

export const isWixConfigured = Boolean(WIX_CLIENT_ID);

export let wixClient = null;

try {
  if (isWixConfigured) {
    wixClient = createClient({
      modules: { items, checkout, currentCart, redirects },
      auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
    });
  } else {
    console.warn('[Wix] VITE_WIX_CLIENT_ID is not set. Copy .env.example to .env and fill it in.');
  }
} catch (err) {
  console.error('[Wix] Failed to initialize client:', err);
  wixClient = null;
}

/** Build a URL for a Wix backend HTTP function, e.g. wixFunctionUrl('sendEmail'). */
export function wixFunctionUrl(name) {
  return `${WIX_SITE_URL}/_functions/${name}`;
}
