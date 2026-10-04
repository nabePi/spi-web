# Implementation Plan: Gallery (Module 7)

> **Reference Document**: [`docs/gallery.md`](../gallery.md)
> **Target**: `GalleryAlbums` collection backed by public Google Photos shared-album links (no uploads), public routes `/galeri` and `/galeri/[slug]`, nav/sitemap/CSP integration.

## Changes

1. `lib/googlePhotosAlbum.ts`: share-link validation, page fetch, HTML parser, size-URL helpers.
2. `payload/collections/GalleryAlbums.ts` (+ registered in `payload.config.ts`): single table `gallery_albums`, sync-on-save hook, `resync` checkbox.
3. `lib/getGallery.ts`: `getPublishedAlbums`, `getAlbumBySlug`, `getAllAlbumSlugs`.
4. `app/(site)/galeri/page.tsx`, `app/(site)/galeri/[slug]/page.tsx`, `components/pages/inner/galeri/{AlbumCard,AlbumPhotoGrid}.tsx`.
5. `components/layout/Header.tsx` (Media -> Galeri), `app/sitemap.ts` (static + album slugs), `next.config.ts` (CSP `img-src`).

## Verification

- `npx tsc --noEmit` -> 0; `npm run lint` -> 0 errors.
- Exactly 1 new table (`gallery_albums`), no `_rels` table.
- `/galeri` and `/galeri/[slug]` -> 200; unknown slug -> 404.
- Invalid `shareUrl` rejected; failed sync keeps manual photos and saves with `syncStatus: failed`.
- `npm run build` -> 0.
- **Open item**: end-to-end sync against a real public album (needs a real share link).
