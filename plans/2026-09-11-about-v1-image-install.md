# Plan — Install generated imagery on /about-v1

**Date:** 2026-09-11
**Scope:** 4 new image assets + 8 line changes in one content file. No component, config or type changes.

---

## 1. New asset files (4 added, 0 overwritten)

Copied from `scratchpad/fal/final/`, already cropped to the exact display size and WebP q82.

| Destination | Px | Weight | Source pick |
|---|---|---|---|
| `public/assets/imgs/inner/about/spi-ruang-kajian.webp` | 1600×1200 | 210 kB | `s1-a` |
| `public/assets/imgs/inner/about/spi-manuskrip.webp` | 980×1200 | 113 kB | `s2-b` |
| `public/assets/imgs/inner/about/spi-ornamen-ukiran.webp` | 380×268 | 14 kB | `s3-b` |
| `public/assets/imgs/inner/about/spi-serambi-hujan.webp` | 760×680 | 90 kB | `s4-a` |

Total added: **436 kB**. Nothing is overwritten — the template's existing
`inner-thumb-1/2/3.webp` in that directory are left untouched for PRD W-T5 to delete.

## 2. Changes to `content/inner/about-v1.ts`

Four import paths and four `alt` strings. Nothing else.

| Line | From | To |
|---|---|---|
| 10 | `placeholder/inner-thumb-1.svg` | `inner/about/spi-ruang-kajian.webp` |
| 11 | `placeholder/inner-thumb-2.svg` | `inner/about/spi-manuskrip.webp` |
| 12 | `placeholder/inner-thumb-3.svg` | `inner/about/spi-ornamen-ukiran.webp` |
| 25 | `placeholder/testimonial-thumb1_2.svg` | `inner/about/spi-serambi-hujan.webp` |

Alt text (replacing `alt: "placeholder"`, per PRD line 360 — descriptive Indonesian):

| Line | New alt |
|---|---|
| 44 | `Ruang kajian bergaya arsitektur Jawa dengan meja-meja rendah tertata rapi` |
| 45 | `Tumpukan manuskrip Islam klasik di atas rehal kayu ukir` |
| 64 | `Detail ukiran kayu bermotif geometris Islam` |
| 230 | `Serambi masjid dengan halaman basah saat hujan` |

Import **variable names are left unchanged** (`inneraboutinnerThumb1` etc.) to keep the
diff to 8 lines. Renaming them to meaningful identifiers is a separate, optional cleanup.

## 3. What is deliberately NOT touched

- **`testimonial-thumb1_1`** (line 24) — the card captioned "Kajian mingguan" with a video
  overlay. It asserts a real SPI event; it keeps its placeholder until real photography exists
  (PRD line 708).
- **All avatar and team slots** — `wcu-user1_2`, `team-thumb1_1..4`, `testimonail-user1_1..7`.
  Generated faces on a named real person and on an institution's teaching staff would
  contradict SPI's own critique of credential-free authority (comprof line 92).
- **`content/inner/instructor-v1.ts`** — still imports `placeholder/testimonial-thumb1_2.svg`
  at line 18. Unaffected, and the placeholder SVG must therefore remain on disk.
- **`next.config.ts`** — `images: { unoptimized: true }` stays as-is. Re-enabling it is PRD W-T3.
- No unreferenced placeholder SVGs are deleted; that is PRD W-T5.

## 4. Risk

**Low.** Every new asset has the **same pixel dimensions** as the placeholder it replaces, so
the static-import intrinsic sizes are identical and no layout or CLS change is possible. The
change is reversible by reverting one file and deleting four assets.

## 5. Verification

1. `npx tsc --noEmit` — import paths resolve.
2. Reload http://localhost:3000/about-v1 — four images render, no broken frames.
3. Confirm /instructor-v1 still renders its image card.
