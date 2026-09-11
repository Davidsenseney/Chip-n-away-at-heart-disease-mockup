import { redirects } from '@wix/redirects';
export const LOCALSTORAGE_PREWARM_REDIRECT_KEY = 'wixRedirectSessionLastPreWarm';
export function isVisitorCookieWarmedUp() {
    // Check if we already pre-warmed recently
    const lastPreWarmTimeString = localStorage.getItem(LOCALSTORAGE_PREWARM_REDIRECT_KEY);
    const currentTime = Date.now();
    // If we have a stored timestamp, check if it's been less than a week
    if (lastPreWarmTimeString) {
        const lastPreWarmTime = parseInt(lastPreWarmTimeString, 10);
        const oneWeekMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        if (currentTime - lastPreWarmTime < oneWeekMs) {
            return true; // Was pre-warmed within the last week
        }
    }
    return false; // We need to pre-warm
}
// Function to check if we need to pre-warm
export async function preWarmVisitorCookie(opts = {}) {
    // Check if we already pre-warmed recently
    if (!opts.force && isVisitorCookieWarmedUp()) {
        return;
    }
    // If we get here, we need to pre-warm
    localStorage.removeItem(LOCALSTORAGE_PREWARM_REDIRECT_KEY);
    try {
        await preWarmRedirectSessionWithIframe();
        // Store the current timestamp
        localStorage.setItem(LOCALSTORAGE_PREWARM_REDIRECT_KEY, Date.now().toString());
    }
    catch (ex) {
        console.error('Error during redirect session pre-warm:', ex);
    }
}
async function preWarmRedirectSessionWithIframe() {
    const resultWithCreateCookie = await redirects.createRedirectSession({
        login: {},
    });
    const urlToRedirect = resultWithCreateCookie.redirectSession?.fullUrl;
    if (!urlToRedirect) {
        throw new Error('No redirect URL found');
    }
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = urlToRedirect;
    const promise = new Promise((resolve) => (iframe.onload = resolve));
    document.body.appendChild(iframe);
    return promise;
}
