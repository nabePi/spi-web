import type { CourseDetailsContent } from "@/types/inner/course-details";
import innercoursescoursesDetailsv1Instructuor11 from "@/public/assets/imgs/placeholder/courses-detailsv1-instructuor1_1.svg";
import innercoursescoursesDetailsv1Thumb11 from "@/public/assets/imgs/inner/courses-details/spi-sidebar-catatan-pagi.webp";

export const courseDetailsClassicV1Content: CourseDetailsContent = {
  layout: "tabs",
  rowClass: "gy-40",
  sidebarClass: "course-details1__sidebar mb-0",
  tabs: [
    { id: "overview-tab", target: "overview", label: "Ringkasan Program", active: true },
    { id: "curriculum-tab", target: "curriculum", label: "Kurikulum" },
    { id: "instructor-tab", target: "instructor", label: "Pengajar" },
  ],
  overviewParagraphs: [
    "Kelas Reguler adalah program inti Sekolah Pemikiran Islam: kajian berbasis semester yang diadakan mingguan di tiap cabang. Satu angkatan berlangsung sekitar tujuh bulan — dua semester dengan total dua puluh sesi pembelajaran, sekali pertemuan setiap pekan.",
    "Kajian disusun secara terencana dan terukur, bukan sebagai rangkaian ceramah lepas. Materinya bergerak dari fondasi — konsep adab dan pandangan dunia Islam — menuju tradisi filsafat dan tasawuf, lalu ke isu-isu kontemporer. Seluruh program dirancang agar dapat diikuti secara berkelanjutan, semester demi semester.",
  ],
  highlightsTitle: "Poin utama",
  highlights: [
    "Dibimbing oleh pengajar dengan kredensial keilmuan yang jelas",
    "Kurikulum terencana dan terukur, bukan ceramah lepas",
    "Dua puluh sesi dalam dua semester, sekali sepekan",
    "Tersedia di enam kota: Jakarta, Bandung, Yogyakarta, Bogor, Tangerang, Padang",
    "Berpijak pada tradisi keilmuan dan konsep adab",
  ],
  learnTitle: "Yang akan Anda pelajari",
  learnItems: [
    "Konsep adab — meletakkan sesuatu pada tempatnya",
    "Worldview of Islam sebagai fondasi cara berpikir",
    "Mengenali ghazwul fikri dan gagasan menyimpang",
    "Kepemimpinan profetik dan keteladanan kenabian",
  ],
  curriculum: [
    {
      id: "one",
      headingId: "headingOne",
      collapseId: "collapseOne",
      title: "Semester I — Fondasi",
      open: true,
      lessons: [
        { title: "Konsep adab dan tradisi ilmu" },
        { title: "Worldview of Islam" },
        { title: "Al-Qur'an dan Peradaban" },
        { title: "Kepemimpinan Profetik" },
      ],
    },
    {
      id: "two",
      headingId: "headingTwo",
      collapseId: "collapseTwo",
      title: "Semester II — Tradisi dan filsafat",
      lessons: [
        { title: "Filsafat Islam Klasik" },
        { title: "Tasawuf dan Masyarakat Jawa" },
        { title: "Filologi Sastra Islam" },
      ],
    },
    {
      id: "three",
      headingId: "headingThree",
      collapseId: "collapseThree",
      title: "Isu kontemporer",
      lessons: [
        { title: "Islam dan Gender" },
        { title: "Fiqih Keluarga Milenial" },
        { title: "Ghazwul Fikri — perang pemikiran" },
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
    src: innercoursescoursesDetailsv1Thumb11,
    alt: "Catatan pagi dan secangkir teh di meja kayu",
  },
  videoId: "lrhxrMZozA0",
  price: "—",
  // TODO(registration): the external registration channel is still undecided
  // (PRD §5.1) — this is the single place its URL will be set.
  enrollCta: { label: "Daftar Sekarang", href: "#" },
  includesTitle: "Program ini mencakup:",
  includes: [
    { id: "lessons", label: "Sesi", value: "20" },
    { id: "duration", label: "Durasi", value: "±7 bulan (2 semester)" },
    { id: "level", label: "Jenjang", value: "Semua jenjang" },
    { id: "language", label: "Bahasa", value: "Indonesia" },
    { id: "certificate", label: "Sertifikat", value: "Tidak" },
  ],
  shareLabel: "Bagikan:",
};
