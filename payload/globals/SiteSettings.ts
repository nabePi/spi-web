import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General & Branding",
          name: "general",
          fields: [
            {
              name: "siteName",
              type: "text",
              label: "Site / Organization Name",
              required: true,
              defaultValue: "Sekolah Pemikiran Islam",
            },
            {
              name: "tagline",
              type: "text",
              label: "Tagline / Motto",
              defaultValue:
                "Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam",
            },
            {
              name: "logoLight",
              type: "upload",
              relationTo: "media",
              label: "Logo (Light Variant - for dark backgrounds)",
            },
            {
              name: "logoDark",
              type: "upload",
              relationTo: "media",
              label: "Logo (Dark Variant - for light backgrounds)",
            },
            {
              name: "favicon",
              type: "upload",
              relationTo: "media",
              label: "Favicon",
            },
          ],
        },
        {
          label: "SEO & Metadata",
          name: "seo",
          fields: [
            {
              name: "defaultTitle",
              type: "text",
              label: "Default Meta Title",
              required: true,
              defaultValue:
                "Sekolah Pemikiran Islam — Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam",
            },
            {
              name: "defaultDescription",
              type: "textarea",
              label: "Default Meta Description",
              defaultValue:
                "Sekolah Pemikiran Islam (SPI) menyelenggarakan kajian pemikiran Islam yang terencana dan terukur. Kelas mingguan di enam kota sejak 2014.",
            },
            {
              name: "keywords",
              type: "text",
              label: "SEO Keywords (comma-separated)",
              defaultValue:
                "sekolah pemikiran islam, spi, kajian islam, tradisi ilmu, peradaban islam",
            },
            {
              name: "defaultOgImage",
              type: "upload",
              relationTo: "media",
              label: "Default Open Graph Share Image",
            },
            {
              name: "locale",
              type: "select",
              label: "Default Locale",
              defaultValue: "id_ID",
              options: [
                { label: "Indonesian (id_ID)", value: "id_ID" },
                { label: "English (en_US)", value: "en_US" },
              ],
            },
          ],
        },
        {
          label: "Contact & Location",
          name: "contact",
          fields: [
            {
              name: "email",
              type: "email",
              label: "Official Contact Email",
              required: true,
              defaultValue: "info@pemikiranislam.id",
            },
            {
              name: "phone",
              type: "text",
              label: "Office Phone Number",
            },
            {
              name: "whatsapp",
              type: "text",
              label: "Official WhatsApp Number (e.g. 6281234567890)",
            },
            {
              name: "address",
              type: "textarea",
              label: "Headquarters / Office Address",
            },
            {
              name: "googleMapsUrl",
              type: "text",
              label: "Google Maps Location URL",
            },
            {
              name: "operatingHours",
              type: "text",
              label: "Operating Hours",
              defaultValue: "Senin - Jumat, 09:00 - 17:00 WIB",
            },
          ],
        },
        {
          label: "Social Media",
          name: "social",
          fields: [
            {
              name: "instagram",
              type: "text",
              label: "Instagram Profile URL",
              defaultValue: "https://instagram.com/",
            },
            {
              name: "youtube",
              type: "text",
              label: "YouTube Channel URL",
              defaultValue: "https://youtube.com/",
            },
            {
              name: "facebook",
              type: "text",
              label: "Facebook Page URL",
              defaultValue: "https://facebook.com/",
            },
            {
              name: "xTwitter",
              type: "text",
              label: "X / Twitter URL",
              defaultValue: "https://x.com/",
            },
            {
              name: "telegram",
              type: "text",
              label: "Telegram Channel / Group URL",
            },
            {
              name: "tiktok",
              type: "text",
              label: "TikTok Profile URL",
            },
            {
              name: "linkedin",
              type: "text",
              label: "LinkedIn Page URL",
              defaultValue: "https://linkedin.com/",
            },
          ],
        },
        {
          label: "Announcement Bar",
          name: "announcement",
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              label: "Enable Top Announcement Banner",
              defaultValue: false,
            },
            {
              name: "badge",
              type: "text",
              label: "Badge Label (e.g. 'Pendaftaran', 'Info Baru')",
              defaultValue: "Pengumuman",
            },
            {
              name: "text",
              type: "text",
              label: "Announcement Message",
            },
            {
              name: "linkUrl",
              type: "text",
              label: "CTA Link URL",
            },
            {
              name: "linkLabel",
              type: "text",
              label: "CTA Button Text",
              defaultValue: "Selengkapnya",
            },
            {
              name: "openInNewTab",
              type: "checkbox",
              label: "Open Link in New Tab",
              defaultValue: false,
            },
          ],
        },
        {
          label: "Footer & Legal",
          name: "footer",
          fields: [
            {
              name: "copyrightText",
              type: "text",
              label: "Footer Copyright Notice",
              defaultValue: "Sekolah Pemikiran Islam. All rights reserved.",
            },
            {
              name: "footerDescription",
              type: "textarea",
              label: "Footer Short Introduction",
              defaultValue:
                "Sekolah Pemikiran Islam (SPI) adalah wadah kaderisasi intelektual muda Muslim yang menyelenggarakan kajian pemikiran Islam terencana dan terukur.",
            },
          ],
        },
      ],
    },
  ],
};
