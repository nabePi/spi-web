import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Tags } from "./payload/collections/Tags";
import { Authors } from "./payload/collections/Authors";
import { Articles } from "./payload/collections/Articles";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // Admin panel config
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— SPI CMS",
      description: "Sekolah Pemikiran Islam — Content Management System",
    },
  },

  // Collections
  collections: [Users, Media, Categories, Tags, Authors, Articles],

  // Globals
  globals: [SiteSettings],

  // Rich text editor
  editor: lexicalEditor(),

  // Secret key for authentication (set in .env)
  secret: process.env.PAYLOAD_SECRET || "",

  // SQLite database — stored at ./data/payload.db
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./data/payload.db",
    },
  }),

  // Image resizing support
  sharp,

  // Typescript output for generated types
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // Upload directory
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
});
