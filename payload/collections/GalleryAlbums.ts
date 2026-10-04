import type { CollectionConfig } from "payload";
import { fetchAlbum, isGooglePhotosShareUrl } from "../../lib/googlePhotosAlbum";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const GalleryAlbums: CollectionConfig = {
  slug: "gallery-albums",
  labels: {
    singular: "Album Galeri",
    plural: "Album Galeri",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "albumDate", "photoCount", "syncStatus", "status"],
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
  hooks: {
    beforeChange: [
      // Pull photos from the Google Photos share link when it is new/changed,
      // or when the editor ticks "Sinkronkan ulang". A failed sync never blocks
      // saving: the previous photos are kept and the album links out instead.
      async ({ data, originalDoc, operation, req }) => {
        const shareUrlChanged =
          operation === "create" || data.shareUrl !== originalDoc?.shareUrl;
        if (!shareUrlChanged && !data.resync) return data;

        data.resync = false;

        try {
          const snapshot = await fetchAlbum(data.shareUrl);
          data.photos = snapshot.photos;
          data.photoCount = snapshot.photos.length;
          if (!data.coverUrl || shareUrlChanged) data.coverUrl = snapshot.coverUrl;
          data.syncStatus = "ok";
          data.syncMessage = null;
          data.syncedAt = new Date().toISOString();
        } catch (error) {
          data.syncStatus = "failed";
          data.syncMessage = error instanceof Error ? error.message : String(error);
          req.payload.logger.warn(
            `[gallery-albums] sync failed for "${data.title}": ${data.syncMessage}`,
          );
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Judul Album",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "URL Slug",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Dihasilkan otomatis dari judul jika dikosongkan",
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
      name: "shareUrl",
      type: "text",
      label: "Tautan Album Google Photos",
      required: true,
      admin: {
        description:
          "Tautan berbagi album (photos.app.goo.gl/… atau photos.google.com/share/…). Album harus dibagikan ke 'siapa saja yang memiliki tautan'.",
      },
      validate: (value: string | null | undefined) =>
        isGooglePhotosShareUrl(value) ||
        "Masukkan tautan berbagi Google Photos (https://photos.app.goo.gl/… atau https://photos.google.com/share/…).",
    },
    {
      name: "description",
      type: "textarea",
      label: "Deskripsi Singkat",
    },
    {
      name: "albumDate",
      type: "date",
      label: "Tanggal Kegiatan",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "coverUrl",
      type: "text",
      label: "URL Sampul",
      admin: {
        description:
          "Diisi otomatis dari album. Boleh diganti dengan URL gambar lain; tidak ditimpa saat sinkronisasi ulang.",
      },
    },
    {
      name: "resync",
      type: "checkbox",
      label: "Sinkronkan ulang saat disimpan",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Centang lalu simpan untuk menarik ulang foto dari Google Photos.",
      },
    },
    {
      name: "syncStatus",
      type: "select",
      label: "Status Sinkronisasi",
      defaultValue: "pending",
      options: [
        { label: "Belum disinkronkan", value: "pending" },
        { label: "Berhasil", value: "ok" },
        { label: "Gagal", value: "failed" },
      ],
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "syncMessage",
      type: "text",
      label: "Pesan Sinkronisasi",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "syncedAt",
      type: "date",
      label: "Terakhir Disinkronkan",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "photoCount",
      type: "number",
      label: "Jumlah Foto",
      defaultValue: 0,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "photos",
      type: "json",
      label: "Daftar Foto (JSON)",
      admin: {
        description:
          "Diisi otomatis: [{ url, width, height }]. Dapat diisi manual sebagai cadangan jika sinkronisasi gagal; url tanpa akhiran ukuran (=w…).",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status Publikasi",
      defaultValue: "published",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "meta",
      type: "group",
      label: "SEO Overrides",
      admin: { position: "sidebar" },
      fields: [
        { name: "title", type: "text", label: "Custom Meta Title" },
        { name: "description", type: "textarea", label: "Custom Meta Description" },
      ],
    },
  ],
};
