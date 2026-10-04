export interface LecturerDoc {
  id: number;
  name: string;
  slug: string;
  initials: string;
  titleDegree?: string | null;
  role?: string | null;
  institution?: string | null;
  photo?: { id: number; url?: string; alt?: string } | null;
  bio?: string | null;
  order: number;
  status: "published" | "draft";
}

export interface LecturersQueryResult {
  docs: LecturerDoc[];
  totalDocs: number;
}

async function getPayloadClient() {
  const { getPayload } = await import("payload");
  const config = (await import("@payload-config")).default;
  return getPayload({ config });
}

// Fallback in case Payload is uninitialized
const fallbackLecturers: LecturerDoc[] = [
  { id: 1, name: "Dr. Akmal Sjafril", slug: "dr-akmal-sjafril", initials: "AS", titleDegree: "S.T., M.Pd.I.", role: "Pendiri dan Kepala Pusat SPI", institution: "INSISTS / SPI Pusat", order: 1, status: "published" },
  { id: 2, name: "Prof. Dr. Syamsuddin Arif", slug: "prof-dr-syamsuddin-arif", initials: "SA", titleDegree: "M.A., Ph.D.", role: "Pakar Filsafat & Pemikiran Islam", institution: "INSISTS / UNIDA Gontor", order: 2, status: "published" },
  { id: 3, name: "Prof. Usep Moh. Ishaq, Ph.D.", slug: "prof-usep-moh-ishaq-phd", initials: "UI", titleDegree: "Ph.D.", role: "Pakar Sains Islam & Pendidikan", institution: "INSISTS / Universiti Teknologi Malaysia", order: 3, status: "published" },
  { id: 4, name: "Dr. Muhammad Ardiansyah", slug: "dr-muhammad-ardiansyah", initials: "MA", titleDegree: "M.Pd.I.", role: "Pakar Pendidikan Islam & Hadits", institution: "STAI At-Taqwa Depok", order: 4, status: "published" },
  { id: 5, name: "Dr. Wido Supraha", slug: "dr-wido-supraha", initials: "WS", titleDegree: "M.Si.", role: "Pakar Pendidikan & Pemikiran Islam", institution: "Institut Tazkia", order: 5, status: "published" },
  { id: 6, name: "Asep Sobari, Lc", slug: "asep-sobari-lc", initials: "AS", titleDegree: "Lc.", role: "Peneliti Sejarah & Peradaban Islam", institution: "Kalam Salman / INSISTS", order: 6, status: "published" },
  { id: 7, name: "Dr. Tiar Anwar Bachtiar", slug: "dr-tiar-anwar-bachtiar", initials: "TB", titleDegree: "M.Hum.", role: "Sejarawan & Peneliti Pemikiran Islam", institution: "INSISTS / Universitas Padjadjaran", order: 7, status: "published" },
  { id: 8, name: "Dr. Kharis Nugroho, Lc., M.Ud", slug: "dr-kharis-nugroho", initials: "KN", titleDegree: "Lc., M.Ud.", role: "Pakar Pemikiran Islam", institution: "INSISTS", order: 8, status: "published" },
  { id: 9, name: "Dr. Wendi Zarman, M.Si", slug: "dr-wendi-zarman", initials: "WZ", titleDegree: "M.Si.", role: "Pakar Filsafat Sains & Pendidikan", institution: "INSISTS / UNIKOM Bandung", order: 9, status: "published" },
  { id: 10, name: "Dr. Nashruddin Syarief, S.S., M.Pd.I", slug: "dr-nashruddin-syarief", initials: "NS", titleDegree: "S.S., M.Pd.I.", role: "Pakar Hadits & Pemikiran Islam", institution: "Pesantren Persis", order: 10, status: "published" },
  { id: 11, name: "Dr. Kholili Hasib", slug: "dr-kholili-hasib", initials: "KH", titleDegree: "M.Ud.", role: "Pakar Tasawuf & Akidah", institution: "INPAS Surabaya", order: 11, status: "published" },
  { id: 12, name: "Dr. Deden Anjar H, M.Hum", slug: "dr-deden-anjar-h", initials: "DH", titleDegree: "M.Hum.", role: "Peneliti Filologi & Sastra Islam", institution: "Universitas Padjadjaran", order: 12, status: "published" },
  { id: 13, name: "Dr. Akhmad R. Damyati", slug: "dr-akhmad-r-damyati", initials: "AD", titleDegree: "Ph.D.", role: "Pakar Pemikiran Islam Kontemporer", institution: "INSISTS", order: 13, status: "published" },
  { id: 14, name: "Dr. Bahrul Ulum", slug: "dr-bahrul-ulum", initials: "BU", titleDegree: "M.Ud.", role: "Peneliti Media & Pemikiran Islam", institution: "INSISTS", order: 14, status: "published" },
  { id: 15, name: "Dr. Susiyanto", slug: "dr-susiyanto", initials: "SU", titleDegree: "M.Pd.I.", role: "Pakar Sejarah & Kristologi", institution: "Pusat Kajian Islam Surakarta", order: 15, status: "published" },
  { id: 16, name: "Ahmad Rofiqi, Lc., M.Pd.I", slug: "ahmad-rofiqi", initials: "AR", titleDegree: "Lc., M.Pd.I.", role: "Pengajar Bahasa Arab & Syariah", institution: "SPI Pusat", order: 16, status: "published" },
  { id: 17, name: "Muhammad Fadhila Azka, S.Th.I., M.Ag.", slug: "muhammad-fadhila-azka", initials: "MA", titleDegree: "S.Th.I., M.Ag.", role: "Peneliti Tafsir & Pemikiran", institution: "SPI Pusat", order: 17, status: "published" },
  { id: 18, name: "Erwyn Kurniawan, S.IP", slug: "erwyn-kurniawan", initials: "EK", titleDegree: "S.IP.", role: "Praktisi Media & Komunikasi", institution: "SPI Pusat", order: 18, status: "published" },
  { id: 19, name: "Adi Zulfikar, S.T.", slug: "adi-zulfikar", initials: "AZ", titleDegree: "S.T.", role: "Peneliti Isu Gender & Pemikiran", institution: "SPI Bandung", order: 19, status: "published" },
  { id: 20, name: "Hafizh Muftisanny", slug: "hafizh-muftisanny", initials: "HM", titleDegree: "S.Sos.", role: "Jurnalis & Peneliti Media", institution: "SPI Pusat", order: 20, status: "published" },
  { id: 21, name: "Anila Gusfani", slug: "anila-gusfani", initials: "AG", titleDegree: "S.Si.", role: "Pegiat Literasi & Pendidikan", institution: "SPI Pusat", order: 21, status: "published" },
  { id: 22, name: "Rani Nur Asriani, S.Fil", slug: "rani-nur-asriani", initials: "RA", titleDegree: "S.Fil.", role: "Peneliti Filsafat & Kajian Barat", institution: "SPI Pusat", order: 22, status: "published" },
];

export async function getPublishedLecturers(): Promise<LecturerDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "lecturers",
      where: {
        status: { equals: "published" },
      },
      sort: "order",
      limit: 100,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as unknown as LecturerDoc[]).map((doc) => ({
        ...doc,
        photo:
          doc.photo && typeof doc.photo === "object"
            ? {
                id: doc.photo.id,
                url: doc.photo.url,
                alt: doc.photo.alt,
              }
            : null,
      }));
    }
  } catch (error) {
    console.warn("[getPublishedLecturers] Falling back to static data:", error);
  }

  return fallbackLecturers;
}

export async function getLecturerBySlug(slug: string): Promise<LecturerDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "lecturers",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs[0] as unknown as LecturerDoc;
    }
  } catch (error) {
    console.warn(`[getLecturerBySlug] Failed to fetch slug: ${slug}`, error);
  }

  return fallbackLecturers.find((item) => item.slug === slug) ?? null;
}
