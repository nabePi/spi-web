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
      id: "email",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--orange",
      label: "Alamat Email:",
      // TODO(contact): placeholder — see PRD Appendix B
      value: "sekretariat@spi.example.id",
      href: "mailto:sekretariat@spi.example.id",
    },
    {
      id: "hours-1",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--green",
      label: "Sekretariat Pusat",
      // TODO(contact): placeholder — SPI has not supplied a publishable address
      value: "Jl. Contoh No. 1, Bogor, Jawa Barat 16111",
    },
    {
      id: "hours-2",
      iconClass: "getintouch1__info-icon getintouch1__info-icon--orange",
      label: "Cabang",
      value:
        "Jakarta · Bandung · Yogyakarta · Bogor · Tangerang · Padang",
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
  // TODO(contact): centred on Bogor pending a publishable secretariat address
  src: "https://maps.google.com/maps?q=Bogor,+Jawa+Barat,+Indonesia&z=12&output=embed",
};
