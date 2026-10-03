# Implementation Plan: Events (Module 3)

> **Reference Document**: [`docs/events.md`](../events.md)  
> **Target**: Implement the `Events` collection in Payload CMS v3, enforce a strict single-table SQLite footprint, seed representative event notices (Webinar, Daurah, Offline event), build frontend query helpers, and connect to dedicated event listing and details pages.

---

## Overview & Architecture Goals

1. **Information-First Event Management**: Provide public visibility into SPI's upcoming and past events without registration complexity.
2. **Strict Single-Table Strategy**: Exactly **1 new table** (`events`) in SQLite `data/payload.db`. No auxiliary join tables.
3. **Relational Synergy**: Reuse existing `authors` collection for faculty speaker attributions and `media` for poster flyers.
4. **Dedicated Frontend Routes**:
   - `/events`: Public event directory with status filters (*Akan Datang*, *Arsip Kegiatan*).
   - `/events/[slug]`: Rich event details with countdown, location guide, speaker profile, and external CTA handoff.
5. **Quality Gate**: 0 TypeScript errors, 0 ESLint warnings, all event routes returning `200 OK`, clean standalone production build.

---

## Detailed Step-by-Step Tasks

### Step 3.1: Implement Events Collection
- **File**: `payload/collections/Events.ts`
- **Actions**:
  1. Fields:
     - `title` (text, required): Event title.
     - `slug` (text, unique, required, indexed).
     - `eventType` (select: `webinar`, `offline`, `daurah`, `workshop`, `kuliah-umum`, required, default: `webinar`).
     - `status` (select: `upcoming`, `ongoing`, `completed`, required, default: `upcoming`).
     - `startDate` (date, required): Date and start time.
     - `endDate` (date): Optional end date for multi-day events.
     - `timeLabel` (text, default: "09:00 - 12:00 WIB").
     - `locationType` (select: `online`, `offline`, `hybrid`, required, default: `online`).
     - `locationName` (text, required, e.g. "Zoom Meeting" or physical venue).
     - `locationAddress` (textarea): Venue address or directions for physical events.
     - `featuredImage` (upload relation to `media`, single).
     - `speaker` (relationship to `authors`, single `hasMany: false`).
     - `speakerCustom` (text): Optional guest scholar override.
     - `summary` (textarea, required): Short excerpt for event cards and previews.
     - `description` (richText using Lexical): Comprehensive event rundown and syllabus.
     - `isFree` (checkbox, default: true, label: "Gratis / Bebas Biaya").
     - `price` (number, default: 0, label: "Biaya / Infaq (Rp)").
     - `priceNote` (text, label: "Catatan Biaya", e.g. "Termasuk sertifikat dan konsumsi").
     - `externalCta` (group):
       - `label` (text, default: "Daftar Sekarang").
       - `url` (text, default: "#").
     - `meta` (group for SEO overrides: title, description, image).
  2. Hooks:
     - Auto-slugify `title` -> `slug` before validation if slug is empty.
  3. Access:
     - Read: Public can read all published events.
     - Create/Update/Delete: Authenticated users only.
  4. Admin configuration:
     - `useAsTitle: 'title'`
     - `defaultColumns: ['title', 'eventType', 'startDate', 'locationType', 'status']`

### Step 3.2: Register Events in Payload Configuration
- **File**: `payload.config.ts`
- **Actions**:
  1. Import `Events` from `./payload/collections/Events`.
  2. Add to `collections: [Users, Media, Categories, Tags, Authors, Articles, Events]`.

### Step 3.3: Verify Single Database Table Footprint
- **Actions**:
  1. Query SQLite database schema via `@libsql/client` or script.
  2. Confirm exactly **1 new table** is added: `events`.
  3. Confirm that **NO** `events_rels` or auxiliary tables are created.

### Step 3.4: Seed Initial Event Data
- **File**: `scripts/seed-events.ts` (or shell script via REST API)
- **Actions**:
  1. Seed Event 1 (Webinar):
     - Title: *"Webinar: Krisis Epistemologi dan Urgensi Ru'yat al-Islam"*
     - Event Type: `webinar`, Location: `online` (Zoom Meeting), Status: `upcoming`.
     - Speaker: `Dr. Akmal Sjafril, S.T., M.Pd.I.`
     - Pricing: `isFree: true`, `price: 0`, `priceNote: "Gratis / Terbuka untuk Umum"`
  2. Seed Event 2 (Daurah):
     - Title: *"Daurah Pemikiran Islam: Membedah Worldview Islam dan Tantangan Sekularisme"*
     - Event Type: `daurah`, Location: `hybrid` (Aula SPI Pusat & Zoom), Status: `upcoming`.
     - Speaker: `Dr. Akmal Sjafril, S.T., M.Pd.I.`
     - Pricing: `isFree: false`, `price: 150000`, `priceNote: "Termasuk modul, konsumsi, & e-sertifikat"`
  3. Seed Event 3 (Archived Offline Kuliah Umum):
     - Title: *"Kuliah Umum: Sejarah dan Dinamika Gerakan Pemikiran Islam di Indonesia"*
     - Event Type: `kuliah-umum`, Location: `offline` (Masjid Raya Bintaro Jaya), Status: `completed`.
     - Speaker: `Dr. Akmal Sjafril, S.T., M.Pd.I.`
     - Pricing: `isFree: true`, `price: 0`, `priceNote: "Gratis / Infaq Sukarela"`

### Step 3.5: Build Frontend Query Helpers
- **File**: `lib/getEvents.ts`
- **Actions**:
  1. Define `EventDoc` interface with type-safe properties including `isFree`, `price`, `priceNote`.
  2. `getUpcomingEvents({ limit = 10 })`: Queries `events` where `status IN ['upcoming', 'ongoing']`, sorted by `startDate ASC`.
  3. `getPastEvents({ limit = 10, page = 1 })`: Queries `events` where `status === 'completed'`, sorted by `startDate DESC`.
  4. `getEventBySlug(slug: string)`: Queries a single event by slug with populated `featuredImage` and `speaker`.

### Step 3.6: Build Event Components & Routes
- **Files**:
  - `components/pages/inner/events/EventCard.tsx`: Card component leveraging `.event1__card` with:
    - Left date box (`day` number + `month` short text).
    - Event format badge (`Webinar`, `Daurah`, `Offline`).
    - Price badge (*Gratis* or *Rp 150.000*).
    - Title, schedule time, and venue name.
    - Speaker attribution and thumbnail image.
  - `components/pages/inner/events/EventDetailsSection.tsx`: Details view leveraging `.event-details` and `.event-widget` with:
    - Hero flyer image.
    - Event schedule, location details, and pricing badge/breakdown (`isFree`, formatted price, `priceNote`).
    - Countdown timer to start date.
    - Lexical Rich Text description and rundown.
    - Speaker card and external CTA button.
  - `app/(site)/events/page.tsx`: Directory archive with Upcoming & Past events tabs.
  - `app/(site)/events/[slug]/page.tsx`: Dynamic event reading view with metadata and 404 handling.

### Step 3.7: Regression Testing & Production Build
- **Actions**:
  1. Test API endpoints:
     - `GET /api/events` -> `200 OK`
  2. Test frontend routes via curl:
     - `/events` -> `200 OK`
     - `/events/[slug]` -> `200 OK`
  3. Run full route test script (`test_routes.sh` with 26 routes).
  4. Run `npm run lint` and verify 0 errors.
  5. Run `npm run build` and verify standalone production build passes cleanly.

---

## Verification Criteria (Definition of Done)
- [ ] Exactly 1 new collection (`Events`) registered in `payload.config.ts`.
- [ ] SQLite database verified to contain exactly 1 new table (`events`) and no auxiliary join tables.
- [ ] 3 representative events (Webinar, Daurah, Offline event) seeded into CMS.
- [ ] Query helpers (`getUpcomingEvents`, `getPastEvents`, `getEventBySlug`) implemented with TypeScript safety.
- [ ] Public routes `/events` and `/events/[slug]` fully responsive and styled using SPI's SCSS components.
- [ ] Full route test suite (26 routes) returns `200 OK`.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.
