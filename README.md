# Dr. Mohamed Awadallah — Landing Page

A bilingual (Arabic-first, RTL/LTR) marketing landing page for **Dr. Mohamed Awadallah**,
Therapeutic Nutrition & Weight-Loss Specialist. The page introduces the doctor, builds
credibility through stats, success stories and patient testimonials, and drives visitors
toward booking a consultation via phone or WhatsApp.

## Tech Stack

- **Vue 3** (`<script setup>` Composition API)
- **TypeScript**
- **Vite** — dev server & build
- **Pinia** — state management (setup stores)
- **Vue Router**
- **Vue I18n** — Arabic (default, RTL) / English (LTR)
- **Tailwind CSS**
- **Vitest** + **Vue Test Utils** — unit/component tests

## Project Structure

```
src/
  pages/          # One folder per route/section (Home, About, Services, Cases, Reviews, Contact)
  components/
    layout/       # Header, footer, navigation, etc.
    sections/     # Landing page sections
    ui/           # Shared/reusable UI elements
  composables/    # Reusable composition functions
  stores/
    preferences/  # Language & theme (dark/light) preferences
  router/         # Route definitions
  i18n/
    locales/      # ar.ts, en.ts translation files
  lib/            # Shared utilities (e.g. axios instance)
  data/           # Static content/data used by sections
  types/          # Shared TypeScript types
  assets/styles/  # Global styles
public/
  images/         # Static images
specs/            # Feature specs, plans and tasks (spec-driven development)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable       | Description                  |
|----------------|-------------------------------|
| `VITE_API_URL` | Base URL for the backend API |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build      # type-checks then builds for production
npm run preview    # preview the production build locally
```

### Testing & Type Checking

```bash
npm run test         # run unit tests with Vitest
npm run type-check   # run vue-tsc without emitting output
```

## Localization

The site is **Arabic-first**: it loads in Arabic with a right-to-left (RTL) layout by
default, and visitors can switch to English (LTR). Translation strings live in
`src/i18n/locales/ar.ts` and `src/i18n/locales/en.ts` — every user-facing string must be
added to both files. The selected language and theme (dark/light) preferences are
persisted (see `src/stores/preferences`).

## Deployment

This project is configured for deployment on **Vercel** (`vercel.json` rewrites all
routes to `index.html` to support client-side routing).

## Spec-Driven Development

The `specs/` directory contains the feature specification, implementation plan, data
model, and task breakdown for the landing page, following a spec-driven development
workflow.
