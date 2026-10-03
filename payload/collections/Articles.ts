import type { CollectionConfig } from "payload";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "author", "status", "publishedAt"],
  },
  access: {
    read: ({ req }) => {
      // Logged-in admin users can read all (including drafts)
      if (req.user) {
        return true;
      }
      // Public visitors only see published articles
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
      ({ data }) => {
        // Auto-set publishedAt if status is published and date is unset
        if (data?.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Article Title",
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
      name: "status",
      type: "select",
      label: "Publication Status",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Published Date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "readTime",
      type: "text",
      label: "Reading Time (e.g. '8 menit baca')",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      hasMany: false,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured / Hero Image",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Excerpt / Summary",
      required: true,
      admin: {
        description:
          "Short summary used for card previews, search results, and meta descriptions",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Article Body",
      required: true,
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
