import type { CollectionConfig } from "payload";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractInitials(name: string): string {
  if (!name) return "";
  // Strip academic titles like Dr., Prof., Lc., M.Ag., S.T., etc.
  const cleaned = name
    .replace(/\b(Dr|Prof|Ph\.D|Lc|M\.Ud|M\.Si|M\.Pd\.I|S\.S|M\.Hum|S\.Th\.I|S\.IP|S\.T|S\.Fil)\b\.?/gi, "")
    .replace(/[.,]/g, "")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "SP";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export const Lecturers: CollectionConfig = {
  slug: "lecturers",
  labels: {
    singular: "Pengajar / Dosen",
    plural: "Pengajar / Dosen",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "institution", "order", "status"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
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
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nama Lengkap & Gelar",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      unique: true,
      admin: {
        position: "sidebar",
        description: "Dihasilkan otomatis dari nama jika dikosongkan",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value && typeof value === "string") {
              return formatSlug(value);
            }
            if (data?.name && typeof data.name === "string") {
              return formatSlug(data.name);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "initials",
      type: "text",
      label: "Inisial Avatar (2-3 Karakter)",
      admin: {
        position: "sidebar",
        description: "Dihasilkan otomatis jika dikosongkan (contoh: AS, MA, SA)",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value && typeof value === "string" && value.trim()) {
              return value.trim().toUpperCase().slice(0, 3);
            }
            if (data?.name && typeof data.name === "string") {
              return extractInitials(data.name);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "titleDegree",
      type: "text",
      label: "Gelar Akademik",
      admin: {
        description: "Contoh: S.T., M.Pd.I., Ph.D., Lc.",
      },
    },
    {
      name: "role",
      type: "text",
      label: "Peran / Bidang Keahlian",
      admin: {
        description: "Contoh: Pendiri dan Kepala Pusat SPI, Pakar Pemikiran Islam, Peneliti Sejarah",
      },
    },
    {
      name: "institution",
      type: "text",
      label: "Institusi / Afiliasi",
      admin: {
        description: "Contoh: INSISTS, Universitas Indonesia, UII, AILA Indonesia",
      },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Foto Profil",
      admin: {
        description: "Foto portrait pengajar (opsional). Jika kosong, inisial akan ditampilkan.",
      },
    },
    {
      name: "bio",
      type: "textarea",
      label: "Biografi Singkat",
    },
    {
      name: "order",
      type: "number",
      label: "Urutan Tampil",
      defaultValue: 100,
      admin: {
        position: "sidebar",
        description: "Angka lebih kecil tampil lebih dulu (contoh: 1 untuk Pendiri)",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status Publikasi",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
