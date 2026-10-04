import type { CollectionConfig } from "payload";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const Papers: CollectionConfig = {
  slug: "papers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "paperType", "year", "author", "status", "publishedAt"],
  },
  upload: {
    staticDir: "papers",
    mimeTypes: ["application/pdf"],
    // Strict preview security: block public access to raw /api/papers/file/*
    handlers: [
      (req) => {
        // Authenticated admin users can view raw files in Payload admin
        if (req.user) {
          return;
        }
        // Public anonymous users are denied direct raw file access
        return new Response("Not Found", { status: 404 });
      },
    ],
  },
  access: {
    read: ({ req }) => {
      // Authenticated admin users can read all (including drafts)
      if (req.user) {
        return true;
      }
      // Public visitors only see published papers
      return {
        status: {
          equals: "published",
        },
      };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        // Validate PDF upload size (max 5 MB)
        if (req?.file) {
          if (req.file.mimetype !== "application/pdf") {
            throw new Error("File harus berupa dokumen PDF (.pdf).");
          }
          if (req.file.size > 5 * 1024 * 1024) {
            throw new Error("Ukuran file PDF melebihi batas maksimal 5 MB.");
          }
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt if status is published and date is unset
        if (data?.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc, req, context }) => {
        // Strip direct raw file paths from public API responses, but preserve for internal server callers
        if (!req?.user && !context?.internal && doc) {
          delete doc.url;
          delete doc.thumbnailURL;
          delete doc.filename;
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Judul Karya Tulis / Paper",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      unique: true,
      admin: {
        position: "sidebar",
        description: "Auto-generated from title if left empty",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value && typeof value === "string") {
              return formatSlug(value);
            }
            if (data?.title && typeof data.title === "string") {
              return formatSlug(data.title);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status Publikasi",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published (Terbit)", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Tanggal Terbit",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "paperType",
      type: "select",
      label: "Jenis Karya Tulis",
      defaultValue: "jurnal",
      required: true,
      options: [
        { label: "Artikel Jurnal Ilmiah", value: "jurnal" },
        { label: "Skripsi / Tesis / Disertasi", value: "skripsi-tesis" },
        { label: "Makalah Konferensi / Seminar", value: "makalah" },
        { label: "Kertas Kerja (Working Paper)", value: "working-paper" },
        { label: "Karya Tulis Lainnya", value: "lainnya" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "year",
      type: "number",
      label: "Tahun Publikasi",
      admin: {
        position: "sidebar",
        description: "Contoh: 2026",
      },
    },
    {
      name: "author",
      type: "text",
      label: "Nama Penulis / Tim Peneliti",
      required: true,
      admin: {
        description: "Free-text: e.g. 'Dr. Akmal Sjafril, S.T., M.Pd.I.' atau 'Tim Riset SPI & Peneliti Tamu'",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Kategori Utama",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      label: "Topik & Tag Terkait",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "abstract",
      type: "textarea",
      label: "Abstrak / Ringkasan Asli Paper",
      required: true,
      admin: {
        description: "Abstrak asli dokumen untuk pratinjau kartu, mesin pencari, dan meta deskripsi",
      },
    },
    {
      name: "explanation",
      type: "richText",
      label: "Ulasan & Informasi Tambahan (Admin)",
      admin: {
        description:
          "Penjelasan mendalam dari redaksi/admin mengenai konteks karya tulis, poin penting, dan relevansi pemikiran",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Gambar Sampul / Ilustrasi Depan (Opsional)",
      hasMany: false,
    },
    {
      name: "externalUrl",
      type: "text",
      label: "Tautan Eksternal / DOI (Opsional)",
      admin: {
        description: "Contoh: 'https://doi.org/10.1234/spi.2026' atau tautan repositori luar",
      },
    },
    {
      name: "pageCount",
      type: "number",
      label: "Jumlah Halaman (Opsional)",
      min: 1,
      admin: {
        position: "sidebar",
      },
    },
    // AI Integration Fields (Phase 2 Placeholders)
    {
      name: "aiSummary",
      type: "textarea",
      label: "Ringkasan Eksekutif AI (Fase 2)",
      admin: {
        position: "sidebar",
        description: "Hasil ekstraksi dan ringkasan otomatis oleh AI (dapat disunting admin)",
      },
    },
    {
      name: "aiKeyPoints",
      type: "textarea",
      label: "Poin-poin Kunci AI (Fase 2)",
      admin: {
        position: "sidebar",
        description: "Poin-poin utama karya ilmiah yang diekstraksi oleh AI (satu poin per baris)",
      },
    },
    {
      name: "aiStatus",
      type: "select",
      label: "Status Analisis AI (Fase 2)",
      defaultValue: "none",
      options: [
        { label: "Belum Dianalisis", value: "none" },
        { label: "Dalam Antrean AI", value: "pending" },
        { label: "Draft AI Dihasilkan", value: "generated" },
        { label: "Telah Ditinjau & Disetujui Admin", value: "reviewed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "aiGeneratedAt",
      type: "date",
      label: "Waktu Analisis AI",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "meta",
      type: "group",
      label: "SEO Overrides",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Custom Meta Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Custom Meta Description",
        },
      ],
    },
  ],
};
