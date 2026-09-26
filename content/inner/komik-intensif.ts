import type { CourseDetailsContent } from "@/types/inner/course-details";
import innercoursescoursesDetailsv1Instructuor11 from "@/public/assets/imgs/placeholder/courses-detailsv1-instructuor1_1.svg";
import innercoursescoursesKomik from "@/public/assets/imgs/inner/courses/spi-komik-homedesk.webp";

export const komikIntensifContent: CourseDetailsContent = {
  layout: "tabs",
  rowClass: "gy-40",
  sidebarClass: "course-details1__sidebar mb-0",
  tabs: [
    { id: "overview-tab", target: "overview", label: "Ringkasan Program", active: true },
    { id: "instructor-tab", target: "instructor", label: "Pengajar" },
  ],
  overviewParagraphs: [
    "KOMIK Intensif (Kelas Online Pemikiran Islam Intensif) merupakan program pembelajaran yang dilaksanakan secara daring untuk menghadirkan kajian pemikiran Islam secara sistematis, terstruktur, dan dapat diakses oleh peserta dari berbagai daerah. Melalui format online, KOMIK membuka kesempatan bagi lebih banyak peserta untuk mengikuti pembelajaran tanpa batasan jarak, dengan materi yang membahas dasar-dasar pemikiran Islam, sejarah, peradaban, serta isu-isu kontemporer.",
    "Dengan menghadirkan pengajar yang kompeten di bidangnya, KOMIK menjadi ruang belajar bagi peserta yang ingin memperdalam wawasan keislaman, membangun tradisi ilmu, serta memahami berbagai tantangan pemikiran di era modern.",
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
    src: innercoursescoursesKomik,
    alt: "Meja kerja rumahan dengan laptop dan secangkir teh",
  },
  videoId: "lrhxrMZozA0",
  price: "—",
  // TODO(registration): the external registration channel is still undecided
  // (PRD §5.1) — this is the single place its URL will be set.
  enrollCta: { label: "Daftar Sekarang", href: "#" },
  includesTitle: "Program ini mencakup:",
  includes: [
    { id: "lessons", label: "Sesi", value: "Daring" },
    { id: "duration", label: "Durasi", value: "Per angkatan" },
    { id: "level", label: "Jenjang", value: "Semua jenjang" },
    { id: "language", label: "Bahasa", value: "Indonesia" },
    { id: "certificate", label: "Sertifikat", value: "Tidak" },
  ],
  shareLabel: "Bagikan:",
};
