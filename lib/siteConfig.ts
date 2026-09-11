export const siteConfig = {
  name: "Sekolah Pemikiran Islam",
  shortName: "SPI",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  title:
    "Sekolah Pemikiran Islam — Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam",
  description:
    "Sekolah Pemikiran Islam (SPI) adalah institusi pendidikan non formal yang menyelenggarakan kajian pemikiran Islam secara terencana dan terukur. Kelas gratis di enam kota.",
  // TODO(contact): replace with real SPI photography before launch — PRD W-T5 / Appendix B
  ogImage: "/assets/imgs/home1/hero/hero-bg1_1.webp",
  locale: "id_ID",
  contact: {
    // TODO(contact): every value below is placeholder data — PRD Appendix B
    email: "sekretariat@spi.example.id",
    phone: "+62 811-0000-0001",
    address: "Jl. Contoh No. 1, Bogor, Jawa Barat 16111",
  },
  // Verified real accounts — safe to publish (PRD Appendix B)
  social: {
    instagram: "https://www.instagram.com/spi.indonesia/",
    facebook: "https://web.facebook.com/Sekolah.Pemikiran.Islam/",
    x: "https://twitter.com/SPI_Pusat",
    medium: "https://spiindonesia.medium.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
