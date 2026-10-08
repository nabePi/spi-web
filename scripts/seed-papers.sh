#!/usr/bin/env bash
# Seeds 3 sample papers (PDF upload + metadata). Requires the dev server and the
# categories/tags from scripts/seed-blog.sh.
set -e

PORT=${PORT:-3000}
BASE="http://localhost:${PORT}"
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@pemikiranislam.id}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-AdminSPI2026!}
DIR="$(cd "$(dirname "$0")" && pwd)/sample-papers"

echo "Authenticating on ${BASE}..."
TOKEN=$(curl -s -X POST "${BASE}/api/users/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\"}" | grep -o "\"token\":\"[^\"]*\"" | cut -d"\"" -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to authenticate"
  exit 1
fi

# Resolve a taxonomy id from its slug (empty if missing).
lookup_id() {
  curl -s "${BASE}/api/$1?where%5Bslug%5D%5Bequals%5D=$2&limit=1" \
    | grep -o "\"id\":[0-9]*" | head -1 | cut -d: -f2
}

CAT_PEMIKIRAN=$(lookup_id categories pemikiran-islam)
CAT_FILOSOFI=$(lookup_id categories filosofi-dasar)
TAG_ADAB=$(lookup_id tags adab)
TAG_ATTAS=$(lookup_id tags al-attas)
TAG_TRADISI=$(lookup_id tags tradisi-ilmu)
TAG_GHAZWUL=$(lookup_id tags ghazwul-fikri)

# usage: seed_paper <pdf> <json fields>; explanation is a single Lexical paragraph.
seed_paper() {
  local file="$1" fields="$2" explanation="$3"
  local payload
  payload=$(printf '%s' "$fields" | python3 -c '
import json, sys
d = json.loads(sys.stdin.read())
text = sys.argv[1]
d["explanation"] = {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "direction": "ltr",
  "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "direction": "ltr",
    "children": [{"type": "text", "text": text, "format": 0, "version": 1, "mode": "normal", "style": "", "detail": 0}]}]}}
print(json.dumps(d))' "$explanation")
  curl -s -X POST "${BASE}/api/papers" \
    -H "Authorization: JWT $TOKEN" \
    -F "file=@${DIR}/${file};type=application/pdf" \
    -F "_payload=${payload}" | grep -o '"message":"[^"]*"' || true
  echo "  seeded ${file}"
}

seed_paper "epistemologi-islam.pdf" "{
  \"title\": \"Epistemologi Islam dan Krisis Sains Modern\",
  \"status\": \"published\",
  \"paperType\": \"jurnal\",
  \"year\": 2025,
  \"author\": \"Tim Peneliti SPI\",
  \"category\": ${CAT_PEMIKIRAN:-null},
  \"tags\": [${TAG_ATTAS:-},${TAG_GHAZWUL:-}],
  \"abstract\": \"Makalah ini menelaah krisis epistemologi dalam sains modern dan menawarkan kerangka Ru'yat al-Islam sebagai landasan integrasi ilmu, wahyu, dan akal.\",
  \"pageCount\": 1
}" "Tulisan ini cocok dibaca sebagai pengantar sebelum mengikuti kelas epistemologi. Perhatikan bagian argumen tentang hubungan antara sumber ilmu dan otoritas."

seed_paper "adab-tradisi-ilmu.pdf" "{
  \"title\": \"Adab dan Tradisi Ilmu dalam Pendidikan\",
  \"status\": \"published\",
  \"paperType\": \"makalah\",
  \"year\": 2024,
  \"author\": \"A. Rahman, B. Hakim\",
  \"category\": ${CAT_FILOSOFI:-null},
  \"tags\": [${TAG_ADAB:-},${TAG_TRADISI:-}],
  \"abstract\": \"Kajian tentang kedudukan adab sebagai prasyarat ilmu dalam tradisi pendidikan Islam dan relevansinya bagi lembaga pendidikan kontemporer.\",
  \"pageCount\": 1
}" "Makalah ini ditulis untuk peserta program dasar. Bacalah bersama bahan kajian adab pada pekan pertama."

seed_paper "sekularisme-worldview.pdf" "{
  \"title\": \"Tantangan Sekularisme terhadap Worldview Islam\",
  \"status\": \"draft\",
  \"paperType\": \"working-paper\",
  \"year\": 2026,
  \"author\": \"C. Pratama\",
  \"category\": ${CAT_PEMIKIRAN:-null},
  \"tags\": [${TAG_GHAZWUL:-}],
  \"abstract\": \"Draf kerja mengenai bagaimana sekularisme membentuk cara pandang terhadap ilmu, etika, dan kehidupan publik.\",
  \"pageCount\": 1
}" "Draf internal, belum dipublikasikan."

echo "Done."
