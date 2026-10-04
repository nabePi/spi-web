# Implementation Plan: Lecturers (Pengajar) & Chapters (Cabang) (Module 5)

> **Reference Document**: [`docs/lecturers-chapters.md`](../lecturers-chapters.md)  
> **Target**: Implement `Lecturers` and `Chapters` collections in Payload CMS v3, seed all 22 faculty members and 6 chapters, create typed local query helpers, build public routes `/pengajar` and `/cabang`, update Homepage and Navigation, and verify end-to-end.

---

## Proposed Changes

### 1. Backend & Collections
- **`payload/collections/Lecturers.ts`**: Single-table collection for faculty members.
- **`payload/collections/Chapters.ts`**: Single-table collection for the 6 chapters.
- **`payload.config.ts`**: Register `Lecturers` and `Chapters`.
- **Database Verification**: Confirm exactly 20 tables in SQLite (`data/payload.db`).

### 2. Seed Data Script
- **`scripts/seed-lecturers-chapters.sh`**:
  - Seed 22 faculty members from `content/inner/about-v1.ts` (`aboutV1PengajarContent.members`).
  - Seed 6 chapters:
    1. Jakarta — SPI Fatahillah (INSISTS, Kalibata, Jakarta Selatan)
    2. Bandung — SPI Moh. Natsir (Masjid Istiqamah, Bandung)
    3. Yogyakarta — SPI UII (Universitas Islam Indonesia, Yogyakarta)
    4. Bogor — SPI Bogor MARJAN (Majelis Pemikiran di Kota Hujan)
    5. Tangerang — SPI Tangerang
    6. Padang — SPI Padang

### 3. Query Helpers
- **`lib/getLecturers.ts`**: `getPublishedLecturers()`, `getLecturerBySlug()`.
- **`lib/getChapters.ts`**: `getPublishedChapters()`, `getChapterBySlug()`.

### 4. Frontend Routes & Components
- **`app/(site)/pengajar/page.tsx`**: Dynamic faculty directory page with search/filtering and scholar cards.
- **`app/(site)/about-v1/pengajar/page.tsx`**: Updated to consume Payload data dynamically.
- **`app/(site)/about-v1/pengajar-alt/page.tsx`**: Updated to consume Payload data dynamically.
- **`app/(site)/cabang/page.tsx`**: Dedicated chapters directory displaying cards for all 6 regional branches.
- **`components/pages/inner/cabang/`**: Components for chapter cards and directory.
- **`components/pages/demos/e-learning/TeamSection.tsx`**: Update Homepage chapter cards to load from CMS dynamically, with CTA pointing to `/cabang`.
- **`components/layout/Header.tsx`**: Navigation updated with `/pengajar` and `/cabang`.
- **`app/sitemap.ts`**: Add `/pengajar` and `/cabang` to sitemap.

---

## Verification Plan

### Automated Tests
1. **TypeScript Check**: `npx tsc --noEmit` -> Code 0.
2. **ESLint**: `npm run lint` -> 0 errors.
3. **Database Schema Verification**: Verify exactly 20 tables in SQLite.
4. **Local HTTP Verification**:
   - `GET /pengajar` -> 200 OK
   - `GET /cabang` -> 200 OK
   - `GET /about-v1/pengajar` -> 200 OK
   - `GET /about-v1/pengajar-alt` -> 200 OK
   - `GET /api/lecturers` -> 200 OK
   - `GET /api/chapters` -> 200 OK
5. **Production Build**: `npm run build` -> Code 0.
