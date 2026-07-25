# UI / Content Contract: Doctor Landing Page

This is a front-end SPA with no external API. The "contract" is the page's structure, its
sections, and the observable behavior of its interactive controls. Implementation must satisfy
every item below (traceable to the spec's FRs).

## Page composition (top → bottom) — FR-001

1. **Navbar** (sticky) — brand + nav links + LangToggle + ThemeToggle + mobile menu.
2. **Hero** — headline, subcopy, primary CTA (book), secondary CTA (learn more).
3. **Stats bar** — 4 animated metrics.
4. **About** — portrait, name, title, bio, credential pills, CTA.
5. **Services** — 6 cards (numbered), each title + description.
6. **Results** — before/after transformation cards.
7. **Testimonials** — carousel of reviews (name, city, stars, text).
8. **Contact** — phone, WhatsApp, address, hours, embedded map.
9. **Footer** — brand, tagline, social links, copyright.

## Behavior contracts

### Navigation — FR-002
- Navbar stays fixed/visible on scroll; shrinks/elevates on scroll (visual only).
- Each nav link smooth-scrolls to its section anchor.
- Below the `lg` breakpoint the links collapse into a toggleable menu.

### Language toggle — FR-011, FR-012
- Default locale = `ar`, document `dir="rtl"`.
- Activating the toggle switches locale `ar ⇄ en`; **all** visible text updates and `dir` flips
  (`rtl ⇄ ltr`) with mirrored alignment/spacing.
- No user-facing literal strings in components — all via `t('key')`.

### Theme toggle — FR-013, User Story 3
- Toggles `light ⇄ dark` via `data-theme` (or `.dark`) on `<html>`.
- Contrast remains AA in both themes.

### Persistence — FR-013
- `locale` and `theme` are read from `localStorage` on load and written on change.
- Missing/blocked storage → defaults (`ar`, `light`) with no error surfaced.

### Stats — FR-004
- Numbers count up from 0 to target when the section enters the viewport (skipped/instant under
  `prefers-reduced-motion`).

### Carousels (hero optional, testimonials) — FR-008
- One item visible at a time; previous/next controls + indicator dots.
- Keyboard operable (arrow keys / focusable controls); controls are correctly oriented in RTL.
- Auto-advance pauses on hover/focus.

### Images — FR-015, SC-007
- Doctor portrait and result imagery come from `/images/*`.
- Any `<img>` has an `onerror`/fallback so a failed load shows a neutral placeholder, never a
  broken-image icon.

### Contact actions — FR-009, SC-002
- Phone renders as `tel:` link; WhatsApp as a `wa.me` link; both work from any scroll position
  (also reachable via hero/navbar CTAs).
- If the map iframe fails, textual address + hours remain visible.

### Accessibility — FR-016
- All controls keyboard-reachable with a visible focus ring and an accessible name/label.
- Landmarks/headings ordered; color is never the sole information carrier.

### Responsiveness — FR-014, SC-004
- No horizontal scroll and no overlap at mobile / tablet / desktop widths.

## Non-goals (this version)
- No accounts/auth, no online scheduling transaction, no server-side content, no third language.
