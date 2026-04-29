# Frontend Readiness Checklist (Security, Tokens, Cache, Speed, Skeletons, API)

Date: 2026-04-29
Scope: Next.js frontend audit for production readiness

## Executive Summary

Current frontend is visually rich and functional, but production hardening is still needed in 7 areas:
1. Security hardening is partial (basic validation exists, headers/rate limits/CSP missing).
2. Token strategy is unclear (design tokens exist, auth/API tokens strategy is not implemented).
3. Caching strategy is mostly absent (almost no fetch caching/revalidation patterns).
4. Speed can improve significantly (many client components, heavy above-the-fold sections).
5. Route-level skeleton/loading states are missing.
6. API consumption layer is minimal (single direct fetch, no shared API client).
7. Need a focused frontend delivery plan for stabilization.

---

## 1) Security

### Current state
- Basic API payload validation exists in `src/app/api/contact/route.ts`.
- Client-side form validation exists in `src/app/contact/ContactForm.tsx`.
- No explicit security headers/CSP setup in `next.config.ts`.
- No visible rate limiting / anti-abuse for contact endpoint.
- Large inline SVG HTML string is rendered with `dangerouslySetInnerHTML` in `src/app/collections/[purity]/[category]/[style]/[id]/page.tsx`.

### Action items
- [ ] Add HTTP security headers in `next.config.ts`:
  - `Content-Security-Policy`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `X-Content-Type-Options`
  - `Permissions-Policy`
- [ ] Add basic rate limiting for `POST /api/contact` (IP + short time window).
- [ ] Add server-side length caps + stricter sanitization for all contact fields.
- [ ] Replace `dangerouslySetInnerHTML` SVG strings with React SVG components or static files.
- [ ] Add bot mitigation for contact form (honeypot + optional Turnstile/reCAPTCHA).
- [ ] Return generic server error messages in production.

Priority: P0

---

## 2) Tokens

### Current state
- Design tokens are centralized in `src/styles/variables.css` (good baseline).
- Auth/API token flow is not defined (no JWT/session/token storage pattern found).

### Action items
- [ ] Keep design tokens in `variables.css`, but document naming rules and semantic tokens (`--color-text-primary`, `--surface-muted`, etc.).
- [ ] Create an auth/token decision doc for frontend:
  - If auth is planned, use secure httpOnly cookies (not localStorage).
  - Define token refresh behavior and logout handling.
  - Define route protection strategy (server components vs client guards).
- [ ] Add `.env.example` for public runtime config (`NEXT_PUBLIC_API_BASE_URL`, feature flags).

Priority: P0 for auth-token decision, P2 for design-token cleanup

---

## 3) Cache

### Current state
- Very limited explicit cache strategy in app routes.
- Data in product listing/detail pages is mocked static content; no fetch caching policy yet.

### Action items
- [ ] Introduce a shared server data layer (`src/lib/api/*`) with explicit fetch options:
  - `next: { revalidate: <seconds> }` for catalog data
  - `cache: 'no-store'` only where truly dynamic
- [ ] Use tag-based revalidation for product collections when CMS/backend updates.
- [ ] For client-side interactive lists, add query caching (SWR or TanStack Query).
- [ ] Add image caching and long-lived cache-control policy for static assets.

Priority: P1

---

## 4) Speed (Performance)

### Current state
- Home route composes many heavy sections directly in `src/app/page.tsx`.
- Many components are client components (`'use client'`) where server rendering could be used.
- 3D section dynamically imports `@google/model-viewer` in `src/components/ui/organisms/ModelShowcaseSection/ModelShowcaseSection.tsx` (good), but still loaded in main page flow.
- Very large inline SVG constants in product detail page increase bundle parse/transfer cost.
- No route-level loading UI files found.

### Action items
- [ ] Move non-interactive sections to server components where possible.
- [ ] Lazy-load below-the-fold heavy sections via dynamic imports.
- [ ] Load 3D model section only when near viewport (intersection observer gate).
- [ ] Replace giant inline SVG string constants with static SVG assets/components.
- [ ] Audit image `sizes` and `priority` usage to reduce LCP and over-fetching.
- [ ] Add bundle analyzer and set performance budgets.

Priority: P1

---

## 5) Skeletons / Loading UX

### Current state
- Component-level skeleton exists for collection grid (`src/components/ui/organisms/CollectionGrid/CollectionGrid.tsx`).
- No route-level `loading.tsx` files were found under `src/app/**`.

### Action items
- [ ] Add route-level loading skeletons:
  - `src/app/loading.tsx` (global shell)
  - `src/app/collections/loading.tsx`
  - `src/app/collections/[purity]/[category]/[style]/loading.tsx`
  - `src/app/collections/[purity]/[category]/[style]/[id]/loading.tsx`
  - `src/app/contact/loading.tsx`
- [ ] Ensure skeletons match final layout dimensions to avoid CLS.
- [ ] Add delayed spinner/skeleton strategy (show only if request > 150-250ms).

Priority: P1

---

## 6) Frontend API Readiness

### Current state
- Contact form submits directly with `fetch('/api/contact')` in `src/app/contact/ContactForm.tsx`.
- No shared API client, retry strategy, or unified error mapping.
- Product pages still use mocked data.

### Action items
- [ ] Build a typed API client layer:
  - `src/lib/api/client.ts` (base fetch wrapper)
  - `src/lib/api/contact.ts`, `src/lib/api/products.ts`, etc.
- [ ] Add common response schema + error normalization.
- [ ] Add request timeout + abort controller.
- [ ] Add telemetry hooks for API failures and latency.
- [ ] Replace mocked product/listing data with real API integration.
- [ ] Add TypeScript types generated from backend contract (OpenAPI or shared types).

Priority: P0

---

## 7) What frontend must fix/do now (execution plan)

## Phase 1 (This week, critical)
- [ ] Add security headers and CSP in `next.config.ts`.
- [ ] Create shared API client and move contact submit to it.
- [ ] Add route-level loading skeletons for core routes.
- [ ] Remove/replace `dangerouslySetInnerHTML` SVG payload.
- [ ] Define token/auth strategy document (cookie-based if auth is required).

## Phase 2 (Next sprint)
- [ ] Integrate real products API and caching (`revalidate`/tags).
- [ ] Reduce `'use client'` surface by converting static sections to server components.
- [ ] Lazy-load heavy home sections and optimize 3D loading trigger.
- [ ] Add performance monitoring (LCP, INP, CLS) + bundle analyzer.

## Phase 3 (Stabilization)
- [ ] Add anti-abuse controls (rate limit + captcha/honeypot) for form endpoints.
- [ ] Add client query cache strategy (SWR/TanStack Query).
- [ ] Final accessibility/performance pass and regression checklist.

---

## Suggested ownership (Frontend)
- Security headers/CSP: Frontend + DevOps
- API client/types/contracts: Frontend + Backend
- Cache/revalidation design: Frontend lead
- Skeletons/loading UX: Frontend UI team
- Performance budgets/monitoring: Frontend + QA

---

## Definition of Done for frontend readiness
- [ ] Security headers enabled and verified in production.
- [ ] API client layer adopted by all network calls.
- [ ] Core routes have loading skeletons and no major CLS.
- [ ] Product pages consume real API data with caching strategy.
- [ ] LCP/INP/CLS within target budgets on mobile and desktop.
- [ ] No unsafe HTML injection path for static decorative assets.
