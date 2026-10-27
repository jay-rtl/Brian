# Brian Palmieri — author website

React 19 / Vite / TypeScript / Tailwind 4 website with React Router, GSAP + ScrollTrigger, and an on-demand Three.js / React Three Fiber / Drei book viewer. Deployment is configured for `https://jay-rtl.github.io/Brian/` through `.github/workflows/deploy.yml`. See `DEPLOYMENT.md` for verification and remaining content/service setup.

The current visual direction is **light**: warm ivory paper, charcoal text, dark antique-gold accents, and pale blue Dreamwind surfaces. Theme tokens and component colors are maintained in `src/styles.css`; browser theme metadata and the favicon follow the light palette. Original cover artwork and event photographs retain their supplied colors.

## Run

```powershell
npm ci
npm run dev
```

Production build and preview:

```powershell
npm run build
npm run preview -- --port 4173
```

Browser tests use the installed Windows Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Adjust `playwright.config.ts` for another machine.

```powershell
npm run check
npm run test:e2e
npm audit
```

## Routes and source

- `/` — cinematic home, collection, Frankfurt feature, author introduction.
- `/about` — verified book-focused author introduction; biography/portrait explicitly awaiting approval.
- `/books` — two-book collection with optional 3D.
- `/books/the-observer` and `/books/dreamwind` — original covers, transcribed back-cover synopsis, themes, full cover preview, availability state.
- `/news` — category filters; verified showcase links to its dedicated editorial route. No fabricated articles or dates.
- `/contact` — labeled, validated inquiry form; sending disabled until configured.
- `/frankfurt-book-fair-2026` — event editorial, original display photographs, book presentations, keyboard/swipe lightbox.

`src/data.ts` contains verified titles, synopses, captions, metadata, and route definitions. `src/pages/` contains individual page compositions, loaded as separate client route bundles; `src/pages.tsx` exposes their synchronous counterparts for prerendering. `src/components/` contains book, gallery, form, and optional WebGL components. `src/styles.css` contains design tokens and responsive layouts. `src/App.tsx` owns navigation, route changes, metadata updates, and GSAP context cleanup. Page animation effects mount after lazy content resolves, preserving hydration and no-JavaScript HTML.

## Assets and binding geometry

Original supplied files are retained in `public/assets/*original*`. WebP copies preserve the entire event photographs. Cover fronts, spines, and backs were extracted directly from the supplied wraparound covers; the placeholder ISBN printed on The Observer is **not** entered into metadata. Award language printed on the Dreamwind cover is preserved within the original artwork but is not asserted in website copy or structured data.

The Observer: original 1023 × 654; back x=0–469; spine x=470–543; front x=544–1022. Dreamwind: original 983 × 655; back x=0–444; spine x=445–499; front x=500–982. `scripts/assets.mjs` reproduces image processing from the original Downloads paths on this machine. Do not use that script on a different machine without updating the source paths.

`src/components/BookScene.tsx` maps front, back, and spine to their corresponding faces. The page edges are ivory geometry. `DEPTH` is a configurable presentation setting; it does not represent verified page count or binding dimensions. The default CSS presentation works without WebGL; the heavier viewer loads only when requested. Reduced motion disables continuous parallax and GSAP choreography. Core content stays visible without JavaScript.

## Before launch

1. GitHub Pages uses `VITE_BASE_PATH=/Brian/` and `VITE_SITE_URL=https://jay-rtl.github.io/Brian`, supplied by the workflow. A future custom domain requires updating these values and the hosting configuration. The build generates canonical links, absolute social URLs, `sitemap.xml`, and the sitemap declaration in `robots.txt`. No fictitious domain or `noindex` directive is used. Local development defaults to `/` when no deployment base is set.
2. Confirm author-approved biography, portrait, official social accounts, purchase links, and sample chapters. Current intentional empty states prevent fabricated claims or dead purchase links. A dated personal timeline is withheld pending verified milestones; the about page offers a reading journey instead.
3. Configure an inquiry service and approve a privacy notice before enabling contact submission. Set `VITE_CONTACT_ENDPOINT` to a same-origin POST endpoint. Server must validate name/email/subject/message lengths and allowed subjects, reject the honeypot, rate-limit, apply origin/CSRF controls as appropriate, send through a server-side provider, and return JSON `{ "sent": true }` **only after delivery is confirmed**. Non-2xx or unconfirmed responses show an error. No endpoint or storage exists in this static project. Never place provider credentials in Vite variables.
4. Establish operating jurisdiction, data controller/contact, intended audience, delivery provider, access permissions, storage location, retention/deletion schedule, and applicable legal notices. These are unknown. No legal compliance claim is made. No analytics, cookies, optional tracking, or browser form storage are installed.
5. Configure hosting to serve clean paths from corresponding `.html` files or directory `index.html`, serve `404.html` with HTTP 404 for unknown paths, use HTTPS, and apply headers appropriate to the host. Do not rewrite every public request to the homepage before checking prerendered files. Vite preview supports the generated flat HTML files for clean-path QA.
6. Verify the deployed hostname, response status, canonical URLs, sitemap, social previews, submission service, and real-device/browser behavior. Development preview is not a hardened public server.

## Performance and verification boundaries

Fonts are self-hosted Latin subsets with `font-display: swap`; below-fold images are lazy-loaded and critical covers load eagerly. Event photographs are roughly 93–115 kB WebP; cover fronts roughly 123–128 kB. Three.js is isolated in an optional chunk (about 244 kB gzip), fetched only for the 3D action. A Vite chunk-size warning for this optional viewer is expected. No field Core Web Vitals or mobile-device frame rate has been measured. Full browser results and remaining limitations are recorded in `AUDIT.md`.
