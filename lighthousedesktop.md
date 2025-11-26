# Lighthouse (Desktop) – cryptowaffle.fun

Captured Nov 26, 2025, 5:39 PM GMT — Lighthouse 12.8.2 (Desktop)
- Performance: **84** (FCP 0.7s, LCP 2.6s, TBT 50ms, CLS 0, SI 1.6s)
- Accessibility: **100**
- Best Practices: **74**
- SEO: **100**

## Priority Actions (next run target: ≥95 Performance / ≥90 Best Practices)
- [x] Optimize hero/media delivery (Insight: Improve image delivery, 2,024 KiB saving) — converted heavy hero/host/hero-template assets to WebP and wired components to the new files with `sizes`/priority on the hero logo.
- [x] Cut unused JavaScript/CSS (Diagnostics: Reduce unused JS 2,066 KiB; CSS 10 KiB; Minify JS 119 KiB) — lazy-load YouTube embed via IntersectionObserver + click-to-load facade to keep third-party JS off the initial thread; retains existing styles (no CSS bloat changes yet).
- [x] Avoid enormous payloads (Total 3,390 KiB) — major image weight reduction and deferred YouTube loading to shrink initial network payload.
- [x] Cache static assets (Insight: Use efficient cache lifetimes, 385 KiB) — added long-lived immutable caching headers for `/_next/static`, `/images`, and common static asset types in `vercel.json`.
- [x] Remove legacy JS for modern browsers (Insight: Legacy JS, 10 KiB; Avoid serving legacy JS, 79 KiB) — set modern Browserslist targets to avoid shipping ES5/transpiled bundles to evergreen browsers.
- [x] Set `font-display` (Insight: Font display, 30 ms) — already using Google Fonts with `display=swap`; verified.
- [x] Tame render-blocking/critical path — inlined minimal hero critical CSS, added font stylesheet preload + preconnect, hero image already priority-loaded.
- [x] Address forced reflow/Layout shift culprits — defined `sizes` on responsive images and ensured consistent dimensions to keep CLS at 0.

## Best Practices fixes
- [x] Investigate and remove 3rd-party cookies where not essential (29 cookies found); ensure consent/usage justified. — Mailchimp popup is now gated behind `NEXT_PUBLIC_ENABLE_MAILCHIMP_POPUP` (default false) to avoid loading third-party cookie script unless explicitly enabled.
- [x] Fix console errors and DevTools “Issues” warnings seen during audit; add logging guardrails in prod. — Mailchimp loader now uses external `src` with error handler to avoid inline-script CSP violations and suppress noisy errors when blocked/unavailable.
- [x] Confirm security headers: CSP covering scripts/media, HSTS, COOP/COEP, XFO or CSP frame-ancestors; add to Next `headers()`/nginx as needed. — Added CSP, HSTS, XFO, COOP, Referrer-Policy in `vercel.json`; caching headers preserved.

## Verification
- [ ] Re-run Lighthouse Desktop in Incognito (IndexedDB note) with custom throttling; capture before/after metrics and screenshots.
- [ ] Check treemap to confirm bundle reductions and that LCP element is the optimized hero image.
- [ ] Monitor Core Web Vitals via field data (CrUX/GA4) after deploy.
