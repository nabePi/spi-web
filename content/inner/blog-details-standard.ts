import type {
  BlogDetailsRelatedContent,
  BlogDetailsArticleContent,
  BlogDetailsStandardBreadcrumbContent,
} from "@/types/inner/blog-details-standard";
import innerblogblogDetailsThumb15 from "@/public/assets/imgs/placeholder/blog-details-thumb1_5.svg";
import innerblogblogDetailsUserThumb11 from "@/public/assets/imgs/placeholder/blog-details-user-thumb1_1.svg";
import innerblogblogDetailsThumb16 from "@/public/assets/imgs/placeholder/blog-details-thumb1_6.svg";
import innerblogblogDetailsThumb17 from "@/public/assets/imgs/placeholder/blog-details-thumb1_7.svg";
import innerblogblogDetailsThumb18 from "@/public/assets/imgs/placeholder/blog-details-thumb1_8.svg";
import innerblogblogStandardThumb11 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_1.svg";
import home2blogblogUser21 from "@/public/assets/imgs/placeholder/blog-user2_1.svg";
import innerblogblogStandardThumb12 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_2.svg";
import home2blogblogUser22 from "@/public/assets/imgs/placeholder/blog-user2_2.svg";
import innerblogblogStandardThumb13 from "@/public/assets/imgs/placeholder/blog-standard-thumb1_3.svg";
import home2blogblogUser23 from "@/public/assets/imgs/placeholder/blog-user2_3.svg";

export const blogDetailsStandardBreadcrumbContent: BlogDetailsStandardBreadcrumbContent = {
  title: "Konsep Adab",
  items: [
    { label: "Beranda", href: "/" },
    { label: "Berita & Artikel", href: "/blog-standard" },
    { label: "Konsep Adab" },
  ],
};

export const blogDetailsStandardArticleContent: BlogDetailsArticleContent = {
  hero: { src: innerblogblogDetailsThumb15, alt: "Gambar utama artikel" },
  author: { src: innerblogblogDetailsUserThumb11, alt: "Penulis" },
  authorName: "Dr. Akmal Sjafril",
  metaHref: "/blog-details-standard",
  date: "5 September 2026",
  readTime: "8 menit baca",
  title:
    "Konsep adab: meletakkan sesuatu pada tempatnya, dan mengapa hilangnya adab menjadi akar kebingungan umat hari ini",
  intro: [
    "Landasan intelektual Sekolah Pemikiran Islam sangat dipengaruhi oleh pemikiran Prof. Syed Muhammad Naquib al-Attas. Inti dari ajaran itu adalah konsep adab — kata yang sering diterjemahkan sekadar sebagai “sopan santun” atau “budaya”, padahal maknanya jauh lebih tajam: meletakkan sesuatu pada tempatnya.",
    "Definisi itu bukan anjuran etiket. Ia adalah cara berpikir. Ketika sesuatu diletakkan pada tempatnya, hierarki ilmu menjadi jelas, otoritas keilmuan dikenali, dan seorang penuntut ilmu tahu kepada siapa ia belajar dan dengan ukuran apa ia menilai. Ketika adab hilang, yang runtuh bukan hanya kesopanan, melainkan seluruh tata cara umat dalam mengenali kebenaran.",
  ],
  boxTitle:
    "Hilangnya adab adalah akar kebingungan dan kemunduran umat Islam saat ini",
  boxText:
    "SPI berargumen bahwa kekacauan pemikiran yang kita saksikan hari ini bukan persoalan informasi yang kurang, melainkan persoalan tata letak: ilmu tidak lagi diletakkan pada tempatnya. Gejalanya dapat dikenali dengan cukup jelas.",
  checklist: [
    "Runtuhnya otoritas keilmuan — masyarakat mengikuti “guru” online berdasarkan preferensi pribadi dan jumlah pengikut, bukan kredensial keilmuan.",
    "Kekacauan hierarki ilmu — ketidakmampuan membedakan sumber pengetahuan yang benar dan yang salah.",
    "Meluasnya gagasan menyimpang — ketika kriteria bergeser dari ilmu ke selera, pemikiran sesat menyebar dengan cepat.",
  ],
  checklistSecondary: [
    "Rendahnya budaya baca dan lemahnya kemampuan berpikir kritis di kalangan generasi muda.",
    "Invasi intelektual (ghazwul fikri) melalui media, pendidikan, dan hiburan.",
    "Respons yang emosional dan tidak ilmiah terhadap tantangan ideologis.",
  ],
  boxExtraText:
    "Perhatikan bahwa keempat gejala itu saling menguatkan. Budaya baca yang rendah membuat otoritas sulit diverifikasi; otoritas yang kabur membuat gagasan menyimpang mudah diterima; dan gagasan yang menyimpang, bila ditanggapi secara emosional, justru memperoleh panggung yang lebih luas.",
  boxThumb: { src: innerblogblogDetailsThumb16, alt: "Gambar pendukung" },
  midText: [
    "Karena itu jawaban SPI bukan penambahan ceramah, melainkan pemulihan tata letak. Mengembalikan adab adalah intervensi yang diperlukan untuk memutus siklus kebingungan ini — dan ia dikerjakan melalui kajian yang terencana, terstruktur, dan terukur, bukan melalui reaksi.",
    "Dikombinasikan dengan tauhid, adab memungkinkan seorang Muslim memahami Islam bukan sekadar sebagai agama yang dianut, melainkan sebagai sebuah peradaban yang utuh. Tema inilah yang terus berulang di sepanjang kurikulum SPI, dari Worldview of Islam hingga Al-Qur'an dan Peradaban.",
  ],
  highlight:
    "“SPI hadir sebagai institusi pendidikan non formal yang memberikan kajian-kajian strategis bersifat terencana dan terukur demi menjawab kebutuhan umat sesuai zamannya.”",
  techText:
    "Dalam praktiknya, prinsip itu diterjemahkan menjadi struktur kelas yang tetap: program reguler berlangsung sekitar tujuh bulan — dua semester, dua puluh sesi — dengan pertemuan sekali seminggu, sementara format singkat berjalan satu bulan dengan tujuh kelas mingguan. Seluruh program diselenggarakan secara cuma-cuma.",
  grid: [
    { src: innerblogblogDetailsThumb17, alt: "Suasana kelas" },
    { src: innerblogblogDetailsThumb18, alt: "Suasana kelas" },
  ],
  wellness: [
    "Sasaran SPI adalah kaum muda Muslim — mahasiswa, aktivis, dan profesional — yang diharapkan kembali ke komunitasnya masing-masing untuk mentransmisikan ilmu yang telah diperoleh, bukan sekadar menyimpannya.",
    "Sejak 2014, SPI telah berkembang ke enam kota: Jakarta, Bandung, Yogyakarta, Tangerang, Padang, dan Bogor. Yang diukur bukan jumlah peserta, melainkan apakah alumni menjadi pelopor intelektual di lingkungannya sendiri.",
  ],
  tags: ["Adab", "Al-Attas", "Tradisi Ilmu", "Ghazwul Fikri", "Peradaban"],
  authorBox: {
    thumb: { src: innerblogblogDetailsUserThumb11, alt: "Foto penulis" },
    name: "Dr. Akmal Sjafril, S.T., M.Pd.I.",
    designation: "Pendiri dan Kepala Pusat SPI",
    text: "Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta turut mendirikan gerakan #IndonesiaTanpaJIL. Sejak 2016 menjadi pengurus Aliansi Cinta Keluarga (AILA) Indonesia, dan kini menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.",
  },
  form: {
    nameLabel: "Nama",
    namePlaceholder: "Nama lengkap Anda",
    emailLabel: "Email",
    emailPlaceholder: "nama@email.com",
    messageLabel: "Komentar",
    messagePlaceholder: "Tuliskan tanggapan Anda...",
    submit: "Kirim Komentar",
  },
};

export const blogDetailsStandardRelatedContent: BlogDetailsRelatedContent = {
  title: "Artikel terkait",
  items: [
    {
      href: "/blog-details-standard",
      category: "Pemikiran Islam",
      categoryLinked: true,
      thumb: { src: innerblogblogStandardThumb11, alt: "Gambar artikel" },
      thumbLinked: true,
      author: { src: home2blogblogUser21, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "28 Agustus 2026",
      title: "Ghazwul Fikri: mengenali invasi intelektual di sekitar kita...",
      linkedMeta: true,
    },
    {
      href: "/blog-details-standard",
      category: "Kurikulum",
      thumb: { src: innerblogblogStandardThumb12, alt: "Gambar artikel" },
      thumbLinked: true,
      author: { src: home2blogblogUser22, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "30 Juli 2026",
      title: "Worldview of Islam sebagai fondasi cara berpikir seorang Muslim.",
    },
    {
      href: "/blog-details-standard",
      category: "Berita",
      thumb: { src: innerblogblogStandardThumb13, alt: "Gambar artikel" },
      thumbLinked: true,
      author: { src: home2blogblogUser23, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "15 Agustus 2026",
      title: "SPI Bogor meluncurkan MARJAN sebagai cabang keenam.",
    },
    {
      href: "/blog-details-standard",
      category: "Kurikulum",
      thumb: { src: innerblogblogStandardThumb11, alt: "Gambar artikel" },
      thumbLinked: true,
      author: { src: home2blogblogUser21, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "21 Agustus 2026",
      title: "Kepemimpinan profetik dan keteladanan kenabian.",
    },
    {
      href: "/blog-details-standard",
      category: "Kisah Alumni",
      thumb: { src: innerblogblogStandardThumb12, alt: "Gambar artikel" },
      thumbLinked: true,
      author: { src: home2blogblogUser22, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "18 Juli 2026",
      title: "Dari peserta menjadi pelopor: jejak alumni SPI.",
    },
    {
      href: "/blog-details-standard",
      category: "Berita",
      thumb: { src: innerblogblogStandardThumb13, alt: "Gambar artikel" },
      author: { src: home2blogblogUser23, alt: "Penulis" },
      authorName: "Redaksi SPI",
      date: "9 Agustus 2026",
      title: "Milad ke-11 SPI: sebelas tahun menghidupkan tradisi ilmu.",
    },
  ],
};
