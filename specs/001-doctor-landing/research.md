# Phase 0 Research: Doctor Landing Page

No `NEEDS CLARIFICATION` items remained after the spec. This document records the key
technical decisions and their rationale.

## Decision 1 — Framework & build: Vue 3 + Vite + TypeScript

- **Decision**: Standalone Vite + Vue 3 SPA in TypeScript, `<script setup>` Composition API.
- **Rationale**: Mandated by the project constitution (Archetype A) and the user's tech choice
  (Vue 3 + Tailwind). Vite gives fast dev + simple static build for a marketing page.
- **Alternatives considered**: Keeping the static HTML/Bootstrap site (rejected — user wants a
  Vue rebuild); Nuxt/SSR (rejected — overkill for a single static marketing page, no SEO-critical
  server rendering required beyond what pre-render/static hosting covers).

## Decision 2 — Styling: Tailwind CSS with a token design system

- **Decision**: Tailwind CSS v4 (utilities in markup), with colors, type scale, and spacing
  defined as theme tokens. A green brand palette derived from the existing site (primary green
  `#1b6b3a` family) plus a warm accent from the design.
- **Rationale**: Constitution VI (Tailwind-only, tokens, no scattered CSS). A named palette keeps
  light/dark theming and RTL consistent. The old site's green identity is preserved for brand continuity.
- **Alternatives considered**: Bootstrap (rejected — Tailwind is required for Vue per house rules);
  ad-hoc CSS (rejected by constitution).

## Decision 3 — Internationalization & RTL

- **Decision**: `vue-i18n` with two catalogs (`ar` default, `en`). Direction (`dir`) and `lang`
  are set on `<html>` reactively from the active locale. Tailwind logical utilities
  (`ms-*`/`me-*`, `ps-*`/`pe-*`, `text-start`/`text-end`) are used so layout mirrors automatically.
- **Rationale**: Constitution VIII (Arabic-first, both locales in sync, RTL-correct). Logical
  properties avoid a second RTL stylesheet.
- **Alternatives considered**: `data-ar`/`data-en` attribute swapping (the old site's approach) —
  rejected: not scalable, easy to desync, no pluralization/interpolation. Physical `left/right`
  utilities — rejected: break under RTL.

## Decision 4 — State & persistence

- **Decision**: One Pinia setup store (`preferences`) holds `locale` and `theme`, and persists
  both to `localStorage`; it hydrates on load, falling back to Arabic + light when storage is
  unavailable.
- **Rationale**: Constitution II (Pinia setup stores) and FR-013 (persist across visits).
- **Alternatives considered**: Component-local refs (rejected — shared across navbar toggles and
  root layout); a persistence plugin (unnecessary for two keys).

## Decision 5 — Central HTTP client (future-proofing)

- **Decision**: Create `src/lib/axios.ts` with `baseURL` from `VITE_API_URL` + auth/401
  interceptors, even though v1 consumes no API.
- **Rationale**: Constitution III mandates a single configured client and forbids hardcoded hosts.
  Establishing it now keeps future dynamic content (e.g. testimonials from an API) compliant.
- **Alternatives considered**: Omitting it (rejected — would invite ad-hoc `fetch` calls later).

## Decision 6 — Motion

- **Decision**: GSAP (+ ScrollTrigger) for section entrance/scroll reveals via a `useReveal`
  composable; Animate.css for simple one-shot effects. All motion gated on
  `prefers-reduced-motion`.
- **Rationale**: Constitution VII (motion with intent, reduced-motion honored).
- **Alternatives considered**: CSS-only transitions everywhere (fine for small effects, but GSAP
  gives coordinated scroll reveals the design implies); heavy animation libraries (rejected).

## Decision 7 — Carousel (hero + testimonials)

- **Decision**: A small in-house `BaseCarousel.vue` (accessible, keyboard-operable, RTL-aware)
  reused by both the hero and testimonials, instead of adding a carousel dependency.
- **Rationale**: Constitution IX (reuse before adding) and keeping the dependency surface small;
  full control over RTL + a11y + focus.
- **Alternatives considered**: Swiper/other libs (rejected — extra weight for two simple carousels).

## Decision 8 — Images & assets

- **Decision**: Migrate the existing `images/*.jpeg` into `public/images/` and reference them for
  the doctor portrait and result/testimonial imagery. Any decorative iconography uses an icon set
  (inline SVG components or an icon font already familiar to the project). Missing images degrade
  to a neutral placeholder/background.
- **Rationale**: FR-015 (reuse existing photos, graceful fallback) and the user's instruction to
  use the images they already have.
- **Alternatives considered**: Pulling the Healthwise360 design's own stock images (rejected —
  content must be the doctor's own; design is used for layout/style only).

## Decision 9 — Testing scope

- **Decision**: Vitest unit tests for the preferences store, the `ar`/`en` key-parity check, and
  key composables; visual/responsive/RTL/a11y verified manually via `quickstart.md`.
- **Rationale**: The feature is presentation-heavy; automated value concentrates in i18n parity
  and preference logic, while layout correctness is best verified visually.
