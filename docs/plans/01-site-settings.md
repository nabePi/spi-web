# Implementation Plan: Site Settings (Module 1)

> **Reference Document**: [`docs/site-settings.md`](../site-settings.md)  
> **Target**: Implement the `site-settings` Global in Payload CMS and integrate it seamlessly with the Next.js frontend.

---

## Overview & Architecture Goals
- Implement a **Global** (singleton) in Payload CMS for site-wide settings.
- Enforce the **Single Table Strategy** in SQLite (`site_settings`), creating exactly **1 table** with direct foreign keys to `media` and zero auxiliary tables.
- Build a resilient frontend query layer (`lib/getSiteSettings.ts`) with zero-downtime static fallback to [`lib/siteConfig.ts`](../../lib/siteConfig.ts).

---

## Detailed Step-by-Step Tasks

### Step 1.1: Create Payload Global Definition
- **File**: `payload/globals/SiteSettings.ts`
- **Actions**:
  1. Define global configuration with `slug: "site-settings"`.
  2. Implement public read access (`() => true`) and authenticated update access (`({ req }) => Boolean(req.user)`).
  3. Configure 6 visual tabs:
     - **General**: `siteName` (text, required), `tagline` (text), `logoLight` (upload `media`), `logoDark` (upload `media`), `favicon` (upload `media`).
     - **SEO**: `defaultTitle` (text, required), `defaultDescription` (textarea), `keywords` (text, comma-separated to avoid extra tables), `defaultOgImage` (upload `media`), `locale` (select: `id_ID` / `en_US`).
     - **Contact**: `email` (email, required), `phone` (text), `whatsapp` (text), `address` (textarea), `googleMapsUrl` (text), `operatingHours` (text).
     - **Social**: `instagram`, `youtube`, `facebook`, `xTwitter`, `telegram`, `tiktok`, `linkedin` (all text URLs).
     - **Announcement**: `enabled` (checkbox, default false), `badge` (text), `text` (text), `linkUrl` (text), `linkLabel` (text), `openInNewTab` (checkbox).
     - **Footer**: `copyrightText` (text), `footerDescription` (textarea).
  4. Ensure `versions: false` is set so no auxiliary audit table `_site_settings_v` is created.

### Step 1.2: Register Global in Payload Configuration
- **File**: `payload.config.ts`
- **Actions**:
  1. Import `SiteSettings` from `@/payload/globals/SiteSettings`.
  2. Add `SiteSettings` to the `globals: [SiteSettings]` array in `buildConfig`.

### Step 1.3: Generate Types & Verify Type Safety
- **Actions**:
  1. Run `npx tsc --noEmit` to verify type safety across Payload config and schema.
  2. Ensure `payload-types.ts` is generated/updated with the `SiteSetting` type.

### Step 1.4: Database Schema Verification (Single Table Check)
- **Actions**:
  1. Boot the server briefly to let Drizzle ORM create the schema.
  2. Run query on `sqlite_master` in `data/payload.db` to verify:
     - Table `site_settings` exists.
     - Column list matches all defined attributes + foreign keys (`logo_light_id`, `logo_dark_id`, `favicon_id`, `default_og_image_id`).
     - **Zero auxiliary tables created** (Total tables in DB increases by exactly +1: from 9 to 10).

### Step 1.5: REST API & Access Control Verification
- **Actions**:
  1. Test `GET /api/globals/site-settings` (Public read): Must return `200 OK` with JSON settings.
  2. Test `PATCH /api/globals/site-settings` without token: Must return `401 Unauthorized` / `403 Forbidden`.
  3. Test `PATCH /api/globals/site-settings` with admin JWT token: Must update values and return `200 OK`.

### Step 1.6: Build Frontend Query Helper with Graceful Fallback
- **File**: `lib/getSiteSettings.ts`
- **Actions**:
  1. Implement `getSiteSettings()` using `getPayload({ config })` and `payload.findGlobal({ slug: "site-settings", depth: 1 })`.
  2. Wrap in `try/catch`: if the database query fails, returns null, or during static export, gracefully merge with default values from [`lib/siteConfig.ts`](../../lib/siteConfig.ts).
  3. Export a standardized type `SiteSettingsData` compatible with all consuming components.

### Step 1.7: Frontend Integration
- **Files**:
  - `app/layout.tsx`: Consume `getSiteSettings()` for dynamic `<title>`, `<meta description>`, OpenGraph metadata, and favicon.
  - `components/layout/Header.tsx`: Consume dynamic contact details, social links, logo, and render top announcement banner if `announcement.enabled === true`.
  - `components/layout/Footer1.tsx`: Consume dynamic copyright text, footer description, contact email/phone, and social media links.
  - `app/robots.ts`, `app/manifest.ts`, `app/sitemap.ts`: Utilize `getSiteSettings()` for dynamic URLs, site name, and metadata.

### Step 1.8: Regression Testing & Build Verification
- **Actions**:
  1. Run `scratch/test_routes.sh` on all 18 website routes to ensure every route returns `200 OK`.
  2. Run `npm run lint` (0 errors).
  3. Run `npm run build` (successful production build).

---

## Verification Criteria (Definition of Done)
- [ ] `payload/globals/SiteSettings.ts` created and registered in `payload.config.ts`.
- [ ] Database contains exactly 1 new table (`site_settings`).
- [ ] `GET /api/globals/site-settings` returns `200 OK`.
- [ ] Unauthenticated updates are rejected; authenticated updates succeed.
- [ ] `lib/getSiteSettings.ts` works with graceful fallback.
- [ ] Layout, Header, and Footer consume dynamic data.
- [ ] All 18 public website routes return `200 OK`.
- [ ] `npm run build` and `npx tsc --noEmit` pass with 0 errors.
