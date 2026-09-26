import type { CourseDetailsContent } from "@/types/inner/course-details";
import innercoursescoursesDetailsv1Instructuor11 from "@/public/assets/imgs/placeholder/courses-detailsv1-instructuor1_1.svg";
import innercoursescoursesKursusSingkat from "@/public/assets/imgs/inner/courses/spi-kursus-singkat-intimate.webp";

export const kursusSingkatContent: CourseDetailsContent = {
  layout: "tabs",
  rowClass: "gy-40",
  sidebarClass: "course-details1__sidebar mb-0",
  tabs: [
    { id: "overview-tab", target: "overview", label: "Ringkasan Program", active: true },
    { id: "curriculum-tab", target: "curriculum", label: "Kurikulum" },
    { id: "instructor-tab", target: "instructor", label: "Pengajar" },
  ],
  overviewParagraphs: [
    "Program Kursus Singkat Reguler SPI dirancang dalam dua semester pembelajaran dengan rangkaian materi yang membangun pemahaman peserta secara bertahap, mulai dari fondasi pemikiran Islam, konsep-konsep dasar keislaman, sejarah, hingga kajian terhadap berbagai tantangan pemikiran kontemporer.",
  ],
  curriculum: [
    {
      id: "one",
      headingId: "headingOne",
      collapseId: "collapseOne",
      title: "Semester 1 — Fondasi Pemikiran Islam",
      open: true,
      description:
        "Pada semester pertama, peserta diperkenalkan dengan dasar-dasar pemikiran Islam, konsep pandangan hidup Islam (Ru'yat al-Islam li al-Wujud), serta berbagai aspek yang membentuk cara pandang seorang Muslim terhadap ilmu, kehidupan, dan peradaban.",
      lessons: [
        { title: "Pendahuluan" },
        { title: "Ghazwul Fikri" },
        { title: "Ru'yat al-Islam li al-Wujud" },
        { title: "Jurnalistik Dasar" },
        { title: "Tauhidullah" },
        { title: "Konsep Diin" },
        { title: "Wahyu dan Kenabian" },
        { title: "Diskusi Literasi" },
        { title: "Masyarakat Jahiliyah" },
        { title: "Adab" },
        { title: "Mabit" },
      ],
    },
    {
      id: "two",
      headingId: "headingTwo",
      collapseId: "collapseTwo",
      title: "Semester 2 — Islam dan Tantangan Pemikiran Kontemporer",
      description:
        "Pada semester kedua, peserta diajak untuk memahami berbagai perkembangan pemikiran, sejarah, dan isu kontemporer yang berkaitan dengan umat Islam. Kajian mencakup pembahasan mengenai ideologi modern, sejarah kelompok pemikiran, konsep manusia, serta strategi kontribusi dakwah di tengah perubahan zaman.",
      lessons: [
        { title: "Sekularisme" },
        { title: "Nativisasi" },
        { title: "Fitnah Kubro" },
        { title: "Sejarah dan Doktrin Syi'ah" },
        { title: "Pluralisme Agama" },
        { title: "Konsep Gender" },
        { title: "Mengenal Filsafat" },
        { title: "Manusia dan Kebahagiaan" },
        { title: "Muslim Semi Peradaban Islam" },
        { title: "Serba-serbi Dakwah" },
        { title: "Rihlah" },
      ],
    },
  ],
  instructor: {
    name: "Dr. Akmal Sjafril, S.T., M.Pd.I.",
    thumb: {
      src: innercoursescoursesDetailsv1Instructuor11,
      alt: "placeholder",
    },
    rating: "4.9/5",
    ratingLabel: "Pendiri dan Kepala Pusat SPI",
    students: "14 Angkatan",
    courses: "9 Topik kajian",
    bio: "Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta turut mendirikan gerakan #IndonesiaTanpaJIL. Sejak 2016 menjadi pengurus Aliansi Cinta Keluarga (AILA) Indonesia, dan kini menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.",
    socials: [
      { label: "Facebook", href: "https://web.facebook.com/Sekolah.Pemikiran.Islam/", icon: "facebook" },
      { label: "Twitter/X", href: "https://twitter.com/SPI_Pusat", icon: "twitter" },
    ],
  },
  sidebarThumb: {
    src: innercoursescoursesKursusSingkat,
    alt: "Lingkaran bantal duduk di ruangan kecil",
  },
  videoId: "lrhxrMZozA0",
  price: "—",
  // TODO(registration): the external registration channel is still undecided
  // (PRD §5.1) — this is the single place its URL will be set.
  enrollCta: { label: "Daftar Sekarang", href: "#" },
  includesTitle: "Program ini mencakup:",
  includes: [
    { id: "lessons", label: "Sesi", value: "22" },
    { id: "duration", label: "Durasi", value: "2 Semester" },
    { id: "level", label: "Jenjang", value: "Semua jenjang" },
    { id: "language", label: "Bahasa", value: "Indonesia" },
    { id: "certificate", label: "Sertifikat", value: "Tidak" },
  ],
  shareLabel: "Bagikan:",
};
