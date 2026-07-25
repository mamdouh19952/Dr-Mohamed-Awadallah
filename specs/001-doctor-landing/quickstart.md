# Quickstart & Validation Guide: Doctor Landing Page

## Prerequisites
- Node.js 20+ and npm.

## Setup & run
```bash
npm install
npm run dev        # start Vite dev server, open the printed localhost URL
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run test       # Vitest unit tests
```

## Validation scenarios (map to spec Success Criteria)

1. **First impression (SC-001, US1)**: Open the app. Within the first viewport you can read the
   doctor's value proposition and see a "Book a consultation" CTA. ✅ when both are visible without scrolling on a laptop.

2. **Contact reachability (SC-002, US1)**: From the top of the page, reach a working phone
   (`tel:`), WhatsApp (`wa.me`), and the clinic address/hours in ≤ 2 interactions. ✅

3. **Bilingual parity (SC-003, US2)**: Toggle language AR→EN→AR. Every visible string changes;
   nothing stays in the other language or shows a raw key. `npm run test` passes the ar/en
   key-parity test. ✅

4. **RTL/LTR flip (US2)**: In Arabic the layout is RTL (nav, alignment, icons mirrored); in
   English it is LTR. ✅

5. **Responsive (SC-004, US3)**: At mobile (~375px), tablet (~768px), desktop (~1280px) widths,
   no horizontal scroll and no overlap; the mobile nav menu opens and links scroll to sections. ✅

6. **Theme + persistence (SC-005, US3)**: Toggle dark/light — contrast stays readable. Reload:
   both language and theme are restored from `localStorage`. ✅

7. **Image fallback (SC-007)**: Temporarily break an image path; a neutral placeholder appears,
   never a broken-image icon. ✅

8. **Accessibility (SC-006)**: Tab through the page — every link, toggle, CTA, and carousel
   control is reachable with a visible focus ring; check AA contrast in both themes. Reduced-motion
   users see no gratuitous animation. ✅

## References
- Structure & decisions: [plan.md](./plan.md), [research.md](./research.md)
- Content types: [data-model.md](./data-model.md)
- Behavior contract: [contracts/content-model.md](./contracts/content-model.md)
