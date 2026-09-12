# Sekolah Pemikiran Islam (SPI) — Website

Website resmi Sekolah Pemikiran Islam (SPI), dibangun dengan Next.js (App Router) dan TypeScript.

Basis kode ini awalnya berasal dari template ThemeForest berbayar ("InstituteFlow", item `ocZNO2zv`) yang sedang direbranding secara bertahap — konten dan gambar bawaan template diganti halaman demi halaman dengan konten SPI yang sebenarnya serta gambar hasil generate AI (fal.ai).

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) + React 19 + TypeScript
- Sass (SCSS) untuk styling, Bootstrap 5 untuk sebagian komponen
- GSAP (ScrollTrigger, ScrollSmoother, SplitText) untuk animasi scroll
- Swiper, Odometer, counterup2, vanilla-tilt, magnific-popup — komponen interaktif bawaan template

## Prasyarat

- Node.js 20+ (disarankan mengikuti versi di `devDependencies` → `@types/node`)
- npm

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Script yang tersedia

| Perintah        | Keterangan                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Menjalankan server development       |
| `npm run build` | Build untuk production               |
| `npm run start` | Menjalankan hasil build production   |
| `npm run lint`  | Menjalankan ESLint                   |

Belum ada test suite di proyek ini.

## Environment variables

| Variabel              | Wajib? | Default                 | Keterangan                                              |
| ---------------------- | ------ | ------------------------ | -------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`  | Tidak  | `http://localhost:3000` | Base URL situs, dipakai untuk metadata & canonical URL. |

## Struktur proyek

```
app/                  # Routing Next.js App Router
  (site)/             # Route group halaman publik (home, about-v1, alumni, blog, contact, dll.)
components/
  layout/             # Header, footer, preloader, chrome situs, bootstrap vendor script
  pages/              # Komponen section per halaman (demos/ & inner/)
  forms/              # Komponen form
  shared/              # Komponen bersama (breadcrumb, paginasi, dll.)
content/              # Konten & data teks/gambar per halaman (typed)
types/                # Tipe TypeScript untuk konten di atas
icons/                # Komponen ikon SVG
lib/                  # Konfigurasi situs, metadata helper, bootstrap vendor JS
context/              # Provider React (animasi GSAP, dll.)
public/assets/        # Gambar, video, font statis
plans/                # Dokumen perencanaan kerja (per tanggal)
```

Konten teks dan gambar tiap halaman diatur di `content/{demos,inner}/<halaman>.ts` (bertipe sesuai `types/{demos,inner}/<halaman>.ts`), bukan langsung di dalam komponen — ubah file di `content/` untuk mengganti copywriting atau gambar suatu section.

## Catatan lain

- `/template/` dan `/document/` adalah folder lokal (di-gitignore) — masing-masing berisi salinan asli template ThemeForest sebagai referensi, dan dokumen perencanaan internal (PRD, sitemap, dll.). Keduanya tidak wajib ada di setiap clone.
- Proyek ini bersifat privat (`"license": "UNLICENSED"`) dan tidak untuk didistribusikan ulang.
