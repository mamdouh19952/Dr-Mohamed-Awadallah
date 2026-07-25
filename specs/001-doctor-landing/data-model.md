# Phase 1 Data Model: Doctor Landing Page

The site has no database. "Data" here is the **typed content model** rendered by the page. Text
values are not stored as literals on these objects — each object holds an **i18n key**, and the
Arabic/English strings live in `src/i18n/locales/{ar,en}.ts`. This keeps both languages in sync
(FR-011) and the content typed (constitution I/IX).

Types live in `src/types/content.ts`; concrete arrays live in `src/data/content.ts`.

## Entities

### Stat (statistics bar — FR-004)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | stable key, e.g. `success-cases` |
| `value` | `number` | target number for count-up (e.g. 1000, 16, 98, 5) |
| `suffix` | `'+' \| '%' \| '★' \| ''` | rendered after the number |
| `labelKey` | `string` | i18n key for the label |

Fixed set: `success-cases (1000+)`, `experience (16+)`, `satisfaction (98%)`, `rating (5★)`.

### Service (services grid — FR-006)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | e.g. `personal-weight-loss` |
| `order` | `number` | 1–6 display order (shown as 01–06) |
| `titleKey` | `string` | i18n key |
| `descKey` | `string` | i18n key |
| `icon` | `string` | icon name/component id |

Fixed set of 6: personal weight-loss program, therapeutic nutrition, weight-gain program,
sports nutrition, children & teen nutrition, remote online follow-up.

### Result (before/after — FR-007)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `outcomeKey` | `string` | i18n key, e.g. "−22 kg in 3 months" |
| `beforeImg` | `string \| null` | path under `/images`, nullable → placeholder |
| `afterImg` | `string \| null` | path under `/images`, nullable → placeholder |

### Testimonial (reviews carousel — FR-008)

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `nameKey` | `string` | i18n key (reviewer name) |
| `locationKey` | `string` | i18n key (city) |
| `rating` | `1..5` | star count |
| `textKey` | `string` | i18n key (review body) |

### ContactChannel (contact section — FR-009)

| Field | Type | Notes |
|-------|------|-------|
| `type` | `'phone' \| 'whatsapp' \| 'address' \| 'hours' \| 'map'` | |
| `icon` | `string` | icon id |
| `titleKey` | `string` | i18n key |
| `values` | `string[]` | phone numbers, links, or i18n keys as appropriate |

### NavLink (navbar — FR-002)

| Field | Type | Notes |
|-------|------|-------|
| `href` | `string` | in-page anchor (`#about`, …) |
| `labelKey` | `string` | i18n key |

### Preferences (persisted UI state — FR-012, FR-013)

Held in the Pinia `preferences` store, not in the content model.

| Field | Type | Notes |
|-------|------|-------|
| `locale` | `'ar' \| 'en'` | default `'ar'`; drives `<html lang>` + `dir` |
| `theme` | `'light' \| 'dark'` | default `'light'`; drives `data-theme` on `<html>` |

**Persistence rules**: on change → write to `localStorage`; on load → read, else default.
Setting `locale` also sets document `dir` (`ar`→`rtl`, `en`→`ltr`).

## Localized string (cross-cutting — FR-011)

Every `*Key` above resolves through `vue-i18n`. Invariant: **for every key present in `ar.ts`
there is the same key in `en.ts` and vice-versa.** A unit test enforces this parity.
