import type { CourseDetailsContent } from "@/types/inner/course-details";
import type { RelatedCoursesContent } from "@/types/inner/courses";
import innercoursescoursesDetailsv1Instructuor11 from "@/public/assets/imgs/placeholder/courses-detailsv1-instructuor1_1.svg";
import innercoursescoursesDetailsv1Testiuser11 from "@/public/assets/imgs/placeholder/courses-detailsv1-testiuser1_1.svg";
import innercoursescoursesDetailsv1Thumb11 from "@/public/assets/imgs/inner/courses-details/spi-sidebar-catatan-pagi.webp";
import innercoursescoursesDetailsv1CourseThumb11 from "@/public/assets/imgs/inner/courses-details/spi-kursus-map-berkas.webp";
import innercoursescoursesDetailsv1CourseThumb12 from "@/public/assets/imgs/inner/courses-details/spi-komik-ponsel.webp";
import innercoursescoursesDetailsv1CourseThumb13 from "@/public/assets/imgs/inner/courses-details/spi-tuesday-lampu-hias.webp";
import innercoursescoursesDetailsv1CourseThumb14 from "@/public/assets/imgs/inner/courses-details/spi-marjan-daun-hujan.webp";

export const courseDetailsClassicV1Content: CourseDetailsContent = {
  layout: "tabs",
  rowClass: "gy-40",
  sidebarClass: "course-details1__sidebar mb-0",
  tabs: [
    { id: "overview-tab", target: "overview", label: "Ringkasan Program", active: true },
    { id: "curriculum-tab", target: "curriculum", label: "Kurikulum" },
    { id: "instructor-tab", target: "instructor", label: "Pengajar" },
    { id: "reviews-tab", target: "reviews", label: "Ulasan" },
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
  // NOTE: SPI collects no course reviews and no participant ratings exist in
  // any source. The score, bars and review text below are placeholder data —
  // this tab should either be removed or fed real, consented feedback.
  reviewsTitle: "Ulasan",
  reviewScore: "5",
  reviewCount: "0 Ulasan",
  reviewBars: [
    { stars: "5", width: "0%", count: "0" },
    { stars: "4", width: "0%", count: "0" },
    { stars: "3", width: "0%", count: "0" },
    { stars: "2", width: "0%", count: "0" },
    { stars: "1", width: "0%", count: "0" },
  ],
  reviews: [
    {
      name: "Lorem ipsum dolor",
      text: "Sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud.",
      thumb: {
        src: innercoursescoursesDetailsv1Testiuser11,
        alt: "placeholder",
      },
      rating: "4.9/5",
    },
  ],
  sidebarThumb: {
    src: innercoursescoursesDetailsv1Thumb11,
    alt: "Catatan pagi dan secangkir teh di meja kayu",
  },
  videoId: "M7lc1UVf-VE",
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

export const courseDetailsClassicV1RelatedContent: RelatedCoursesContent = {
  title: "Program lainnya",
  items: [
    {
      // TODO(route): per-program detail pages do not exist yet — PRD W8.
      href: "#",
      title: "Kursus Singkat untuk kelompok dan organisasi",
      author: "Seluruh cabang",
      rating: "5/5",
      thumb: innercoursescoursesDetailsv1CourseThumb11,
      alt: "Map berkas terikat tali di atas bangku",
      clipId: "clip0_852_30611",
      price: "—",
      lessons: "7 Sesi",
      students: "1 Bulan",
    },
    {
      href: "#",
      title: "KOMIK — Kelas Online Pemikiran Islam",
      author: "Program Daring",
      rating: "3/5",
      thumb: innercoursescoursesDetailsv1CourseThumb12,
      alt: "Ponsel dengan layar kosong di atas meja",
      clipId: "clip0_852_30612",
      price: "—",
      lessons: "Daring",
      students: "Nasional",
    },
    {
      href: "#",
      title: "Tuesday's Special — sesi daring rutin",
      author: "Program Daring",
      rating: "3/5",
      thumb: innercoursescoursesDetailsv1CourseThumb13,
      alt: "Lampu hias hangat menyala saat senja",
      clipId: "clip0_852_30613",
      price: "—",
      lessons: "Mingguan",
      students: "Terbuka umum",
    },
    {
      href: "#",
      title: "MARJAN — Majelis Pemikiran di Kota Hujan",
      author: "SPI Bogor",
      rating: "4.9/5",
      thumb: innercoursescoursesDetailsv1CourseThumb14,
      alt: "Daun palem basah dengan tetesan hujan",
      clipId: "clip0_852_30614",
      price: "—",
      lessons: "20 Sesi",
      students: "±7 Bulan",
    },
  ],
};
