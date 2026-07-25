# Feature Specification: Dr. Mohamed Awadallah — Nutrition & Weight-Loss Landing Page

**Feature Branch**: `001-doctor-landing`

**Created**: 2026-07-18

**Status**: Draft

**Input**: User description: "Arabic-first (RTL), bilingual (Arabic + English) marketing landing page for Dr. Mohamed Awadallah — Therapeutic Nutrition & Weight-Loss Specialist. Rebuild the site by adapting the visual layout/structure of the Healthwise360 weight-loss comparison design, populated with the doctor's existing Arabic content and photos. Replaces the old static HTML site."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Prospective patient evaluates the doctor and books a consultation (Priority: P1)

A person searching for a trustworthy weight-loss / nutrition specialist lands on the page, quickly grasps who the doctor is and what he offers, sees proof he can deliver (stats, real results, reviews), and reaches a clear way to book a consultation.

**Why this priority**: Converting a visitor into a booked consultation is the single business goal of the site. Everything else supports this journey. Shipping only this journey (hero → credibility → contact) is already a viable MVP.

**Independent Test**: Load the page, read the hero value proposition, scroll to the contact section, and successfully initiate a booking action (tap phone, WhatsApp, or the "Book a consultation" call-to-action). Delivers value even with no other polish.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on the home page, **When** the page loads, **Then** a headline stating the doctor's core promise and at least one visible "Book a consultation" call-to-action appear without scrolling on a typical laptop screen.
2. **Given** a visitor anywhere on the page, **When** they choose to contact the clinic, **Then** they can reach a working phone number, a WhatsApp conversation, and the clinic location/hours.
3. **Given** a visitor who wants proof, **When** they scroll, **Then** they encounter quantified credibility (success cases, years of experience, satisfaction), before/after transformations, and patient testimonials.

---

### User Story 2 - Arabic-first visitor with optional English (Priority: P1)

Most visitors read Arabic and expect a right-to-left layout by default; some prefer English. The visitor can switch language and the entire interface — text, layout direction, and mirrored spacing — updates consistently.

**Why this priority**: The audience is Arabic-first; an untranslated or LTR-broken page fails the core audience. Bilingual parity is an explicit requirement, so it ranks alongside the booking journey.

**Independent Test**: Load the page (defaults to Arabic, RTL). Toggle to English and confirm all visible copy changes to English and the layout flips to LTR with correctly mirrored alignment; toggle back and confirm Arabic RTL is restored. No string remains untranslated in either language.

**Acceptance Scenarios**:

1. **Given** a new visitor, **When** the page first loads, **Then** it displays in Arabic with a right-to-left layout by default.
2. **Given** any language, **When** the visitor activates the language toggle, **Then** every user-facing string switches to the other language and the reading direction flips accordingly.
3. **Given** a visitor who selected a language, **When** they reload or return later, **Then** their language choice is remembered.

---

### User Story 3 - Comfortable reading and browsing on any device (Priority: P2)

The visitor browses on phone, tablet, or desktop, optionally in a dark or light appearance, and the page remains legible, well-spaced, and easy to navigate throughout.

**Why this priority**: Reach and comfort increase conversions but the site can launch and convert without dark mode; responsiveness is required, theming is a valued enhancement.

**Independent Test**: Open the page across mobile, tablet, and desktop widths and confirm every section reflows without overlap, clipping, or horizontal scroll; toggle dark/light and confirm contrast and legibility hold.

**Acceptance Scenarios**:

1. **Given** any supported screen size, **When** the page is viewed, **Then** all sections are readable and usable with no horizontal scrolling or overlapping content.
2. **Given** a visitor who prefers a dark appearance, **When** they toggle the theme, **Then** the page switches appearance while preserving readable contrast, and the choice persists across visits.
3. **Given** a visitor on a small screen, **When** they open the navigation, **Then** the menu is reachable and each link scrolls to its section.

### Edge Cases

- A referenced photo is missing or fails to load → a graceful placeholder or neutral background is shown instead of a broken image.
- A visitor's stored language/theme preference is unavailable (private browsing / cleared storage) → the page falls back to the Arabic RTL, light-appearance default.
- Very long Arabic or English strings (e.g. a long testimonial) → text wraps within its container without breaking the layout in either direction.
- The embedded map cannot load → the clinic's textual address and hours remain visible and sufficient to find the clinic.
- A visitor uses keyboard-only navigation or a screen reader → all links, toggles, and calls-to-action are reachable and labeled.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST present, in order, the following sections: a sticky top navigation, a hero, a key-statistics bar, an about-the-doctor section, a services grid, a results / before-after section, a testimonials section, a contact section, and a footer.
- **FR-002**: The top navigation MUST provide links to Home, About, Services, Results, Reviews, and Contact, each scrolling to its section, plus a language toggle and a light/dark theme toggle; it MUST remain accessible while scrolling and collapse into an openable menu on small screens.
- **FR-003**: The hero MUST show the doctor's core value proposition and at least one primary call-to-action to book a consultation.
- **FR-004**: The statistics bar MUST display the four credibility metrics: 1000+ success cases, 16+ years of experience, 98% client satisfaction, and a 5-star patient rating.
- **FR-005**: The about section MUST show the doctor's photo, name, title, biography, and credential highlights (qualifications / memberships).
- **FR-006**: The services section MUST present the six services: personal weight-loss program, therapeutic nutrition, weight-gain program, sports nutrition, children & teen nutrition, and remote online follow-up — each with a title and short description.
- **FR-007**: The results section MUST present client transformation entries, each conveying the outcome achieved (e.g. weight lost over a time period).
- **FR-008**: The testimonials section MUST present multiple patient reviews with the reviewer's name, location, rating, and review text, browsable one at a time.
- **FR-009**: The contact section MUST provide phone number(s), a WhatsApp contact, the clinic address (Nasr City, Cairo), working hours, and an embedded map.
- **FR-010**: The footer MUST show the brand, a tagline, social links, and a copyright line.
- **FR-011**: Every user-facing string MUST be available in both Arabic and English, and both languages MUST be updated together so they never drift out of sync.
- **FR-012**: The page MUST default to Arabic with a right-to-left layout, and switching to English MUST flip the layout to left-to-right with correctly mirrored alignment and spacing.
- **FR-013**: The visitor's language and appearance (theme) selections MUST persist across page reloads and return visits.
- **FR-014**: The page MUST be responsive and fully usable across mobile, tablet, and desktop widths with no horizontal scrolling or overlapping content.
- **FR-015**: The page MUST reuse the doctor's existing photographs for the doctor portrait and client/result imagery, and MUST degrade gracefully when an image is unavailable.
- **FR-016**: All interactive controls (navigation links, toggles, calls-to-action, carousel controls) MUST be keyboard-operable, have visible focus, and carry accessible labels; text MUST meet AA contrast in both appearances.
- **FR-017**: The new page MUST fully replace the previous static site as the site's single entry point.

### Key Entities

- **Service**: One offering the doctor provides — has a title, a short description, and a display order.
- **Result / Transformation**: A client outcome — has an outcome summary (amount lost and duration) and optional before/after imagery.
- **Testimonial**: A patient review — has reviewer name, location, star rating, and review text.
- **Statistic**: A headline credibility metric — has a numeric value, a unit/suffix, and a label.
- **Contact channel**: A way to reach the clinic — has a type (phone, WhatsApp, address, hours, map) and its value(s).
- **Localized string**: Any user-facing text — has an Arabic value and an English value kept in sync.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify what the doctor offers and locate a way to book within 10 seconds of the page loading.
- **SC-002**: A visitor can initiate contact (phone, WhatsApp, or booking call-to-action) from any point on the page in at most two interactions.
- **SC-003**: 100% of user-facing strings render in the selected language, with zero untranslated or missing strings in either Arabic or English.
- **SC-004**: The page displays correctly with no horizontal scroll or overlapping content at mobile, tablet, and desktop widths (verified at representative breakpoints).
- **SC-005**: Language and theme selections are correctly restored on 100% of reloads and return visits where local storage is available.
- **SC-006**: All text meets AA contrast and all interactive controls are reachable and operable by keyboard in both light and dark appearances.
- **SC-007**: When an image fails to load, no broken-image indicator is shown to the visitor in any section.

## Assumptions

- The page is a single-page marketing site (no user accounts, no server-side data entry, no e-commerce checkout); "booking" means reaching a contact channel, not an online scheduling transaction.
- Content and imagery are sourced from the existing static site (Arabic copy, English copy, and the photos in the `images/` folder); no new professional copywriting or photography is commissioned as part of this feature.
- The two supported languages are Arabic (default) and English; no additional languages are in scope.
- Contact details (phone numbers, WhatsApp, address, hours, map location) carry over from the existing site and are assumed current.
- The site is a static/front-end experience; it does not depend on a backend API for its core content in this version.
- Modern evergreen browsers on current mobile and desktop devices are the support target.
- The old static HTML/CSS/JS site is removed once the new page reaches parity, after its content and images have been migrated.
