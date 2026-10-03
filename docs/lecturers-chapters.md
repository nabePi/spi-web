# CMS Modules: Lecturers (Pengajar) & Chapters (Cabang)

Specification document for the **Lecturers (Pengajar)** and **Chapters (Cabang)** modules on the Sekolah Pemikiran Islam (SPI) CMS.

---

## 1. Overview & Business Goals

### Module A: Lecturers (Pengajar)
- **Goal**: Centralized management of SPI's faculty directory comprising 22 scholars, researchers, and practitioners.
- **Frontend Touchpoints**:
  - `/pengajar`: Faculty catalog displaying scholar profiles, academic degrees, roles, institutions, and biographies.
  - `/about-v1/pengajar` and `/about-v1/pengajar-alt`: Kept backwards-compatible.
  - Header Navigation: `Profile -> Pengajar`.
  - Program & Course Details: Cross-referenced teaching faculty.

### Module B: Chapters (Cabang)
- **Goal**: Showcase SPI's presence across 6 major cities throughout Indonesia:
  1. **Jakarta** (SPI Fatahillah - INSISTS, Kalibata, Jakarta Selatan)
  2. **Bandung** (SPI Moh. Natsir - Masjid Istiqamah, Bandung)
  3. **Yogyakarta** (SPI UII - Universitas Islam Indonesia, Yogyakarta)
  4. **Bogor** (SPI Bogor MARJAN - Majelis Pemikiran di Kota Hujan)
  5. **Tangerang** (SPI Tangerang)
  6. **Padang** (SPI Padang)
- **Frontend Touchpoints**:
  - `/cabang`: Dedicated directory page displaying all 6 chapters with city, venue, address, contact person, WhatsApp, and social media.
  - Homepage (`team2` section): "Enam cabang di seluruh Indonesia" dynamically backed by Payload CMS, with CTA pointing to `/cabang`.
  - `/contact`: Chapter directory list assisting prospective attendees in reaching their nearest regional branch.

---

## 2. Schema Architecture & SQLite Database Footprint

Both collections are strictly configured to maintain a minimal single-table database footprint. No join tables are created.

### 2.1 Collection: `Lecturers` (`payload/collections/Lecturers.ts`)
- **Table Name**: `lecturers`
- **Fields**:
  - `name` (text, required): Full name with academic titles (e.g. "Dr. Akmal Sjafril, S.T., M.Pd.I.").
  - `slug` (text, unique, required): URL/identifier slug.
  - `initials` (text, required): 2-3 letter initials for placeholder avatars (e.g. "AS").
  - `titleDegree` (text): Academic degree or honorifics.
  - `role` (text): Primary role (e.g. "Pendiri & Kepala Pusat SPI", "Pakar Pemikiran Islam").
  - `institution` (text): Affiliated institution (e.g. "INSISTS", "Universitas Indonesia").
  - `photo` (upload -> `media`): Optional high-resolution portrait.
  - `bio` (textarea): Biography and scholarly background.
  - `order` (number, default: 100): Sort weight for directory listing.
  - `status` (select: `published`, `draft`, default: `published`).

### 2.2 Collection: `Chapters` (`payload/collections/Chapters.ts`)
- **Table Name**: `chapters`
- **Fields**:
  - `name` (text, required): Chapter designation (e.g. "SPI Fatahillah", "SPI Moh. Natsir", "SPI UII", "SPI Bogor — MARJAN").
  - `slug` (text, unique, required): URL/identifier slug.
  - `city` (text, required): City name (e.g. "Jakarta", "Bandung", "Yogyakarta", "Bogor", "Tangerang", "Padang").
  - `venue` (text): Partner venue or base (e.g. "INSISTS, Kalibata", "Masjid Istiqamah").
  - `address` (textarea): Full address / location detail.
  - `image` (upload -> `media`): Chapter visual or facade photo.
  - `description` (textarea): Brief background of the chapter.
  - `contactPerson` (text): Regional coordinator / PIC.
  - `phone` (text): Contact phone or WhatsApp number.
  - `email` (text): Regional contact email.
  - `order` (number, default: 100): Sort weight (1-6).
  - `status` (select: `published`, `draft`, default: `published`).

---

## 3. Database Impact Verification
- **Before**: 18 tables in `data/payload.db`
- **After**: Exactly 20 tables in `data/payload.db` (+`lecturers`, +`chapters`).
