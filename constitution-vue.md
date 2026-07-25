<!-- Spec Kit constitution — paste into `/speckit.constitution` for a Vue 3 SPA (decoupled from its API). -->
# Vue SPA Constitution

Governing principles for a Vue 3 single-page application that is **deployed separately** from
its backend and consumes a REST API over HTTP. Non-negotiable defaults; a spec overrides one
only with explicit written rationale.

## Core Principles

### I. Composition API only
All components use `<script setup>` with the Composition API. No Options API. Prefer typed
interfaces over `any` in TypeScript projects.

### II. Pinia for shared state
Global/shared state lives in Pinia **setup stores** (`defineStore('x', () => { ... })`), one
per domain (`auth`, `cart`, `wishlist`, ...). Local-only state stays in the component.

### III. One central HTTP client (decoupled-origin aware)
A single Axios instance (`src/lib/axios`) owns configuration:
- `baseURL` from an env var (`VITE_API_URL`) — never hardcode the API host in composables,
  components, or stores.
- Request interceptor attaches the token as **`Authorization: Bearer <token>`**.
- Response interceptor handles `401` centrally (clear session → redirect to login).
Because the SPA and API are on **different origins**, all requests are cross-origin; the API
owns CORS. Do not send cookies unless the API is explicitly cookie-based.

### IV. Stateful data fetching, split by responsibility
Reads and writes both expose `data / loading / error` and use `async/await` (never
`.then().catch()` chains) — never a silent blank screen:
- **Reads (GET)** go through shared composables (`useGetApi` for lists, `useGetApiOne` for a
  single record), each returning `{ data, loading, error, getData(link) }` and driving a
  global loader (`vue-loading-overlay`) around the request.
- **Writes (POST/PUT/DELETE)** live as actions on the owning Pinia store (e.g. `cart.addToCart`,
  `auth.login`), not in the shared composables — a mutation is domain logic, a GET is generic.
Every fetching UI renders explicit loading and error states. Surface API `422`/validation
errors inline, reading the message from `err.response?.data?.message`.

### V. Design is a first-class concern — responsive & professional
Mobile-first and fully responsive at every breakpoint (verify sm/md/lg). Maintain a real
**design system**: a defined color palette/scale, a consistent type scale, and consistent
spacing — all as Tailwind theme tokens, not ad-hoc values. Accessible contrast (WCAG AA),
labeled inputs, visible focus. Design quality is part of "done", not an afterthought.

### VI. Tailwind-only styling — no scattered CSS
Style with Tailwind utilities in the markup. **No per-component `.css` dumps, no inline
`style="..."` for layout.** Repeated patterns become reusable components (or a sparing
`@apply` in one place). Colors/spacing/typography come from the Tailwind theme, so the look
stays consistent and themable.

### VII. Motion with intent
Animation serves UX, not decoration: entrance reveals, state transitions, hover
micro-interactions. Use GSAP for orchestrated/scroll-driven motion, Animate.css for simple
one-shot effects. Keep it tasteful (don't animate everything) and always honor
`prefers-reduced-motion`.

### VIII. Internationalized + RTL by default
No user-facing string is hardcoded — all copy via i18n with `ar` + `en` kept in sync (added to
both in the same change). Arabic-first: layouts are RTL-correct (`dir="rtl"`, mirrored spacing
and directional icons) and verified in RTL.

### IX. Feature structure, clean code, validation-as-UX
Organize by feature:
```
src/
  pages/<Feature>/index.vue      # one folder per feature; nested detail views alongside it
                                  #   (e.g. pages/Products/index.vue + ProductDetails.vue)
  components/                    # shared + <feature>/ subfolders
  composables/                   # useGetApi.ts, useGetApiOne.ts — generic GET wrappers only
  stores/<name>/index.ts         # Pinia setup stores; POST/PUT/DELETE actions live here
  router/index.ts + routes/      # routes nested under a layout; guards via meta
  i18n/locales/                  # ar.ts + en.ts
  lib/                           # axios.ts, helpers
  layouts/  types/  assets/
```
Reuse before adding. No commented-out blocks or stray `console.log`.

**Routing**: routes nest as `children` under a shared layout component; a catch-all
`{ path: '/:pathMatch(.*)*', name: 'not-found' }` renders the 404 page. Every protected or
guest-only route sets `meta.requiresAuth` / `meta.guestOnly` **consistently** — the router
guard must read the exact same key names the routes define, or the guard silently no-ops.

**Client-side validation**: forms use vee-validate's `<Form>` / `<Field>` / `<ErrorMessage>`
components bound to a `yup` `object({...})` schema (`:validation-schema`), with the schema and
field list colocated in the component (a `ref` array of `{ name, type, placeholder }` for
data-driven forms). This is for UX speed; the API remains the source of truth — always surface
its `422` response back into the form (e.g. store's `apiErrors` / `fieldError`, or inline per
field).

## Quality Gates

- Responsive + RTL verified before a feature is "done".
- Loading and error states handled for every async interaction (reads via composables, writes
  via store actions).
- Route guards use one consistent meta key per concern (`requiresAuth`, `guestOnly`) — confirm
  the guard and the route definitions actually agree on the key name.
- No scattered CSS; all colors/spacing/type flow from the Tailwind theme.
- Animations respect `prefers-reduced-motion`; no gratuitous motion.
- No duplicated logic; shared behavior extracted into a composable or store.
- Accessibility: labeled controls, keyboard-usable, visible focus, AA contrast.

## Governance

This constitution supersedes ad-hoc preferences. Amendments require an explicit note in the
spec/PR describing what changed and why. A spec that deviates from a principle must state the
deviation and its justification; unstated deviations are defects.

**Version**: 1.2.0 | **Ratified**: 2026-07-18 | **Last Amended**: 2026-07-23
