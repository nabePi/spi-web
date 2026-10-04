import type { CollectionConfig } from "payload";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventType", "startDate", "locationType", "status"],
  },
  access: {
    read: () => true, // Publicly accessible event notices and archive
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Event Title",
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
      name: "eventType",
      type: "select",
      label: "Event Format / Type",
      defaultValue: "webinar",
      required: true,
      options: [
        { label: "Webinar (Online)", value: "webinar" },
        { label: "Offline Event", value: "offline" },
        { label: "Daurah Pemikiran", value: "daurah" },
        { label: "Workshop / Pelatihan", value: "workshop" },
        { label: "Kuliah Umum", value: "kuliah-umum" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      label: "Event Status",
      defaultValue: "upcoming",
      required: true,
      options: [
        { label: "Akan Datang (Upcoming)", value: "upcoming" },
        { label: "Sedang Berlangsung (Ongoing)", value: "ongoing" },
        { label: "Selesai (Completed)", value: "completed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date & Time",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date & Time (Optional)",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Useful for multi-day daurah or weekend workshops",
      },
    },
    {
      name: "timeLabel",
      type: "text",
      label: "Time Schedule Label",
      defaultValue: "09:00 - 12:00 WIB",
      admin: {
        description: "Human-readable time display (e.g. '08:30 - 12:00 WIB' or 'Sabtu - Ahad, 09:00 - 15:30 WIB')",
      },
    },
    {
      name: "locationType",
      type: "select",
      label: "Location Type",
      defaultValue: "online",
      required: true,
      options: [
        { label: "Online (Zoom / GMeet)", value: "online" },
        { label: "Offline (Tatap Muka)", value: "offline" },
        { label: "Hybrid (Online & Offline)", value: "hybrid" },
      ],
    },
    {
      name: "locationName",
      type: "text",
      label: "Venue / Platform Name",
      required: true,
      admin: {
        description: "e.g. 'Zoom Meeting Room' or 'Aula Masjid Raya Bintaro Jaya'",
      },
    },
    {
      name: "locationAddress",
      type: "textarea",
      label: "Physical Address / Venue Instructions",
      admin: {
        description: "Street address or directions for offline/hybrid attendees (leave blank for pure online)",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Poster / Banner Flyer",
      hasMany: false,
    },
    {
      name: "speaker",
      type: "relationship",
      relationTo: "authors",
      label: "SPI Faculty Speaker",
      hasMany: false,
      admin: {
        position: "sidebar",
        description: "Link to accredited SPI instructor/scholar",
      },
    },
    {
      name: "speakerCustom",
      type: "text",
      label: "Guest Speaker / Scholar Override",
      admin: {
        position: "sidebar",
        description: "Name of external guest scholar if not registered in Authors collection",
      },
    },
    {
      name: "summary",
      type: "textarea",
      label: "Summary / Excerpt",
      required: true,
      admin: {
        description: "Brief overview shown on cards, listings, and social share previews",
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Event Rundown & Details",
      admin: {
        description: "Comprehensive event syllabus, topics, and rundown schedule",
      },
    },
    {
      name: "isFree",
      type: "checkbox",
      label: "Gratis / Bebas Biaya (Free Event)",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "price",
      type: "number",
      label: "Biaya Pendaftaran / Infaq (Rp)",
      min: 0,
      admin: {
        position: "sidebar",
        description: "Nominal biaya dalam Rupiah jika tidak gratis (e.g. 150000)",
      },
    },
    {
      name: "priceNote",
      type: "text",
      label: "Catatan Biaya (Opsional)",
      admin: {
        position: "sidebar",
        description: "e.g. 'Termasuk konsumsi & modul' / 'Infaq sukarela'",
      },
    },
    {
      name: "externalCta",
      type: "group",
      label: "External Registration / Intake CTA",
      fields: [
        {
          name: "label",
          type: "text",
          label: "CTA Button Text",
          defaultValue: "Daftar Sekarang",
        },
        {
          name: "url",
          type: "text",
          label: "CTA Destination URL",
          defaultValue: "#",
          admin: {
            description: "External registration form, WhatsApp group, or meeting link",
          },
        },
      ],
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
