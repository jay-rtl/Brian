# GitHub Pages deployment

Repository: https://github.com/jay-rtl/Brian

Site: https://jay-rtl.github.io/Brian/

The current visual direction is light. The original publication record below is retained; the latest theme change is documented under **Light theme release**.

The user requested deployment to the supplied GitHub repository. It was confirmed empty, public, and accessible with administrator/push permissions using the existing Git Credential Manager login. No pre-existing project files or production data were replaced.

## Configuration

- `.github/workflows/deploy.yml`: installs locked dependencies on Node 24, type-checks, builds client route bundles, prerenders all eight public pages, and deploys the `dist` artifact using the official GitHub Pages actions. Deploy permissions are limited to the deployment job. Documentation-only changes do not trigger a rebuild.
- `VITE_BASE_PATH=/Brian/`: browser and server routers, original assets, optional 3D textures, and generated stylesheet references use the repository subdirectory.
- `VITE_SITE_URL=https://jay-rtl.github.io/Brian`: canonical URLs, sitemap, and social image URLs point to the selected public deployment. Canonical page URLs end in `/`, matching static directory pages.
- `dist/.nojekyll`, prerendered directory indexes, flat HTML variants, and `404.html` support static hosting. No analytics or contact service was added.

## Verification

`npm run check` and the GitHub Pages production build passed. The pre-deployment Chrome check uses `node scripts/verify-deployment.mjs http://127.0.0.1:4174/Brian/`. It tests all eight routes and their original assets, canonical/social metadata, client navigation, gallery arrow keys/Escape, 3D load/drag/close, mobile navigation, all eight pages without JavaScript, and the generated eight-entry sitemap and robots configuration.

**Published and verified October 27, 2026.** GitHub Actions run https://github.com/jay-rtl/Brian/actions/runs/40395458018 completed successfully for source commit `abe43821923b59a12fb3739a95698b16b892fdc4`. GitHub Pages confirms public workflow publishing and enforced HTTPS at https://jay-rtl.github.io/Brian/.

`node scripts/verify-deployment.mjs https://jay-rtl.github.io/Brian/` passed: all eight routes returned HTTP 200; all tested images decoded; zero browser runtime/console errors; correct canonical and absolute social-image metadata; navigation, gallery arrow keys/Escape, 3D load/drag/close, and mobile navigation worked; all eight routes rendered without JavaScript; sitemap contained eight public URLs and robots allowed crawling. A separate HTTP check of `/Brian/this-page-does-not-exist/` returned HTTP 404 with the custom author-site not-found page.

Exact build command in local PowerShell: `$env:VITE_BASE_PATH='/Brian/'; $env:VITE_SITE_URL='https://jay-rtl.github.io/Brian'; npm run build`. The workflow reproduced this build on Ubuntu with `npm ci` and Node 24. `npm run check` and `git diff --cached --check` also passed.

Deployment checks used desktop Windows Chrome through Playwright, including a 390×844 mobile viewport and a 1440×1000 desktop viewport. Optional 3D used software rendering. Test artifacts are ignored by Git. The existing 11-test accessibility/responsive/interaction audit is documented in `AUDIT.md`; these live checks supplement it.

## Deployment audit matrix

| Category | Status | Scope and evidence |
| --- | --- | --- |
| Functionality | PASS | Eight live routes/assets, navigation, gallery keyboard controls, 3D drag/close, mobile menu, and custom HTTP 404 verified. |
| Functionality — live form delivery | NOT TESTED | Delivery is intentionally disabled; no provider is configured. |
| SEO | PASS | Live route-specific HTML/title/canonical/social metadata, eight-entry sitemap, and robots checked, including all routes without JavaScript. |
| SEO — search/social services | NOT TESTED | Search indexing, rankings, rich-result validation services, and social-platform rendering remain unverified. |
| Responsive/Visual | PASS | Original compositions retained; deployment asset paths resolved. Live mobile menu and home overflow checked at 390×844; desktop at 1440×1000. Earlier three-width rendered review remains in `AUDIT.md`. |
| Accessibility — existing baseline | PASS | The prior 11-test suite passed automated accessibility and keyboard/reduced-motion checks. This deployment changes asset/hosting paths and preserves those controls. |
| Accessibility — live assistive-technology review | NOT TESTED | No new screen-reader session or comprehensive accessibility assessment. |
| Security/Privacy — deployment scope | PASS | GitHub Pages reports HTTPS enforced. Deployment uses job-scoped permissions; no tokens, private environment files, caches, dependencies, or test artifacts were committed. Contact remains disabled. |
| Security/Privacy — broader review | NOT TESTED | Future server protection, legal notices, privacy jurisdiction, data retention, and comprehensive security review remain outstanding. |
| Performance — field/deployed measurements | NOT TESTED | No live field Core Web Vitals or throttled performance measurement was run. Earlier localhost measurements do not represent production field data. |
| Code/Regression | PASS | TypeScript, local deployment build, GitHub Ubuntu build/deploy, and local/live deployment checks passed; zero runtime/console errors during live traversal. |

## Design review and next action

The midnight/gold editorial identity, distinct book settings, original covers, event photographs, motion, and page compositions were retained. Changes were confined to deployment-aware URLs, canonical normalization, sitemap generation, and workflow setup. Review the live site and supply the approved content and contact/privacy setup listed below.

## Remaining setup

- Contact submission intentionally remains disabled because no delivery service or approved privacy notice was supplied.
- Author biography, portrait, verified purchase links, social accounts, sample chapters, and milestones still require approved content.
- Screen readers, other browser engines, physical mobile hardware, field Core Web Vitals, legal review, search indexing, and social-platform preview rendering are not certified by this deployment.
- GitHub Pages supplies the static host and HTTPS. Project-level `robots.txt` is generated, but GitHub controls the hostname-root robots policy. No custom DNS or domain changes were requested.

Launch assessment remains **READY FOR REVIEW** for the public author experience, with the incomplete content and contact features visibly disclosed. Publishing does not change those known limitations.

## Light theme release

### Implemented

Changed `src/styles.css`, `index.html`, and `public/favicon.svg` to use warm ivory backgrounds, charcoal text, accessible dark antique-gold accents, and pale blue Dreamwind surfaces. Updated navigation and its mobile dialog, book controls, photographic frames, collection overlays, buttons, form fields, gallery/lightbox, footer, browser theme metadata, and favicon. Softened shadows and atmospheric backdrops to suit a light page. No cover artwork, event photograph, book copy, routes, form integration, or animation logic was changed. `README.md` records the current design direction.

The stylesheet is now formatted for readable review and uses explicit paper/surface/ink tokens. Gold text was darkened for legibility rather than using the pale gold from the former dark background.

### Design review

The result uses an editorial paper-and-ink direction while retaining the two book worlds and their original imagery. Actual rendered screenshots were inspected for the desktop and mobile home, desktop Frankfurt showcase, mobile Dreamwind, and desktop contact page. The browser suite captured every route at 390×844, 768×1000, and 1440×1000. Covers remain in their original colors and retain their 3D presentation. No new stock images, invented claims, or decorative dependencies were added.

### Audit matrix

| Category / subcheck | Status | Evidence and scope |
| --- | --- | --- |
| Functionality | PASS | All 11 browser tests passed in 2.6 minutes: routes, original image assets, navigation, news filters, gallery arrows/Escape/focus return, synthetic swipe, form validity/disabled delivery, 3D view, and unavailable-WebGL fallback. |
| Functionality — live message delivery | NOT TESTED | The existing disabled contact configuration remains. No delivery service was supplied. |
| SEO | PASS | All eight prerendered routes passed the no-JavaScript content, unique title, and description checks. The deployment build retains canonical/social metadata and the sitemap. Browser theme color and favicon now match the light palette. |
| SEO — indexing/social services | NOT TESTED | Search indexing and third-party social preview rendering were not evaluated. |
| Responsive/Visual | PASS | All eight routes rendered at three representative widths without horizontal overflow; representative screenshots manually reviewed as listed above. Layouts and original artwork retained. |
| Accessibility — tested scope | PASS | All eight light pages passed axe checks with WCAG A/AA tags and no reported violations; tested keyboard/modal behavior and reduced motion passed. Contrast was checked after changing the text and surface palette. |
| Accessibility — broader assessment | NOT TESTED | Screen readers, physical devices, and comprehensive manual conformance review remain untested. This is not a certification. |
| Security/Privacy — change scope | PASS | Diff contains presentation/metadata/documentation changes only. No dependencies, credentials, storage, tracking, or submission behavior changed. |
| Security/Privacy — broader assessment | NOT TESTED | Existing backend/legal/privacy/content limitations remain; no new full security or legal audit was performed. |
| Performance — local observation | PASS | One unthrottled local desktop Chrome run at 1440×1000 recorded LCP 568 ms and CLS 0.002354. Optional Three.js remained unloaded before activation; no new scripts or dependencies added. CSS remains approximately 10.2 kB gzip. |
| Performance — field/mobile | NOT TESTED | No field Core Web Vitals, INP, throttled mobile, sustained frame-rate, or battery measurement. Local numbers are not production guarantees. |
| Code/Regression | PASS | TypeScript and production build passed. `git diff --check` passed. The full 11-test Chrome suite passed. Optional 3D chunk-size advisory remains documented. |

### Tests run

- `npm run build`: default local build with TypeScript, client/SSR output, and all eight prerendered public routes.
- `npm run test:e2e -- --grep "automated accessibility"`: initial contrast/accessibility check, 1 test passed across all eight pages.
- `npm run test:e2e`: final full browser run, 11 passed in 2.6 minutes.
- `$env:VITE_BASE_PATH='/Brian/'; $env:VITE_SITE_URL='https://jay-rtl.github.io/Brian'; npm run build`: GitHub Pages production build.
- `git diff --check`: no whitespace errors after final cleanup.
- `node scripts/verify-deployment.mjs https://jay-rtl.github.io/Brian/`: post-publication check passed for all eight live routes and key interactions with zero runtime/console errors.

Environment: Windows, installed headless desktop Chrome through Playwright, localhost Vite preview, no CPU/network throttling; SwiftShader for 3D. Physical mobile hardware and other browser engines were not tested.

### Outstanding items, launch readiness, and next action

The light theme was published successfully by https://github.com/jay-rtl/Brian/actions/runs/40398747683 from source commit `55f901888d7341529b3065525e3875b078b04266`. Live Chrome verification confirmed background `rgb(251, 248, 241)`, foreground `rgb(37, 42, 49)`, browser theme color `#fbf8f1`, and CSS color scheme `light`, including a browser context preferring dark mode. All eight live routes and the deployed gallery, 3D controls, metadata, mobile navigation, no-JavaScript pages, sitemap, and robots passed the deployment check with zero runtime/console errors.

No known light-theme defect remains from the performed checks. Existing author-approved content, purchase links, sample chapters, contact delivery, and privacy details are still outstanding. Status remains **READY FOR REVIEW**. Next action: refresh and review the updated public site.

## Large photographic hero background

### Implemented and design review

Added a prominent, original open-book background to the light homepage in response to the supplied visual reference. The reference informed the idea of a large photographic hero; its image, name, logo, text, and exact composition were not reused. The new background uses sunlit ivory pages and pale sky-blue clouds, with dark HTML text over a protected quiet area and the two official covers floating in the foreground. Desktop cover scale/position and mobile crop/overlay were adjusted to keep both the photograph and the books visible.

Changed `src/pages/Home.tsx` and the homepage rules in `src/styles.css`. Added three responsive WebP assets in `public/assets/`, the original generated PNG in `design/`, and the full prompt/provenance record at `design/hero-background.md`. The built-in `image_gen` tool created the decorative background; no official cover or event photograph was regenerated or edited.

The 1672px asset is 128,776 bytes, 1200px asset is 64,968 bytes, and 768px asset is 26,678 bytes. The image uses `srcSet`, reserved dimensions, `fetchPriority="high"`, empty alt text, and an `aria-hidden` decorative container. Original covers, routes, editorial content, gallery, and 3D controls remain available.

### Audit matrix

| Category / subcheck | Status | Evidence and scope |
| --- | --- | --- |
| Functionality | PASS | All 11 browser tests passed in 2.3 minutes, including eight routes and their images, navigation, filters, gallery, native form validity, disabled delivery, optional 3D, and WebGL fallback. |
| SEO | PASS | All eight prerendered pages retained visible content and unique metadata without JavaScript; the decorative image adds no invented book or author facts. |
| SEO — external services | NOT TESTED | Search indexing and social-platform rendering were not evaluated. |
| Responsive/Visual | PASS | Every route rendered at 390×844, 768×1000, and 1440×1000 without horizontal overflow. Desktop and mobile homepage screenshots were manually inspected for the large background, crop, typography, and cover placement. |
| Accessibility — tested scope | PASS | All eight pages passed axe A/AA-tagged checks with no reported violations; keyboard, reduced-motion, and focus-return checks passed. Text has a light protection layer and cover labels have a paper backing. |
| Accessibility — broader review | NOT TESTED | Full screen-reader/manual conformance assessment and physical devices remain untested. |
| Security/Privacy — change scope | PASS | Assets are served locally from the existing site; no new third-party requests, dependencies, data collection, credentials, or submission changes. |
| Security/Privacy — broader review | NOT TESTED | Existing legal/backend/privacy questions remain; this visual change is not a security or legal certification. |
| Performance — local observation | PASS | One unthrottled local desktop Chrome run recorded LCP 408 ms and CLS 0.001129. Responsive assets are approximately 129/65/27 kB. No new runtime dependency; optional Three.js remained unloaded before activation. |
| Performance — field/mobile | NOT TESTED | Field Core Web Vitals, INP, throttled mobile, battery use, and sustained frame rate remain unmeasured. |
| Code/Regression | PASS | TypeScript, production build, `git diff --check`, and the 11-test Chrome suite passed. |

### Tests, remaining items, and next action

Commands: `npm run build`; `npm run test:e2e` (11 passed, 2.3 minutes); `git diff --check`; and the GitHub Pages build with `VITE_BASE_PATH=/Brian/` and `VITE_SITE_URL=https://jay-rtl.github.io/Brian`.

Environment: Windows desktop Chrome through Playwright, localhost production preview, three representative viewport sizes, no CPU/network throttling, and SwiftShader for optional 3D. No known defect from the performed checks. Existing approved author content, purchase links, excerpts, contact delivery, and privacy information remain outstanding. Status: **READY FOR REVIEW**. Next action: review the updated public homepage.
