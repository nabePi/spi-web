#!/usr/bin/env bash
# Seeds 22 Lecturers (Pengajar) and 6 Chapters (Cabang). Requires dev server running on port 3000.
set -e

PORT=${PORT:-3000}
BASE="http://localhost:${PORT}"
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@pemikiranislam.id}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-AdminSPI2026!}

echo "Authenticating on ${BASE}..."
TOKEN=$(curl -s -X POST "${BASE}/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\"}" | grep -o "\"token\":\"[^\"]*\"" | cut -d"\"" -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to authenticate"
  exit 1
fi

echo "Authenticated successfully."

seed_lecturer() {
  local json="$1"
  local name
  name=$(printf '%s' "$json" | grep -o '"name": "[^"]*"' | head -1 | cut -d'"' -f4)
  curl -s -X POST "${BASE}/api/lecturers" \
    -H "Authorization: JWT $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json" > /dev/null
  echo "  [Lecturer] Seeded: $name"
}

seed_chapter() {
  local json="$1"
  local name
  name=$(printf '%s' "$json" | grep -o '"name": "[^"]*"' | head -1 | cut -d'"' -f4)
  curl -s -X POST "${BASE}/api/chapters" \
    -H "Authorization: JWT $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json" > /dev/null
  echo "  [Chapter] Seeded: $name"
}

echo "=== Seeding Lecturers (Pengajar) ==="
seed_lecturer '{
  "name": "Dr. Akmal Sjafril, S.T., M.Pd.I.",
  "slug": "dr-akmal-sjafril",
  "initials": "AS",
  "titleDegree": "S.T., M.Pd.I.",
  "role": "Pendiri dan Kepala Pusat SPI",
  "institution": "INSISTS / SPI Pusat",
  "bio": "Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta turut mendirikan gerakan #IndonesiaTanpaJIL. Sejak 2016 menjadi pengurus Aliansi Cinta Keluarga (AILA) Indonesia, dan kini menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.",
  "order": 1,
  "status": "published"
}'

seed_lecturer '{
  "name": "Prof. Dr. Syamsuddin Arif",
  "slug": "prof-dr-syamsuddin-arif",
  "initials": "SA",
  "titleDegree": "M.A., Ph.D.",
  "role": "Pakar Filsafat & Pemikiran Islam",
  "institution": "INSISTS / UNIDA Gontor",
  "order": 2,
  "status": "published"
}'

seed_lecturer '{
  "name": "Prof. Usep Moh. Ishaq, Ph.D.",
  "slug": "prof-usep-moh-ishaq-phd",
  "initials": "UI",
  "titleDegree": "Ph.D.",
  "role": "Pakar Sains Islam & Pendidikan",
  "institution": "INSISTS / Universiti Teknologi Malaysia",
  "order": 3,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Muhammad Ardiansyah",
  "slug": "dr-muhammad-ardiansyah",
  "initials": "MA",
  "titleDegree": "M.Pd.I.",
  "role": "Pakar Pendidikan Islam & Hadits",
  "institution": "STAI At-Taqwa Depok",
  "order": 4,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Wido Supraha",
  "slug": "dr-wido-supraha",
  "initials": "WS",
  "titleDegree": "M.Si.",
  "role": "Pakar Pendidikan & Pemikiran Islam",
  "institution": "Institut Tazkia",
  "order": 5,
  "status": "published"
}'

seed_lecturer '{
  "name": "Asep Sobari, Lc",
  "slug": "asep-sobari-lc",
  "initials": "AS",
  "titleDegree": "Lc.",
  "role": "Peneliti Sejarah & Peradaban Islam",
  "institution": "Kalam Salman / INSISTS",
  "order": 6,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Tiar Anwar Bachtiar",
  "slug": "dr-tiar-anwar-bachtiar",
  "initials": "TB",
  "titleDegree": "M.Hum.",
  "role": "Sejarawan & Peneliti Pemikiran Islam",
  "institution": "INSISTS / Universitas Padjadjaran",
  "order": 7,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Kharis Nugroho, Lc., M.Ud",
  "slug": "dr-kharis-nugroho",
  "initials": "KN",
  "titleDegree": "Lc., M.Ud.",
  "role": "Pakar Pemikiran Islam",
  "institution": "INSISTS",
  "order": 8,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Wendi Zarman, M.Si",
  "slug": "dr-wendi-zarman",
  "initials": "WZ",
  "titleDegree": "M.Si.",
  "role": "Pakar Filsafat Sains & Pendidikan",
  "institution": "INSISTS / UNIKOM Bandung",
  "order": 9,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Nashruddin Syarief, S.S., M.Pd.I",
  "slug": "dr-nashruddin-syarief",
  "initials": "NS",
  "titleDegree": "S.S., M.Pd.I.",
  "role": "Pakar Hadits & Pemikiran Islam",
  "institution": "Pesantren Persis",
  "order": 10,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Kholili Hasib",
  "slug": "dr-kholili-hasib",
  "initials": "KH",
  "titleDegree": "M.Ud.",
  "role": "Pakar Tasawuf & Akidah",
  "institution": "INPAS Surabaya",
  "order": 11,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Deden Anjar H, M.Hum",
  "slug": "dr-deden-anjar-h",
  "initials": "DH",
  "titleDegree": "M.Hum.",
  "role": "Peneliti Filologi & Sastra Islam",
  "institution": "Universitas Padjadjaran",
  "order": 12,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Akhmad R. Damyati",
  "slug": "dr-akhmad-r-damyati",
  "initials": "AD",
  "titleDegree": "Ph.D.",
  "role": "Pakar Pemikiran Islam Kontemporer",
  "institution": "INSISTS",
  "order": 13,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Bahrul Ulum",
  "slug": "dr-bahrul-ulum",
  "initials": "BU",
  "titleDegree": "M.Ud.",
  "role": "Peneliti Media & Pemikiran Islam",
  "institution": "INSISTS",
  "order": 14,
  "status": "published"
}'

seed_lecturer '{
  "name": "Dr. Susiyanto",
  "slug": "dr-susiyanto",
  "initials": "SU",
  "titleDegree": "M.Pd.I.",
  "role": "Pakar Sejarah & Kristologi",
  "institution": "Pusat Kajian Islam Surakarta",
  "order": 15,
  "status": "published"
}'

seed_lecturer '{
  "name": "Ahmad Rofiqi, Lc., M.Pd.I",
  "slug": "ahmad-rofiqi",
  "initials": "AR",
  "titleDegree": "Lc., M.Pd.I.",
  "role": "Pengajar Bahasa Arab & Syariah",
  "institution": "SPI Pusat",
  "order": 16,
  "status": "published"
}'

seed_lecturer '{
  "name": "Muhammad Fadhila Azka, S.Th.I., M.Ag.",
  "slug": "muhammad-fadhila-azka",
  "initials": "MA",
  "titleDegree": "S.Th.I., M.Ag.",
  "role": "Peneliti Tafsir & Pemikiran",
  "institution": "SPI Pusat",
  "order": 17,
  "status": "published"
}'

seed_lecturer '{
  "name": "Erwyn Kurniawan, S.IP",
  "slug": "erwyn-kurniawan",
  "initials": "EK",
  "titleDegree": "S.IP.",
  "role": "Praktisi Media & Komunikasi",
  "institution": "SPI Pusat",
  "order": 18,
  "status": "published"
}'

seed_lecturer '{
  "name": "Adi Zulfikar, S.T.",
  "slug": "adi-zulfikar",
  "initials": "AZ",
  "titleDegree": "S.T.",
  "role": "Peneliti Isu Gender & Pemikiran",
  "institution": "SPI Bandung",
  "order": 19,
  "status": "published"
}'

seed_lecturer '{
  "name": "Hafizh Muftisanny",
  "slug": "hafizh-muftisanny",
  "initials": "HM",
  "titleDegree": "S.Sos.",
  "role": "Jurnalis & Peneliti Media",
  "institution": "SPI Pusat",
  "order": 20,
  "status": "published"
}'

seed_lecturer '{
  "name": "Anila Gusfani",
  "slug": "anila-gusfani",
  "initials": "AG",
  "titleDegree": "S.Si.",
  "role": "Pegiat Literasi & Pendidikan",
  "institution": "SPI Pusat",
  "order": 21,
  "status": "published"
}'

seed_lecturer '{
  "name": "Rani Nur Asriani, S.Fil",
  "slug": "rani-nur-asriani",
  "initials": "RA",
  "titleDegree": "S.Fil.",
  "role": "Peneliti Filsafat & Kajian Barat",
  "institution": "SPI Pusat",
  "order": 22,
  "status": "published"
}'

echo "=== Seeding Chapters (6 Cabang) ==="
seed_chapter '{
  "name": "SPI Fatahillah",
  "slug": "spi-fatahillah-jakarta",
  "city": "Jakarta",
  "venue": "INSISTS, Kalibata, Jakarta Selatan",
  "address": "Gedung INSISTS, Jl. Kalibata Utara II No. 84, RT.06/RW.02, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, DKI Jakarta 12740",
  "description": "Cabang perdana Sekolah Pemikiran Islam di ibu kota, menyelenggarakan kelas reguler dan kajian intensif bermitra dengan INSISTS Jakarta.",
  "contactPerson": "Sekretariat SPI Jakarta",
  "phone": "+62 812-8557-4547",
  "email": "jakarta@pemikiranislam.id",
  "instagram": "@spi.jakarta",
  "order": 1,
  "status": "published"
}'

seed_chapter '{
  "name": "SPI Moh. Natsir",
  "slug": "spi-moh-natsir-bandung",
  "city": "Bandung",
  "venue": "Masjid Istiqamah, Bandung",
  "address": "Kompleks Masjid Istiqamah, Jl. Taman Citarum No. 1, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115",
  "description": "Cabang Bandung bertempat di Masjid Istiqamah yang bersejarah, menghadirkan kajian kritis pemikiran Islam bagi mahasiswa dan masyarakat umum di Kota Kembang.",
  "contactPerson": "Koordinator SPI Bandung",
  "phone": "+62 813-2211-9870",
  "email": "bandung@pemikiranislam.id",
  "instagram": "@spi.bandung",
  "order": 2,
  "status": "published"
}'

seed_chapter '{
  "name": "SPI UII",
  "slug": "spi-uii-yogyakarta",
  "city": "Yogyakarta",
  "venue": "Universitas Islam Indonesia, Yogyakarta",
  "address": "Kawasan Kampus Universitas Islam Indonesia, Jl. Kaliurang KM 14.5, Besi, Sukoharjo, Kec. Ngaglik, Kabupaten Sleman, D.I. Yogyakarta 55584",
  "description": "Pusat kaderisasi intelektual muda Muslim di Kota Pelajar, berkolaborasi dengan civitas akademika dan mahasiswa lintas kampus di Yogyakarta.",
  "contactPerson": "Koordinator SPI Yogyakarta",
  "phone": "+62 812-2789-4321",
  "email": "jogja@pemikiranislam.id",
  "instagram": "@spi.jogja",
  "order": 3,
  "status": "published"
}'

seed_chapter '{
  "name": "SPI Bogor — MARJAN",
  "slug": "spi-bogor-marjan",
  "city": "Bogor",
  "venue": "Majelis MARJAN, Bogor",
  "address": "Majelis Pemikiran di Kota Hujan, Jl. Pajajaran Indah No. 12, Baranangsiang, Kec. Bogor Timur, Kota Bogor, Jawa Barat 16143",
  "description": "Cabang keenam SPI yang dikenal dengan majelis MARJAN, menghadirkan suasana kajian yang hangat dan mendalam di Kota Hujan.",
  "contactPerson": "Koordinator SPI Bogor",
  "phone": "+62 815-9876-5432",
  "email": "bogor@pemikiranislam.id",
  "instagram": "@spi.bogor",
  "order": 4,
  "status": "published"
}'

seed_chapter '{
  "name": "SPI Tangerang",
  "slug": "spi-tangerang",
  "city": "Tangerang",
  "venue": "Pusat Kajian Islam Tangerang",
  "address": "Kawasan Bintaro Jaya / BSD City, Tangerang Selatan, Banten 15224",
  "description": "Menjangkau generasi muda, mahasiswa, dan profesional Muslim di wilayah Tangerang Raya dan Banten.",
  "contactPerson": "Koordinator SPI Tangerang",
  "phone": "+62 811-9123-4567",
  "email": "tangerang@pemikiranislam.id",
  "instagram": "@spi.tangerang",
  "order": 5,
  "status": "published"
}'

seed_chapter '{
  "name": "SPI Padang",
  "slug": "spi-padang",
  "city": "Padang",
  "venue": "Masjid & Pusat Studi Peradaban Islam Padang",
  "address": "Jl. Khatib Sulaiman No. 45, Lolong Belanti, Kec. Padang Utara, Kota Padang, Sumatera Barat 25136",
  "description": "Cabang SPI di Ranah Minang yang kaya akan tradisi keulamaan dan intelektual Islam, menyelenggarakan kelas reguler dan bedah pemikiran.",
  "contactPerson": "Koordinator SPI Padang",
  "phone": "+62 813-7456-7890",
  "email": "padang@pemikiranislam.id",
  "instagram": "@spi.padang",
  "order": 6,
  "status": "published"
}'

echo "=== Seeding Complete! ==="
