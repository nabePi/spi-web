# Deployment di Dokploy

Aplikasi di-deploy sebagai **Compose** service di Dokploy. PostgreSQL dikelola
terpisah di Dokploy, sehingga `docker-compose.yml` hanya berisi service `web`.

## Langkah

1. Di Dokploy buat project → **Compose** → sambungkan repo ini (Compose path: `./docker-compose.yml`, type: Docker Compose).
2. Isi tab **Environment** (lihat `.env.example`):
   - `NEXT_PUBLIC_APP_URL` — domain publik, mis. `https://pemikiranislam.id`
   - `PAYLOAD_SECRET` — `openssl rand -base64 32`
   - `DATABASE_URI` — connection string database Postgres di Dokploy. Jika DB berada di jaringan Dokploy yang sama, gunakan *internal host* dari halaman database.
3. Tab **Domains**: arahkan domain ke service `web`, port `3000`.
4. Deploy.

## Migrasi database

Migrasi Payload ada di `migrations/` dan dijalankan **otomatis saat container
start** (`instrumentation.ts` + `prodMigrations`). Jika migrasi gagal, container
gagal start dan deploy terlihat gagal di log.

- Untuk database kosong, migrasi awal membuat seluruh skema.
- Setelah mengubah collection/global, buat migrasi baru lalu commit:
  ```bash
  DATABASE_URI=postgresql://... PAYLOAD_SECRET=x npx payload migrate:create nama_migrasi
  ```
  Lalu tambahkan entri barunya ke `migrations/index.ts` (otomatis dibuat oleh perintah di atas).
- `database/init.sql` hanya untuk restore data awal manual; jangan dijalankan
  pada database yang akan dimigrasi (tabel akan bentrok).

## Storage

Volume `payload_media` (`/app/media`) dan `payload_papers` (`/app/papers`) menyimpan upload. Pastikan di-backup.
