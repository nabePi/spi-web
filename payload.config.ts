import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Tags } from "./payload/collections/Tags";
import { Authors } from "./payload/collections/Authors";
import { Articles } from "./payload/collections/Articles";
import { Events } from "./payload/collections/Events";
import { Papers } from "./payload/collections/Papers";
import { Lecturers } from "./payload/collections/Lecturers";
import { Chapters } from "./payload/collections/Chapters";
import { GalleryAlbums } from "./payload/collections/GalleryAlbums";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseUri = process.env.DATABASE_URI;
const payloadSecret = process.env.PAYLOAD_SECRET;

if (!databaseUri) {
  throw new Error("DATABASE_URI must be set to a PostgreSQL connection URI.");
}

if (!payloadSecret) {
  throw new Error("PAYLOAD_SECRET must be set before Payload CMS can start.");
}

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

  bin: [
    {
      key: "db:setup",
      scriptPath: path.resolve(dirname, "scripts/setup-db.ts"),
    },
    {
      key: "cms:seed-admin",
      scriptPath: path.resolve(dirname, "scripts/seed-admin.ts"),
    },
  ],

  // Collections
  collections: [
    Users,
    Media,
    Categories,
    Tags,
    Authors,
    Articles,
    Events,
    Papers,
    Lecturers,
    Chapters,
    GalleryAlbums,
  ],

  // Globals
  globals: [SiteSettings],

  // Rich text editor
  editor: lexicalEditor(),

  // Secret key for authentication (set in .env.local or deployment environment)
  secret: payloadSecret,

  // PostgreSQL database. Development pushes the current Payload schema on startup;
  // in production, setting DB_PUSH=true will push schema, or use database/init.sql.
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
    push: process.env.DB_PUSH === "true" || process.env.NODE_ENV !== "production",
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
