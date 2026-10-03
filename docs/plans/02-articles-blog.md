# Implementation Plan: Articles / Blog (Module 2)

> **Reference Document**: [`docs/articles-blog.md`](../articles-blog.md)  
> **Target**: Implement the complete editorial workflow (Articles, Categories, Tags, Authors) in Payload CMS and integrate with the Next.js public blog views.

---

## Overview & Architecture Goals
- Implement **4 collections**: `Categories`, `Tags`, `Authors`, and `Articles`.
- Maintain **clean relational taxonomy**: 1 primary category per article (`hasMany: false`), multiple concept tags (`hasMany: true`), and dedicated author profiles (`hasMany: false`) decoupled from admin login users.
- Database Footprint: Exactly **5 tables** in SQLite/PostgreSQL (`articles`, `articles_rels`, `categories`, `tags`, `authors`).
- Connect to existing Next.js frontend: 3-column listing archive (`/blog-three-column`) and article details (`/blog/[slug]` or `/blog-details-standard`).

---

## Detailed Step-by-Step Tasks

### Step 2.1: Implement Taxonomy Collections (Categories & Tags)
- **Files**:
  - `payload/collections/Categories.ts`
  - `payload/collections/Tags.ts`
- **Actions**:
  1. **Categories**:
     - Fields: `name` (text, required), `slug` (text, unique, required, indexed), `description` (textarea).
     - Hook: Auto-generate `slug` from `name` before validation if slug is empty.
     - Access: Public read, authenticated create/update/delete.
  2. **Tags**:
     - Fields: `name` (text, required), `slug` (text, unique, required, indexed).
     - Hook: Auto-generate `slug` from `name`.
     - Access: Public read, authenticated create/update/delete.

### Step 2.2: Implement Authors Collection
- **File**: `payload/collections/Authors.ts`
- **Actions**:
  1. Fields:
     - `name` (text, required, e.g. "Dr. Akmal Sjafril, S.T., M.Pd.I.").
     - `designation` (text, e.g. "Pendiri dan Kepala Pusat SPI").
     - `photo` (upload relation to `media`).
     - `bio` (textarea).
  2. Admin display: `useAsTitle: 'name'`.
  3. Access: Public read, authenticated create/update/delete.

### Step 2.3: Implement Articles Collection
- **File**: `payload/collections/Articles.ts`
- **Actions**:
  1. Fields:
     - `title` (text, required).
     - `slug` (text, required, unique, indexed).
     - `status` (select: `draft`, `published`, default: `draft`).
     - `publishedAt` (date).
     - `readTime` (text, e.g. "8 menit baca").
     - `featuredImage` (upload relation to `media`, required).
     - `excerpt` (textarea, required for previews and meta descriptions).
     - `content` (richText using Lexical editor, required).
     - `category` (relationship to `categories`, `hasMany: false`, required).
     - `tags` (relationship to `tags`, `hasMany: true`).
     - `author` (relationship to `authors`, `hasMany: false`, required).
     - `meta` (group for SEO overrides: title, description, image).
  2. Hooks:
     - Auto-slugify `title` -> `slug`.
     - Set `publishedAt = new Date()` when status changes to `published` if not previously set.
  3. Access:
     - Read: Public can read items where `status === 'published'`; logged-in users can read all (including drafts).
     - Create/Update/Delete: Authenticated users only.

### Step 2.4: Register Collections in Payload Configuration
- **File**: `payload.config.ts`
- **Actions**:
  1. Import `Categories`, `Tags`, `Authors`, and `Articles`.
  2. Add them to `collections: [Users, Media, Categories, Tags, Authors, Articles]`.

### Step 2.5: Generate Types & Verify Database Table Footprint
- **Actions**:
  1. Run `npx tsc --noEmit` to verify type safety across all collections.
  2. Verify SQLite database tables in `data/payload.db`:
     - Confirm exactly 5 new tables created: `categories`, `tags`, `authors`, `articles`, `articles_rels`.
     - Verify foreign keys in `articles`: `category_id`, `author_id`, `featured_image_id`.

### Step 2.6: Seed Initial Content
- **File**: `scripts/seed-blog.ts` (scratch or CLI script)
- **Actions**:
  1. Seed default Categories: *Pemikiran Islam*, *Filosofi Dasar*, *Kurikulum*, *Berita*, *Kisah Alumni*.
  2. Seed default Tags: *Adab*, *Al-Attas*, *Tradisi Ilmu*, *Ghazwul Fikri*, *Peradaban*.
  3. Seed initial Author: *Dr. Akmal Sjafril, S.T., M.Pd.I.*
  4. Seed 2 published sample articles adapted from existing static content in `content/inner/blog-details-standard.ts`.

### Step 2.7: Build Frontend Query Helpers
- **File**: `lib/getArticles.ts`
- **Actions**:
  1. `getPublishedArticles({ page, limit, categorySlug, tagSlug })`: Queries articles with populated category, author, and featured image.
  2. `getArticleBySlug(slug)`: Fetches a single article with full Lexical content and author credentials.
  3. `getRelatedArticles(currentArticleId, categoryId, limit)`: Fetches 3 related articles within the same category.
  4. Fallback mechanism: If CMS returns 0 articles, fallback gracefully to existing static content in `content/inner/blog-three-column.ts`.

### Step 2.8: Connect Frontend Pages
- **Files**:
  - `app/(site)/blog-three-column/page.tsx`: Connect grid to `getPublishedArticles()`, display dynamic category badges, author names, read times, and thumbnail images.
  - `app/(site)/blog-details-standard/page.tsx` & `app/(site)/blog/[slug]/page.tsx`: Render dynamic article header, body (Lexical Rich Text renderer), author bio box, and related articles grid.

### Step 2.9: Non-Browser Regression Testing & Build Verification
- **Actions**:
  1. Test API endpoints:
     - `GET /api/categories` -> `200 OK`
     - `GET /api/tags` -> `200 OK`
     - `GET /api/authors` -> `200 OK`
     - `GET /api/articles` -> `200 OK` (only published articles returned for public requests)
  2. Test frontend routes via curl:
     - `/blog-three-column` -> `200 OK`
     - `/blog-details-standard` -> `200 OK`
  3. Run full route test script (`scratch/test_routes.sh`).
  4. Run `npm run lint` and `npm run build`.

---

## Verification Criteria (Definition of Done)
- [ ] 4 collections (`Categories`, `Tags`, `Authors`, `Articles`) implemented and registered.
- [ ] Database contains exactly 5 new tables (`categories`, `tags`, `authors`, `articles`, `articles_rels`).
- [ ] Initial categories, tags, author, and sample articles successfully seeded.
- [ ] REST API endpoints return correct filtered data.
- [ ] Frontend blog listing and details pages render dynamic CMS data with zero downtime fallback.
- [ ] Full route test suite (18+ routes) returns `200 OK`.
- [ ] `npm run build` and `npx tsc --noEmit` pass with 0 errors.
