import type {
  AboutV1AboutContent,
  AboutV1BreadcrumbContent,
  AboutV1ClientContent,
  AboutV1TeamContent,
  AboutV1TestimonialContent,
  AboutV1WcuContent,
} from "@/types/inner/about-v1";
import innerbreadcumbbreadcumbBgPattern2 from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern2.png";
import inneraboutinnerThumb1 from "@/public/assets/imgs/inner/about/spi-ruang-kajian.webp";
import inneraboutinnerThumb2 from "@/public/assets/imgs/inner/about/spi-manuskrip.webp";
import inneraboutinnerThumb3 from "@/public/assets/imgs/inner/about/spi-ornamen-ukiran.webp";
import home1wcuwcuPatternbg11 from "@/public/assets/imgs/home1/wcu/wcu-patternbg1_1.webp";
import home1wcuwcuThumb11 from "@/public/assets/imgs/placeholder/wcu-thumb1_1.svg";
import home1wcuwcuPatternbg12 from "@/public/assets/imgs/home1/wcu/wcu-patternbg1_2.webp";
import home1wcuwcuUser12 from "@/public/assets/imgs/placeholder/wcu-user1_2.svg";
import home1wcuwcuPatternbg13 from "@/public/assets/imgs/home1/wcu/wcu-patternbg1_3.webp";
import home1teamteamThumb11 from "@/public/assets/imgs/placeholder/team-thumb1_1.svg";
import home1teamteamThumb12 from "@/public/assets/imgs/placeholder/team-thumb1_2.svg";
import home1teamteamThumb13 from "@/public/assets/imgs/placeholder/team-thumb1_3.svg";
import home1teamteamThumb14 from "@/public/assets/imgs/placeholder/team-thumb1_4.svg";
import home1testimonialtestimonailUser11 from "@/public/assets/imgs/placeholder/testimonail-user1_1.svg";
import home1testimonialtestimonailUser12 from "@/public/assets/imgs/placeholder/testimonail-user1_2.svg";
import home1testimonialtestimonialThumb11 from "@/public/assets/imgs/placeholder/testimonial-thumb1_1.svg";
import home1testimonialtestimonialThumb12 from "@/public/assets/imgs/inner/about/spi-serambi-hujan.webp";
import home1testimonialtestimonailUser13 from "@/public/assets/imgs/placeholder/testimonail-user1_3.svg";
import home1testimonialtestimonailUser14 from "@/public/assets/imgs/placeholder/testimonail-user1_4.svg";
import home1testimonialtestimonailUser15 from "@/public/assets/imgs/placeholder/testimonail-user1_5.svg";
import home1testimonialtestimonailUser16 from "@/public/assets/imgs/placeholder/testimonail-user1_6.svg";
import home1testimonialtestimonailUser17 from "@/public/assets/imgs/placeholder/testimonail-user1_7.svg";

export const aboutV1BreadcrumbContent: AboutV1BreadcrumbContent = {
  bg: {
    src: innerbreadcumbbreadcumbBgPattern2,
    alt: "pattern",
  },
  items: [{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }],
  title: "Tentang Kami",
  text: "Sekolah Pemikiran Islam berdiri pada 2014 sebagai respons intelektual terhadap tantangan ideologis yang dihadapi umat Muslim Indonesia hari ini.",
};

export const aboutV1AboutContent: AboutV1AboutContent = {
  thumbs: [
    {
      src: inneraboutinnerThumb1,
      alt: "Ruang kajian bergaya arsitektur Jawa dengan meja-meja rendah tertata rapi",
    },
    {
      src: inneraboutinnerThumb2,
      alt: "Tumpukan manuskrip Islam klasik di atas rehal kayu ukir",
    },
  ],
  subtitle: "Sekilas SPI",
  titleLines: [
    { before: "Menghidupkan kembali ", highlight: "tradisi ilmu" },
    { before: "untuk mengembalikan kejayaan " },
    { before: "peradaban Islam." },
  ],
  paragraphs: [
    "SPI adalah lembaga pendidikan non-formal yang berkomitmen menghidupkan kembali tradisi keilmuan sebagai fondasi kebangkitan peradaban Islam. Sejak 2014, kajiannya berjalan secara terencana dan terukur, bukan sebagai rangkaian ceramah lepas.",
    "Landasannya adalah Surat At-Taubah ayat 122, yang menyerukan agar segolongan orang beriman memperdalam pengetahuan agamanya untuk memberi peringatan dan membimbing kaumnya. Dari ayat itulah misi SPI bertolak: mencetak generasi pemikir kritis yang mampu menavigasi kompleksitas zaman tanpa melepaskan nilai-nilai Islam.",
  ],
  // NOTE: no satisfaction survey exists for SPI — label left as lorem ipsum.
  satisfaction: "95",
  satisfactionLabel: "lorem ipsum dolor",
  rating: "4.9/5",
  trustedBefore: "Hadir di ",
  trustedHighlight: "6",
  trustedAfter: " kota di Indonesia",
  infoThumb: {
    src: inneraboutinnerThumb3,
    alt: "Detail ukiran kayu bermotif geometris Islam",
  },
  stats: [
    { id: "students", value: "11", suffix: "", title: "Tahun berjalan" },
    { id: "courses", value: "6", suffix: "", title: "Kota" },
    { id: "instructors", value: "14", suffix: "", title: "Angkatan di Jakarta" },
    { id: "certificates", value: "20", suffix: "", title: "Sesi per program" },
  ],
};

export const aboutV1WcuContent: AboutV1WcuContent = {
  subtitle: "Mengapa SPI",
  titleLine1: "Jawaban atas",
  titleLine2Before: "hilangnya",
  titleHighlight: "adab",
  quality: {
    delay: "0.30",
    bg: { src: home1wcuwcuPatternbg11, alt: "bg" },
    number: "9",
    title: "Topik kajian inti",
    desc: "Dari Filsafat Islam Klasik hingga Ghazwul Fikri, disusun sebagai satu kurikulum.",
  },
  // NOTE: SPI issues no certificates — this card has no SPI counterpart, so
  // its wording is left as lorem ipsum.
  certification: {
    delay: "0.45",
    bg: { src: home1wcuwcuPatternbg11, alt: "bg" },
    title: "Lorem ipsum dolor sit",
    desc: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.",
    items: [
      { lines: ["Veniam quis nostrud ", "exercitation"] },
      { lines: ["Ullamco laboris ", "nisi aliquip"] },
    ],
  },
  image: {
    delay: "0.60",
    thumb: { src: home1wcuwcuThumb11, alt: "placeholder" },
    videoHref: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
    title: "Gratis dan terbuka",
    desc: "Seluruh program SPI diselenggarakan tanpa biaya, terbuka untuk umum.",
  },
  instructors: {
    delay: "0.30",
    bg: { src: home1wcuwcuPatternbg12, alt: "bg" },
    leftAvatars: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
    rightAvatars: [7, 8, 9, 10, 6, 7, 8, 9, 10, 7, 8, 9, 10, 6, 7, 8, 9, 10],
    title: "Otoritas keilmuan",
    desc: "Landasan intelektual SPI mengikuti pemikiran Prof. Syed Muhammad Naquib al-Attas. Kajian dipimpin oleh pengajar dengan kredensial keilmuan yang jelas — bukan dipilih berdasarkan jumlah pengikut.",
  },
  support: {
    delay: "0.45",
    bg: { src: home1wcuwcuPatternbg11, alt: "bg" },
    title: "Informasi pendaftaran",
    desc: "Hubungi sekretariat atau cabang terdekat untuk jadwal angkatan berikutnya.",
    cta: { label: "Daftar Sekarang", href: "/courses-v1" },
    mailTitle: "Email Sekretariat",
    // TODO(contact): placeholder — PRD Appendix B
    mailHref: "mailto:sekretariat@spi.example.id",
    mailLabel: "sekretariat@spi.example.id",
    person: {
      name: "Sekretariat Pusat",
      role: "SPI Bogor",
      thumb: { src: home1wcuwcuUser12, alt: "placeholder" },
    },
  },
  // NOTE: no satisfaction figure exists for SPI — left as lorem ipsum.
  satisfaction: {
    delay: "0.60",
    bg: { src: home1wcuwcuPatternbg13, alt: "bg" },
    number: "95%",
    title: "Lorem ipsum dolor sit.",
    desc: "Amet consectetur adipiscing elit sed do eiusmod.",
  },
};

// NOTE: SPI's teaching staff is not documented in any source — instructor
// profiles are deferred to a later phase (PRD W20). Only the founder is
// known, and he warrants a dedicated Pendiri page rather than a slot in a
// four-card instructor grid, so this whole section is left as lorem ipsum.
export const aboutV1TeamContent: AboutV1TeamContent = {
  subtitle: "Lorem",
  titleBefore: "Ipsum dolor sit amet",
  titleMid: "consectetur",
  titleHighlight: "adipiscing",
  cta: { label: "Sed do eiusmod", href: "/instructor-v1" },
  members: [
    {
      href: "/instructor-details",
      thumb: { src: home1teamteamThumb11, alt: "placeholder" },
      name: "Tempor incididunt",
      role: "Ut labore et dolore",
      rating: "4.5",
      active: true,
    },
    {
      href: "/instructor-details",
      thumb: { src: home1teamteamThumb12, alt: "placeholder" },
      name: "Magna aliqua",
      role: "Enim ad minim",
      rating: "4.5",
    },
    {
      href: "/instructor-details",
      thumb: { src: home1teamteamThumb13, alt: "placeholder" },
      name: "Veniam quis",
      role: "Nostrud exercitation",
      rating: "4.5",
    },
    {
      href: "/instructor-details",
      thumb: { src: home1teamteamThumb14, alt: "placeholder" },
      name: "Ullamco laboris",
      role: "Nisi aliquip ex",
      rating: "4.5",
    },
  ],
};

export const aboutV1TestimonialContent: AboutV1TestimonialContent = {
  subtitle: "Gagasan",
  titleBefore: "Mengapa SPI ada, dalam kata-katanya",
  titleHighlight: "sendiri",
  items: [
    {
      kind: "quote",
      delay: "0.25",
      rating: "4.9/5",
      quote:
        "\u201c Saya meyakini bahwa aktivis dakwah bisa menjadi pelopor perubahan positif dengan cepat, salah satunya dengan cara melakukan berbagai kajian strategis yang terencana dan terstruktur untuk menjawab kebutuhan umat sesuai dengan zamannya. \u201d",
      author: {
        src: home1testimonialtestimonailUser11,
        alt: "placeholder",
      },
      authorName: "Dr. Akmal Sjafril",
      designation: "Pendiri dan Kepala Pusat SPI",
      company: "zoom",
    },
    {
      kind: "quote",
      delay: "0.35",
      rating: "4.9/5",
      quote:
        "\u201c SPI adalah respons intelektual untuk menghadapi tantangan pemikiran yang menerpa umat Muslim Indonesia saat ini. \u201d",
      author: {
        src: home1testimonialtestimonailUser12,
        alt: "placeholder",
      },
      authorName: "Sekolah Pemikiran Islam",
      designation: "Pernyataan kelembagaan",
      company: "paypal",
    },
    {
      kind: "image",
      delay: "0.45",
      overlay: true,
      thumb: {
        src: home1testimonialtestimonialThumb11,
        alt: "placeholder",
      },
      title: "Kajian mingguan",
      videoHref: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
    },
    {
      kind: "image",
      delay: "0.25",
      thumb: {
        src: home1testimonialtestimonialThumb12,
        alt: "Serambi masjid dengan halaman basah saat hujan",
      },
    },
    // NOTE: no alumni testimonials have been collected or consented to yet
    // (PRD §5, assumption 8) — the remaining two quotes are lorem ipsum.
    {
      kind: "quote",
      delay: "0.35",
      rating: "4.9/5",
      quote:
        "\u201c Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam. \u201d",
      author: {
        src: home1testimonialtestimonailUser13,
        alt: "placeholder",
      },
      authorName: "Quis nostrud",
      designation: "Exercitation ullamco",
      company: "webflow",
    },
    {
      kind: "quote",
      delay: "0.45",
      rating: "4.9/5",
      quote:
        "\u201c Laboris nisi ut aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur. \u201d",
      author: {
        src: home1testimonialtestimonailUser14,
        alt: "placeholder",
      },
      authorName: "Excepteur sint",
      designation: "Occaecat cupidatat",
      company: "figma",
    },
  ],
  widget: {
    avatars: [
      { src: home1testimonialtestimonailUser15, alt: "placeholder" },
      { src: home1testimonialtestimonailUser16, alt: "placeholder" },
      { src: home1testimonialtestimonailUser17, alt: "placeholder" },
    ],
    rating: " 4.9/5 ",
    number: "11",
    label: " Tahun berjalan",
  },
};

// NOTE: SPI has no sponsor or client set — logos are template assets, so the
// heading is left as lorem ipsum (same treatment as the homepage BrandSection).
export const aboutV1ClientContent: AboutV1ClientContent = {
  subtitle: "Lorem ipsum",
  titleBefore: "Dolor sit amet",
  titleMid: "consectetur ",
  titleHighlight: "adipiscing",
  cta: { label: "Hubungi Kami", href: "/contact" },
};
