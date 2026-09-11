# Plan — Fill homepage imagery via fal.ai

**Date:** 2026-09-11
**Scope:** generate real photography-style imagery for 13 of the homepage's 39 content
image slots; leave the other 26 on placeholder SVGs. Wording, structure, components and
routing are untouched — this plan is images only, following the same method already used
on `/about-v1`.

**Status: plan only. Nothing in this document has been executed.**

---

## 0. Before anything else: uncommitted work already in the tree

A **separate Claude Code session** (session id `7b7dbbc8…`, not this one) has already been
working in this same checkout and left uncommitted changes:

```
 M content/inner/about-v1.ts
?? plans/2026-09-11-about-v1-image-install.md
?? public/assets/imgs/inner/about/spi-manuskrip.webp
?? public/assets/imgs/inner/about/spi-ornamen-ukiran.webp
?? public/assets/imgs/inner/about/spi-ruang-kajian.webp
?? public/assets/imgs/inner/about/spi-serambi-hujan.webp
```

That session's own plan (`plans/2026-09-11-about-v1-image-install.md`, read in full above)
documents four real fal.ai-generated images already installed on `/about-v1`, and — usefully —
states an explicit content policy this plan adopts and extends (see §1). Its `scratchpad/fal/`
folder also holds the raw generation batch: four concepts (`s1`–`s4`), four variants each
(`a`–`d`), a contact sheet and zoom crop per concept, and a `final/` folder with the four
picks. No prompt log survives, so the exact fal.ai model and parameters used are not recoverable
from disk — only the workflow shape (batch of variants → contact sheet → pick → crop to exact
target px → convert to WebP → drop into a real, non-`placeholder/` directory → repoint one
content file's imports and `alt` text).

**This plan does not commit, revert, or otherwise touch that About work.** It is called out
here because it changes what `git status` shows and because its policy is directly relevant.
**Decide separately** whether to commit it, fold it into this session's work, or leave it —
that is not a homepage decision.

---

## 1. Content policy (carried over from the About plan, and made stricter)

The About plan excluded AI-generated faces for **named real individuals and institutional
staff**. For the homepage — which carries a much wider mix of avatars, some attached to real
names and some merely decorative — this plan uses a single, simpler rule instead of drawing
that line slot-by-slot:

> **No AI-generated image depicts a human face or figure, anywhere on this site.**
> Generated imagery is limited to architecture, interiors, objects, manuscripts, calligraphy,
> and landscape/atmosphere shots with no discernible person in frame.

Reasoning: SPI's own diagnosis of the problem it exists to solve is the **loss of *adab*** —
authority chosen by appearance over verifiable credential (PRD §2; comprof line 92). A fabricated
face is exactly that failure mode, whether or not it is captioned with a real name. A blanket
rule is also simply easier to get right than a case-by-case one, and it matches what the About
session already did for *every* face slot on that page, named or not (see its §3, "All avatar
and team slots").

A second, narrower rule for one specific risk unique to the homepage:

> **No generated image is presented as a real Instagram post.** The Instagram section links to
> a real, checkable account (`@spi.indonesia`); filling it with fabricated tiles would misrepresent
> what is actually posted there.

---

## 2. Image inventory and classification

All 39 content slots in `content/demos/e-learning/home.ts`, by homepage section. **Bold** rows
are in scope for this plan.

| Section | Slot | Px | Depicts | Decision | Why |
|---|---|---|---|---|---|
| Hero | **`thumb`** | **574×750** | **large hero photo** | **GENERATE** | No face in frame — see §3.1 |
| Hero | `users` ×3 | 120×120 | small avatar stack overlapping the hero card | EXCLUDE | face slot — policy §1 |
| Courses (open cohorts) | **`top-courses-thumb` ×4** | **640×448** | **per-program cover art** | **GENERATE** | one per programme format — §3.2 |
| Video | **`video-thumb`** | **1260×800** | **clickable video-teaser image** | **GENERATE** | wide interior/majlis shot, no faces — §3.3 |
| Branches (`TeamSection`) | **`team-thumb` ×4** | **280×280** | **branch venue photography** | **GENERATE** | architecture, not people — §3.4 |
| Blog | **`blog-thumb` ×3** | **820×480** | **article cover art** | **GENERATE** | object/architecture per article — §3.5 |
| Blog | `blog-user` ×3 | 88×88 | author avatar, captioned "Dr. Akmal Sjafril" / "Redaksi SPI" | EXCLUDE | face + real name — policy §1 |
| Testimonial | `thumb` ×2 | 720×760 | large photo beside each quote | EXCLUDE | face, one captioned with the founder's real name | 
| Testimonial | `author` ×2 | 100×100 | small avatar next to author name | EXCLUDE | face + real name |
| Testimonial | `avatars` (widget) ×3 | 100×100 | "happy learners" mini avatar stack | EXCLUDE | face slot |
| Instagram | `slides` ×9 | 400×400 | tiles under `@spi.indonesia` | EXCLUDE | would fabricate real social content — policy §1, second rule |
| Packages (pricing tiers) | `thumb` ×3 | 840×592 | course cards | EXCLUDE | section itself is out of scope — pricing contradicts a free programme (PRD Appendix C); do not spend a generation budget on a section likely to be deleted |
| App (mobile app) | `thumb`, `bg`, `shape` | 343×402 / 1300×502 / 428×428 | app mockup art | EXCLUDE | section advertises a product that does not exist (PRD Appendix C) |
| Hero / Courses / etc. | decorative `bg` / `pattern` | various | background art, gradients, shapes | EXCLUDE (unchanged) | design furniture, not content — same treatment as every earlier step this session |

**13 slots in scope.** Every excluded slot keeps its current placeholder SVG exactly as-is;
this plan touches nothing else in the file.

---

## 3. Proposed themes and prompt drafts

Draft prompts, for review before any generation runs. Style baseline for all of them: **documentary/editorial photography, natural light, no visible text or watermark, no logos, no
human figures**, warm and credible rather than glossy-stock. Each should be generated as
**3–4 variants** (matching the About workflow) so there is a real choice, not a single output
accepted by default.

### 3.1 Hero (`thumb`, 574×750, portrait)

The one genuinely difficult slot: the component overlays a floating "avatar stack + rating"
card on top of this image (kept as a placeholder per §1), so the image itself needs to read as
a *setting*, not a subject that image is trying to introduce.

> *Draft:* "A weathered leather-bound Islamic manuscript lying open on a carved wooden lectern (rehal), soft late-afternoon light through a lattice window, shallow depth of field, warm tones, documentary photography, no people, no text overlay."

Alternative direction, if a manuscript reads too static next to "Menghidupkan tradisi ilmu…":
a wide, respectful back-angle of an empty study hall with low seating, morning light — same
"no discernible person" constraint applies if any figure appears at all (crop or discard the
variant rather than accept a recognisable face in the background).

### 3.2 Programme covers (`top-courses-thumb` ×4, 640×448, landscape)

One per card, matching the four items already in `eLearningCoursesContent.items` (§ program
format, not per-topic):

1. **Kelas Reguler** — rows of low study tables (majlis-style) in a lecture hall, empty, morning light.
2. **Kursus Singkat** — a stack of course handouts/notebooks on a table, pen resting on top.
3. **KOMIK (online)** — a laptop open to a video-call grid on a desk beside an open Qur'an, evening lamp light.
4. **Tuesday's Special** — a phone or tablet propped up showing a plain video-call interface, dim room, single desk lamp — evokes a recurring evening session without depicting anyone.

### 3.3 Video teaser (`video-thumb`, 1260×800, landscape)

> *Draft:* "Wide interior shot of a mosque study hall (majlis) from the back row, empty low seating arranged in a semicircle facing a lectern, soft window light, no people, documentary photography."

### 3.4 Branch venues (`team-thumb` ×4, 280×280, square)

Directly reuses the About session's "serambi/architecture" register. One per real, documented
venue (PRD §17.4 / comprof "Cabang"):

1. **SPI Fatahillah, Jakarta** — INSISTS building exterior or a generic modern Islamic-institute
   façade, Kalibata/South Jakarta register.
2. **SPI Moh. Natsir, Bandung** — Masjid Istiqamah-style mosque exterior or courtyard.
3. **SPI UII, Yogyakarta** — a university-campus building facade, Javanese-influenced architecture.
4. **SPI Bogor — MARJAN** — reuse the About page's rain/serambi mood ("Majelis Pemikiran di
   Kota Hujan") — a covered veranda, wet courtyard tiles, Bogor's known rain.

None of these claim to be the *actual* named venue — they are representative stand-ins, exactly
like the About page's `spi-ruang-kajian.webp`. The PRD already flags real branch photography as
a launch blocker (§13, §16.4); this is scaffolding, not a substitute for it.

### 3.5 Article covers (`blog-thumb` ×3, 820×480, landscape)

Matching the three teasers already in `eLearningBlogContent.items`:

1. **"Konsep adab..."** — the same manuscript/lectern register as §3.1, different crop.
2. **"Ghazwul Fikri..."** — an abstract/editorial image evoking "noise" — overlapping newspaper
   pages or screens, no discernible content, muted tones. (Deliberately not literal — "invasion"
   imagery risks looking alarmist; abstract reads better for a thought-piece cover.)
3. **"SPI Bogor meluncurkan MARJAN..."** — the same Bogor veranda register as §3.4 item 4.

---

## 4. Technical workflow

Same shape as the About install, generalised:

1. **Generate** 3–4 variants per concept (13 concepts × 3–4 = ~40–52 raw images) via fal.ai.
2. **Contact sheet + zoom crop** per concept for review, exactly as `s1-sheet.png` /
   `s2a-zoom.png` etc. did for About.
3. **Pick one winner per concept** (human review — this plan does not auto-select).
4. **Crop to the exact target px** listed in §2's table (no upscaling; if a generation doesn't
   cover the target aspect ratio cleanly, regenerate rather than stretch).
5. **Convert to WebP**, quality ~80–82, matching the About assets' weight (14–216 kB range).
6. **Place** under a new directory, `public/assets/imgs/home/`, with descriptive
   `spi-<subject>.webp` names (e.g. `spi-hero-manuskrip.webp`,
   `spi-cabang-jakarta.webp`, `spi-cabang-bogor-marjan.webp`) — a fresh directory rather than
   overwriting the unused `public/assets/imgs/home2/*` stock originals (864 KB, still on disk,
   untouched since the placeholder swap), so the change stays purely additive and reversible.
7. **Edit `content/demos/e-learning/home.ts`**: 13 import paths + 13 `alt` strings, nothing
   else — same "N lines changed, 0 structural changes" shape as the About diff.
8. **Verify**: `tsc --noEmit`, reload `/`, confirm all 13 new images render with no layout shift
   (dimensions are pinned to match the placeholders they replace, so none is expected).

No CSP change is needed — `img-src 'self' data: blob:'` already covers static local assets, and
generation happens outside the Next.js request cycle entirely (same as About).

---

## 5. What this plan deliberately does not do

- Does not touch the 26 excluded slots (§2) — they keep their current placeholder SVGs.
- Does not decide the About session's uncommitted work (§0) — flagged, not acted on.
- Does not choose a fal.ai model, resolution preset, or seed strategy — see open questions.
- Does not add a `FAL_KEY` or any credential to the repository or environment.
- Does not touch `next.config.ts` (`images: { unoptimized: true }` stays — PRD W-T3, unrelated).
- Does not prune `public/assets/imgs/home2/*` (the now-unused stock originals) — that is PRD
  W-T5, a separate asset-audit pass.

---

## 6. Open questions — need an answer before any generation runs

1. **Resolved 2026-09-11.** A `FAL_KEY` was provided and written to `.env.local` (git-ignored,
   never committed). Generation runs via `curl` against fal.ai's synchronous REST API
   (`https://fal.run/<model>`), one Bash call per concept, downloaded locally and reviewed as
   images before any install into `public/assets/` or edit to a content file.

   **Default model: `fal-ai/flux/schnell`**, not `flux/dev` (used for the branch-photo batch).
   Confirmed current pricing (2026-09-11): `dev` $0.025/MP vs. `schnell` $0.003/MP — about **8×
   cheaper**, same FLUX prompt family, fewer inference steps (1–4 vs. 28), a touch less refined
   on fine detail. Chosen deliberately for cost ("hemat") over the marginal quality gain. If any
   single result looks weak on `schnell`, that one concept can be regenerated on `dev` — no need
   to commit to one model for the whole remaining batch.
2. **Hero image direction (§3.1)** — manuscript/lectern still-life, or the wide-shot study-hall
   alternative? This is the one slot where "no faces" constrains the composition the most.
3. **Blog cover style for "Ghazwul Fikri" (§3.5.2)** — abstract/editorial as drafted, or would
   you rather see a more literal treatment? Flagging because it is the one theme without an
   obvious literal, faceless visual.
4. **Directory name** — `public/assets/imgs/home/` as proposed, or match the About precedent's
   nesting more closely (e.g. `public/assets/imgs/home2/spi/`)?
5. **Batch size** — generate all 13 in one pass, or start with the 4 branch images (§3.4) alone,
   since those are the most straightforward and highest-value (they replace what will otherwise
   be the last visibly "placeholder" section once wording is done)?

---

*This is a plan document only. No image has been generated, no file under `public/assets/imgs/`
has been created, and `content/demos/e-learning/home.ts` has not been edited.*
