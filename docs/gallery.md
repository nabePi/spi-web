# CMS Module: Gallery (Galeri)

> **Status**: Implemented. Albums are standalone (not linked to Events).
> **Route naming**: `/galeri`, `/galeri/[slug]`. UI copy is Indonesian.

Photo galleries for SPI activities, sourced from **Google Photos shared albums** instead of CMS uploads.

---

## 1. Why not the Google Photos API

Since **31 March 2025** the Library API scopes `photoslibrary.readonly` and `photoslibrary.sharing` are removed; an app can only read albums **it created**. Existing albums therefore cannot be listed or synced through the official API. The Picker API only returns short-lived URLs, which would force us to copy files back into our storage (i.e. uploads again).

Instead the module reads the album's **public share page** ("anyone with the link"). This is **unofficial** and may break if Google changes the page, so:

- A failed sync never blocks saving. Previous photos are kept; `syncStatus` becomes `failed` with a message.
- The album page always offers a **"Buka di Google Photos"** button, so visitors can reach every photo even with zero synced photos.
- Photos can be pasted manually into the `photos` JSON field as a fallback.
- All Google-specific code lives in `lib/googlePhotosAlbum.ts`; swap that file if the approach changes.

Known limitation: the share page may embed only the first batch of a large album. Verify with your real albums; the parser caps at 500 photos.

---

## 2. Schema (single table `gallery_albums`)

| Field | Type | Notes |
|---|---|---|
| `title` | text, required | |
| `slug` | text, unique | Auto-generated from title |
| `shareUrl` | text, required | Must be `https://photos.app.goo.gl/…` or `https://photos.google.com/…` (validated; also the SSRF guard for the server-side fetch) |
| `description` | textarea | |
| `albumDate` | date | Used for sorting (newest first) |
| `coverUrl` | text | Auto-filled; manual overrides survive re-sync unless `shareUrl` changes |
| `photos` | json | `[{ url, width, height }]`, base URLs without `=w…` suffix. Stored as JSON to keep a single table (no join tables) |
| `photoCount` | number, read-only | |
| `syncStatus` | select, read-only | `pending` / `ok` / `failed` |
| `syncMessage`, `syncedAt` | read-only | |
| `resync` | checkbox | Tick and save to re-pull photos; reset automatically |
| `status` | select | `draft` / `published` (public sees published only) |
| `meta` | group | SEO overrides |

Sync runs in a `beforeChange` hook when `shareUrl` is new/changed or `resync` is ticked.

---

## 3. Public routes

- `/galeri`: paginated album grid (12 per page), ISR `revalidate = 60`.
- `/galeri/[slug]`: photo grid with Magnific Popup lightbox (`.image-popup`) and link-out button.
- Both are in the sitemap; "Galeri" is under the **Media** menu.
- `next.config.ts` CSP `img-src` allows `https://lh3.googleusercontent.com`.

## 4. Admin workflow

1. In Google Photos, share the album → "anyone with the link" → copy the link.
2. CMS → **Album Galeri** → Create → paste the link, set title/date → Save.
3. Check **Status Sinkronisasi**. If `failed`, read the message; re-share the album or fall back to manual `photos`.
4. When photos are added to the album later, tick **Sinkronkan ulang** and save.
