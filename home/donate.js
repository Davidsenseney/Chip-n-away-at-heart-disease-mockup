/**
 * Donations — Wix Donations campaign + Wix-hosted checkout
 * -----------------------------------------------------------
 * The site never touches card numbers. We:
 *   1. Create a Wix eCommerce checkout containing one line item that
 *      points at the Wix Donations campaign (amount + frequency).
 *   2. Ask Wix for a redirect session to its hosted checkout page.
 *   3. Send the donor there. Wix shows whatever payment methods the
 *      nonprofit has connected (PayPal, card, etc.) and deposits the
 *      money wherever the Wix account is set to pay out.
 *   4. Wix sends the donor back to this site when they finish.
 *
 * Changing where the money goes = changing the payment/payout settings
 * in the Wix dashboard. No code change needed.
 *
 * Loaded on demand from javaScript.js (dynamic import) so pages
 * don't download the Wix SDK until someone clicks Donate.
 */
import { wixClient, isWixConfigured } from './wixClient.js';

// Fixed ID of the Wix Donations app (same for every Wix site).
// Source: Wix docs, "eCommerce Integration with Donation Campaigns".
const WIX_DONATIONS_APP_ID = '333b456e-dd48-4d6b-b32b-9fd48d74e163';

// TODO(CAMPAIGN): ID of the nonprofit's Wix Donations campaign.
const CAMPAIGN_ID = import.meta.env.VITE_WIX_DONATION_CAMPAIGN_ID || '';

export const DONATION_FREQUENCIES = ['ONE_TIME', 'WEEK', 'MONTH', 'YEAR'];

/** True when every value needed to take a real donation is present. */
export function isDonationConfigured() {
  return Boolean(isWixConfigured && wixClient && CAMPAIGN_ID);
}

/** Human-readable list of what's missing, for the modal + console. */
export function missingDonationConfig() {
  const missing = [];
  if (!isWixConfigured) missing.push('VITE_WIX_CLIENT_ID');
  if (!CAMPAIGN_ID) missing.push('VITE_WIX_DONATION_CAMPAIGN_ID');
  return missing;
}

function buildLineItem(amount, frequency) {
  const options = { amount };
  // One-time donations omit frequency; recurring use WEEK / MONTH / YEAR.
  if (frequency && frequency !== 'ONE_TIME') options.frequency = frequency;

  return {
    quantity: 1,
    catalogReference: {
      catalogItemId: CAMPAIGN_ID,
      appId: WIX_DONATIONS_APP_ID,
      options,
    },
  };
}

async function createDonationCheckout(lineItem) {
  // Preferred: a fresh checkout with only this donation in it.
  try {
    const result = await wixClient.checkout.createCheckout({
      lineItems: [lineItem],
      channelType: 'WEB',
    });
    if (result?._id) return result._id;
  } catch (err) {
    console.warn('[Donate] createCheckout failed, falling back to visitor cart:', err);
  }

  // Fallback: the visitor-cart flow from Wix's headless eCommerce tutorial.
  await wixClient.currentCart.addToCurrentCart({ lineItems: [lineItem] });
  const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({
    channelType: 'WEB',
  });
  return checkoutId;
}

/**
 * Start a donation. On success the browser navigates away to Wix checkout,
 * so this only returns if something went wrong.
 *
 * @param {{ amount: number, frequency?: string }} params
 */
export async function startDonation({ amount, frequency = 'ONE_TIME' }) {
  if (!isDonationConfigured()) {
    const missing = missingDonationConfig();
    console.warn('[Donate] Not configured. Missing:', missing.join(', '));
    throw new Error('Online donations are not set up yet. Please check back soon.');
  }

  const cleanAmount = Math.round(Number(amount) * 100) / 100;
  if (!(cleanAmount > 0)) throw new Error('Enter a donation amount greater than zero.');

  const checkoutId = await createDonationCheckout(buildLineItem(cleanAmount, frequency));
  if (!checkoutId) throw new Error('Could not start checkout. Please try again.');

  // Where Wix sends the donor afterwards.
  const back = new URL(window.location.href);
  back.searchParams.delete('donation');
  back.searchParams.delete('orderId');
  const thanks = new URL(back);
  thanks.searchParams.set('donation', 'thanks'); // Wix appends &orderId=...

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      postFlowUrl: back.toString(),
      thankYouPageUrl: thanks.toString(),
    },
  });

  if (!redirectSession?.fullUrl) throw new Error('Could not reach checkout. Please try again.');
  window.location.href = redirectSession.fullUrl;
}
