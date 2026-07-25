# Tasks: Dr. Mohamed Awadallah — Nutrition & Weight-Loss Landing Page

**Feature**: `001-doctor-landing` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

**Tech**: Vue 3 + TS + Vite + Tailwind v4 + Pinia + vue-router + vue-i18n + GSAP/Animate.css.
Standalone SPA at the repository root, replacing the old static site.

Paths are repository-root relative. `[P]` = parallelizable (different files, no incomplete deps).

---

## Phase 1: Setup (project initialization)

- [ ] T001 Scaffold a Vite + Vue 3 + TypeScript project at the repo root (keep existing `images/`, `specs/`, `.specify/`, `CLAUDE.md`); create `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.ts`, `src/App.vue`.
- [ ] T002 Install runtime deps (`vue-router`, `pinia`, `vue-i18n`, `axios`, `gsap`, `animate.css`) and dev deps (`tailwindcss @tailwindcss/vite`, `vitest`, `@vue/test-utils`, `jsdom`, `typescript`, `vue-tsc`) in `package.json`.
- [ ] T003 Configure Tailwind v4 via `@tailwindcss/vite` in `vite.config.ts` and create `src/assets/styles/main.css` importing Tailwind + `animate.css`.
- [ ] T004 Define the design-token theme (green brand scale, warm accent, neutral scale, type scale, spacing, radius, shadows) as Tailwind theme tokens in `tailwind.config.ts` / `main.css` `@theme`, with light + dark values.
- [ ] T005 [P] Migrate photos: move the existing root `images/*.jpeg` into `public/images/` (keep filenames) so they ship as static assets.
- [ ] T006 [P] Add `.gitignore`, `.env.example` (with `VITE_API_URL=`), and npm scripts (`dev`, `build`, `preview`, `test`, `type-check`) to `package.json`.

**Checkpoint**: `npm run dev` serves a blank App shell with Tailwind working.

---

## Phase 2: Foundational (blocking prerequisites for all stories)

- [ ] T007 Create content types in `src/types/content.ts` (`Stat`, `Service`, `Result`, `Testimonial`, `ContactChannel`, `NavLink`, `Locale`, `Theme`) per data-model.md.
- [ ] T008 Create the i18n instance in `src/i18n/index.ts` (default locale `ar`, fallback `en`, `legacy: false`).
- [ ] T009 Create the Arabic catalog `src/i18n/locales/ar.ts` with ALL keys (nav, hero, stats, about, services, results, testimonials, contact, footer, common) using the migrated Arabic copy from the old site.
- [ ] T010 Create the English catalog `src/i18n/locales/en.ts` mirroring every key in `ar.ts` using the old site's English copy (keep keys identical/in sync).
- [ ] T011 Create typed content data in `src/data/content.ts` (nav links, 4 stats, 6 services, results, testimonials, contact channels) referencing i18n keys + image paths.
- [ ] T012 Create the Pinia `preferences` setup store in `src/stores/preferences/index.ts` (`locale`, `theme`; actions `setLocale`, `toggleLocale`, `setTheme`, `toggleTheme`; hydrate from + persist to `localStorage`; set `<html>` `lang`/`dir`/`data-theme`).
- [ ] T013 [P] Create `src/composables/useTheme.ts` (apply theme to `<html>`, respect initial `prefers-color-scheme` only when no stored value).
- [ ] T014 [P] Create `src/composables/useReveal.ts` (GSAP ScrollTrigger entrance reveal, no-op when `prefers-reduced-motion: reduce`).
- [ ] T015 [P] Create the central Axios client in `src/lib/axios.ts` (`baseURL` from `import.meta.env.VITE_API_URL`, request interceptor for `Authorization: Bearer`, 401 response interceptor) — constitution III, unused in v1.
- [ ] T016 Create `src/router/index.ts` with a single route `/` → `pages/Home/index.vue`, and wire `router`, `pinia`, `i18n` in `src/main.ts`.
- [ ] T017 Wire `src/App.vue` to hydrate preferences on mount, set `dir`/`lang`/`data-theme`, and render `<RouterView>`.
- [ ] T018 [P] Create shared UI primitives: `src/components/ui/BaseButton.vue` (primary/ghost variants) and `src/components/ui/SectionHeading.vue` (tag + title + optional subtitle).

**Checkpoint**: App renders in Arabic RTL with tokens, i18n, store, and routing in place.

---

## Phase 3: User Story 1 — Evaluate the doctor & book a consultation (Priority: P1) 🎯 MVP

**Goal**: A visitor understands the doctor and reaches a way to book. Delivers the full content funnel.

**Independent test**: Load the page, read hero value prop + CTA, scroll through credibility
(stats, results, reviews), and initiate contact (phone/WhatsApp/CTA).

- [ ] T019 [P] [US1] Build `src/components/layout/TheNavbar.vue` — sticky brand + nav links (from content), mobile collapse menu, smooth-scroll anchors, scroll-elevate; slots for LangToggle/ThemeToggle.
- [ ] T020 [P] [US1] Build `src/components/ui/BaseCarousel.vue` — accessible, keyboard + RTL-aware, prev/next + dots, autoplay w/ pause on hover/focus (reused by hero + testimonials).
- [ ] T021 [US1] Build `src/components/sections/HeroSection.vue` — headline/subcopy from i18n, primary "book" + secondary "learn more" CTAs, hero imagery from `/images` with fallback.
- [ ] T022 [P] [US1] Build `src/components/sections/StatsBar.vue` — 4 metrics with count-up on view (reduced-motion → instant).
- [ ] T023 [P] [US1] Build `src/components/sections/AboutSection.vue` — portrait (`/images/...59.59.jpeg` with fallback), name/title/bio, credential pills, CTA.
- [ ] T024 [P] [US1] Build `src/components/sections/ServicesGrid.vue` — 6 numbered service cards from content/i18n.
- [ ] T025 [P] [US1] Build `src/components/sections/ResultsSection.vue` — before/after transformation cards with image fallbacks.
- [ ] T026 [P] [US1] Build `src/components/sections/TestimonialsSection.vue` — reviews via `BaseCarousel` (name, city, stars, text).
- [ ] T027 [P] [US1] Build `src/components/sections/ContactSection.vue` — phone `tel:`, WhatsApp `wa.me`, address, hours, embedded map with textual fallback.
- [ ] T028 [P] [US1] Build `src/components/layout/TheFooter.vue` — brand, tagline, social links, copyright.
- [ ] T029 [US1] Compose `src/pages/Home/index.vue` in section order (nav → hero → stats → about → services → results → testimonials → contact → footer).

**Checkpoint**: Full landing page renders in Arabic with a working contact funnel (MVP).

---

## Phase 4: User Story 2 — Arabic-first with optional English (Priority: P1)

**Goal**: Full bilingual parity + correct RTL/LTR flip.

**Independent test**: Toggle AR⇄EN; all text changes, `dir` flips, nothing untranslated; reload keeps choice.

- [ ] T030 [P] [US2] Build `src/components/layout/LangToggle.vue` — calls `preferences.toggleLocale()`, shows the other language label.
- [ ] T031 [US2] Ensure every section component uses `t('...')` (no hardcoded strings); replace any literals found during audit across `src/components/**` and `src/pages/**`.
- [ ] T032 [US2] Verify/adjust logical-direction utilities (`ms/me`, `ps/pe`, `text-start/end`, directional icons) so all sections mirror correctly in RTL and LTR.
- [ ] T033 [P] [US2] Add Vitest test `tests/unit/i18n-parity.spec.ts` asserting `ar` and `en` have identical key sets (FR-011).
- [ ] T034 [P] [US2] Add Vitest test `tests/unit/preferences.store.spec.ts` for locale/theme toggle + persistence + `dir` side-effects.

**Checkpoint**: Language toggle flips text + direction everywhere; parity test passes.

---

## Phase 5: User Story 3 — Responsive + theming on any device (Priority: P2)

**Goal**: Works across breakpoints; dark/light theme persists.

**Independent test**: mobile/tablet/desktop show no overflow/overlap; theme toggle + reload persists.

- [ ] T035 [P] [US3] Build `src/components/layout/ThemeToggle.vue` — calls `preferences.toggleTheme()`, moon/sun icon.
- [ ] T036 [US3] Complete dark-theme token values and verify AA contrast for all sections in dark mode.
- [ ] T037 [US3] Responsive pass across all sections (mobile ~375, tablet ~768, desktop ~1280): fix any horizontal scroll/overlap; verify mobile nav menu + anchor scroll.
- [ ] T038 [P] [US3] Apply tasteful `useReveal` entrance motion to sections (reduced-motion honored).

**Checkpoint**: Responsive + themed + animated, preferences persist.

---

## Phase 6: Polish & cross-cutting

- [ ] T039 [P] Accessibility pass: labels/`aria` on toggles, nav, carousel controls; visible focus rings; logical heading order; keyboard operability (FR-016).
- [ ] T040 [P] Image robustness: ensure every `<img>` has an `onerror`/fallback so no broken-image icon appears (SC-007).
- [ ] T041 [P] SEO/meta: `index.html` title + meta description (AR), favicon, `lang`/`dir` initial attributes.
- [ ] T042 Run `npm run type-check` and `npm run test`; fix any type or test failures; remove dead code / stray `console.log`.
- [ ] T043 Delete the old static site files (`index.html` legacy content is replaced by Vite entry; remove old `css/`, `js/`, and the root `images/` after confirming they were migrated to `public/images/`).
- [ ] T044 Run `npm run build` + `npm run preview` and validate against `quickstart.md` scenarios (RTL, bilingual, responsive, theme, fallbacks, a11y).

---

## Dependencies & execution order

- **Setup (T001–T006)** → **Foundational (T007–T018)** → **US1 (T019–T029)** → **US2 (T030–T034)** → **US3 (T035–T038)** → **Polish (T039–T044)**.
- US1 is the MVP and can ship before US2/US3 (renders in Arabic by default).
- US2 and US3 both build on US1's components but are largely independent of each other.

## Parallel opportunities

- Setup: T005, T006 in parallel.
- Foundational: T013, T014, T015, T018 in parallel after T007–T012.
- US1: T019, T020, T022–T028 are `[P]` (separate component files); T021 and T029 depend on shared pieces (BaseCarousel / all sections).
- US2: T030, T033, T034 in parallel; T031/T032 are cross-file audits (run together).
- US3: T035, T038 in parallel with T036/T037.
- Polish: T039, T040, T041 in parallel; T042–T044 sequential at the end.

## MVP scope

**User Story 1 (Phase 1 + 2 + 3)** — the full landing page in Arabic with a working contact
funnel. Bilingual (US2) and responsive/theming polish (US3) layer on top.

## Format validation

All tasks use `- [ ] Txxx [P?] [US?] description + path`; setup/foundational/polish carry no
story label; user-story tasks carry `[US1]`/`[US2]`/`[US3]`; every task names concrete file paths.
