import type {
  CourseCardData,
  ELearningAppContent,
  ELearningBlogContent,
  ELearningBrandContent,
  ELearningCategoryContent,
  ELearningCoursesContent,
  ELearningFeatureStatsContent,
  ELearningHeroContent,
  ELearningHowItWorkContent,
  ELearningInstagramContent,
  ELearningPackagesContent,
  ELearningTeamContent,
  ELearningTestimonialContent,
  ELearningVideoContent,
} from "@/types/demos/e-learning/home";
import home2heroheroBg21 from "@/public/assets/imgs/home2/hero/hero-bg2_1.webp";
import home2heroheroThumb21 from "@/public/assets/imgs/home/spi-hero-jendela.webp";
import home2heroheroThumbUser21 from "@/public/assets/imgs/placeholder/hero-thumb-user2_1.svg";
import home2heroheroThumbUser22 from "@/public/assets/imgs/placeholder/hero-thumb-user2_2.svg";
import home2heroheroThumbUser23 from "@/public/assets/imgs/placeholder/hero-thumb-user2_3.svg";
import home2heroheroThumbPattern21 from "@/public/assets/imgs/home2/hero/hero-thumb-pattern2_1.webp";
import home2coursestopCoursesThumb11 from "@/public/assets/imgs/home/spi-kelas-reguler.webp";
import home2coursestopCoursesThumb12 from "@/public/assets/imgs/home/spi-kursus-singkat.webp";
import home2coursestopCoursesThumb13 from "@/public/assets/imgs/home/spi-komik.webp";
import home2coursestopCoursesThumb14 from "@/public/assets/imgs/home/spi-tuesday-special.webp";
import home2videovideoThumb from "@/public/assets/imgs/home/spi-video-teaser.webp";
import home2coursescourses1Bg from "@/public/assets/imgs/home2/courses/courses1-bg.webp";
import home2coursescoursesThumb11 from "@/public/assets/imgs/placeholder/courses-thumb1_1.svg";
import home2coursescoursesThumb12 from "@/public/assets/imgs/placeholder/courses-thumb1_2.svg";
import home2coursescoursesThumb13 from "@/public/assets/imgs/placeholder/courses-thumb1_3.svg";
import home2wpwpThumb11 from "@/public/assets/imgs/placeholder/wp-thumb1_1.svg";
import home2wpwpThumb12 from "@/public/assets/imgs/placeholder/wp-thumb1_2.svg";
import home2wpwpThumb13 from "@/public/assets/imgs/placeholder/wp-thumb1_3.svg";
import home2wpwpThumb14 from "@/public/assets/imgs/placeholder/wp-thumb1_4.svg";
import home2teamteamThumb21 from "@/public/assets/imgs/home/spi-cabang-jakarta.webp";
import home2teamteamThumb22 from "@/public/assets/imgs/home/spi-cabang-bandung.webp";
import home2teamteamThumb23 from "@/public/assets/imgs/home/spi-cabang-yogyakarta.webp";
import home2teamteamThumb24 from "@/public/assets/imgs/home/spi-cabang-bogor.webp";
import home2testimonialtestimonialThumb21 from "@/public/assets/imgs/placeholder/testimonial-thumb2_1.svg";
import home2testimonialtestimonialThumbUser21 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_1.svg";
import home2testimonialtestimonialThumbUser22 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_2.svg";
import home2testimonialtestimonialThumbUser23 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_3.svg";
import home2testimonialtestimonialThumbUser24 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_4.svg";
import home2testimonialtestimonialThumb22 from "@/public/assets/imgs/placeholder/testimonial-thumb2_2.svg";
import home2app2appBgThumb11 from "@/public/assets/imgs/home2/app2/app-bg-thumb1_1.webp";
import home2app2appThumb11 from "@/public/assets/imgs/placeholder/app-thumb1_1.svg";
import home2app2appThumbShape11 from "@/public/assets/imgs/home2/app2/app-thumb-shape1_1.webp";
import home2blogblogThumb21 from "@/public/assets/imgs/home/spi-blog-adab.webp";
import home2blogblogUser21 from "@/public/assets/imgs/placeholder/blog-user2_1.svg";
import home2blogblogThumb22 from "@/public/assets/imgs/home/spi-blog-ghazwul-fikri.webp";
import home2blogblogUser22 from "@/public/assets/imgs/placeholder/blog-user2_2.svg";
import home2blogblogThumb23 from "@/public/assets/imgs/home/spi-blog-marjan-bogor.webp";
import home2blogblogUser23 from "@/public/assets/imgs/placeholder/blog-user2_3.svg";
import home2instagraminstagramThumb21 from "@/public/assets/imgs/placeholder/instagram-thumb2_1.svg";
import home2instagraminstagramThumb22 from "@/public/assets/imgs/placeholder/instagram-thumb2_2.svg";
import home2instagraminstagramThumb23 from "@/public/assets/imgs/placeholder/instagram-thumb2_3.svg";
import home2instagraminstagramThumb24 from "@/public/assets/imgs/placeholder/instagram-thumb2_4.svg";
import home2instagraminstagramThumb25 from "@/public/assets/imgs/placeholder/instagram-thumb2_5.svg";
import home2instagraminstagramThumb26 from "@/public/assets/imgs/placeholder/instagram-thumb2_6.svg";

export const eLearningHeroContent: ELearningHeroContent = {
  badgePrefix: "Gratis",
  badgeText: "Terbuka untuk umum",
  titleBefore: "Menghidupkan tradisi ilmu untuk kejayaan\u00a0",
  titleHighlight: "peradaban Islam",
  text: "Sekolah Pemikiran Islam adalah lembaga pendidikan non-formal yang menyelenggarakan kajian strategis, terencana, dan terukur untuk menjawab kebutuhan umat sesuai zamannya.",
  primaryCta: { label: "Daftar Sekarang", href: "/courses-v1" },
  secondaryCta: { label: "Tentang SPI", href: "/courses-v2" },
  features: [
    { label: "Kelas gratis" },
    { label: "Enam kota" },
    { label: "Sejak 2014" },
  ],
  bg: { src: home2heroheroBg21, alt: "placeholder" },
  thumb: { src: home2heroheroThumb21, alt: "Jendela lengkung dengan cahaya pagi masuk ke ruang kajian" },
  users: [
    { src: home2heroheroThumbUser21, alt: "placeholder" },
    { src: home2heroheroThumbUser22, alt: "placeholder" },
    { src: home2heroheroThumbUser23, alt: "placeholder" },
  ],
  rating: "4.9/5",
  learnersText: "Alumni tersebar di enam kota",
  pattern: {
    src: home2heroheroThumbPattern21,
    alt: "placeholder",
  },
};

export const eLearningFeatureStatsContent: ELearningFeatureStatsContent = {
  items: [
    { id: "courses", title: "11 Tahun", text: "Berdiri sejak 2014", delay: "0.1" },
    { id: "flexible", title: "6 Kota", text: "Cabang aktif", delay: "0.2" },
    { id: "learners", title: "14 Angkatan", text: "SPI Fatahillah Jakarta", delay: "0.3" },
    { id: "membership", title: "Gratis", text: "Seluruh program", delay: "0.4" },
  ],
};

export const eLearningCategoryContent: ELearningCategoryContent = {
  subtitle: "Kurikulum",
  title: "Topik kajian",
  desc: "Kajian SPI disusun sistematis dan terukur, memadukan tradisi keilmuan Islam klasik dengan tantangan pemikiran kontemporer.",
  cta: { label: "Lihat seluruh kurikulum", href: "/courses-v2" },
  items: [
    { id: "programming", name: "Kepemimpinan Profetik", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "designing", name: "Al-Qur'an dan Peradaban", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "ai", name: "Worldview of Islam", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "academic", name: "Filsafat Islam Klasik", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "language", name: "Tasawuf dan Masyarakat Jawa", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "marketing", name: "Islam dan Gender", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "business", name: "Fiqih Keluarga Milenial", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "data-science", name: "Filologi Sastra Islam", learners: "Kelas Reguler", href: "/course-details-classic-v2" },
    { id: "health", name: "Ghazwul Fikri", learners: "Kursus Singkat", href: "/course-details-classic-v2" },
  ],
};

const courses: CourseCardData[] = [
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb11,
    title: "Kelas Reguler — kajian pemikiran Islam dua semester",
    author: "SPI Fatahillah, Jakarta",
    rating: "4/5",
    ratingValue: 4,
    lessons: "20 Sesi",
    students: "2 Semester",
    price: "Gratis",
    oldPrice: "",
    offer: "Angkatan 14",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb12,
    title: "Kursus Singkat untuk kelompok dan organisasi",
    author: "Seluruh cabang",
    rating: "3/5",
    ratingValue: 3,
    lessons: "7 Sesi",
    students: "1 Bulan",
    price: "Gratis",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb13,
    title: "KOMIK — Kelas Online Pemikiran Islam",
    author: "Program Daring",
    rating: "4.5/5",
    ratingValue: 4.5,
    lessons: "Daring",
    students: "Nasional",
    price: "Gratis",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb14,
    title: "Tuesday's Special — sesi daring rutin",
    author: "Program Daring",
    rating: "5/5",
    ratingValue: 5,
    lessons: "Mingguan",
    students: "Terbuka",
    price: "Gratis",
    oldPrice: "",
    offer: "Rutin",
  },
];

export const eLearningCoursesContent: ELearningCoursesContent = {
  subtitle: "Program",
  titleBefore: "Tiga format kelas, seluruhnya",
  titleHighlight: "gratis",
  cta: { label: "Lihat semua program", href: "/courses-v2" },
  items: courses,
};

export const eLearningVideoContent: ELearningVideoContent = {
  left: [
    { kind: "odometer", value: "20", suffix: " sesi", label: "Per program reguler" },
    { kind: "odometer", value: "6", suffix: " kota", label: "Cabang aktif" },
  ],
  right: [
    { kind: "rating", rating: "4.8", ratingMax: "5", label: "Penilaian peserta" },
    { kind: "odometer", value: "115", suffix: "", label: "Peserta terbanyak, SPI UII 2020" },
  ],
  thumb: { src: home2videovideoThumb, alt: "Ruang kajian bergaya masjid dengan sajadah tertata" },
  videoHref: "https://www.youtube.com/watch?v=7e90gBu4pas",
};

// NOTE: pricing tiers have no counterpart at SPI — every program is free of
// charge. Left as lorem ipsum pending a decision; the PRD recommends removing
// this section entirely (Appendix C).
export const eLearningPackagesContent: ELearningPackagesContent = {
  bg: { src: home2coursescourses1Bg, alt: "placeholder" },
  subtitle: "Lorem ipsum",
  titleBefore: "Dolor sit",
  titleHighlight: "Amet",
  titleAfter: "Consectetur adipiscing elit",
  cta: { label: "Sed do eiusmod", href: "/courses-v2" },
  items: [
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb11, alt: "placeholder" },
      rating: "4.9/5",
      author: "Tempor incididunt",
      title: "Ut labore et",
      lessons: "5 Lessons",
      courses: "4 Courses",
      students: "20 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb12, alt: "placeholder" },
      offer: "Dolore magna",
      rating: "4.9/5",
      author: "Aliqua enim",
      title: "Ad minim veniam quis nostrud",
      lessons: "20 Lessons",
      courses: "8 Courses",
      students: "20 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb13, alt: "placeholder" },
      rating: "4.9/5",
      author: "Exercitation ullamco",
      title: "Laboris nisi aliquip",
      lessons: "12 Lessons",
      courses: "4 Courses",
      students: "80 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
  ],
};

// NOTE: sponsor/brand logos are template assets; SPI has no sponsor set.
// Heading left as lorem ipsum pending a decision.
export const eLearningBrandContent: ELearningBrandContent = {
  subtitle: "Ex",
  titleBefore: "Ea commodo consequat",
  titleHighlight: "Duis",
};

export const eLearningHowItWorkContent: ELearningHowItWorkContent = {
  subtitle: "Alur",
  titleBefore: "Cara mengikuti",
  titleHighlight: "kelas SPI",
  items: [
    {
      id: "choose",
      modifier: "how-it-work-2__item--purple",
      active: true,
      delay: "0.1",
      thumb: { src: home2wpwpThumb11, alt: "placeholder" },
      step: "Langkah 01",
      title: "Pilih cabang terdekat",
      desc: "SPI hadir di Jakarta, Bandung, Yogyakarta, Bogor, Tangerang, dan Padang.",
    },
    {
      id: "learn",
      modifier: "how-it-work-2__item--green",
      delay: "0.2",
      thumb: { src: home2wpwpThumb12, alt: "placeholder" },
      step: "Langkah 02",
      title: "Daftar pada angkatan yang dibuka",
      desc: "Pendaftaran dibuka secara berkala di tiap cabang, tanpa biaya.",
    },
    {
      id: "practice",
      modifier: "how-it-work-2__item--orange",
      delay: "0.3",
      thumb: { src: home2wpwpThumb13, alt: "placeholder" },
      step: "Langkah 03",
      title: "Ikuti kajian mingguan",
      desc: "Kelas reguler berlangsung sekitar tujuh bulan: dua semester, dua puluh sesi.",
    },
    {
      id: "certified",
      modifier: "how-it-work-2__item--indigo",
      delay: "0.4",
      thumb: { src: home2wpwpThumb14, alt: "placeholder" },
      step: "Langkah 04",
      title: "Transmisikan ilmunya",
      desc: "Alumni diharapkan kembali ke komunitasnya sebagai pelopor intelektual.",
    },
  ],
};

export const eLearningTeamContent: ELearningTeamContent = {
  subtitle: "Cabang",
  titleLine1: "Enam cabang di",
  titleLine2Before: "seluruh",
  titleHighlight: "Indonesia",
  cta: { label: "Lihat semua cabang", href: "/instructor-v1" },
  members: [
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb21, alt: "Gedung SPI Fatahillah di kawasan Kalibata, Jakarta Selatan" },
      name: "SPI Fatahillah",
      role: "INSISTS, Kalibata, Jakarta Selatan",
      rating: "4.5",
      delay: "0.10",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb22, alt: "Halaman masjid dengan paviliun berkubah di Bandung" },
      name: "SPI Moh. Natsir",
      role: "Masjid Istiqamah, Bandung",
      rating: "4.5",
      delay: "0.20",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb23, alt: "Gedung kampus bergaya Jawa di Yogyakarta" },
      name: "SPI UII",
      role: "Universitas Islam Indonesia, Yogyakarta",
      rating: "4.5",
      delay: "0.30",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb24, alt: "Serambi SPI Bogor MARJAN saat hujan" },
      name: "SPI Bogor — MARJAN",
      role: "Majelis Pemikiran di Kota Hujan",
      rating: "4.5",
      delay: "0.40",
    },
  ],
};

export const eLearningTestimonialContent: ELearningTestimonialContent = {
  subtitle: "Gagasan",
  titleLine1: "Mengapa SPI ada, dalam",
  titleLine2: "sendiri",
  titleHighlight: "kata-katanya",
  items: [
    {
      id: "emily",
      delay: "0.10",
      thumb: {
        src: home2testimonialtestimonialThumb21,
        alt: "placeholder",
      },
      quote:
        "\u201c Saya meyakini bahwa aktivis dakwah bisa menjadi pelopor perubahan positif dengan cepat, salah satunya dengan cara melakukan berbagai kajian strategis yang terencana dan terstruktur untuk menjawab kebutuhan umat sesuai dengan zamannya. \u201d",
      author: {
        src: home2testimonialtestimonialThumbUser21,
        alt: "placeholder",
      },
      authorName: "Dr. Akmal Sjafril",
      designation: "Pendiri dan Kepala Pusat SPI",
      rating: "4.9/5",
      statNumber: "11",
      statLabel: "Tahun berjalan",
      studentsLabel: "Sejak 2014 hingga kini",
      avatars: [
        { src: home2testimonialtestimonialThumbUser22, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser23, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser24, alt: "placeholder" },
      ],
    },
    {
      id: "eleanor",
      delay: "0.20",
      thumb: {
        src: home2testimonialtestimonialThumb22,
        alt: "placeholder",
      },
      quote:
        "\u201c SPI hadir sebagai institusi pendidikan non formal yang memberikan kajian-kajian strategis bersifat terencana dan terukur demi menjawab kebutuhan umat sesuai zamannya. \u201d",
      author: {
        src: home2testimonialtestimonialThumbUser24,
        alt: "placeholder",
      },
      authorName: "Sekolah Pemikiran Islam",
      designation: "Pernyataan kelembagaan",
      rating: "4.9/5",
      statNumber: "6",
      statLabel: "Kota",
      studentsLabel: "Jakarta hingga Padang",
      avatars: [
        { src: home2testimonialtestimonialThumbUser22, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser23, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser24, alt: "placeholder" },
      ],
    },
  ],
};

// NOTE: this section advertises a mobile app. SPI has none and none is
// planned, so the wording is left as lorem ipsum; the PRD recommends removing
// the section (Appendix C).
export const eLearningAppContent: ELearningAppContent = {
  bg: home2app2appBgThumb11,
  subtitle: "Dolore magna aliqua",
  titleBefore: "Enim ad minim veniam quis nostrud",
  titleHighlight: "Exercitation",
  titleAfter: "Ullamco laboris nisi",
  thumb: { src: home2app2appThumb11, alt: "placeholder" },
  shape: { src: home2app2appThumbShape11, alt: "placeholder" },
};

export const eLearningBlogContent: ELearningBlogContent = {
  subtitle: "Berita & Artikel",
  titleLine1: "Kajian dan kabar",
  titleLine2: "terbaru dari",
  titleHighlight: "SPI",
  cta: { label: "Baca semua artikel", href: "/blog-three-column" },
  items: [
    {
      href: "/blog-details-standard",
      category: "Filosofi Dasar",
      thumb: { src: home2blogblogThumb21, alt: "Jurnal terbuka dengan pena, melambangkan refleksi" },
      author: { src: home2blogblogUser21, alt: "placeholder" },
      authorName: "Dr. Akmal Sjafril",
      date: "5 September 2026",
      title: "Konsep adab: meletakkan sesuatu pada tempatnya.",
      delay: "0.10",
    },
    {
      href: "/blog-details-standard",
      category: "Pemikiran Islam",
      thumb: { src: home2blogblogThumb22, alt: "Ilustrasi abstrak kebisingan informasi" },
      author: { src: home2blogblogUser22, alt: "placeholder" },
      authorName: "Redaksi SPI",
      date: "28 Agustus 2026",
      title: "Ghazwul Fikri: mengenali invasi intelektual di sekitar kita.",
      delay: "0.20",
    },
    {
      href: "/blog-details-standard",
      category: "Berita",
      thumb: { src: home2blogblogThumb23, alt: "Hujan di kaca jendela, suasana Bogor" },
      author: { src: home2blogblogUser23, alt: "placeholder" },
      authorName: "Redaksi SPI",
      date: "15 Agustus 2026",
      title: "SPI Bogor meluncurkan MARJAN sebagai cabang keenam.",
      delay: "0.30",
    },
  ],
};

export const eLearningInstagramContent: ELearningInstagramContent = {
  username: "spi.indonesia",
  slides: [
    { src: home2instagraminstagramThumb21, alt: "placeholder" },
    { src: home2instagraminstagramThumb22, alt: "placeholder" },
    { src: home2instagraminstagramThumb23, alt: "placeholder" },
    { src: home2instagraminstagramThumb24, alt: "placeholder" },
    { src: home2instagraminstagramThumb25, alt: "placeholder" },
    { src: home2instagraminstagramThumb26, alt: "placeholder" },
    { src: home2instagraminstagramThumb21, alt: "placeholder" },
    { src: home2instagraminstagramThumb22, alt: "placeholder" },
    { src: home2instagraminstagramThumb23, alt: "placeholder" },
  ],
};
