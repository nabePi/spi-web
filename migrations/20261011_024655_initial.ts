import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('webinar', 'offline', 'daurah', 'workshop', 'kuliah-umum');
  CREATE TYPE "public"."enum_events_status" AS ENUM('upcoming', 'ongoing', 'completed');
  CREATE TYPE "public"."enum_events_location_type" AS ENUM('online', 'offline', 'hybrid');
  CREATE TYPE "public"."enum_papers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_papers_paper_type" AS ENUM('jurnal', 'skripsi-tesis', 'makalah', 'working-paper', 'lainnya');
  CREATE TYPE "public"."enum_papers_ai_status" AS ENUM('none', 'pending', 'generated', 'reviewed');
  CREATE TYPE "public"."enum_lecturers_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_chapters_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_gallery_albums_sync_status" AS ENUM('pending', 'ok', 'failed');
  CREATE TYPE "public"."enum_gallery_albums_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_seo_locale" AS ENUM('id_ID', 'en_US');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar,
  	"photo_id" integer,
  	"bio" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_articles_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"read_time" varchar,
  	"category_id" integer NOT NULL,
  	"author_id" integer NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"event_type" "enum_events_event_type" DEFAULT 'webinar' NOT NULL,
  	"status" "enum_events_status" DEFAULT 'upcoming' NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"time_label" varchar DEFAULT '09:00 - 12:00 WIB',
  	"location_type" "enum_events_location_type" DEFAULT 'online' NOT NULL,
  	"location_name" varchar NOT NULL,
  	"location_address" varchar,
  	"featured_image_id" integer,
  	"speaker_id" integer,
  	"speaker_custom" varchar,
  	"summary" varchar NOT NULL,
  	"description" jsonb,
  	"is_free" boolean DEFAULT true,
  	"price" numeric,
  	"price_note" varchar,
  	"external_cta_label" varchar DEFAULT 'Daftar Sekarang',
  	"external_cta_url" varchar DEFAULT '#',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "papers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_papers_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"paper_type" "enum_papers_paper_type" DEFAULT 'jurnal' NOT NULL,
  	"year" numeric,
  	"author" varchar NOT NULL,
  	"category_id" integer,
  	"abstract" varchar NOT NULL,
  	"explanation" jsonb,
  	"cover_image_id" integer,
  	"external_url" varchar,
  	"page_count" numeric,
  	"ai_summary" varchar,
  	"ai_key_points" varchar,
  	"ai_status" "enum_papers_ai_status" DEFAULT 'none',
  	"ai_generated_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "papers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "lecturers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"initials" varchar,
  	"title_degree" varchar,
  	"role" varchar,
  	"institution" varchar,
  	"photo_id" integer,
  	"bio" varchar,
  	"order" numeric DEFAULT 100,
  	"status" "enum_lecturers_status" DEFAULT 'published',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "chapters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"city" varchar NOT NULL,
  	"venue" varchar,
  	"address" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"contact_person" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"instagram" varchar,
  	"order" numeric DEFAULT 100,
  	"status" "enum_chapters_status" DEFAULT 'published',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"share_url" varchar NOT NULL,
  	"description" varchar,
  	"album_date" timestamp(3) with time zone,
  	"cover_url" varchar,
  	"resync" boolean DEFAULT false,
  	"sync_status" "enum_gallery_albums_sync_status" DEFAULT 'pending',
  	"sync_message" varchar,
  	"synced_at" timestamp(3) with time zone,
  	"photo_count" numeric DEFAULT 0,
  	"photos" jsonb,
  	"status" "enum_gallery_albums_status" DEFAULT 'published' NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"authors_id" integer,
  	"articles_id" integer,
  	"events_id" integer,
  	"papers_id" integer,
  	"lecturers_id" integer,
  	"chapters_id" integer,
  	"gallery_albums_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"general_site_name" varchar DEFAULT 'Sekolah Pemikiran Islam' NOT NULL,
  	"general_tagline" varchar DEFAULT 'Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam',
  	"general_logo_light_id" integer,
  	"general_logo_dark_id" integer,
  	"general_favicon_id" integer,
  	"seo_default_title" varchar DEFAULT 'Sekolah Pemikiran Islam — Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam' NOT NULL,
  	"seo_default_description" varchar DEFAULT 'Sekolah Pemikiran Islam (SPI) menyelenggarakan kajian pemikiran Islam yang terencana dan terukur. Kelas mingguan di enam kota sejak 2014.',
  	"seo_keywords" varchar DEFAULT 'sekolah pemikiran islam, spi, kajian islam, tradisi ilmu, peradaban islam',
  	"seo_default_og_image_id" integer,
  	"seo_locale" "enum_site_settings_seo_locale" DEFAULT 'id_ID',
  	"contact_email" varchar DEFAULT 'info@pemikiranislam.id' NOT NULL,
  	"contact_phone" varchar,
  	"contact_whatsapp" varchar,
  	"contact_address" varchar,
  	"contact_google_maps_url" varchar,
  	"contact_operating_hours" varchar DEFAULT 'Senin - Jumat, 09:00 - 17:00 WIB',
  	"social_instagram" varchar DEFAULT 'https://instagram.com/',
  	"social_youtube" varchar DEFAULT 'https://youtube.com/',
  	"social_facebook" varchar DEFAULT 'https://facebook.com/',
  	"social_x_twitter" varchar DEFAULT 'https://x.com/',
  	"social_telegram" varchar,
  	"social_tiktok" varchar,
  	"social_linkedin" varchar DEFAULT 'https://linkedin.com/',
  	"announcement_enabled" boolean DEFAULT false,
  	"announcement_badge" varchar DEFAULT 'Pengumuman',
  	"announcement_text" varchar,
  	"announcement_link_url" varchar,
  	"announcement_link_label" varchar DEFAULT 'Selengkapnya',
  	"announcement_open_in_new_tab" boolean DEFAULT false,
  	"footer_copyright_text" varchar DEFAULT 'Sekolah Pemikiran Islam. All rights reserved.',
  	"footer_footer_description" varchar DEFAULT 'Sekolah Pemikiran Islam (SPI) adalah wadah kaderisasi intelektual muda Muslim yang menyelenggarakan kajian pemikiran Islam terencana dan terukur.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_speaker_id_authors_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "papers" ADD CONSTRAINT "papers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "papers" ADD CONSTRAINT "papers_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "papers_rels" ADD CONSTRAINT "papers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "papers_rels" ADD CONSTRAINT "papers_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chapters" ADD CONSTRAINT "chapters_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_papers_fk" FOREIGN KEY ("papers_id") REFERENCES "public"."papers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lecturers_fk" FOREIGN KEY ("lecturers_id") REFERENCES "public"."lecturers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chapters_fk" FOREIGN KEY ("chapters_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_albums_fk" FOREIGN KEY ("gallery_albums_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_light_id_media_id_fk" FOREIGN KEY ("general_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_dark_id_media_id_fk" FOREIGN KEY ("general_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_favicon_id_media_id_fk" FOREIGN KEY ("general_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_category_idx" ON "articles" USING btree ("category_id");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "articles_featured_image_idx" ON "articles" USING btree ("featured_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_tags_id_idx" ON "articles_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_speaker_idx" ON "events" USING btree ("speaker_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "papers_slug_idx" ON "papers" USING btree ("slug");
  CREATE INDEX "papers_category_idx" ON "papers" USING btree ("category_id");
  CREATE INDEX "papers_cover_image_idx" ON "papers" USING btree ("cover_image_id");
  CREATE INDEX "papers_updated_at_idx" ON "papers" USING btree ("updated_at");
  CREATE INDEX "papers_created_at_idx" ON "papers" USING btree ("created_at");
  CREATE UNIQUE INDEX "papers_filename_idx" ON "papers" USING btree ("filename");
  CREATE INDEX "papers_rels_order_idx" ON "papers_rels" USING btree ("order");
  CREATE INDEX "papers_rels_parent_idx" ON "papers_rels" USING btree ("parent_id");
  CREATE INDEX "papers_rels_path_idx" ON "papers_rels" USING btree ("path");
  CREATE INDEX "papers_rels_tags_id_idx" ON "papers_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "lecturers_slug_idx" ON "lecturers" USING btree ("slug");
  CREATE INDEX "lecturers_photo_idx" ON "lecturers" USING btree ("photo_id");
  CREATE INDEX "lecturers_updated_at_idx" ON "lecturers" USING btree ("updated_at");
  CREATE INDEX "lecturers_created_at_idx" ON "lecturers" USING btree ("created_at");
  CREATE UNIQUE INDEX "chapters_slug_idx" ON "chapters" USING btree ("slug");
  CREATE INDEX "chapters_image_idx" ON "chapters" USING btree ("image_id");
  CREATE INDEX "chapters_updated_at_idx" ON "chapters" USING btree ("updated_at");
  CREATE INDEX "chapters_created_at_idx" ON "chapters" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_albums_slug_idx" ON "gallery_albums" USING btree ("slug");
  CREATE INDEX "gallery_albums_updated_at_idx" ON "gallery_albums" USING btree ("updated_at");
  CREATE INDEX "gallery_albums_created_at_idx" ON "gallery_albums" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_papers_id_idx" ON "payload_locked_documents_rels" USING btree ("papers_id");
  CREATE INDEX "payload_locked_documents_rels_lecturers_id_idx" ON "payload_locked_documents_rels" USING btree ("lecturers_id");
  CREATE INDEX "payload_locked_documents_rels_chapters_id_idx" ON "payload_locked_documents_rels" USING btree ("chapters_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_albums_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_general_general_logo_light_idx" ON "site_settings" USING btree ("general_logo_light_id");
  CREATE INDEX "site_settings_general_general_logo_dark_idx" ON "site_settings" USING btree ("general_logo_dark_id");
  CREATE INDEX "site_settings_general_general_favicon_idx" ON "site_settings" USING btree ("general_favicon_id");
  CREATE INDEX "site_settings_seo_seo_default_og_image_idx" ON "site_settings" USING btree ("seo_default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "papers" CASCADE;
  DROP TABLE "papers_rels" CASCADE;
  DROP TABLE "lecturers" CASCADE;
  DROP TABLE "chapters" CASCADE;
  DROP TABLE "gallery_albums" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_events_event_type";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_events_location_type";
  DROP TYPE "public"."enum_papers_status";
  DROP TYPE "public"."enum_papers_paper_type";
  DROP TYPE "public"."enum_papers_ai_status";
  DROP TYPE "public"."enum_lecturers_status";
  DROP TYPE "public"."enum_chapters_status";
  DROP TYPE "public"."enum_gallery_albums_sync_status";
  DROP TYPE "public"."enum_gallery_albums_status";
  DROP TYPE "public"."enum_site_settings_seo_locale";`)
}
