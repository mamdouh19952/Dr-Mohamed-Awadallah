# Laravel + Vue.js Full-Stack — Working Conventions

Guidance for Claude Code across all projects under `true-projects/`. Distilled from the
reference projects (`e-comm`, `e-commerce_php1`, `api-booking`, `FahimKennel`). When a
project's own `CLAUDE.md` exists, it wins for that project; this file is the shared baseline.

## Role

Senior Full-Stack Developer specialized in Laravel + Vue.js. Write clean, scalable,
production-ready code. Follow SOLID, DRY, KISS. Reuse existing code before writing new.

## Tech Stack

- **Backend**: Laravel 12 (latest), REST API, Eloquent, MySQL (SQLite for local/dev + tests).
- **Frontend**: Vue 3 (`<script setup>` Composition API), Pinia, Vue Router, Axios, Vite.
- **UI**: Tailwind for Vue. **Bootstrap for Blade.** (This split is real — honor it, see below.)
- **Tools**: Git, Vite, Laravel Pint, `composer run dev`.

---

## The 3 project archetypes (detect first, then follow its rules)

Before writing code, identify which archetype the project is:

| Archetype | How to detect | UI | Auth |
|---|---|---|---|
| **A · Vue SPA (standalone)** | `src/` + `vite.config.ts`, no `artisan` | Tailwind + Flowbite | token in `localStorage` |
| **B · Laravel Blade (+API)** | `artisan` + many `resources/views/*.blade.php` | **Bootstrap** | session (web) + token header (api) |
| **C · Laravel API-only** | `artisan` + `routes/api.php` heavy, few/no blades | — (Tailwind if any) | Sanctum |

`FahimKennel` is a hybrid of A+C: Vue SPA served by Laravel, Sanctum bearer tokens.

---

## Archetype A — Vue SPA conventions (`e-comm`)

**Structure** (standalone Vite, TypeScript):
```
src/
  pages/<Feature>/index.vue      # one folder per feature (Home, Cart, Login…)
  component/                     # shared + <feature>/ subfolders
  composables/                   # useGetApi.ts, useGetApiOne.ts (GET wrappers)
  stores/<name>/index.ts         # Pinia setup stores, one folder per domain
  router/index.ts + routes/      # guards via meta.requireAuth / meta.guestOnly
  i18n/index.ts + locales/{ar,en}.ts
  layouts/  types/  assets/
```

**Patterns to follow:**
- Pinia **setup stores**: `defineStore('x', () => { ... return {...} })`.
- **Composables for GET** requests with `data / loading / error` refs + async/await.
- Auth token kept in `localStorage`; user object cached as JSON alongside it.
- User feedback via **`vue3-toastify`** toasts; blocking loads via **`vue-loading-overlay`**.
- **Form validation on the client** with **`vee-validate` + `yup`** schemas.
- **i18n** with `t()` — always add both `ar` and `en` keys, never hardcode UI strings.
- Router guards: `meta.requireAuth`, `meta.guestOnly`.

**Prefer over what the reference does** (clean these up, don't copy the rough edges):
- Use **one central axios instance** (`lib/axios.ts`) with `baseURL` + interceptors that
  attach the token and handle 401 — instead of repeating the base URL and headers in every
  store call (see `FahimKennel/resources/js/lib/axios.js` for the good version).
- Use **async/await** in stores too, not `.then().catch()` chains.
- **Delete dead code** — no commented-out `console.log`/old blocks left behind.

---

## Archetype C — Laravel API conventions (`api-booking`, and the API side of B)

**Controllers** grouped by domain: `app/Http/Controllers/Api/<Domain>/<Domain>Controller.php`.

**JSON envelope — keep it consistent** on every response:
```php
return response()->json([
    'status'  => true,
    'message' => '...',            // human message (success or error)
    'data'    => new XResource($x) // or XResource::collection($xs)
], 200);
```
Use `422` for validation, `401` unauth, `403` forbidden, `404` not found, `201` created.
> Note: reference projects drift between `message`/`msg` and sometimes add `success`.
> Standardize on `status` + `message` + `data`. Don't copy the `msg` variants.

**Validation**: prefer **Form Requests** (`api-booking` style) over inline `Validator::make`
(the `e-commerce_php1` style). `authorize()` returns `true`; rules array per field.

**Services**: extract genuine logic into a service. At minimum, **all media goes through a
`MediaService`** wrapping Spatie — controllers never call Spatie directly:
```php
// collection-based: one "cover" (single) + one "gallery" (multiple) per model
$media->upload($model, $request->file('image'),  'x_cover');
$media->upload($model, $request->file('images'), 'x_gallery');
// methods: upload / update / deleteMedia / deleteMediaItem
```
Resources expose media as URLs (`getFirstMediaUrl`, `getMedia(...)->map(id+url)`).

**Auth**: default to **Laravel Sanctum** (`auth:sanctum`) with a `role` middleware
(`role:admin` / `role:user`). Registration-with-OTP pattern (email OTP, 10-min expiry,
resend throttled) is available in `api-booking` if a project needs verification.
> `e-commerce_php1` uses a legacy custom `access_token` column + header — a pattern to
> recognize, but **prefer Sanctum for new work**.

**Resources**: always use API Resources; use `whenLoaded('relation')` for eager relations.

**Routes**: RESTful `apiResource` is preferred; `api-booking`'s verb-named routes
(`event.create`, `event.destroy`) are its house style — match the existing project's style.

---

## Archetype B — Laravel Blade conventions (`e-commerce_php1`)

- **UI is Bootstrap** (confirmed: `bootstrap.min.css`, admin/user vendor themes). Keep Blade
  styling in Bootstrap — do **not** introduce Tailwind into a Bootstrap Blade project.
- Controllers split by audience: `Controllers/Admin/`, `Controllers/User/`, `Controllers/Api/`.
- Every feature gets **both** a Blade web path and a parallel REST API path, sharing
  Models/Services — only the presentation layer differs (don't duplicate business logic).
- Web auth = session (Jetstream/Fortify `auth:sanctum` guard). Admin gate via role check.
- **Localization**: `LangMiddleware` sets locale from `session('lang')`; switch via
  `GET /change-language/{lang}`; translations in `resources/lang/{en,ar}/`.

---

## Laravel rules (all archetypes)

- Thin controllers; business logic in Services when non-trivial.
- Form Requests for validation; API Resources for responses; proper HTTP status codes.
- Correct Eloquent relationships; avoid N+1 (eager load).
- Only introduce Repository pattern / events / queues / caching when genuinely needed
  (real async work, proven expensive reads) — don't over-engineer small projects.

## Commands (Laravel projects)

```bash
composer run dev              # server + queue + logs + vite, concurrently
composer run setup            # first-time: install, key, migrate, npm, build
composer run test             # or: php artisan test --filter=Name
./vendor/bin/pint             # code style
php artisan migrate:fresh --seed
php artisan storage:link      # when using Spatie MediaLibrary
```

## Localization (all projects)

Arabic-first is the default; some projects are bilingual (ar + en), few English-only.
Check for `resources/lang/` (Blade) or `src/i18n/locales/` (Vue) before assuming scope.
Apply **RTL** for Arabic UI (`dir="rtl"`, mirrored layout). Never hardcode user-facing
strings when an i18n/lang layer exists.

## Before writing code

1. Detect the archetype. 2. Read the neighbouring files and match their style.
3. Reuse existing components/services. 4. Briefly explain the plan. 5. Then code.
Ask when genuinely unclear. Don't install packages, refactor unrelated code, or change
existing APIs/structure unless asked.
