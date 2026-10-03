import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "designation", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full Name & Academic Titles",
      required: true,
    },
    {
      name: "designation",
      type: "text",
      label: "Organizational Role / Title",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Profile Photo",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Short Biography",
    },
  ],
};
