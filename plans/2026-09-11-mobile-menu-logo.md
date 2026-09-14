# Plan: Replace mobile off-canvas menu logos with SPI branding

## Where these logos live
`components/layout/SideInfo.tsx` is the mobile off-canvas menu (opened via the
hamburger toggle). `sideInfoLogos(pathname)` picks the logo pair; the
**default** branch (used by every real SPI page — none of them match the
demo-only `kindergarten` / `language-school` / etc. paths) currently returns
the generic template logo for both slots:
```js
return {
  header: "/assets/imgs/logo/logo.svg",
  footer: "/assets/imgs/logo/logo.svg",
};
```
- **Top slot** (`.offset-logo`, `app/scss/components/_header.scss:87-95`):
  container 120px wide, `img { width:100%; height:auto }` — background is the
  panel's light `rgba(255,255,255,0.85)`.
- **Bottom slot** (`.offset-logo-footer`, same file:224-236): `img { width:
  150px; height:auto }` — same light panel, plus a white-to-transparent
  gradient overlay behind it.

Both slots need a **color/dark** mark to be visible — a white logo would
disappear on that background (this is why `logo-cpz.png`, which is pure
white, was made for Footer2's **dark** green background, not for here).

## Decisions (confirmed with you)
- **Top:** the full color horizontal SPI logo (icon + "SEKOLAH PEMIKIRAN
  ISLAM" text) — same wordmark shape already used for the Header's logo, in
  color instead of white so it reads on this light panel.
- **Bottom:** a color version of the `logo-cpz` icon crop (not the white
  original, which would be invisible here).

## Steps
1. From `logo-color-horizontal.png` (1774×887), create
   `logo-color-horizontal-small.png` — same 2:1 aspect ratio, resized down to
   a small file for the top slot (e.g. ~320×160, matching the small-file
   convention already used for `logo-white-horizontal.png`).
2. Crop the same book-icon region used for `logo-cpz.png` (the white one),
   but from the color source this time, trim tight, resize to the same
   177×83 as `logo-cpz.png`, and save as `logo-cpz-color.png`.
3. Both new files go in `public/assets/imgs/logo/logo-spi/`.
4. Edit `components/layout/SideInfo.tsx` — update only the **default**
   branch of `sideInfoLogos()`:
   ```js
   return {
     header: "/assets/imgs/logo/logo-spi/logo-color-horizontal-small.png",
     footer: "/assets/imgs/logo/logo-spi/logo-cpz-color.png",
   };
   ```
   The other pathname branches (demo-only routes) are left untouched.
5. No CSS changes — the existing `width` + `height:auto` rules on
   `.offset-logo` / `.offset-logo-footer` already size whatever image is
   dropped in; the new files just need the right aspect ratio, which the
   crop/resize step handles.
6. Verify: open the mobile hamburger menu in the browser at a narrow
   viewport, confirm both the top and bottom logos are clearly visible
   against the panel's light background.

## Files touched
- `public/assets/imgs/logo/logo-spi/logo-color-horizontal-small.png` (new)
- `public/assets/imgs/logo/logo-spi/logo-icon-color.png` (new)
- `components/layout/SideInfo.tsx` (default branch of `sideInfoLogos()`)

## Amendment (2026-09-12)
While implementing, `logo-cpz.png` turned out to actually read **"Cendekia
Pemimpin Zaman"** — a different mark entirely, not SPI. It's also already
live in the real site footer (`Footer2.tsx`), which is a separate,
pre-existing issue left untouched here per your instruction ("fix mobile
menu only" — Footer2.tsx to be addressed as its own task later).

For the bottom mobile-menu slot, instead of a color version of `logo-cpz`,
I cropped the actual SPI book-icon mark from `logo-color-horizontal.png`
(same crop region used for the favicon), tight-trimmed to 466×572, resized
to 300×368, and saved as `logo-icon-color.png`. The top slot uses a
tight-trimmed, resized (320×128) copy of the full color wordmark, saved as
`logo-color-horizontal-small.png`. Both are wired into the default branch of
`sideInfoLogos()`.
