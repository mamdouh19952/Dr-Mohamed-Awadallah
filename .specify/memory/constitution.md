<!--
  Sync Impact Report
  ==================
  Version change: (unversioned template) → 1.0.0

  Modified principles:
  - N/A — initial creation. All 9 principles adopted from constitution-vue.md reference.

  Added sections:
  - Core Principles I–IX: Composition API, Pinia, HTTP Client, Stateful Fetching,
    Design System, Tailwind-only Styling, Motion with Intent, i18n + RTL, Feature
    Structure & Clean Code.
  - Quality Gates: 6 verifiable done-criteria derived from the principles.
  - Governance: amendment procedure, versioning policy, compliance gate requirement.

  Templates reviewed:
  - .specify/templates/plan-template.md    ✅ — Constitution Check section is generic
    ("[Gates determined based on constitution file]"); adapts at runtime. No edit needed.
  - .specify/templates/spec-template.md   ✅ — Scope and requirements sections are
    compatible with all principles. No edit needed.
  - .specify/templates/tasks-template.md  ✅ — Phase structure supports principle-driven
    categories (design, RTL, motion, i18n). No edit needed.

  Deferred TODOs: None — all fields resolved from project context.
-->

# Regem Front Constitution

## Core Principles

### I. Composition API only
All components MUST use `<script setup>` with the Composition API. The Options API is
forbidden. In TypeScript files, prefer typed interfaces over `any`.

### II. Pinia for shared state
Global or cross-component state MUST live in Pinia **setup stores**
(`defineStore('x', () => { ... })`), one store per domain. Local-only state stays
in the component. Do not reach into another store's internals; communicate through
actions or exposed state refs.

### III. One central HTTP client — decoupled-origin aware
A single Axios instance (`src/lib/axios`) MUST own all HTTP configuration:
- `baseURL` read from `VITE_API_URL` — never hardcode the API host in components or
  stores.
- Request interceptor attaches the auth token as `Authorization: Bearer <token>`.
- Response interceptor handles `401` centrally (clear session → redirect to login).
Because the SPA and API are on **different origins**, the API owns CORS. Do not send
cookies unless the API explicitly requires cookie-based auth.

### IV. Stateful data fetching
Server reads MUST go through composables or store actions exposing `data / loading /
error` refs, using `async/await` — never `.then().catch()` chains. Every async UI MUST
render explicit loading and error states; a silent blank screen is a defect. Surface
API `422` validation errors inline, not as generic alerts.

### V. Design is a first-class concern — responsive & professional
UIs MUST be mobile-first and fully responsive at every breakpoint (sm/md/lg verified).
Maintain a real design system: a defined color palette/scale, a consistent type scale,
and consistent spacing — all as Tailwind theme tokens, never ad-hoc values. Accessible
contrast (WCAG AA), labeled inputs, and visible focus rings are non-negotiable. Design
quality is part of "done", not an afterthought.

### VI. Tailwind-only styling — no scattered CSS
Style with Tailwind utilities in the markup. Per-component `.css` dumps and inline
`style="..."` attributes for layout are forbidden. Repeated visual patterns MUST become
reusable components (or a single sparing `@apply` in a shared stylesheet). Colors,
spacing, and typography MUST come from the Tailwind theme so the look stays consistent
and themable.

### VII. Motion with intent
Animation MUST serve UX, not decoration: entrance reveals, state transitions, hover
micro-interactions. Use GSAP for orchestrated or scroll-driven motion; use Animate.css
for simple one-shot effects. Keep motion tasteful — do not animate everything — and
always honor `prefers-reduced-motion`.

### VIII. Internationalized + RTL by default
No user-facing string MUST be hardcoded — all copy goes through i18n with both `ar` and
`en` keys kept in sync (both added in the same change). Arabic-first: layouts MUST be
RTL-correct (`dir="rtl"`, mirrored spacing and directional icons) and verified in RTL
before a feature is considered done.

### IX. Feature structure, clean code, client-validation-as-UX
Organize by feature: `pages/<Feature>/index.vue`, shared `components/`, `composables/`,
`stores/<name>/`, `router/`, `i18n/locales/`, `types/`. Reuse before adding. No
commented-out code blocks or stray `console.log` statements are permitted in committed
code. Client-side form validation (vee-validate + yup) is for UX speed; the API remains
the source of truth for correctness.

## Quality Gates

A feature is only "done" when ALL of the following pass:

- Responsive and RTL layout verified at every breakpoint before marking done.
- Loading and error states handled for every async interaction.
- No scattered CSS; all colors, spacing, and typography flow from the Tailwind theme.
- Animations respect `prefers-reduced-motion`; no gratuitous or decorative motion.
- No duplicated logic; shared behavior extracted into a composable or store action.
- Accessibility: labeled form controls, keyboard-navigable, visible focus ring, WCAG AA
  contrast on all text.

## Governance

This constitution supersedes all ad-hoc preferences and informal agreements. Any
amendment requires an explicit note in the associated spec or PR describing what changed
and why, and MUST increment the version using semantic versioning:

- **MAJOR**: Backward-incompatible removal or redefinition of an existing principle.
- **MINOR**: New principle or section added, or existing guidance materially expanded.
- **PATCH**: Clarifications, wording improvements, or non-semantic refinements.

A spec that deviates from a principle MUST state the deviation and its written
justification; an unstated deviation is treated as a defect and MUST be corrected before
merge. All implementation plans MUST include a Constitution Check gate that explicitly
verifies compliance with each applicable principle before proceeding.

**Version**: 1.0.0 | **Ratified**: 2026-07-18 | **Last Amended**: 2026-07-18
