# Sekolah Pemikiran Islam (SPI) — Website

Website resmi Sekolah Pemikiran Islam (SPI), dibangun dengan Next.js (App Router) dan TypeScript.

Basis kode ini awalnya berasal dari template ThemeForest berbayar ("InstituteFlow", item `ocZNO2zv`) yang sedang direbranding secara bertahap — konten dan gambar bawaan template diganti halaman demi halaman dengan konten SPI yang sebenarnya serta gambar hasil generate AI (fal.ai).

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) + React 19 + TypeScript
- [Payload CMS](https://payloadcms.com/) 3 (Headless CMS) + PostgreSQL (adapter `@payloadcms/db-postgres`)
- Sass (SCSS) untuk styling, Bootstrap 5 untuk sebagian komponen
- GSAP (ScrollTrigger, ScrollSmoother, SplitText) untuk animasi scroll
- Swiper, Odometer, counterup2, vanilla-tilt, magnific-popup — komponen interaktif bawaan template

## Prasyarat

- Node.js 20+ (disarankan mengikuti versi di `devDependencies` → `@types/node`)
- npm
- PostgreSQL 14+ yang berjalan secara lokal

## Menjalankan secara lokal

```bash
npm install
npm run db:setup
npm run cms:seed-admin
npm run dev
```

Buat database lokal terlebih dahulu bila belum ada:

```bash
createdb spi_cms
```

Buka [http://localhost:3000](http://localhost:3000) di browser, lalu buka
[http://localhost:3000/admin](http://localhost:3000/admin) untuk CMS.

## Script yang tersedia

| Perintah        | Keterangan                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Menjalankan server development       |
| `npm run build` | Build untuk production               |
| `npm run start` | Menjalankan hasil build production   |
| `npm run lint`  | Menjalankan ESLint                   |
| `npm run db:setup` | Menginisialisasi skema Payload di PostgreSQL lokal |
| `npm run cms:seed-admin` | Membuat atau memperbarui akun admin lokal contoh |

Belum ada test suite di proyek ini.

## Environment variables

| Variabel              | Wajib? | Default                 | Keterangan                                              |
| ---------------------- | ------ | ------------------------ | -------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`  | Tidak  | `http://localhost:3000` | Base URL situs, dipakai untuk metadata & canonical URL. |
| `PAYLOAD_SECRET`       | Ya     | -                        | Kunci rahasia untuk otentikasi admin Payload CMS.       |
| `DATABASE_URI`         | Ya     | `postgresql://postgres:postgres@localhost:5432/spi_cms` | URI koneksi PostgreSQL. |

Salin `.env.example` menjadi `.env.local`, lalu ganti `PAYLOAD_SECRET` dengan
nilai unik. `DATABASE_URI` wajib tersedia saat aplikasi berjalan.

## Payload CMS

Website ini dilengkapi CMS headless bawaan menggunakan [Payload CMS](https://payloadcms.com/) v3:

- **Admin Panel**: Akses di `http://localhost:3000/admin`.
- **Akun lokal contoh**: Jalankan `npm run cms:seed-admin`, lalu masuk dengan `admin@pemikiranislam.id` dan `AdminSPI2026!`. Akun ini hanya untuk development lokal dan perintah seed ditolak di production.
- **REST API**: Tersedia di `/api/[collection]` (contoh: `/api/users`, `/api/media`).
- **Konfigurasi CMS**: Berada di `payload.config.ts`.
- **Koleksi**: Didefinisikan di `payload/collections/` (`Users.ts`, `Media.ts`).
- **Database & Media**: PostgreSQL menyimpan data CMS; file upload disimpan di folder `media/` (di-gitignore).

## Struktur proyek

```
app/                  # Routing Next.js App Router
  (site)/             # Route group halaman publik (home, about-v1, alumni, blog, contact, dll.)
  (payload)/          # Route group admin panel & REST API Payload CMS (/admin, /api)
components/
  layout/             # Header, footer, preloader, chrome situs, bootstrap vendor script
  pages/              # Komponen section per halaman (demos/ & inner/)
  forms/              # Komponen form
  shared/              # Komponen bersama (breadcrumb, paginasi, dll.)
content/              # Konten & data teks/gambar per halaman (typed)
payload/              # Koleksi data Payload CMS (Users, Media, dll.)
types/                # Tipe TypeScript untuk konten di atas
icons/                # Komponen ikon SVG
lib/                  # Konfigurasi situs, metadata helper, bootstrap vendor JS
context/              # Provider React (animasi GSAP, dll.)
public/assets/        # Gambar, video, font statis
plans/                # Dokumen perencanaan kerja (per tanggal)
media/                # Penyimpanan file upload CMS (lokal, di-gitignore)
```

Konten teks dan gambar tiap halaman diatur di `content/{demos,inner}/<halaman>.ts` (bertipe sesuai `types/{demos,inner}/<halaman>.ts`), bukan langsung di dalam komponen — ubah file di `content/` untuk mengganti copywriting atau gambar suatu section.

Untuk Docker/deployment, sediakan `PAYLOAD_SECRET` dan `DATABASE_URI` PostgreSQL
yang dapat dijangkau oleh container. `docker-compose.yml` tidak membuat database
atau menggunakan SQLite.

## Alur kerja multi-device (WAJIB)

Proyek ini dikerjakan dari banyak perangkat. Alur rilis: **staging (node/server) → local (review & testing) → live (rilis)**.

> **Selalu `git pull` sebelum mulai, dan selalu `git push` setelah selesai.**

1. **Sebelum mulai** di perangkat mana pun: `git pull` (atau `git fetch` lalu pastikan branch tidak tertinggal dari `origin`).
2. **Setelah selesai:** commit dan `git push`. Pekerjaan yang belum di-push tidak terlihat di perangkat lain.
3. **Sebelum review di local:** `git pull` branch yang di-push dari staging.
4. **Sebelum rilis ke live:** `git pull` branch yang sudah direview (atau `main`) di server live. Jangan edit langsung di live.
5. **Jangan push dari checkout yang usang.** Jika push ditolak, `git pull` dan selesaikan konflik — jangan `--force`.

## Catatan lain

- `/template/` dan `/document/` adalah folder lokal (di-gitignore) — masing-masing berisi salinan asli template ThemeForest sebagai referensi, dan dokumen perencanaan internal (PRD, sitemap, dll.). Keduanya tidak wajib ada di setiap clone.
- Proyek ini bersifat privat (`"license": "UNLICENSED"`) dan tidak untuk didistribusikan ulang.
