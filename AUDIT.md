# Delivery audit — Brian Palmieri

Review date: October 27, 2026. Delivery is local source and production output in `C:/Users/it/Desktop/websites/Brian`. No production deployment, DNS change, or push was performed.

## 1. Implemented

- Eight public routes: Home, About, Books, The Observer, Dreamwind, News, Contact, Frankfurt Book Fair 2026. A separate not-found presentation and `404.html` are included.
- Original book artwork, extracted front/spine/back textures, CSS perspective books, and a user-activated React Three Fiber / Drei viewer. All four supplied originals are retained; SHA-256 comparisons confirmed identical copies.
- Distinct dark supernatural and celestial blue book settings; complete supplied back-cover synopses; original wraparound cover previews; factual availability states.
- Frankfurt homepage feature, dedicated editorial event page, original exhibition photographs, internal book links, full-screen gallery with arrow-key, Escape, and swipe handlers.
- Responsive desktop/mobile navigation with native modal focus containment, active links, footer navigation, skip link, route focus handling, reduced-motion behavior.
- GSAP entrances, SplitText word reveals, ScrollTrigger masks/reveals, photographic parallax, accent-line draws, scroll progress, desktop pinned quotation sequences, context cleanup. Fine-pointer explore indicator is restricted to exploratory images and disabled for reduced motion/touch.
- Individual client page bundles and separate optional Three.js bundle; self-hosted fonts; WebP derivatives; static HTML and metadata for all public routes.
- Validated contact UI with sending disabled until a real endpoint is configured. Delivery success requires a successful response explicitly confirming `sent: true`. No endpoint, database, delivery credentials, or data storage is provisioned.

Primary areas: `src/pages/`, `src/components/`, `src/App.tsx`, `src/data.ts`, `src/styles.css`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `scripts/assets.mjs`, `public/assets/`, `tests/`, Vite/TypeScript/Playwright configuration, and `README.md`.

## 2. Design review

Concept: **Two literary worlds, joined by shadow and starlight.** Cormorant Garamond editorial display type, Manrope body text, warm ivory, antique gold, midnight black, and celestial blue create a consistent author identity. The Observer and Dreamwind retain distinct imagery and atmospheres.

Signature details are the paired perspective cover presentation and the tilted photographic Frankfurt composition. Layouts vary between collection panels, editorial columns, book features, and the exhibition gallery. No generated covers, stock event photographs, fabricated reviews, invented biography, invented publication dates, or personal attendance claims were added.

Refinements after rendered review: removed oversized cover lettering from atmospheric backdrops, prevented stretched photo-frame backgrounds, retained complete event photographs in feature views, narrowed font subsets, and corrected clean-path HTML serving. Actual desktop home, Frankfurt, 3D viewer, mobile Dreamwind/home, and tablet home screenshots were inspected. The responsive browser check renders and captures every route at three widths.

The about page deliberately uses an explicitly labeled portrait placeholder and an undated reading journey. Author-approved biography, portrait, and personal milestones are unavailable. Static CSS atmosphere supports the cover artwork; additional flashing/lightning and continuously running WebGL scenery were avoided to keep the text readable and graphics optional.

## 3. Audit matrix

| Category / subcheck | Status | Evidence and scope |
| --- | --- | --- |
| Functionality — routes, assets, navigation, filters | PASS | Chrome visited all eight public routes; images decoded; navigation and category filters worked; runtime and browser-console checks found no errors in the route traversal. |
| Functionality — gallery and menus | PASS | Open/close, next photograph, ArrowRight, Escape, focus return, mobile navigation, and synthetic touch-swipe behavior exercised. Native modal dialogs provide focus containment. |
| Functionality — book presentation | PASS | Optional canvas loaded and returned to original cover; a separate test disabled WebGL and verified the original-cover fallback. Front, spine, and back use distinct extracted assets; presentation depth is configurable. |
| Functionality — form validation | PASS | Invalid email produced native type mismatch; complete valid fields satisfied browser validity; sending remained disabled with no configured service. No false sent state was displayed. |
| Functionality — delivery, purchase | NOT TESTED | No contact endpoint or verified retailer URLs were supplied. Outbound success/error responses and actual message delivery cannot be exercised. |
| SEO — prerendered public content | PASS | All eight routes have visible primary content, unique titles, and descriptions with JavaScript disabled. Open Graph, Twitter card metadata, semantic headings, internal links, and verified Person/Book JSON-LD are emitted. Robots allows public crawling; no `noindex` is present. |
| SEO — domain and live behavior | NOT TESTED | Official domain is unknown. Canonical/absolute social URLs and sitemap generation await `VITE_SITE_URL`; live host status codes, search rendering, social previews, and structured-data service validation remain unverified. |
| Responsive/Visual — rendered layouts | PASS | Every public route rendered at 390×844, 768×1000, and 1440×1000; no horizontal document overflow. Representative captured desktop, tablet, mobile, and 3D views inspected. A 640×450 viewport checks an equivalent layout width for a 1280px browser at 200% zoom. |
| Responsive/Visual — physical devices, other browsers | NOT TESTED | Desktop Chrome emulation only. Physical touch devices, Safari, Firefox, Edge, actual browser text zoom, and mid-range GPU performance were not tested. |
| Accessibility — automated and interaction checks | PASS | axe scan across all eight routes with WCAG 2/2.1/2.2 A/AA tags reported no violations in reduced motion. Keyboard gallery/navigation checks, focus return, labels, native validation, image names, and reduced-motion rendering were exercised. |
| Accessibility — broader assistive-technology review | NOT TESTED | No screen-reader session, full manual keyboard traversal of every control, or comprehensive accessibility conformance assessment. This is not WCAG certification. |
| Security/Privacy — dependencies and static behavior | PASS | Final npm audit returned zero known vulnerabilities. A source search found no configured secrets, storage APIs, cookies, or third-party tracking. Fonts and image assets are local. Static UI does not collect or persist submissions. This does not certify total security. |
| Security/Privacy — live service and legal review | NOT TESTED | No production host or backend exists. Server-side validation, origin/CSRF controls, rate limits, secrets, TLS/headers, access control for submissions, provider storage/access, retention, operating jurisdiction, intended audience, and approved legal notices must be established before contact is enabled. |
| Security/Privacy — login, payments, uploads | NOT APPLICABLE | No authentication, payment, administrative data, or visitor file-upload features were requested or implemented. |
| Performance — local lab and asset behavior | PASS | Production build succeeded. The homepage sample recorded LCP 340 ms and CLS 0.002354 in unthrottled headless Windows Chrome at 1440×1000 on localhost. The browser verified the Three.js chunk was absent before the 3D action. Fonts are self-hosted, below-fold images lazy-load, routes and optional graphics are split. |
| Performance — field budgets and mobile hardware | NOT TESTED | No real-user p75 LCP/INP/CLS, Lighthouse score, throttled mobile lab run, sustained frame-rate, or battery measurements. One local sample is not a production performance guarantee. |
| Code/Regression — types, build, browser suite | PASS | TypeScript checking, production client/SSR builds, static generation, and the final browser test suite passed; see commands and artifacts below. |
| Code/Regression — lint and existing legacy flows | NOT APPLICABLE | New empty project; no legacy routes/integrations or lint configuration existed. No lint result is claimed. |

## 4. Tests run

Environment: Windows, Node v24.18.0, npm 11.16.0, installed Google Chrome through Playwright, localhost Vite production preview. Headless 3D uses SwiftShader; it does not represent physical mobile hardware.

| Exact command/tool | Observed result |
| --- | --- |
| `node scripts/assets.mjs` | Generated original-derived front/spine/back/full-cover WebP assets and complete event photograph derivatives. |
| `npm run check` | TypeScript completed without errors. |
| `npm run build` | TypeScript, Vite client and SSR build succeeded; eight public routes and 404 HTML generated. Expected prelaunch warning for missing domain. Optional graphics chunk triggers Vite’s size advisory. |
| `npm run test:e2e` | **11 passed in 2.2 minutes** on the final route-split production build. Tests cover all routes/assets, runtime errors, menus, filters, gallery, reduced-motion axe scans, three responsive widths, no-JavaScript HTML/metadata, form validity, synthetic swipe, unavailable WebGL, optional canvas, and local loading observations. |
| `npm audit --offline=false --cache .npm-cache` | Zero known vulnerabilities after updating Sharp to 0.35.5. |
| PowerShell `Get-FileHash -Algorithm SHA256` | All four retained original files match the supplied files byte-for-byte. |
| Source search with `rg` | Reviewed indexability directives, external references, browser storage/cookies, and secret/configuration markers; no configured credentials or tracking integrations found. |
| `view_image` | Inspected representative rendered mobile/tablet/desktop screenshots and the on-demand 3D viewer. |

Artifacts: `playwright-report/index.html`, `test-results/screenshots/`, and `test-results/local-lab.json`. The latter contains sample context, navigation/resource observations, and LCP/CLS values. Browser tests recreate their result directory on each run.

Client CSS is approximately 10.18 kB gzip; shared client JavaScript approximately 138.14 kB gzip; individual page bundles approximately 0.36–2.10 kB gzip; optional Three.js viewer approximately 243.86 kB gzip. The graphics warning remains documented rather than hidden by raising the threshold. It is fetched only when a reader chooses the 3D viewer.

## 5. Outstanding items

1. Confirm production domain and hosting. Set `VITE_SITE_URL` and rebuild to produce canonical URLs and `sitemap.xml`; verify clean-path serving, real HTTP 404 responses, HTTPS, headers, and social previews on that host.
2. Supply author-approved biography, portrait, milestones, verified retailer URLs, official social accounts, and approved sample chapters. No fake substitutes were published. The existing official cover artwork, including its printed promotional language, is preserved without turning those claims into new website assertions.
3. Choose and configure contact delivery. Confirm server-side protection, actual provider delivery, and accessible success/error states against that real service before enabling submission.
4. Identify jurisdiction, controller/contact, relevant audience requirements, delivery provider, data access, retention, and storage; supply approved privacy/legal text. No personal data is currently stored or sent by the form.
5. Perform real-device, Safari/Firefox/Edge, screen-reader, real zoom, throttled performance, and deployed SEO/service verification. No Google indexing, rankings, accessibility certification, or security certification is promised.

## 6. Launch readiness

**READY FOR REVIEW** — functioning local implementation and production build provided. Required launch configuration, approved author content, and live contact/SEO verification remain. No production deployment was authorized or performed.

## 7. Next action

Run `npm run dev` to review the site locally, then confirm the domain and supply the author/contact/retailer details listed above. Follow `README.md` before publishing.
