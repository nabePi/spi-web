import type { CollectionConfig } from "payload";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const Chapters: CollectionConfig = {
  slug: "chapters",
  labels: {
    singular: "Cabang",
    plural: "Cabang",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "venue", "order", "status"],
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
      label: "Nama Cabang",
      required: true,
      admin: {
        description: "Contoh: SPI Fatahillah, SPI Moh. Natsir, SPI UII, SPI Bogor — MARJAN",
      },
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
      name: "city",
      type: "text",
      label: "Kota",
      required: true,
      admin: {
        description: "Contoh: Jakarta, Bandung, Yogyakarta, Bogor, Tangerang, Padang",
      },
    },
    {
      name: "venue",
      type: "text",
      label: "Tempat / Mitra Lokasi",
      admin: {
        description: "Contoh: INSISTS Kalibata, Masjid Istiqamah, Universitas Islam Indonesia",
      },
    },
    {
      name: "address",
      type: "textarea",
      label: "Alamat Lengkap",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto Cabang / Lokasi",
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi Singkat Cabang",
    },
    {
      name: "contactPerson",
      type: "text",
      label: "Koordinator / Narahubung",
    },
    {
      name: "phone",
      type: "text",
      label: "Nomor WhatsApp / Telepon",
      admin: {
        description: "Contoh: +62 812-xxxx-xxxx",
      },
    },
    {
      name: "email",
      type: "text",
      label: "Alamat Email",
    },
    {
      name: "instagram",
      type: "text",
      label: "Instagram Akun",
      admin: {
        description: "Contoh: @spi.bandung atau URL lengkap",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Urutan Tampil",
      defaultValue: 100,
      admin: {
        position: "sidebar",
        description: "Angka lebih kecil tampil lebih dulu (contoh: 1, 2, 3...)",
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
