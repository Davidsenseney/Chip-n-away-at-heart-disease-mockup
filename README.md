# Chip'n Away @ Heart Disease — Website

Static multi-page site (Vite + Tailwind v4) running **headless on Wix**: the pages are our own HTML/CSS/JS, and Wix provides the backend — CMS content, the volunteer form's email function, and **donations through Wix Donations + Wix checkout**.

## Run locally

From the `home/` folder:

```bash
npm install
cp .env.example .env    # then fill in the values (see below)
npm run dev             # http://localhost:5173
```

`npm run build` outputs the production site to `home/dist/`. `npm run preview` serves that build locally.

---

## To fill in

Search the code for `TODO(WIX)` and `TODO(CAMPAIGN)` to find every spot.

### 1. `.env` values (in `home/.env`)

| Variable | What it is | Where to get it | Owner |
|---|---|---|---|
| `VITE_WIX_CLIENT_ID` | Headless OAuth client ID | Wix dashboard → **Settings → Development & integrations → Headless Settings** → create/copy the OAuth client | _TBD_ |
| `VITE_WIX_SITE_URL` | Live site URL, no trailing slash | Currently defaults to `https://www.chipnaway.com` — confirm this is right | _TBD_ |
| `VITE_WIX_DONATION_CAMPAIGN_ID` | ID of the Wix Donations campaign | Wix dashboard → **Donations** → open the campaign. The ID is a GUID (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`), usually visible in the campaign page's URL. **Verify this is the campaign ID and not the page/app ID.** | _TBD_ |

### 2. Wix dashboard setup

- **Headless OAuth client** created (gives `VITE_WIX_CLIENT_ID`).
- **Allowed domains** on that client: `localhost` (for dev) **and** the domain the frontend is hosted on. Headless Settings → the client → Settings → *Allowed redirect domains*. Without this the redirect back from checkout fails.
-**Wix Donations** app installed and a **campaign** created. Decide whether it allows one-time, monthly, yearly (the modal offers all three; remove any the campaign doesn't allow from the `<select>` in `javaScript.js`).
- **Payments connected** — Wix dashboard → **Settings → Accept Payments**: connect **PayPal** (and optionally Wix Payments for cards). This is the nonprofit's account, so it's where the money lands.
- **CMS collection `home_editables`** exists with read permission for *Anyone*. Fields used: `heroTitle`, `heroDescription`, `bannerImage`, `aboutTitle`, `aboutBody`, `aboutImage`, `quoteText`, `quoteAuthor`, `quoteRole`, `updated`, `livesReached`, `carShows`, `screeningsGiven`, `yearsOfService`, `closingStatement`.
- **Backend function `sendEmail`** in the Wix site's `backend/http-functions.js`: needs `post_sendEmail` **and** `options_sendEmail`, both returning CORS headers (`Access-Control-Allow-Origin` set to our frontend's domain, `Access-Control-Allow-Methods: POST, OPTIONS`, `Access-Control-Allow-Headers: Content-Type`). Without the `options_` handler the browser blocks the request.
- home/dist/ when hosted needs to be added to allowed domains so redirects can come back to the website without getting blocked


## Project layout

```
home/
  *.html            pages (index, community, blog, wellness, volunteer, contact, coaches, ebook)
  javaScript.js     shared header/footer/donate-modal templates + page features
  wixClient.js      the one Wix SDK client
  donate.js         donation → Wix checkout hand-off
  wixheader.js      homepage CMS + volunteer form
  stlyesheet.css    hand-written component styles (filename typo is legacy — keep it)
  src/input.css     Tailwind v4 entry + brand theme (@theme)
  images/           all images
  .env.example      copy to .env
```

