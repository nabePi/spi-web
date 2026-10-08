# Panduan Deployment Live Server (Docker)

Panduan ini menjelaskan langkah-langkah deployment website Sekolah Pemikiran Islam (SPI) menggunakan Docker dan Docker Compose di server produksi.

---

## 1. Prasyarat Server

Pastikan server (VPS / Dedicated Server) telah terpasang:
- **Docker Engine** (versi 24.0+)
- **Docker Compose** (versi 2.20+)
- Akses port `80` dan `443` (untuk web / reverse proxy) serta port `3000` (atau port internal Docker)

---

## 2. Langkah Deployment

### Langkah 1: Clone Repository
Clone repositori ke direktori kerja di server:
```bash
git clone <URL_REPOSITORY> /opt/spi-web
cd /opt/spi-web
```

### Langkah 2: Konfigurasi Environment Variables
Salin template `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Buka dan sesuaikan nilai dalam `.env`:
```bash
nano .env
```

Variabel yang perlu disesuaikan:
- `NEXT_PUBLIC_APP_URL`: Domain resmi situs (misal: `https://pemikiranislam.id`).
- `PAYLOAD_SECRET`: Kunci enkripsi acak untuk session CMS. Buat string acak dengan:
  ```bash
  openssl rand -base64 32
  ```
- `POSTGRES_USER`: Username database PostgreSQL.
- `POSTGRES_PASSWORD`: Password database yang aman.
- `POSTGRES_DB`: Nama database (default: `spi_cms`).

---

## 3. Database & Skema Otomatis

Proyek ini telah dilengkapi file inisialisasi database di folder `database/`:
- `database/schema.sql`: Definisi struktur tabel, enum, index, dan relasi.
- `database/init.sql`: Struktur tabel lengkap beserta data awal (kategori, tag, pengajar, cabang, artikel, event, dan makalah).

### Skenario A: Menggunakan PostgreSQL Bawaan Docker Compose (Direkomendasikan)
Saat pertama kali menjalankan `docker compose up -d`, service `db` akan secara otomatis mengeksekusi file `database/init.sql` ke dalam volume database. Anda **tidak perlu** mengimpor database secara manual.

### Skenario B: Menggunakan Database Eksternal (Managed Cloud DB / RDS / Supabase)
Jika Anda menggunakan database PostgreSQL terpisah di luar container:
1. Isi `DATABASE_URI` pada `.env` dengan connection string database Anda.
2. Impor file inisialisasi secara manual:
   ```bash
   psql -h <HOST_DB> -U <USER_DB> -d <NAME_DB> -f database/init.sql
   ```
   *Atau* aktifkan `DB_PUSH=true` pada `.env` agar Payload otomatis melakukan sinkronisasi skema tabel saat build/start.

---

## 4. Menjalankan Aplikasi

Jalankan container menggunakan Docker Compose:
```bash
docker compose up -d --build
```

Periksa status container:
```bash
docker compose ps
docker compose logs -f web
```

Setelah status service `web` menunjukkan `healthy`, aplikasi sudah aktif di port `3000`.

---

## 5. Persistent Storage & Backup

Data penting aplikasi disimpan dalam Docker Volumes:
- `postgres_data`: Menyimpan data database PostgreSQL.
- `payload_media`: Menyimpan aset gambar yang diunggah melalui CMS (`/app/media`).
- `payload_papers`: Menyimpan file dokumen PDF makalah (`/app/papers`).

### Perintah Backup Database:
```bash
docker compose exec db pg_dump -U postgres spi_cms > backup_$(date +%F).sql
```

### Perintah Restore Database:
```bash
cat backup.sql | docker compose exec -T db psql -U postgres -d spi_cms
```

---

## 6. Konfigurasi Reverse Proxy (Nginx)

Untuk menghubungkan domain dan sertifikat SSL (HTTPS) ke container aplikasi:

```nginx
server {
    server_name pemikiranislam.id www.pemikiranislam.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}
```

Aktifkan SSL menggunakan Certbot:
```bash
certbot --nginx -d pemikiranislam.id -d www.pemikiranislam.id
```

---

## 7. Pembaruan Aplikasi (Update / Redeploy)

Jika terdapat pembaruan kode di kemudian hari:
```bash
git pull origin main
docker compose up -d --build web
```
Volume database dan file media/dokumen akan tetap aman dan tidak terhapus.
