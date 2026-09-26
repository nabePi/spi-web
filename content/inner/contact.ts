import type { ContactBreadcrumbContent, ContactContent, ContactMapContent } from "@/types/inner/contact";

export const contactBreadcrumbContent: ContactBreadcrumbContent = {
  title: "Kontak",
  items: [{ label: "Beranda", href: "/" }, { label: "Kontak" }],
};

export const contactContent: ContactContent = {
  subtitle: "Hubungi Kami",
  titleBefore: "Ada pertanyaan tentang",
  titleMid: "program,",
  titleHighlight: "pendaftaran",
  info: [
    {
      id: "phone",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--orange",
      label: "Nomor WhatsApp:",
      value: "+62 812-8557-4547",
      href: "https://wa.me/6281285574547",
    },
    {
      id: "email",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--green",
      label: "Alamat Email:",
      value: "markaz.spi@gmail.com",
      href: "mailto:markaz.spi@gmail.com",
    },
    {
      id: "hours-1",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--orange",
      label: "Sekretariat Pusat",
      value: "Jagakarsa, Jakarta Selatan 12630, DKI Jakarta",
    },
  ],
  form: {
    fullName: { label: "Nama Lengkap *", placeholder: "Nama lengkap Anda" },
    lastName: { label: "Kota *", placeholder: "Kota domisili" },
    email: { label: "Alamat Email *", placeholder: "nama@email.com" },
    phone: { label: "Nomor WhatsApp *", placeholder: "+62 8xx xxxx xxxx" },
    subject: {
      label: "Topik *",
      options: [
        "Pendaftaran Kelas Reguler",
        "Kursus Singkat / Organisasi",
        "Program Daring (KOMIK)",
        "Kerja Sama & Media",
        "Lainnya",
      ],
    },
    message: { label: "Pesan *", placeholder: "Tuliskan pesan Anda di sini..." },
    submit: "Kirim Pesan",
  },
};

export const contactMapContent: ContactMapContent = {
  src: "https://maps.google.com/maps?q=Jagakarsa,+Jakarta+Selatan+12630,+DKI+Jakarta&z=14&output=embed",
};
