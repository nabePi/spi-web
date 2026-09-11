import type {
  InstructorV1BreadcrumbContent,
  InstructorV1InstructorContent,
  InstructorV1TeamContent,
  InstructorV1TestimonialContent,
} from "@/types/inner/instructor-v1";
import home1teamteamThumb11 from "@/public/assets/imgs/placeholder/avatars/avatar-af.svg";
import home1teamteamThumb12 from "@/public/assets/imgs/placeholder/avatars/avatar-rk.svg";
import home1teamteamThumb13 from "@/public/assets/imgs/placeholder/avatars/avatar-bs.svg";
import home1teamteamThumb14 from "@/public/assets/imgs/placeholder/avatars/avatar-da.svg";
import home1teamteamThumb15 from "@/public/assets/imgs/placeholder/avatars/avatar-hw.svg";
import home1teamteamThumb16 from "@/public/assets/imgs/placeholder/avatars/avatar-pr.svg";
import home3instuctorinstructorBgPattern12 from "@/public/assets/imgs/home3/instuctor/instructor-bg-pattern1_2.png";
import home3instuctorinstructorThumb11 from "@/public/assets/imgs/home3/instuctor/spi-dampak-lantern.webp";
import home1testimonialtestimonailUser11 from "@/public/assets/imgs/placeholder/testimonail-user1_1.svg";
import home1testimonialtestimonailUser12 from "@/public/assets/imgs/placeholder/testimonail-user1_2.svg";
import home1testimonialtestimonialThumb11 from "@/public/assets/imgs/inner/testimonial/spi-kajian-circle.webp";
import home1testimonialtestimonialThumb12 from "@/public/assets/imgs/inner/testimonial/spi-alumni-citynight.webp";
import home1testimonialtestimonailUser13 from "@/public/assets/imgs/placeholder/testimonail-user1_3.svg";
import home1testimonialtestimonailUser14 from "@/public/assets/imgs/placeholder/testimonail-user1_4.svg";
import home1testimonialtestimonailUser15 from "@/public/assets/imgs/placeholder/testimonail-user1_5.svg";
import home1testimonialtestimonailUser16 from "@/public/assets/imgs/placeholder/testimonail-user1_6.svg";
import home1testimonialtestimonailUser17 from "@/public/assets/imgs/placeholder/testimonail-user1_7.svg";

export const instructorV1BreadcrumbContent: InstructorV1BreadcrumbContent = {
  title: "Kisah Alumni",
  items: [{ label: "Beranda", href: "/" }, { label: "Kisah Alumni" }],
};

// TODO(alumni): sample placeholder data, same convention as the fabricated
// contact details in PRD Appendix B — clearly generic names and roles, not
// claims about specific real individuals. Not one alumnus is named in any
// source document, and publishing a named testimonial requires consent that
// has not been obtained (PRD §5, assumption 8), so these six cards must be
// replaced with real, consented alumni profiles before launch. Images are
// initials-only placeholder avatars, not photos — no face is fabricated.
// TODO(route): no alumni detail page exists, so each links to "#".
export const instructorV1TeamContent: InstructorV1TeamContent = {
  members: [
    {
      href: "#",
      thumb: { src: home1teamteamThumb11, alt: "Foto belum tersedia — inisial AF" },
      name: "Ahmad Fauzi",
      role: "Alumni Angkatan 8, Jakarta",
      rating: "4.5",
      active: true,
    },
    {
      href: "#",
      thumb: { src: home1teamteamThumb12, alt: "Foto belum tersedia — inisial RK" },
      name: "Rina Kartika",
      role: "Penulis dan Peneliti Lepas",
      rating: "4.5",
    },
    {
      href: "#",
      thumb: { src: home1teamteamThumb13, alt: "Foto belum tersedia — inisial BS" },
      name: "Budi Santoso",
      role: "Guru Madrasah, Bandung",
      rating: "4.5",
    },
    {
      href: "#",
      thumb: { src: home1teamteamThumb14, alt: "Foto belum tersedia — inisial DA" },
      name: "Dewi Anggraini",
      role: "Aktivis Komunitas, Yogyakarta",
      rating: "4.5",
    },
    {
      href: "#",
      thumb: { src: home1teamteamThumb15, alt: "Foto belum tersedia — inisial HW" },
      name: "Hendra Wijaya",
      role: "Mahasiswa Pascasarjana",
      rating: "4.5",
    },
    {
      href: "#",
      thumb: { src: home1teamteamThumb16, alt: "Foto belum tersedia — inisial PR" },
      name: "Putri Ramadhani",
      role: "Konsultan Independen, Bogor",
      rating: "4.5",
    },
  ],
};

export const instructorV1InstructorContent: InstructorV1InstructorContent = {
  bg: {
    src: home3instuctorinstructorBgPattern12,
    alt: "bg-pattern",
  },
  subtitle: "Dampak Alumni",
  titleBefore: "Kembali ke komunitas sebagai",
  titleHighlight: " pelopor intelektual ",
  text: "Alumni SPI diharapkan kembali ke komunitasnya masing-masing untuk mentransmisikan ilmu yang telah diperoleh, menjadi pelopor intelektual dalam pemikiran Islam, dan berkontribusi pada riset serta publikasi.",
  cta: { label: "Daftar Sekarang", href: "/courses-v1" },
  thumb: {
    src: home3instuctorinstructorThumb11,
    alt: "Lentera menyala, cahayanya menjangkau kegelapan",
  },
  stats: [
    { id: "instructors", modifier: "instructor1__stat--instructors", value: "14", label: "Angkatan" },
    { id: "students", modifier: "instructor1__stat--students", value: "6", label: "Kota" },
  ],
};

export const instructorV1TestimonialContent: InstructorV1TestimonialContent = {
  subtitle: "Gagasan",
  titleBefore: "Mengapa alumni menjadi",
  titleHighlight: "pelopor",
  items: [
    {
      kind: "text",
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
      company: "slack",
    },
    {
      kind: "text",
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
        alt: "Buku-buku terbuka tersusun melingkar di atas tikar anyaman",
      },
      title: "Kajian mingguan",
      videoHref: "https://www.youtube.com/watch?v=e5Hc2B50Z7c",
    },
    {
      kind: "image",
      delay: "0.25",
      thumb: {
        src: home1testimonialtestimonialThumb12,
        alt: "Siluet kubah masjid dengan latar langit kota saat senja",
      },
    },
    // NOTE: the two quotes below need real, consented alumni testimonials —
    // lorem ipsum until then (PRD §5, assumption 8).
    {
      kind: "text",
      delay: "0.35",
      rating: "4.9/5",
      quote:
        "\u201c Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis. \u201d",
      author: {
        src: home1testimonialtestimonailUser13,
        alt: "placeholder",
      },
      authorName: "Nostrud exercitation",
      designation: "Ullamco laboris",
      company: "webflow",
    },
    {
      kind: "text",
      delay: "0.45",
      rating: "4.9/5",
      quote:
        "\u201c Nisi ut aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint. \u201d",
      author: {
        src: home1testimonialtestimonailUser14,
        alt: "placeholder",
      },
      authorName: "Occaecat cupidatat",
      designation: "Non proident sunt",
      company: "stripe",
    },
  ],
  widget: {
    avatars: [
      { src: home1testimonialtestimonailUser15, alt: "placeholder" },
      { src: home1testimonialtestimonailUser16, alt: "placeholder" },
      { src: home1testimonialtestimonailUser17, alt: "placeholder" },
    ],
    rating: "4.9/5",
    number: "11",
    label: "Tahun berjalan",
  },
};
