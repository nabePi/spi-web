# Implementation Plan: Papers (Module 4)

> **Reference**: [`docs/papers.md`](../papers.md)
> **Status**: Phase 1 implemented. Verified against the gates in the spec (section 6).

## Architecture Goals
1. Upload-enabled `papers` collection (PDF stored on the document in `papers/`, max 5 MB). **+2 tables**: `papers` and `papers_rels` (tags).
2. Blog-like listing and detail pages reusing existing blog SCSS.
3. **Strict preview only**: no public file URL, no download button; PDF streamed inline through a gated route (see spec 4.1).
4. AI summary fields reserved (hidden) for Phase 2.
5. Quality gate: `tsc` clean, lint 0 errors, all routes `200`, clean build.

## Steps

### Step 4.1: Papers Collection
- **File**: `payload/collections/Papers.ts`
- `upload: { staticDir: "papers", mimeTypes: ["application/pdf"], handlers: [...] }` with a 5 MB limit (enforce via Payload upload limits / a size check, and verify it rejects larger files).
- `handlers`: return `404` for `/api/papers/file/*` unless `req.user` (admin).
- `afterRead` hook: strip `url`, `thumbnailURL`, `filename` for non-admins.
- Fields: `title`, `slug`, `status`, `publishedAt`, `paperType`, `year`, `author` (text), `category` (→ `categories`, single), `tags` (→ `tags`, `hasMany`), `abstract`, `explanation` (richText), `coverImage` (→ `media`), `externalUrl`, `pageCount`, AI placeholders (`aiSummary`, `aiKeyPoints`, `aiStatus`, `aiGeneratedAt`), `meta`.
- Hooks: auto-slug, auto `publishedAt` on first publish.
- Access: public sees only `published`; writes require auth.

### Step 4.2: Register + Table Verification
- Add `Papers` to `payload.config.ts`.
- Confirm only `papers` and `papers_rels` are added (18 tables total).

### Step 4.3: Seed Sample Papers
- `scripts/seed-papers.sh`: upload 2–3 small sample PDFs with abstract, explanation, tags (use `_payload` for multipart fields).

### Step 4.4: Query Helpers
- `lib/getPapers.ts`: `getPublishedPapers({ page, limit, categorySlug, tagSlug, year, paperType, q })`, `getPaperBySlug`, `getRelatedPapers`. No `generateStaticParams` calling Payload (it caused schema-sync collisions in dev for Events).

### Step 4.5: Components & Routes
- `components/pages/inner/papers/PaperCard.tsx`, `PaperDetailsSection.tsx` (inline PDF preview in an `<iframe>`/`<object>` with toolbar hidden, Lexical `RichText` for `explanation`, no download link).
- `app/(site)/papers/page.tsx` (filters, search, pagination), `app/(site)/papers/[slug]/page.tsx` (metadata + 404).
- Cast Lexical data via `as unknown as SerializedEditorState`.

### Step 4.6: Navigation & Sitemap
- Add "Karya Tulis" to the header menu and `sitemap.xml`.

### Step 4.7: Regression & Build
- Add `/papers`, `/papers/[slug]`, `/api/papers` to the route test script, run `tsc --noEmit`, `npm run lint`, `npm run build`, then commit and push.

## Definition of Done
- [x] `Papers` registered; exactly +2 tables (`papers`, `papers_rels`).
- [x] PDF upload works; non-PDF and >5 MB files rejected.
- [x] 2–3 sample papers seeded.
- [x] `/papers` and `/papers/[slug]` styled, responsive, `200`; PDF previewed inline with no download button.
- [x] AI fields present in admin but not rendered publicly.
- [x] Type check, lint (0 errors) and build pass.

## Phase 2 (Future): AI Summary
Admin "Generate summary" action → extract PDF text → LLM → save to `aiSummary` / `aiKeyPoints` → admin review → show only when `aiStatus = reviewed`.
