import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
  },
  upload: {
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
  ],
};
