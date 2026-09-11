import type {
  BlogStandardBreadcrumbContent,
  BlogStandardGridContent,
  BlogStandardSidebarContent,
} from "@/types/inner/blog-standard";
import innerblogblogStandardThumb11 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_1.svg";
import home2blogblogUser21 from "@/public/assets/imgs/placeholder/blog-user2_1.svg";
import innerblogblogStandardThumb12 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_2.svg";
import home2blogblogUser22 from "@/public/assets/imgs/placeholder/blog-user2_2.svg";
import innerblogblogStandardThumb13 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_3.svg";
import home2blogblogUser23 from "@/public/assets/imgs/placeholder/blog-user2_3.svg";
import innerblogblogStandardThumb14 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_4.svg";
import innerblogblogStandardThumb15 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_5.svg";
import innerblogblogRecentThumb11 from "@/public/assets/imgs/placeholder/blog-recent-thumb1_1.svg";
import innerblogblogRecentThumb12 from "@/public/assets/imgs/placeholder/blog-recent-thumb1_2.svg";
import innerblogblogRecentThumb13 from "@/public/assets/imgs/placeholder/blog-recent-thumb1_3.svg";
import innerblogblogSidebarWidgetThumb11 from "@/public/assets/imgs/inner/blog/blog-sidebar-widget-thumb1_1.webp";

export const blogStandardBreadcrumbContent: BlogStandardBreadcrumbContent = {
  title: "Berita & Artikel",
  items: [{ label: "Beranda", href: "/" }, { label: "Berita & Artikel" }],
};

export const blogStandardGridContent: BlogStandardGridContent = {
  items: [
    {
      href: "/blog-details-standard",
      category: "Filosofi Dasar",
      thumb: { src: innerblogblogStandardThumb11, alt: "Gambar artikel" },
      author: { src: home2blogblogUser21, alt: "Penulis" },
      authorName: "Dr. Akmal Sjafril",
      date: "5 September 2026",
      time: "8 menit baca",
      title:
        "Konsep adab: meletakkan sesuatu pada tempatnya, dan mengapa hilangnya adab menjadi akar kebingungan umat hari ini",
      cta: "Baca Selengkapnya",
    },
    {
      href: "/blog-details-standard",
      category: "Pemikiran Islam",
      thumb: { src: innerblogblogStandardThumb12, alt: "Gambar artikel" },
      author: { src: home2blogblogUser22, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "28 Agustus 2026",
      time: "6 menit baca",
      title:
        "Ghazwul Fikri: mengenali invasi intelektual melalui media, pendidikan, dan hiburan",
      cta: "Baca Selengkapnya",
      fade: true,
    },
    {
      href: "/blog-details-standard",
      category: "Berita",
      thumb: { src: innerblogblogStandardThumb13, alt: "Gambar artikel" },
      author: { src: home2blogblogUser23, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "15 Agustus 2026",
      time: "4 menit baca",
      title:
        "SPI Bogor meluncurkan MARJAN — Majelis Pemikiran di Kota Hujan sebagai cabang keenam",
      cta: "Baca Selengkapnya",
      fade: true,
    },
    {
      href: "/blog-details-standard",
      category: "Kurikulum",
      thumb: { src: innerblogblogStandardThumb14, alt: "Gambar artikel" },
      author: { src: home2blogblogUser21, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "30 Juli 2026",
      time: "5 menit baca",
      title:
        "Tujuh bulan, dua semester, dua puluh sesi: bagaimana kelas reguler SPI disusun dan mengapa gratis",
      cta: "Baca Selengkapnya",
      fade: true,
    },
    {
      href: "/blog-details-standard",
      category: "Kisah Alumni",
      thumb: { src: innerblogblogStandardThumb15, alt: "Gambar artikel" },
      author: { src: home2blogblogUser22, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "18 Juli 2026",
      time: "7 menit baca",
      title:
        "Dari peserta menjadi pelopor: jejak alumni SPI yang kembali mentransmisikan ilmu di komunitasnya",
      cta: "Baca Selengkapnya",
      fade: true,
    },
  ],
  pagination: [
    { label: "1", href: "#", active: true },
    { label: "2", href: "#" },
    { label: "...", href: "#", ellipsis: true },
    { label: "3", href: "#" },
    { label: "Berikutnya", href: "#", direction: "next" },
  ],
};

export const blogStandardSidebarContent: BlogStandardSidebarContent = {
  searchTitle: "Cari artikel",
  searchPlaceholder: "kata kunci...",
  recentTitle: "artikel terbaru",
  recentPosts: [
    {
      href: "/blog-details-standard",
      thumb: { src: innerblogblogRecentThumb11, alt: "Thumbnail artikel" },
      date: "2 September 2026",
      title: "Worldview of Islam: pandangan dunia sebagai fondasi berpikir",
    },
    {
      href: "/blog-details-standard",
      thumb: { src: innerblogblogRecentThumb12, alt: "Thumbnail artikel" },
      date: "21 Agustus 2026",
      title: "Kepemimpinan profetik dan keteladanan kenabian",
    },
    {
      href: "/blog-details-standard",
      thumb: { src: innerblogblogRecentThumb13, alt: "Thumbnail artikel" },
      date: "9 Agustus 2026",
      title: "Milad ke-11 SPI: sebelas tahun menghidupkan tradisi ilmu",
    },
  ],
  tagsTitle: "tag populer",
  tags: [
    { label: "Adab", active: true },
    { label: "Tradisi Ilmu" },
    { label: "Ghazwul Fikri" },
    { label: "Worldview" },
    { label: "Al-Attas" },
    { label: "Peradaban" },
    { label: "Tauhid" },
    { label: "Filsafat Islam" },
    { label: "Kurikulum" },
    { label: "Alumni" },
    { label: "Cabang" },
  ],
  cta: {
    bg: { src: innerblogblogSidebarWidgetThumb11, alt: "Latar CTA" },
    titleLine1: "Ikuti kelas",
    titleLine2: "SPI — gratis",
    button: { label: "Lihat Semua Program", href: "#" },
  },
};
