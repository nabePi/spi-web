# CMS Module: Papers (Karya Ilmiah)

> **Status**: Implemented (Phase 1). AI summary (Phase 2) remains reserved fields only.
> **Route naming**: English (`papers`, `/papers`, `/papers/[slug]`). UI copy stays in Indonesian ("Karya Tulis").

Specification for the **Papers** module of the Sekolah Pemikiran Islam (SPI) CMS: a blog-like library of scholarly works where admins upload a PDF and write an explanatory text about it.

---

## 1. Goals

1. **Scholarly Library**: Publish SPI papers / karya ilmiah (journal articles, theses, working papers, conference papers) as PDFs with inline preview.
2. **Blog-like Reading Experience**: Each paper has its own page with metadata, an admin-written explanation (rich text), and a PDF preview (no download button).
3. **AI-Ready (Phase 2)**: Reserve fields now so a later AI pipeline can read the PDF and generate a summary / key points, without a schema redesign.
4. **Reuse Existing Collections**: Reuse `categories` and `tags`; authors are free text.
5. **Minimal DB Footprint**: exactly **+2 tables** (`papers`, `papers_rels` for tags).

---

## 2. User Stories

- **US-1 Upload**: As an admin, I upload a PDF (max 5 MB) and fill in title, author, year, abstract so the paper appears in the library.
- **US-2 Explain**: As an admin, I write an explanation (context, key arguments, how to read it) in a rich text area next to the paper.
- **US-3 Browse**: As a visitor, I browse/search papers by category, tag, year, and type.
- **US-4 Read & Preview**: As a visitor, I read the explanation and preview the PDF in the page.
- **US-5 AI Summary (Phase 2)**: As an admin, I click "Generate summary" and AI drafts a summary and key points from the PDF; I review and publish it.

---

## 3. Proposed Schema (single table `papers`)

`Papers` is itself an **upload-enabled collection** (the PDF is stored on the paper document), so no separate file collection or join table is needed. This also avoids `Media`'s required `alt` field, which does not suit PDFs.

| Field | Type | Req. | Notes |
| :--- | :--- | :---: | :--- |
| `title` | text | Yes | Paper title. |
| `slug` | text | Yes | Unique, auto-generated from title. |
| `status` | select | Yes | `draft` / `published` (same pattern as Articles). |
| `publishedAt` | date | No | Auto-set on first publish. |
| `paperType` | select | Yes | `jurnal`, `skripsi-tesis`, `makalah`, `working-paper`, `lainnya`. |
| `year` | number | No | Publication year. |
| `author` | text | Yes | **Free text only** (not linked to `authors`), e.g. "A. Rahman, B. Hakim". |
| `category` | relationship → `categories` | No | Single, reuses blog categories (scalar FK). |
| `tags` | relationship → `tags` (`hasMany: true`) | No | Reuses the existing `tags` collection. Creates the `papers_rels` join table. |
| `abstract` | textarea | Yes | Original abstract / short description for cards and SEO. |
| `explanation` | richText | No | **Admin-written information about the paper** (the text area you described). |
| `coverImage` | upload → `media` | No | Optional thumbnail; fallback to a default cover. |
| `externalUrl` | text | No | DOI / journal link if published elsewhere. |
| `pageCount` | number | No | Optional. |
| `aiSummary` | textarea | No | *Phase 2*: AI-generated summary (editable). |
| `aiKeyPoints` | textarea | No | *Phase 2*: AI-generated key points (one per line). |
| `aiStatus` | select | No | *Phase 2*: `none` / `pending` / `generated` / `reviewed`. Default `none`. |
| `aiGeneratedAt` | date | No | *Phase 2*. |
| `meta` | group | No | SEO overrides (`title`, `description`). |
| *(upload fields)* | auto | — | `filename`, `mimeType`, `filesize`, `url` provided by Payload upload. |

**Upload restrictions**: `mimeTypes: ["application/pdf"]`, **max size 5 MB**, `staticDir: "papers"`.
**Access**: public read of `published` papers (admins see drafts); create/update/delete for authenticated users only.
**Strict preview only**: the PDF has no public file URL and no download button; it is only streamed inline through a gated route (see section 4.1).

### Expected DB footprint
- **+2 tables**: `papers` and `papers_rels` (join table for the multi-select `tags`).
- Total tables: 16 → 18.

---

## 4. Frontend Routes

| Route | Purpose |
| :--- | :--- |
| `/papers` | Library grid/list with category + year + type filters, search, pagination. |
| `/papers/[slug]` | Paper page: title, author, year/type badges, tags, abstract, admin explanation, inline PDF preview (no download button), optional AI summary block (Phase 2), related papers. |
| `/papers/[slug]/preview` | **Gated PDF stream** used only by the preview `<iframe>` on the paper page (not a linked page). |

Reuses existing blog styling (`blog2__card`, blog-details typography) so no new design system is needed.

### 4.1 Strict Preview Design

Goal: visitors can read the PDF on the page but there is no public, shareable, downloadable file URL.

1. **Block Payload's direct file endpoint**: configure `upload.handlers` on `Papers` so `/api/papers/file/<filename>` returns `404` unless the request is from a logged-in admin (the admin panel still works).
2. **Hide file location from the public API**: an `afterRead` hook strips `url`, `thumbnailURL` and `filename` from `GET /api/papers` responses for non-admins.
3. **Gated stream route** `app/(site)/papers/[slug]/preview/route.ts`:
   - Only serves papers with `status = published` (admins can preview drafts).
   - Reads the file from `papers/` on disk (the folder is outside `public/`, so it is never served statically).
   - Sends `Content-Type: application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, no-store`, `X-Content-Type-Options: nosniff`.
   - Rejects top-level navigation: requires `Sec-Fetch-Dest` of `iframe`/`embed`/`object` and a same-origin `Referer`/`Sec-Fetch-Site`, so pasting the URL into the browser returns `403`.
4. **Viewer**: `<iframe src="/papers/[slug]/preview#toolbar=0&navpanes=0">` with no download link, plus `sandbox` and right-click download disabled in the UI.
5. **Site CSP**: the current CSP has `frame-src` limited to YouTube/Google and `default-src 'self'`; same-origin iframes work, but `frame-ancestors 'none'` and `X-Frame-Options: DENY` (set globally) block framing, so the preview route must override them with `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'`.

> **Limitation (honest scope)**: the browser must receive the PDF bytes to display it, so a determined user could still save it through developer tools or screenshots. This design removes the download button and the public file URL and blocks direct access and hotlinking; it cannot make copying impossible. If you later need stronger protection, the next step would be rendering pages to images/canvas (e.g. PDF.js) instead of showing the raw PDF.

---

## 5. AI Integration Plan (Phase 2, out of scope now)

1. Admin edits a paper and presses **Generate summary** (custom admin button / endpoint).
2. Server extracts text from the PDF and sends it to an LLM with a prompt.
3. Result is saved to `aiSummary` / `aiKeyPoints`, `aiStatus = generated`.
4. Admin reviews/edits, sets `aiStatus = reviewed`; only **reviewed** content is shown publicly, labeled "Ringkasan dibantu AI".

Phase 1 only creates the fields; they stay hidden on the frontend.

---

## 6. Verification Gates

1. Exactly two new tables: `papers` and `papers_rels` (tags join); nothing else.
2. PDF upload works; non-PDF files and files over 5 MB are rejected.
3. `GET /api/papers` returns only published papers to the public.
4. `/papers` and `/papers/[slug]` return `200`; empty-state shown when no papers.
5. Strict preview checks (all must pass):
   - Opening `/papers/[slug]/preview` directly in the browser (no iframe) returns `403`.
   - `/api/papers/file/<filename>` returns `404` for anonymous users.
   - `GET /api/papers` (anonymous) contains no `url`, `thumbnailURL` or `filename`.
   - Draft papers cannot be previewed anonymously.
   - The paper page shows the PDF inline in an iframe with no download link.
6. `tsc --noEmit`, `npm run lint` (0 errors) and `npm run build` pass.

---

## 7. Review Decisions

| # | Topic | Decision |
| :--- | :--- | :--- |
| 1 | Authors | Free-text `author` field only (no link to `authors`). |
| 2 | Tags | Reuse existing `tags` collection (adds `papers_rels`). `keywords` field removed. |
| 3 | Paper types | `jurnal`, `skripsi-tesis`, `makalah`, `working-paper`, `lainnya`. |
| 4 | PDF access | **Strict** preview only: gated stream route, no public file URL, no download button (see 4.1). |
| 5 | Max PDF size | 5 MB. |
| 6 | Language field | Not needed. |
| 7 | Extra citation fields | Not needed. |
| 8 | Storage | Local `papers/` directory at the project root (outside `public/`). |

No open questions remain. Phase 1 implemented; see `docs/plans/04-papers.md`.

