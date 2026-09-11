# Plan: Update loader image & favicon to the new SPI logo icon

## Goal
Replace the current loader image and favicon (still the old InstituteFlow
template mark — orange square with a tree/star/book icon) with a crop of the
new SPI logo (Image #2 / `logo-color-horizontal.png`), sized to match how the
loader and favicon are used today.

## Where the loader/favicon image is used today
All three references point at the same file, `public/assets/imgs/favicon.webp`
(102×102px, WebP):
- `components/layout/Preloader.tsx:7,64` — imported as `favicon`, shown as the
  spinning/fading mark in the page loader overlay.
- `app/manifest.ts:15` — the PWA manifest icon (`sizes: "102x102"`).
- `app/layout.tsx:23` — `icons: { icon: "/assets/imgs/favicon.webp" }`, the
  browser-tab favicon.

## Decision (confirmed with you)
Image #2 is a wide lockup (icon + "SEKOLAH PEMIKIRAN ISLAM" text) — too wide
and too small-print to read at favicon/loader size. You confirmed: **crop out
just the book-icon mark** (not the whole wordmark), matching the same
approach already used in this repo for `logo-cpz.png` (cropped from the white
logo for the footer).

## Steps
1. From `public/assets/imgs/logo/logo-spi/logo-color-horizontal.png`
   (1774×887px), crop the icon mark only — the non-transparent content in
   roughly the `x:220–685, y:156–727` region (~465×571px), tightly trimmed to
   its actual bounding box.
2. Pad that crop evenly to a square canvas (keeping the source's transparent
   background), then resize to **102×102px** — the exact size the current
   favicon/loader image already uses, so nothing else needs to change.
3. Export as WebP and **overwrite `public/assets/imgs/favicon.webp` in
   place** with the new file.
4. No code changes are needed — `Preloader.tsx`, `app/manifest.ts`, and
   `app/layout.tsx` all already point at that same path, so the loader and
   favicon update together automatically.
5. Verify visually: reload the dev server, check the browser tab favicon and
   the page-load overlay both show the new icon crisply at small size.

## Files touched
- `public/assets/imgs/favicon.webp` (overwritten with new content, same path/size)
- No `.tsx`/`.ts` source changes expected.

## Open risk
The crop is a rectangular-ish mark (not perfectly square) being padded into a
square — at 102×102 the icon will have a little breathing room on two sides
rather than bleeding to the edge, similar to how the current template icon
sits inside its orange square.
