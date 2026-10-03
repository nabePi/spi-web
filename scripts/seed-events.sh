#!/usr/bin/env bash
set -e

PORT=${PORT:-3001}
BASE="http://localhost:${PORT}"

echo "Authenticating on ${BASE}..."
TOKEN=$(curl -s -X POST "${BASE}/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@pemikiranislam.id\",\"password\":\"AdminSPI2026!\"}" | grep -o "\"token\":\"[^\"]*\"" | cut -d"\"" -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to authenticate"
  exit 1
fi
echo "Authenticated successfully!"

# Upload images if needed
echo "Uploading event media 2..."
MEDIA2_RES=$(curl -s -X POST "${BASE}/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@public/assets/imgs/home3/event/event-thumb1_1.webp" \
  -F '_payload={"alt":"Poster Daurah Pemikiran Islam","caption":"Daurah Worldview Islam & Sekularisme"}')
MEDIA2_ID=$(echo "$MEDIA2_RES" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)

echo "Uploading event media 3..."
MEDIA3_RES=$(curl -s -X POST "${BASE}/api/media" \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@public/assets/imgs/home3/event/event-thumb1_2.webp" \
  -F '_payload={"alt":"Poster Kuliah Umum Masjid Bintaro","caption":"Kuliah Umum Dinamika Gerakan Pemikiran Islam"}')
MEDIA3_ID=$(echo "$MEDIA3_RES" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)

MEDIA1_ID=2
echo "Media uploaded! MEDIA1=$MEDIA1_ID, MEDIA2=$MEDIA2_ID, MEDIA3=$MEDIA3_ID"

# 1. Event 1 (Free Upcoming Webinar)
echo "Seeding Event 1 (Webinar)..."
curl -s -X POST "${BASE}/api/events" \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Webinar: Krisis Epistemologi dan Urgensi Ru'yat al-Islam\",
    \"slug\": \"webinar-krisis-epistemologi-ruyat-al-islam\",
    \"eventType\": \"webinar\",
    \"status\": \"upcoming\",
    \"startDate\": \"2026-10-24T09:00:00.000Z\",
    \"endDate\": \"2026-10-24T12:00:00.000Z\",
    \"timeLabel\": \"Sabtu, 09:00 - 12:00 WIB\",
    \"locationType\": \"online\",
    \"locationName\": \"Zoom Meeting Room & YouTube Live\",
    \"featuredImage\": $MEDIA1_ID,
    \"speaker\": 1,
    \"summary\": \"Menelaah pergeseran paradigma keilmuan kontemporer, ancaman relativisme kebenaran, dan pentingnya mengembalikan worldview Islam (Ru'yat al-Islam) dalam diskursus pemikiran modern.\",
    \"isFree\": true,
    \"price\": 0,
    \"priceNote\": \"Gratis / Terbuka untuk Umum (Kapasitas 500 Peserta Zoom)\",
    \"externalCta\": {
      \"label\": \"Daftar Webinar Sekarang\",
      \"url\": \"https://forms.gle/spi-webinar-epistemologi-2026\"
    },
    \"description\": {
      \"root\": {
        \"type\": \"root\",
        \"format\": \"\",
        \"indent\": 0,
        \"version\": 1,
        \"children\": [
          {
            \"type\": \"paragraph\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Dalam lanskap pemikiran kontemporer, umat Islam dihadapkan pada disrupsi epistemologis yang meluas. Arus pasca-modernisme tidak sekadar mempertanyakan klaim kepastian ilmiah, melainkan mendekonstruksi fondasi metafisika dan nilai-nilai transendental. Tanpa pijakan Ru'yat al-Islam (Islamic Worldview) yang kokoh, generasi terpelajar muslim rentan terseret dalam kebingungan intelektual dan krisis adab terhadap ilmu.\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          },
          {
            \"type\": \"heading\",
            \"tag\": \"h3\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Pokok Bahasan Webinar\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          },
          {
            \"type\": \"paragraph\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"1. Anatomi Krisis Epistemologi Barat Modern & Pasca-Modern.\\n2. Fondasi Ru'yat al-Islam: Hakikat Wujud, Wahyu, dan Akal.\\n3. Strategi Islamisasi Ilmu Kontemporer dan Pemurnian Nalar Muslim.\\n4. Tanya Jawab Interaktif dan Studi Kasus Pemikiran Terkini.\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          }
        ]
      }
    }
  }" > /dev/null

echo "Event 1 seeded!"

# 2. Event 2 (Paid / Infaq Upcoming Hybrid Daurah)
echo "Seeding Event 2 (Daurah)..."
curl -s -X POST "${BASE}/api/events" \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Daurah Pemikiran Islam: Membedah Worldview Islam dan Tantangan Sekularisme\",
    \"slug\": \"daurah-pemikiran-islam-worldview-dan-sekularisme\",
    \"eventType\": \"daurah\",
    \"status\": \"upcoming\",
    \"startDate\": \"2026-11-14T08:30:00.000Z\",
    \"endDate\": \"2026-11-15T16:00:00.000Z\",
    \"timeLabel\": \"Sabtu - Ahad, 08:30 - 16:00 WIB\",
    \"locationType\": \"hybrid\",
    \"locationName\": \"Aula SPI Pusat & Zoom Meeting\",
    \"locationAddress\": \"Gedung Graha Pemikiran Islam, Jl. KH. Ahmad Dahlan No. 45, Kebayoran Baru, Jakarta Selatan\",
    \"featuredImage\": $MEDIA2_ID,
    \"speaker\": 1,
    \"summary\": \"Program intensif dua hari mengupas tuntas epistemologi Islam, tantangan sekularisasi ilmu, de-westernisasi sains, dan rekonstruksi peradaban Islam di era disrupsi.\",
    \"isFree\": false,
    \"price\": 150000,
    \"priceNote\": \"Termasuk modul cetak eksklusif, makan siang 2 hari, seminar kit & e-sertifikat resmi\",
    \"externalCta\": {
      \"label\": \"Registrasi Peserta Daurah\",
      \"url\": \"https://forms.gle/spi-daurah-worldview-2026\"
    },
    \"description\": {
      \"root\": {
        \"type\": \"root\",
        \"format\": \"\",
        \"indent\": 0,
        \"version\": 1,
        \"children\": [
          {
            \"type\": \"paragraph\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Daurah Pemikiran Islam adalah program pelatihan intensif akhir pekan yang dirancang khusus bagi aktivis dakwah, mahasiswa, akademisi, dan profesional yang ingin memperdalam pondasi nalar Islam yang sistematis dan argumentatif.\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          },
          {
            \"type\": \"heading\",
            \"tag\": \"h3\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Fasilitas & Keikutsertaan\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          },
          {
            \"type\": \"paragraph\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Peserta luring mendapatkan tempat terbatas (50 seat di Aula SPI Pusat) dengan fasilitas lengkap makan siang dan coffee break. Peserta daring difasilitasi Zoom interaktif beresolusi tinggi dengan sesi break-out room untuk telaah teks kritis.\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          }
        ]
      }
    }
  }" > /dev/null

echo "Event 2 seeded!"

# 3. Event 3 (Free Completed Offline Kuliah Umum)
echo "Seeding Event 3 (Kuliah Umum Archive)..."
curl -s -X POST "${BASE}/api/events" \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Kuliah Umum: Sejarah dan Dinamika Gerakan Pemikiran Islam di Indonesia\",
    \"slug\": \"kuliah-umum-sejarah-gerakan-pemikiran-islam-indonesia\",
    \"eventType\": \"kuliah-umum\",
    \"status\": \"completed\",
    \"startDate\": \"2026-09-19T13:30:00.000Z\",
    \"endDate\": \"2026-09-19T16:30:00.000Z\",
    \"timeLabel\": \"Sabtu, 13:30 - 16:30 WIB\",
    \"locationType\": \"offline\",
    \"locationName\": \"Masjid Raya Bintaro Jaya\",
    \"locationAddress\": \"Sektor 9 Bintaro Jaya, Tangerang Selatan, Banten\",
    \"featuredImage\": $MEDIA3_ID,
    \"speaker\": 1,
    \"summary\": \"Kajian mendalam menelusuri akar historis respon ulama Nusantara terhadap infiltrasi gagasan kolonial serta geliat kebangkitan intelektual Islam abad ke-20.\",
    \"isFree\": true,
    \"price\": 0,
    \"priceNote\": \"Gratis / Terbuka untuk Jamaah & Umum\",
    \"externalCta\": {
      \"label\": \"Lihat Arsip Rekaman Video\",
      \"url\": \"https://youtube.com/@sekolahpemikiranislam\"
    },
    \"description\": {
      \"root\": {
        \"type\": \"root\",
        \"format\": \"\",
        \"indent\": 0,
        \"version\": 1,
        \"children\": [
          {
            \"type\": \"paragraph\",
            \"format\": \"\",
            \"indent\": 0,
            \"version\": 1,
            \"children\": [
              {
                \"type\": \"text\",
                \"text\": \"Kegiatan kuliah umum ini telah terselenggara dengan sukses dihadiri lebih dari 300 jamaah di Masjid Raya Bintaro Jaya. Rekaman ceramah ilmiah dan slide presentasi dapat diakses secara terbuka melalui kanal media resmi SPI.\",
                \"format\": 0,
                \"version\": 1
              }
            ]
          }
        ]
      }
    }
  }" > /dev/null

echo "Event 3 seeded successfully!"
