# Implementation Plan: Dr. Mohamed Awadallah — Nutrition & Weight-Loss Landing Page

**Branch**: `001-doctor-landing` | **Date**: 2026-07-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-doctor-landing/spec.md`

## Summary

Rebuild the doctor's static marketing site as a single-page, Arabic-first (RTL), bilingual
(ar/en) Vue 3 SPA that adapts the visual structure of the Healthwise360 weight-loss design
while carrying over the doctor's existing Arabic content and photos. The page is a sequence of
marketing sections (nav → hero → stats → about → services → results → testimonials → contact →
footer) with a language toggle and a dark/light theme toggle, both persisted. No backend: all
content is local (i18n message catalogs + static image assets). Emphasis on responsive RTL
layout, a Tailwind-token design system, tasteful motion, and accessibility (per constitution).

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.5 (`<script setup>` Composition API)

**Primary Dependencies**: Vite, Vue Router, Pinia, `vue-i18n`, Tailwind CSS v4, GSAP (scroll/entrance
motion), Animate.css (one-shot effects). Axios present as the central client for future API use
(constitution III) but no live API is consumed in this version.

**Storage**: `localStorage` only — persists language (`lang`) and theme (`theme`) preferences.
No database, no server-side storage.

**Testing**: Vitest + Vue Test Utils for component/unit logic; manual responsive + RTL + a11y
verification against the quickstart checklist (design-heavy feature, so visual verification is primary).

**Target Platform**: Modern evergreen browsers on mobile, tablet, and desktop. Static hosting.

**Project Type**: Single front-end SPA (Archetype A — standalone Vue SPA). No backend in scope.

**Performance Goals**: First meaningful paint fast on a mid-range mobile; interactions at 60fps;
respect `prefers-reduced-motion`. Lighthouse-style "good" on a static marketing page.

**Constraints**: Arabic RTL is the default and must be correct; bilingual parity (no hardcoded
strings); AA contrast in both themes; no horizontal scroll at any breakpoint; graceful image
fallbacks.

**Scale/Scope**: ~9 page sections, 2 languages, ~1 route (single landing page + optional deep
scroll anchors). Small, content-driven scope.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Plan compliance |
|---|-----------|-----------------|
| I | Composition API only | All components use `<script setup>` + TS interfaces; no Options API. ✅ |
| II | Pinia for shared state | `usePreferencesStore` (setup store) owns language + theme. Section content is local/i18n, not global state. ✅ |
| III | One central HTTP client | `src/lib/axios.ts` created with `baseURL` from `VITE_API_URL` + interceptors, per constitution, even though no endpoint is called yet. No hardcoded hosts. ✅ |
| IV | Stateful data fetching | No server reads in v1, so N/A now; the pattern (composable with data/loading/error + async/await) is documented for future use. ✅ (nothing violates it) |
| V | Design is first-class | Mobile-first, responsive at sm/md/lg; a real Tailwind token system (color scale, type scale, spacing); AA contrast; visible focus. ✅ |
| VI | Tailwind-only styling | Utilities in markup; tokens in the Tailwind theme; no per-component `.css` dumps, no inline layout styles. Repeated patterns → shared components. ✅ |
| VII | Motion with intent | GSAP for scroll/entrance reveals, Animate.css for simple effects; tasteful; honors `prefers-reduced-motion`. ✅ |
| VIII | i18n + RTL by default | `vue-i18n` with `ar` + `en` catalogs kept in sync; `dir` flips with locale; Arabic-first default. No hardcoded user-facing strings. ✅ |
| IX | Feature structure & clean code | `pages/`, `components/`, `composables/`, `stores/`, `router/`, `i18n/locales/`, `types/`; reuse before adding; no dead code / stray logs. ✅ |

**Result**: PASS — no violations, Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-doctor-landing/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── content-model.md # Phase 1 output — the UI/content contract for the page
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

Standalone Vite + Vue SPA at the project root (replaces the old static site):

```text
index.html                     # Vite entry (RTL <html dir> set at runtime)
vite.config.ts
tailwind.config.ts             # design tokens: colors, type scale, spacing
tsconfig.json
package.json
public/
  images/                      # migrated doctor photos (from old images/)
src/
  main.ts
  App.vue                      # sets dir/lang, mounts layout + landing page
  assets/
    styles/main.css            # Tailwind entry (@import 'tailwindcss') + sparing @apply
  lib/
    axios.ts                   # central HTTP client (constitution III)
  i18n/
    index.ts
    locales/
      ar.ts                    # Arabic strings (default)
      en.ts                    # English strings (kept in sync)
  stores/
    preferences/index.ts       # Pinia setup store: language + theme (+ persistence)
  composables/
    useTheme.ts                # apply/persist theme, prefers-color-scheme
    useReveal.ts               # GSAP scroll-reveal helper (reduced-motion aware)
  types/
    content.ts                 # Service, Result, Testimonial, Stat, ContactChannel
  data/
    content.ts                 # typed content arrays wired to i18n keys
  components/
    layout/
      TheNavbar.vue
      TheFooter.vue
      LangToggle.vue
      ThemeToggle.vue
    ui/
      BaseButton.vue
      SectionHeading.vue
      BaseCarousel.vue         # reused by hero + testimonials
    sections/
      HeroSection.vue
      StatsBar.vue
      AboutSection.vue
      ServicesGrid.vue
      ResultsSection.vue
      TestimonialsSection.vue
      ContactSection.vue
  pages/
    Home/index.vue             # composes the sections in order
  router/
    index.ts                   # single route "/" → Home
tests/
  unit/                        # Vitest: store, composables, i18n parity
```

**Structure Decision**: Archetype A (standalone Vue SPA). Feature-organized `src/` per
constitution IX. A single route renders the `Home` page composed of section components; shared
UI primitives live under `components/ui`, layout chrome under `components/layout`. Content is
typed (`types/content.ts`) and text flows through `vue-i18n`, so `ar`/`en` stay in sync in one place.

## Complexity Tracking

> No constitution violations — section intentionally empty.
