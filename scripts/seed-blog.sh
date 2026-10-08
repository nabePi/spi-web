#!/usr/bin/env bash
set -e

# Login
PORT=${PORT:-3000}
BASE="http://localhost:${PORT}"
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@pemikiranislam.id}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-AdminSPI2026!}

TOKEN=$(curl -s -X POST "${BASE}/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\"}" | grep -o "\"token\":\"[^\"]*\"" | cut -d"\"" -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to authenticate"
  exit 1
fi
echo "Authenticated successfully!"

lookup_cat() {
  curl -s "${BASE}/api/categories?where%5Bslug%5D%5Bequals%5D=$1&limit=1" \
    | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2
}
lookup_tag() {
  curl -s "${BASE}/api/tags?where%5Bslug%5D%5Bequals%5D=$1&limit=1" \
    | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2
}
lookup_author() {
  curl -s "${BASE}/api/authors?limit=1" \
    | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2
}
lookup_media() {
  curl -s "${BASE}/api/media?limit=1" \
    | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2
}

# 1. Categories
echo "Seeding categories..."
CAT1_ID=$(curl -s -X POST http://localhost:3000/api/categories \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Filosofi Dasar\",\"slug\":\"filosofi-dasar\",\"description\":\"Kajian prinsip filosofis dan fondasi epistemologi Islam\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
CAT1_ID=${CAT1_ID:-$(lookup_cat "filosofi-dasar")}

CAT2_ID=$(curl -s -X POST http://localhost:3000/api/categories \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Pemikiran Islam\",\"slug\":\"pemikiran-islam\",\"description\":\"Kajian isu kontemporer dan telaah pemikiran tokoh\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
CAT2_ID=${CAT2_ID:-$(lookup_cat "pemikiran-islam")}

curl -s -X POST http://localhost:3000/api/categories \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Kurikulum\",\"slug\":\"kurikulum\",\"description\":\"Seputar materi kurikulum dan silabus belajar SPI\"}" > /dev/null

curl -s -X POST http://localhost:3000/api/categories \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Berita\",\"slug\":\"berita\",\"description\":\"Kabar dan agenda kegiatan SPI dari berbagai kota\"}" > /dev/null

curl -s -X POST http://localhost:3000/api/categories \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Kisah Alumni\",\"slug\":\"kisah-alumni\",\"description\":\"Refleksi dan kiprah alumni SPI di masyarakat\"}" > /dev/null

echo "Categories seeded! CAT1=$CAT1_ID, CAT2=$CAT2_ID"

# 2. Tags
echo "Seeding tags..."
TAG1_ID=$(curl -s -X POST http://localhost:3000/api/tags \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Adab\",\"slug\":\"adab\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
TAG1_ID=${TAG1_ID:-$(lookup_tag "adab")}

TAG2_ID=$(curl -s -X POST http://localhost:3000/api/tags \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Al-Attas\",\"slug\":\"al-attas\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
TAG2_ID=${TAG2_ID:-$(lookup_tag "al-attas")}

TAG3_ID=$(curl -s -X POST http://localhost:3000/api/tags \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Tradisi Ilmu\",\"slug\":\"tradisi-ilmu\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
TAG3_ID=${TAG3_ID:-$(lookup_tag "tradisi-ilmu")}

curl -s -X POST http://localhost:3000/api/tags \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Ghazwul Fikri\",\"slug\":\"ghazwul-fikri\"}" > /dev/null

curl -s -X POST http://localhost:3000/api/tags \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Peradaban\",\"slug\":\"peradaban\"}" > /dev/null

echo "Tags seeded!"

# 3. Author
echo "Seeding author..."
AUTH1_ID=$(curl -s -X POST http://localhost:3000/api/authors \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"Dr. Akmal Sjafril, S.T., M.Pd.I.\",\"designation\":\"Pendiri dan Kepala Pusat SPI\",\"bio\":\"Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.\"}" | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
AUTH1_ID=${AUTH1_ID:-$(lookup_author)}

echo "Author seeded! AUTH1=$AUTH1_ID"

# 4. Media upload (Featured Image)
echo "Uploading sample media..."
MEDIA_ID=$(curl -s -X POST http://localhost:3000/api/media \
  -H "Authorization: JWT $TOKEN" \
  -F "file=@public/assets/imgs/inner/blog/spi-adab-blocks.webp" \
  -F '_payload={"alt":"Tumpukan batu tersusun rapi, melambangkan keteraturan adab","caption":"Ilustrasi konsep adab"}' | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2)
MEDIA_ID=${MEDIA_ID:-$(lookup_media)}

echo "Media uploaded! MEDIA_ID=$MEDIA_ID"

# 5. Articles
echo "Seeding article 1..."
curl -s -X POST http://localhost:3000/api/articles \
  -H "Authorization: JWT $TOKEN" -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Konsep adab: meletakkan sesuatu pada tempatnya\",
    \"slug\": \"konsep-adab-meletakkan-sesuatu-pada-tempatnya\",
    \"status\": \"published\",
    \"readTime\": \"8 menit baca\",
    \"category\": $CAT1_ID,
    \"author\": $AUTH1_ID,
    \"tags\": [$TAG1_ID, $TAG2_ID, $TAG3_ID],
    \"featuredImage\": $MEDIA_ID,
    \"excerpt\": \"Landasan intelektual Sekolah Pemikiran Islam sangat dipengaruhi oleh pemikiran Prof. Syed Muhammad Naquib al-Attas mengenai konsep adab sebagai fondasi keilmuan.\",
    \"content\": {
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
                \"detail\": 0,
                \"format\": 0,
                \"mode\": \"normal\",
                \"style\": \"\",
                \"text\": \"Landasan intelektual Sekolah Pemikiran Islam sangat dipengaruhi oleh pemikiran Prof. Syed Muhammad Naquib al-Attas. Inti dari ajaran itu adalah konsep adab — kata yang sering diterjemahkan sekadar sebagai sopan santun atau budaya, padahal maknanya jauh lebih tajam: meletakkan sesuatu pada tempatnya.\",
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
                \"detail\": 0,
                \"format\": 0,
                \"mode\": \"normal\",
                \"style\": \"\",
                \"text\": \"Definisi itu bukan anjuran etiket semata. Ia adalah cara berpikir fundamental. Ketika sesuatu diletakkan pada tempatnya, hierarki ilmu menjadi jelas, otoritas keilmuan dikenali, dan seorang penuntut ilmu tahu kepada siapa ia belajar dan dengan ukuran apa ia menilai.\",
                \"version\": 1
              }
            ]
          }
        ]
      }
    }
  }" > /dev/null

echo "Seed completed successfully!"
