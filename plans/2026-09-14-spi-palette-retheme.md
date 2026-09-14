# SPI palette retheme — site base colors follow the logo

Sampled from `public/assets/imgs/logo/logo-spi/logo-color-horizontal.png`:

| Role | Hex | RGB | Where it is in the logo |
| --- | --- | --- | --- |
| dark blue | `#0065b5` | 0, 101, 181 | middle book spine |
| light blue | `#0082e4` | 0, 130, 228 | book cover + wordmark |
| green | `#88d00e` | 136, 208, 14 | outer spine |

Blues carry the brand; green is a minor accent only — the same weighting the
logo itself uses.

## How it is layered (the original is not edited)

`app/scss/utils/_variables.scss` is **untouched** and still holds the stock
InstituteFlow palette. The new `app/scss/utils/_variables-spi.scss` is imported
directly after it in `utils/_index.scss`, so its `:root` declarations win while
the original stays one `@import` away.

```
--spi-blue-dark: #0065b5      --primary:   var(--spi-blue-dark)   // was #1a453b
--spi-blue:      #0082e4      --secondary: var(--spi-blue)        // was #d87827
--spi-green:     #88d00e      --border:    #0065b524              // was #1a453b24
                              --accent-on-dark: var(--spi-green)
```

`--green` is deliberately **not** overridden: it is the template's green
*demo-theme* color (business-coach buttons, category chips), not a brand color.

## Literal sweep

`--primary`/`--secondary` cover most of the site, but ~459 literals were
hardcoded outside the variable system (SVG `fill` props in `icons/`, `rgba()`
borders in SCSS). Those were swapped mechanically across 171 files:

| From | To |
| --- | --- |
| `#1a453b` / `#1A453B` | `#0065b5` / `#0065B5` |
| `#d87827` / `#D87827` | `#0082e4` / `#0082E4` |
| `rgba(26, 69, 59, x)` | `rgba(0, 101, 181, x)` |
| `rgba(216, 120, 39, x)` | `rgba(0, 130, 228, x)` |
| `#11372e`, `#0e392f` (footer / mega-menu greens) | `#004e8c` |

## Contrast repair: `--accent-on-dark`

The template paired two *complementary* hues (dark green + orange, ~3.4:1). The
two SPI blues share a hue, so every "secondary on primary" spot collapsed to
~1.5:1. Those now use `--accent-on-dark` (the logo green, ~3.1–5.1:1):

- `_home2.scss` — hero script title, hero stat numbers, footer copyright name
- `_breadcrumb.scss` — `.current` item on both breadcrumb banners
- `_error.scss` — the `0` in the 404 numeral

One exception: the header-top "30%" sits on a **light** blue bar, where green
would only reach 1.9:1, so it is white at 700 (3.4:1) instead.

## Cool neutral ground (follow-up)

The template's cream `#f8f5f2` was mixed to sit under green+orange and read as a
warm cast under the blues. It is now mirrored channel-for-channel to `#f2f5f8`
— same lightness, cool side — via `--bg`/`--bg2` in the SPI layer plus a sweep
of 22 hardcoded `#f8f5f2` literals across 17 files. The two peach tints behind
the alumni portraits were mirrored the same way (`#fff4ea` -> `#eaf4ff`,
`#fbeee2` -> `#e2eefb`). A DOM scan of every real page reports no warm ground
left.

## Deliberately left alone

- **Rating stars** (`var(--orange)`): gold is the universal rating convention,
  not a leftover. Other `--orange` spots on real pages became `--secondary`.
- **Demo-page palettes** (`_home4.scss`, `home8`–`home10` SVG brand logos,
  `#b0eb04` decorative tiles) — not SPI surfaces.
- **Content photography** flagged as "greenish" (rain, foliage) — real photos.
- `logo/*.svg` — unused InstituteFlow template logos.

## Recolored assets (originals kept alongside, `-orig` suffix)

| Asset | Was | Now |
| --- | --- | --- |
| `home2/hero/hero-bg2_1.webp` | old green shape | `#004e8c` on the `#0065b5` hero |
| `home2/footer/footer-bg2_1.webp` | old green shape | `#003a68` on the `#004e8c` footer |
| `placeholder/avatars/avatar-af.svg` | `#1a453b` | `#1f4a6b` (its 5 siblings are unrelated earth tones) |

Recoloring kept each pixel's alpha, so antialiased edges survive.

## Reverting

The pre-retheme tree is tagged `backup/pre-spi-palette`. To restore the old
look: `git diff backup/pre-spi-palette -- . | git apply -R`, or delete the
`@import "variables-spi";` line for the variable layer alone (the literal sweep
would still need the table above applied in reverse).

## Unrelated issue noticed

The build emits only 12 routes, but the homepage links to `/courses-v2`,
`/instructor-v1`, `/instructor-details`, `/profile` and `/cart`, which do not
exist and render the 404 page. Pre-existing, not touched here.
