export const siteConfig = {
  name: "Sekolah Pemikiran Islam",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  title: "Sekolah Pemikiran Islam — Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam",
  description:
    "Sekolah Pemikiran Islam (SPI) menyelenggarakan kajian pemikiran Islam yang terencana dan terukur. Kelas mingguan di enam kota sejak 2014.",
  ogImage: "/assets/imgs/home1/hero/hero-bg1_1.webp",
  locale: "en_US",
  contact: {
    email: "info@pemikiranislam.id",
    phone: "+1 415 123 4567",
    address: "740 Park Avenue, New York, NY 10021, USA",
  },
  social: {
    facebook: "https://facebook.com/",
    x: "https://x.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
