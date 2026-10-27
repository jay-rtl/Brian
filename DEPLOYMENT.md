# GitHub Pages deployment

Repository: https://github.com/jay-rtl/Brian

Site: https://jay-rtl.github.io/Brian/

The user requested deployment to the supplied GitHub repository. It was confirmed empty, public, and accessible with administrator/push permissions using the existing Git Credential Manager login. No pre-existing project files or production data were replaced.

## Configuration

- `.github/workflows/deploy.yml`: installs locked dependencies on Node 24, type-checks, builds client route bundles, prerenders all eight public pages, and deploys the `dist` artifact using the official GitHub Pages actions. Deploy permissions are limited to the deployment job. Documentation-only changes do not trigger a rebuild.
- `VITE_BASE_PATH=/Brian/`: browser and server routers, original assets, optional 3D textures, and generated stylesheet references use the repository subdirectory.
- `VITE_SITE_URL=https://jay-rtl.github.io/Brian`: canonical URLs, sitemap, and social image URLs point to the selected public deployment. Canonical page URLs end in `/`, matching static directory pages.
- `dist/.nojekyll`, prerendered directory indexes, flat HTML variants, and `404.html` support static hosting. No analytics or contact service was added.

## Verification

`npm run check` and the GitHub Pages production build passed. The pre-deployment Chrome check uses `node scripts/verify-deployment.mjs http://127.0.0.1:4174/Brian/`. It tests all eight routes and their original assets, canonical/social metadata, client navigation, gallery arrow keys/Escape, 3D load/drag/close, mobile navigation, all eight pages without JavaScript, and the generated eight-entry sitemap and robots configuration.

Live deployment results are recorded after publication. `scripts/verify-deployment.mjs` can also verify the public URL. Its test artifacts are ignored by Git. The existing 11-test accessibility/responsive/interaction audit is documented in `AUDIT.md`; deployment checks supplement it.

## Remaining setup

- Contact submission intentionally remains disabled because no delivery service or approved privacy notice was supplied.
- Author biography, portrait, verified purchase links, social accounts, sample chapters, and milestones still require approved content.
- Screen readers, other browser engines, physical mobile hardware, field Core Web Vitals, legal review, search indexing, and social-platform preview rendering are not certified by this deployment.
- GitHub Pages supplies the static host and HTTPS. Project-level `robots.txt` is generated, but GitHub controls the hostname-root robots policy. No custom DNS or domain changes were requested.

Launch assessment remains **READY FOR REVIEW** for the public author experience, with the incomplete content and contact features visibly disclosed. Publishing does not change those known limitations.
