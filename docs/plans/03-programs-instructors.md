# Implementation Plan: Academic Programs & Instructors (Module 3)

> **Reference Document**: [`docs/programs-instructors.md`](../programs-instructors.md)  
> **Target**: Implement the `Instructors` and `Programs` collections in Payload CMS v3, seed initial faculty and curriculum data, create frontend query helpers, and dynamically connect them to SPI's program and faculty pages.

---

## Overview & Architecture Goals

1. **Faculty Management**: Create a dedicated `Instructors` collection containing academic titles, affiliations, bios, avatars/photos, ratings, and social channels.
2. **Curricular Structure**: Create a flexible `Programs` collection supporting semesters/modules, session breakdowns, program specifications, and registration call-to-actions.
3. **Database Footprint**: Account for exactly which tables are generated in SQLite (`instructors`, `instructors_socials`, `programs`, `programs_rels`, `programs_curriculum`, `programs_curriculum_lessons`).
4. **Seamless Frontend Integration**: Connect `/about-v1/pengajar`, `/kursus-singkat`, `/komik-intensif`, `/tuesdays-special`, and `/courses-v1` to Payload Local API with 100% resilient fallback to static content.
5. **Quality Gate**: 0 TypeScript errors, 0 ESLint warnings, all public routes returning `200 OK`, clean production build.

---

## Detailed Step-by-Step Tasks

### Step 3.1: Implement Instructors Collection
- **File**: `payload/collections/Instructors.ts`
- **Actions**:
  1. Fields:
     - `name` (text, required): Full name with titles (e.g. "Dr. Akmal Sjafril, S.T., M.Pd.I.").
     - `slug` (text, unique, required, indexed).
     - `initials` (text, max 3 chars, e.g. "AS"): auto-generated from name if omitted.
     - `titleDegree` (text): Academic degree or title.
     - `role` (text): E.g. "Pendiri dan Kepala Pusat SPI".
     - `institution` (text): Academic or organizational affiliation.
     - `photo` (upload relation to `media`).
     - `bio` (textarea or Lexical richText).
     - `rating` (text, default "4.9/5").
     - `studentsCount` (text, e.g. "14 Angkatan").
     - `coursesCount` (text, e.g. "9 Topik kajian").
     - `socials` (array): `platform` (select), `url` (text).
     - `order` (number, default 100): Display sorting weight.
     - `status` (select: `draft`, `published`, default: `published`).
  2. Hooks:
     - Auto-slugify `name` -> `slug`.
     - Auto-extract initials from `name` (e.g. "Dr. Akmal Sjafril" -> "AS").
  3. Access:
     - Read: Public can read published items; authenticated users can read all.
     - Create/Update/Delete: Authenticated users only.

### Step 3.2: Implement Programs Collection
- **File**: `payload/collections/Programs.ts`
- **Actions**:
  1. Fields:
     - `title` (text, required).
     - `slug` (text, unique, required, indexed).
     - `programType` (select: `kursus-singkat`, `komik-intensif`, `tuesdays-special`, `reguler`, `tematik`).
     - `tagline` (text): Short highlight badge.
     - `overview` (richText using Lexical, required).
     - `leadInstructor` (relationship to `instructors`, `hasMany: false`).
     - `instructors` (relationship to `instructors`, `hasMany: true`).
     - `featuredImage` (upload relation to `media`).
     - `videoId` (text, default "lrhxrMZozA0"): YouTube preview video ID.
     - `curriculum` (array):
       - `title` (text, required): Semester / Module name.
       - `description` (textarea).
       - `lessons` (array of objects with `title` text).
     - `specifications` (group):
       - `sessions` (text, e.g. "22 Sesi").
       - `duration` (text, e.g. "2 Semester").
       - `level` (text, e.g. "Semua jenjang").
       - `language` (text, default "Indonesia").
       - `certificate` (checkbox, default false).
       - `price` (text, default "—").
     - `enrollment` (group):
       - `status` (select: `open`, `upcoming`, `closed`, default: `open`).
       - `ctaLabel` (text, default "Daftar Sekarang").
       - `ctaUrl` (text, default "#").
     - `meta` (SEO group: title, description, image).
     - `status` (select: `draft`, `published`, default: `published`).
  2. Hooks:
     - Auto-slugify `title` -> `slug`.
  3. Access:
     - Read: Public can read published programs; authenticated users can read all.
     - Create/Update/Delete: Authenticated users only.

### Step 3.3: Register Collections in Payload Configuration
- **File**: `payload.config.ts`
- **Actions**:
  1. Import `Instructors` from `./payload/collections/Instructors`.
  2. Import `Programs` from `./payload/collections/Programs`.
  3. Add both to `collections: [Users, Media, Categories, Tags, Authors, Articles, Instructors, Programs]`.

### Step 3.4: Generate Types & Verify Database Table Footprint
- **Actions**:
  1. Restart dev server / trigger schema push to SQLite `data/payload.db`.
  2. Verify new tables in SQLite schema:
     - `instructors`
     - `instructors_socials`
     - `programs`
     - `programs_rels`
     - `programs_curriculum`
     - `programs_curriculum_lessons`
  3. Run `npx tsc --noEmit` to verify type generation.

### Step 3.5: Seed Faculty & Programs Data
- **File**: `scripts/seed-programs.ts`
- **Actions**:
  1. Seed 13 faculty members from `content/inner/about-v1.ts`.
  2. Seed the 3 flagship programs:
     - **Kursus Singkat Reguler**: 2 semesters, 22 lessons, linked to lead instructor Dr. Akmal Sjafril.
     - **KOMIK Intensif**: Online intensive program details.
     - **Tuesday's Special**: Weekly worldview study series.
  3. Execute seed script via `npx tsx scripts/seed-programs.ts`.

### Step 3.6: Build Frontend Query Helpers
- **File**: `lib/getPrograms.ts`
- **Actions**:
  1. Implement `getInstructors()`: Fetches all published instructors ordered by `order` ASC, falls back to `aboutV1PengajarContent.members`.
  2. Implement `getProgramBySlug(slug: string)`: Fetches program by slug with populated `leadInstructor` and `featuredImage`.
  3. Implement `getPrograms()`: Fetches all published programs for directory/listing views.

### Step 3.7: Integrate Frontend Pages
- **Files**:
  - `components/pages/inner/about-v1/PengajarSection.tsx`: Connect to `getInstructors()`.
  - `components/pages/inner/about-v1/PengajarTeamSection.tsx`: Connect to `getInstructors()`.
  - `app/(site)/kursus-singkat/page.tsx`: Connect to `getProgramBySlug("kursus-singkat")`.
  - `app/(site)/komik-intensif/page.tsx`: Connect to `getProgramBySlug("komik-intensif")`.
  - `app/(site)/tuesdays-special/page.tsx`: Connect to `getProgramBySlug("tuesdays-special")`.
  - `components/pages/inner/courses-v1/CoursesClassicSection.tsx`: Connect to `getPrograms()`.

### Step 3.8: Regression Testing & Production Build
- **Actions**:
  1. Run `npx tsc --noEmit` to ensure 0 TypeScript errors.
  2. Run `npm run lint` to ensure clean code style.
  3. Test all program and instructor endpoints with `curl` on dev server:
     - `/about-v1/pengajar` -> `200 OK`
     - `/about-v1/pengajar-alt` -> `200 OK`
     - `/kursus-singkat` -> `200 OK`
     - `/komik-intensif` -> `200 OK`
     - `/tuesdays-special` -> `200 OK`
     - `/courses-v1` -> `200 OK`
     - `/api/instructors` -> JSON response with 13 instructors
     - `/api/programs` -> JSON response with 3 programs
  4. Run `npm run build` to confirm standalone production build passes cleanly.
