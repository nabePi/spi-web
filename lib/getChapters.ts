export interface ChapterDoc {
  id: number;
  name: string;
  slug: string;
  city: string;
  venue?: string | null;
  address?: string | null;
  image?: { id: number; url?: string; alt?: string } | null;
  description?: string | null;
  contactPerson?: string | null;
  phone?: string | null;
  email?: string | null;
  instagram?: string | null;
  order: number;
  status: "published" | "draft";
}

export interface ChaptersQueryResult {
  docs: ChapterDoc[];
  totalDocs: number;
}

async function getPayloadClient() {
  const { getPayload } = await import("payload");
  const config = (await import("@payload-config")).default;
  return getPayload({ config });
}

// Fallback data for the 6 SPI chapters
const fallbackChapters: ChapterDoc[] = [
  {
    id: 1,
    name: "SPI Fatahillah",
    slug: "spi-fatahillah-jakarta",
    city: "Jakarta",
    venue: "INSISTS, Kalibata, Jakarta Selatan",
    address: "Gedung INSISTS, Jl. Kalibata Utara II No. 84, RT.06/RW.02, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, DKI Jakarta 12740",
    image: { id: 1, url: "/assets/imgs/home/spi-cabang-jakarta.webp", alt: "Gedung SPI Fatahillah di kawasan Kalibata, Jakarta Selatan" },
    description: "Cabang perdana Sekolah Pemikiran Islam di ibu kota, menyelenggarakan kelas reguler dan kajian intensif bermitra dengan INSISTS Jakarta.",
    contactPerson: "Sekretariat SPI Jakarta",
    phone: "+62 812-8557-4547",
    email: "jakarta@pemikiranislam.id",
    instagram: "@spi.jakarta",
    order: 1,
    status: "published",
  },
  {
    id: 2,
    name: "SPI Moh. Natsir",
    slug: "spi-moh-natsir-bandung",
    city: "Bandung",
    venue: "Masjid Istiqamah, Bandung",
    address: "Kompleks Masjid Istiqamah, Jl. Taman Citarum No. 1, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115",
    image: { id: 2, url: "/assets/imgs/home/spi-cabang-bandung.webp", alt: "Halaman masjid dengan paviliun berkubah di Bandung" },
    description: "Cabang Bandung bertempat di Masjid Istiqamah yang bersejarah, menghadirkan kajian kritis pemikiran Islam bagi mahasiswa dan masyarakat umum di Kota Kembang.",
    contactPerson: "Koordinator SPI Bandung",
    phone: "+62 813-2211-9870",
    email: "bandung@pemikiranislam.id",
    instagram: "@spi.bandung",
    order: 2,
    status: "published",
  },
  {
    id: 3,
    name: "SPI UII",
    slug: "spi-uii-yogyakarta",
    city: "Yogyakarta",
    venue: "Universitas Islam Indonesia, Yogyakarta",
    address: "Kawasan Kampus Universitas Islam Indonesia, Jl. Kaliurang KM 14.5, Besi, Sukoharjo, Kec. Ngaglik, Kabupaten Sleman, D.I. Yogyakarta 55584",
    image: { id: 3, url: "/assets/imgs/home/spi-cabang-yogyakarta.webp", alt: "Gedung kampus bergaya Jawa di Yogyakarta" },
    description: "Pusat kaderisasi intelektual muda Muslim di Kota Pelajar, berkolaborasi dengan civitas akademika dan mahasiswa lintas kampus di Yogyakarta.",
    contactPerson: "Koordinator SPI Yogyakarta",
    phone: "+62 812-2789-4321",
    email: "jogja@pemikiranislam.id",
    instagram: "@spi.jogja",
    order: 3,
    status: "published",
  },
  {
    id: 4,
    name: "SPI Bogor — MARJAN",
    slug: "spi-bogor-marjan",
    city: "Bogor",
    venue: "Majelis MARJAN, Bogor",
    address: "Majelis Pemikiran di Kota Hujan, Jl. Pajajaran Indah No. 12, Baranangsiang, Kec. Bogor Timur, Kota Bogor, Jawa Barat 16143",
    image: { id: 4, url: "/assets/imgs/home/spi-cabang-bogor.webp", alt: "Serambi SPI Bogor MARJAN saat hujan" },
    description: "Cabang keenam SPI yang dikenal dengan majelis MARJAN, menghadirkan suasana kajian yang hangat dan mendalam di Kota Hujan.",
    contactPerson: "Koordinator SPI Bogor",
    phone: "+62 815-9876-5432",
    email: "bogor@pemikiranislam.id",
    instagram: "@spi.bogor",
    order: 4,
    status: "published",
  },
  {
    id: 5,
    name: "SPI Tangerang",
    slug: "spi-tangerang",
    city: "Tangerang",
    venue: "Pusat Kajian Islam Tangerang",
    address: "Kawasan Bintaro Jaya / BSD City, Tangerang Selatan, Banten 15224",
    image: { id: 5, url: "/assets/imgs/home/spi-cabang-jakarta.webp", alt: "Suasana kajian SPI Tangerang" },
    description: "Menjangkau generasi muda, mahasiswa, dan profesional Muslim di wilayah Tangerang Raya dan Banten.",
    contactPerson: "Koordinator SPI Tangerang",
    phone: "+62 811-9123-4567",
    email: "tangerang@pemikiranislam.id",
    instagram: "@spi.tangerang",
    order: 5,
    status: "published",
  },
  {
    id: 6,
    name: "SPI Padang",
    slug: "spi-padang",
    city: "Padang",
    venue: "Masjid & Pusat Studi Peradaban Islam Padang",
    address: "Jl. Khatib Sulaiman No. 45, Lolong Belanti, Kec. Padang Utara, Kota Padang, Sumatera Barat 25136",
    image: { id: 6, url: "/assets/imgs/home/spi-cabang-bandung.webp", alt: "Kajian SPI Padang Ranah Minang" },
    description: "Cabang SPI di Ranah Minang yang kaya akan tradisi keulamaan dan intelektual Islam, menyelenggarakan kelas reguler dan bedah pemikiran.",
    contactPerson: "Koordinator SPI Padang",
    phone: "+62 813-7456-7890",
    email: "padang@pemikiranislam.id",
    instagram: "@spi.padang",
    order: 6,
    status: "published",
  },
];

export async function getPublishedChapters(): Promise<ChapterDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "chapters",
      where: {
        status: { equals: "published" },
      },
      sort: "order",
      limit: 50,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as unknown as ChapterDoc[]).map((doc) => ({
        ...doc,
        image:
          doc.image && typeof doc.image === "object"
            ? {
                id: doc.image.id,
                url: doc.image.url,
                alt: doc.image.alt,
              }
            : fallbackChapters.find((f) => f.slug === doc.slug)?.image ?? null,
      }));
    }
  } catch (error) {
    console.warn("[getPublishedChapters] Falling back to static data:", error);
  }

  return fallbackChapters;
}

export async function getChapterBySlug(slug: string): Promise<ChapterDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "chapters",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0] as unknown as ChapterDoc;
      return {
        ...doc,
        image:
          doc.image && typeof doc.image === "object"
            ? {
                id: doc.image.id,
                url: doc.image.url,
                alt: doc.image.alt,
              }
            : fallbackChapters.find((f) => f.slug === doc.slug)?.image ?? null,
      };
    }
  } catch (error) {
    console.warn(`[getChapterBySlug] Failed to fetch slug: ${slug}`, error);
  }

  return fallbackChapters.find((item) => item.slug === slug) ?? null;
}
