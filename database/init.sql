--
-- PostgreSQL database dump
--


-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_articles_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_articles_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_chapters_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_chapters_status AS ENUM (
    'published',
    'draft'
);


--
-- Name: enum_events_event_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_events_event_type AS ENUM (
    'webinar',
    'offline',
    'daurah',
    'workshop',
    'kuliah-umum'
);


--
-- Name: enum_events_location_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_events_location_type AS ENUM (
    'online',
    'offline',
    'hybrid'
);


--
-- Name: enum_events_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_events_status AS ENUM (
    'upcoming',
    'ongoing',
    'completed'
);


--
-- Name: enum_gallery_albums_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_gallery_albums_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_gallery_albums_sync_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_gallery_albums_sync_status AS ENUM (
    'pending',
    'ok',
    'failed'
);


--
-- Name: enum_lecturers_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_lecturers_status AS ENUM (
    'published',
    'draft'
);


--
-- Name: enum_papers_ai_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_papers_ai_status AS ENUM (
    'none',
    'pending',
    'generated',
    'reviewed'
);


--
-- Name: enum_papers_paper_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_papers_paper_type AS ENUM (
    'jurnal',
    'skripsi-tesis',
    'makalah',
    'working-paper',
    'lainnya'
);


--
-- Name: enum_papers_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_papers_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_site_settings_seo_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_site_settings_seo_locale AS ENUM (
    'id_ID',
    'en_US'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying,
    status public.enum_articles_status DEFAULT 'draft'::public.enum_articles_status NOT NULL,
    published_at timestamp(3) with time zone,
    read_time character varying,
    category_id integer NOT NULL,
    author_id integer NOT NULL,
    featured_image_id integer NOT NULL,
    excerpt character varying NOT NULL,
    content jsonb NOT NULL,
    meta_title character varying,
    meta_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: articles_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    tags_id integer
);


--
-- Name: articles_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_rels_id_seq OWNED BY public.articles_rels.id;


--
-- Name: authors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying NOT NULL,
    designation character varying,
    photo_id integer,
    bio character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying,
    description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: chapters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chapters (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying,
    city character varying NOT NULL,
    venue character varying,
    address character varying,
    image_id integer,
    description character varying,
    contact_person character varying,
    phone character varying,
    email character varying,
    instagram character varying,
    "order" numeric DEFAULT 100,
    status public.enum_chapters_status DEFAULT 'published'::public.enum_chapters_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: chapters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.chapters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chapters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.chapters_id_seq OWNED BY public.chapters.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying,
    event_type public.enum_events_event_type DEFAULT 'webinar'::public.enum_events_event_type NOT NULL,
    status public.enum_events_status DEFAULT 'upcoming'::public.enum_events_status NOT NULL,
    start_date timestamp(3) with time zone NOT NULL,
    end_date timestamp(3) with time zone,
    time_label character varying DEFAULT '09:00 - 12:00 WIB'::character varying,
    location_type public.enum_events_location_type DEFAULT 'online'::public.enum_events_location_type NOT NULL,
    location_name character varying NOT NULL,
    location_address character varying,
    featured_image_id integer,
    speaker_id integer,
    speaker_custom character varying,
    summary character varying NOT NULL,
    description jsonb,
    is_free boolean DEFAULT true,
    price numeric,
    price_note character varying,
    external_cta_label character varying DEFAULT 'Daftar Sekarang'::character varying,
    external_cta_url character varying DEFAULT '#'::character varying,
    meta_title character varying,
    meta_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: gallery_albums; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gallery_albums (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying,
    share_url character varying NOT NULL,
    description character varying,
    album_date timestamp(3) with time zone,
    cover_url character varying,
    resync boolean DEFAULT false,
    sync_status public.enum_gallery_albums_sync_status DEFAULT 'pending'::public.enum_gallery_albums_sync_status,
    sync_message character varying,
    synced_at timestamp(3) with time zone,
    photo_count numeric DEFAULT 0,
    photos jsonb,
    status public.enum_gallery_albums_status DEFAULT 'published'::public.enum_gallery_albums_status NOT NULL,
    meta_title character varying,
    meta_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: gallery_albums_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gallery_albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gallery_albums_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gallery_albums_id_seq OWNED BY public.gallery_albums.id;


--
-- Name: lecturers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lecturers (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying,
    initials character varying,
    title_degree character varying,
    role character varying,
    institution character varying,
    photo_id integer,
    bio character varying,
    "order" numeric DEFAULT 100,
    status public.enum_lecturers_status DEFAULT 'published'::public.enum_lecturers_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: lecturers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lecturers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lecturers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lecturers_id_seq OWNED BY public.lecturers.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying NOT NULL,
    caption character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: papers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.papers (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying,
    status public.enum_papers_status DEFAULT 'draft'::public.enum_papers_status NOT NULL,
    published_at timestamp(3) with time zone,
    paper_type public.enum_papers_paper_type DEFAULT 'jurnal'::public.enum_papers_paper_type NOT NULL,
    year numeric,
    author character varying NOT NULL,
    category_id integer,
    abstract character varying NOT NULL,
    explanation jsonb,
    cover_image_id integer,
    external_url character varying,
    page_count numeric,
    ai_summary character varying,
    ai_key_points character varying,
    ai_status public.enum_papers_ai_status DEFAULT 'none'::public.enum_papers_ai_status,
    ai_generated_at timestamp(3) with time zone,
    meta_title character varying,
    meta_description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric
);


--
-- Name: papers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.papers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: papers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.papers_id_seq OWNED BY public.papers.id;


--
-- Name: papers_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.papers_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    tags_id integer
);


--
-- Name: papers_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.papers_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: papers_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.papers_rels_id_seq OWNED BY public.papers_rels.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer,
    media_id integer,
    categories_id integer,
    tags_id integer,
    authors_id integer,
    articles_id integer,
    events_id integer,
    papers_id integer,
    lecturers_id integer,
    chapters_id integer,
    gallery_albums_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    general_site_name character varying DEFAULT 'Sekolah Pemikiran Islam'::character varying NOT NULL,
    general_tagline character varying DEFAULT 'Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam'::character varying,
    general_logo_light_id integer,
    general_logo_dark_id integer,
    general_favicon_id integer,
    seo_default_title character varying DEFAULT 'Sekolah Pemikiran Islam — Menghidupkan Tradisi Ilmu untuk Kejayaan Peradaban Islam'::character varying NOT NULL,
    seo_default_description character varying DEFAULT 'Sekolah Pemikiran Islam (SPI) menyelenggarakan kajian pemikiran Islam yang terencana dan terukur. Kelas mingguan di enam kota sejak 2014.'::character varying,
    seo_keywords character varying DEFAULT 'sekolah pemikiran islam, spi, kajian islam, tradisi ilmu, peradaban islam'::character varying,
    seo_default_og_image_id integer,
    seo_locale public.enum_site_settings_seo_locale DEFAULT 'id_ID'::public.enum_site_settings_seo_locale,
    contact_email character varying DEFAULT 'info@pemikiranislam.id'::character varying NOT NULL,
    contact_phone character varying,
    contact_whatsapp character varying,
    contact_address character varying,
    contact_google_maps_url character varying,
    contact_operating_hours character varying DEFAULT 'Senin - Jumat, 09:00 - 17:00 WIB'::character varying,
    social_instagram character varying DEFAULT 'https://instagram.com/'::character varying,
    social_youtube character varying DEFAULT 'https://youtube.com/'::character varying,
    social_facebook character varying DEFAULT 'https://facebook.com/'::character varying,
    social_x_twitter character varying DEFAULT 'https://x.com/'::character varying,
    social_telegram character varying,
    social_tiktok character varying,
    social_linkedin character varying DEFAULT 'https://linkedin.com/'::character varying,
    announcement_enabled boolean DEFAULT false,
    announcement_badge character varying DEFAULT 'Pengumuman'::character varying,
    announcement_text character varying,
    announcement_link_url character varying,
    announcement_link_label character varying DEFAULT 'Selengkapnya'::character varying,
    announcement_open_in_new_tab boolean DEFAULT false,
    footer_copyright_text character varying DEFAULT 'Sekolah Pemikiran Islam. All rights reserved.'::character varying,
    footer_footer_description character varying DEFAULT 'Sekolah Pemikiran Islam (SPI) adalah wadah kaderisasi intelektual muda Muslim yang menyelenggarakan kajian pemikiran Islam terencana dan terukur.'::character varying,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    reset_password_requested_at timestamp(3) with time zone,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: articles_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_rels ALTER COLUMN id SET DEFAULT nextval('public.articles_rels_id_seq'::regclass);


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: chapters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chapters ALTER COLUMN id SET DEFAULT nextval('public.chapters_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: gallery_albums id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gallery_albums ALTER COLUMN id SET DEFAULT nextval('public.gallery_albums_id_seq'::regclass);


--
-- Name: lecturers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lecturers ALTER COLUMN id SET DEFAULT nextval('public.lecturers_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: papers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers ALTER COLUMN id SET DEFAULT nextval('public.papers_id_seq'::regclass);


--
-- Name: papers_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers_rels ALTER COLUMN id SET DEFAULT nextval('public.papers_rels_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.articles (id, title, slug, status, published_at, read_time, category_id, author_id, featured_image_id, excerpt, content, meta_title, meta_description, updated_at, created_at) FROM stdin;
1	Konsep adab: meletakkan sesuatu pada tempatnya	konsep-adab-meletakkan-sesuatu-pada-tempatnya	published	2026-10-08 07:33:21.055+07	8 menit baca	1	3	3	Landasan intelektual Sekolah Pemikiran Islam sangat dipengaruhi oleh pemikiran Prof. Syed Muhammad Naquib al-Attas mengenai konsep adab sebagai fondasi keilmuan.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Landasan intelektual Sekolah Pemikiran Islam sangat dipengaruhi oleh pemikiran Prof. Syed Muhammad Naquib al-Attas. Inti dari ajaran itu adalah konsep adab — kata yang sering diterjemahkan sekadar sebagai sopan santun atau budaya, padahal maknanya jauh lebih tajam: meletakkan sesuatu pada tempatnya.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}]}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Definisi itu bukan anjuran etiket semata. Ia adalah cara berpikir fundamental. Ketika sesuatu diletakkan pada tempatnya, hierarki ilmu menjadi jelas, otoritas keilmuan dikenali, dan seorang penuntut ilmu tahu kepada siapa ia belajar dan dengan ukuran apa ia menilai.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}]}]}}	\N	\N	2026-10-08 07:33:21.059+07	2026-10-08 07:33:21.059+07
\.


--
-- Data for Name: articles_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.articles_rels (id, "order", parent_id, path, tags_id) FROM stdin;
1	1	1	tags	1
2	2	1	tags	2
3	3	1	tags	3
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.authors (id, name, designation, photo_id, bio, updated_at, created_at) FROM stdin;
1	Dr. Akmal Sjafril, S.T., M.Pd.I.	Pendiri dan Kepala Pusat SPI	\N	Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.	2026-10-08 07:32:08.314+07	2026-10-08 07:32:08.314+07
2	Dr. Akmal Sjafril, S.T., M.Pd.I.	Pendiri dan Kepala Pusat SPI	\N	Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.	2026-10-08 07:32:43.271+07	2026-10-08 07:32:43.271+07
3	Dr. Akmal Sjafril, S.T., M.Pd.I.	Pendiri dan Kepala Pusat SPI	\N	Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.	2026-10-08 07:33:20.89+07	2026-10-08 07:33:20.89+07
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, slug, description, updated_at, created_at) FROM stdin;
1	Filosofi Dasar	filosofi-dasar	Kajian prinsip filosofis dan fondasi epistemologi Islam	2026-10-08 07:32:07.969+07	2026-10-08 07:32:07.969+07
2	Pemikiran Islam	pemikiran-islam	Kajian isu kontemporer dan telaah pemikiran tokoh	2026-10-08 07:32:08.005+07	2026-10-08 07:32:08.005+07
3	Kurikulum	kurikulum	Seputar materi kurikulum dan silabus belajar SPI	2026-10-08 07:32:08.034+07	2026-10-08 07:32:08.034+07
4	Berita	berita	Kabar dan agenda kegiatan SPI dari berbagai kota	2026-10-08 07:32:08.064+07	2026-10-08 07:32:08.064+07
5	Kisah Alumni	kisah-alumni	Refleksi dan kiprah alumni SPI di masyarakat	2026-10-08 07:32:08.093+07	2026-10-08 07:32:08.093+07
\.


--
-- Data for Name: chapters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chapters (id, name, slug, city, venue, address, image_id, description, contact_person, phone, email, instagram, "order", status, updated_at, created_at) FROM stdin;
1	SPI Fatahillah	spi-fatahillah-jakarta	Jakarta	INSISTS, Kalibata, Jakarta Selatan	Gedung INSISTS, Jl. Kalibata Utara II No. 84, RT.06/RW.02, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, DKI Jakarta 12740	\N	Cabang perdana Sekolah Pemikiran Islam di ibu kota, menyelenggarakan kelas reguler dan kajian intensif bermitra dengan INSISTS Jakarta.	Sekretariat SPI Jakarta	+62 812-8557-4547	jakarta@pemikiranislam.id	@spi.jakarta	1	published	2026-10-08 07:33:33.508+07	2026-10-08 07:33:33.508+07
2	SPI Moh. Natsir	spi-moh-natsir-bandung	Bandung	Masjid Istiqamah, Bandung	Kompleks Masjid Istiqamah, Jl. Taman Citarum No. 1, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115	\N	Cabang Bandung bertempat di Masjid Istiqamah yang bersejarah, menghadirkan kajian kritis pemikiran Islam bagi mahasiswa dan masyarakat umum di Kota Kembang.	Koordinator SPI Bandung	+62 813-2211-9870	bandung@pemikiranislam.id	@spi.bandung	2	published	2026-10-08 07:33:33.561+07	2026-10-08 07:33:33.561+07
3	SPI UII	spi-uii-yogyakarta	Yogyakarta	Universitas Islam Indonesia, Yogyakarta	Kawasan Kampus Universitas Islam Indonesia, Jl. Kaliurang KM 14.5, Besi, Sukoharjo, Kec. Ngaglik, Kabupaten Sleman, D.I. Yogyakarta 55584	\N	Pusat kaderisasi intelektual muda Muslim di Kota Pelajar, berkolaborasi dengan civitas akademika dan mahasiswa lintas kampus di Yogyakarta.	Koordinator SPI Yogyakarta	+62 812-2789-4321	jogja@pemikiranislam.id	@spi.jogja	3	published	2026-10-08 07:33:33.617+07	2026-10-08 07:33:33.617+07
4	SPI Bogor — MARJAN	spi-bogor-marjan	Bogor	Majelis MARJAN, Bogor	Majelis Pemikiran di Kota Hujan, Jl. Pajajaran Indah No. 12, Baranangsiang, Kec. Bogor Timur, Kota Bogor, Jawa Barat 16143	\N	Cabang keenam SPI yang dikenal dengan majelis MARJAN, menghadirkan suasana kajian yang hangat dan mendalam di Kota Hujan.	Koordinator SPI Bogor	+62 815-9876-5432	bogor@pemikiranislam.id	@spi.bogor	4	published	2026-10-08 07:33:33.678+07	2026-10-08 07:33:33.678+07
5	SPI Tangerang	spi-tangerang	Tangerang	Pusat Kajian Islam Tangerang	Kawasan Bintaro Jaya / BSD City, Tangerang Selatan, Banten 15224	\N	Menjangkau generasi muda, mahasiswa, dan profesional Muslim di wilayah Tangerang Raya dan Banten.	Koordinator SPI Tangerang	+62 811-9123-4567	tangerang@pemikiranislam.id	@spi.tangerang	5	published	2026-10-08 07:33:33.735+07	2026-10-08 07:33:33.735+07
6	SPI Padang	spi-padang	Padang	Masjid & Pusat Studi Peradaban Islam Padang	Jl. Khatib Sulaiman No. 45, Lolong Belanti, Kec. Padang Utara, Kota Padang, Sumatera Barat 25136	\N	Cabang SPI di Ranah Minang yang kaya akan tradisi keulamaan dan intelektual Islam, menyelenggarakan kelas reguler dan bedah pemikiran.	Koordinator SPI Padang	+62 813-7456-7890	padang@pemikiranislam.id	@spi.padang	6	published	2026-10-08 07:33:33.791+07	2026-10-08 07:33:33.791+07
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (id, title, slug, event_type, status, start_date, end_date, time_label, location_type, location_name, location_address, featured_image_id, speaker_id, speaker_custom, summary, description, is_free, price, price_note, external_cta_label, external_cta_url, meta_title, meta_description, updated_at, created_at) FROM stdin;
1	Webinar: Krisis Epistemologi dan Urgensi Ru'yat al-Islam	webinar-krisis-epistemologi-ruyat-al-islam	webinar	upcoming	2026-10-24 16:00:00+07	2026-10-24 19:00:00+07	Sabtu, 09:00 - 12:00 WIB	online	Zoom Meeting Room & YouTube Live	\N	2	1	\N	Menelaah pergeseran paradigma keilmuan kontemporer, ancaman relativisme kebenaran, dan pentingnya mengembalikan worldview Islam (Ru'yat al-Islam) dalam diskursus pemikiran modern.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"text": "Dalam lanskap pemikiran kontemporer, umat Islam dihadapkan pada disrupsi epistemologis yang meluas. Arus pasca-modernisme tidak sekadar mempertanyakan klaim kepastian ilmiah, melainkan mendekonstruksi fondasi metafisika dan nilai-nilai transendental. Tanpa pijakan Ru'yat al-Islam (Islamic Worldview) yang kokoh, generasi terpelajar muslim rentan terseret dalam kebingungan intelektual dan krisis adab terhadap ilmu.", "type": "text", "format": 0, "version": 1}]}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"text": "Pokok Bahasan Webinar", "type": "text", "format": 0, "version": 1}]}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"text": "1. Anatomi Krisis Epistemologi Barat Modern & Pasca-Modern.\\n2. Fondasi Ru'yat al-Islam: Hakikat Wujud, Wahyu, dan Akal.\\n3. Strategi Islamisasi Ilmu Kontemporer dan Pemurnian Nalar Muslim.\\n4. Tanya Jawab Interaktif dan Studi Kasus Pemikiran Terkini.", "type": "text", "format": 0, "version": 1}]}]}}	t	0	Gratis / Terbuka untuk Umum (Kapasitas 500 Peserta Zoom)	Daftar Webinar Sekarang	https://forms.gle/spi-webinar-epistemologi-2026	\N	\N	2026-10-08 07:33:54.212+07	2026-10-08 07:33:54.212+07
2	Daurah Pemikiran Islam: Membedah Worldview Islam dan Tantangan Sekularisme	daurah-pemikiran-islam-worldview-dan-sekularisme	daurah	upcoming	2026-11-14 15:30:00+07	2026-11-15 23:00:00+07	Sabtu - Ahad, 08:30 - 16:00 WIB	hybrid	Aula SPI Pusat & Zoom Meeting	Gedung Graha Pemikiran Islam, Jl. KH. Ahmad Dahlan No. 45, Kebayoran Baru, Jakarta Selatan	4	1	\N	Program intensif dua hari mengupas tuntas epistemologi Islam, tantangan sekularisasi ilmu, de-westernisasi sains, dan rekonstruksi peradaban Islam di era disrupsi.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"text": "Daurah Pemikiran Islam adalah program pelatihan intensif akhir pekan yang dirancang khusus bagi aktivis dakwah, mahasiswa, akademisi, dan profesional yang ingin memperdalam pondasi nalar Islam yang sistematis dan argumentatif.", "type": "text", "format": 0, "version": 1}]}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"text": "Fasilitas & Keikutsertaan", "type": "text", "format": 0, "version": 1}]}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"text": "Peserta luring mendapatkan tempat terbatas (50 seat di Aula SPI Pusat) dengan fasilitas lengkap makan siang dan coffee break. Peserta daring difasilitasi Zoom interaktif beresolusi tinggi dengan sesi break-out room untuk telaah teks kritis.", "type": "text", "format": 0, "version": 1}]}]}}	f	150000	Termasuk modul cetak eksklusif, makan siang 2 hari, seminar kit & e-sertifikat resmi	Registrasi Peserta Daurah	https://forms.gle/spi-daurah-worldview-2026	\N	\N	2026-10-08 07:33:54.258+07	2026-10-08 07:33:54.257+07
3	Kuliah Umum: Sejarah dan Dinamika Gerakan Pemikiran Islam di Indonesia	kuliah-umum-sejarah-gerakan-pemikiran-islam-indonesia	kuliah-umum	completed	2026-09-19 20:30:00+07	2026-09-19 23:30:00+07	Sabtu, 13:30 - 16:30 WIB	offline	Masjid Raya Bintaro Jaya	Sektor 9 Bintaro Jaya, Tangerang Selatan, Banten	5	1	\N	Kajian mendalam menelusuri akar historis respon ulama Nusantara terhadap infiltrasi gagasan kolonial serta geliat kebangkitan intelektual Islam abad ke-20.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"text": "Kegiatan kuliah umum ini telah terselenggara dengan sukses dihadiri lebih dari 300 jamaah di Masjid Raya Bintaro Jaya. Rekaman ceramah ilmiah dan slide presentasi dapat diakses secara terbuka melalui kanal media resmi SPI.", "type": "text", "format": 0, "version": 1}]}]}}	t	0	Gratis / Terbuka untuk Jamaah & Umum	Lihat Arsip Rekaman Video	https://youtube.com/@sekolahpemikiranislam	\N	\N	2026-10-08 07:33:54.298+07	2026-10-08 07:33:54.298+07
\.


--
-- Data for Name: gallery_albums; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gallery_albums (id, title, slug, share_url, description, album_date, cover_url, resync, sync_status, sync_message, synced_at, photo_count, photos, status, meta_title, meta_description, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: lecturers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lecturers (id, name, slug, initials, title_degree, role, institution, photo_id, bio, "order", status, updated_at, created_at) FROM stdin;
1	Dr. Akmal Sjafril, S.T., M.Pd.I.	dr-akmal-sjafril	AS	S.T., M.Pd.I.	Pendiri dan Kepala Pusat SPI	INSISTS / SPI Pusat	\N	Lulusan Teknik Sipil ITB (2006) dan penerima beasiswa Program Kaderisasi Ulama (PKU) pada 2007. Aktif sebagai pembicara, peneliti, dan penulis, serta turut mendirikan gerakan #IndonesiaTanpaJIL. Sejak 2016 menjadi pengurus Aliansi Cinta Keluarga (AILA) Indonesia, dan kini menyelesaikan studi doktoral bidang Sejarah di Universitas Indonesia.	1	published	2026-10-08 07:33:31.589+07	2026-10-08 07:33:31.589+07
2	Prof. Dr. Syamsuddin Arif	prof-dr-syamsuddin-arif	SA	M.A., Ph.D.	Pakar Filsafat & Pemikiran Islam	INSISTS / UNIDA Gontor	\N	\N	2	published	2026-10-08 07:33:31.632+07	2026-10-08 07:33:31.632+07
3	Prof. Usep Moh. Ishaq, Ph.D.	prof-usep-moh-ishaq-phd	UI	Ph.D.	Pakar Sains Islam & Pendidikan	INSISTS / Universiti Teknologi Malaysia	\N	\N	3	published	2026-10-08 07:33:31.665+07	2026-10-08 07:33:31.665+07
4	Dr. Muhammad Ardiansyah	dr-muhammad-ardiansyah	MA	M.Pd.I.	Pakar Pendidikan Islam & Hadits	STAI At-Taqwa Depok	\N	\N	4	published	2026-10-08 07:33:31.704+07	2026-10-08 07:33:31.704+07
5	Dr. Wido Supraha	dr-wido-supraha	WS	M.Si.	Pakar Pendidikan & Pemikiran Islam	Institut Tazkia	\N	\N	5	published	2026-10-08 07:33:31.738+07	2026-10-08 07:33:31.738+07
6	Asep Sobari, Lc	asep-sobari-lc	AS	Lc.	Peneliti Sejarah & Peradaban Islam	Kalam Salman / INSISTS	\N	\N	6	published	2026-10-08 07:33:31.78+07	2026-10-08 07:33:31.78+07
7	Dr. Tiar Anwar Bachtiar	dr-tiar-anwar-bachtiar	TB	M.Hum.	Sejarawan & Peneliti Pemikiran Islam	INSISTS / Universitas Padjadjaran	\N	\N	7	published	2026-10-08 07:33:31.82+07	2026-10-08 07:33:31.82+07
8	Dr. Kharis Nugroho, Lc., M.Ud	dr-kharis-nugroho	KN	Lc., M.Ud.	Pakar Pemikiran Islam	INSISTS	\N	\N	8	published	2026-10-08 07:33:31.857+07	2026-10-08 07:33:31.857+07
9	Dr. Wendi Zarman, M.Si	dr-wendi-zarman	WZ	M.Si.	Pakar Filsafat Sains & Pendidikan	INSISTS / UNIKOM Bandung	\N	\N	9	published	2026-10-08 07:33:31.897+07	2026-10-08 07:33:31.897+07
10	Dr. Nashruddin Syarief, S.S., M.Pd.I	dr-nashruddin-syarief	NS	S.S., M.Pd.I.	Pakar Hadits & Pemikiran Islam	Pesantren Persis	\N	\N	10	published	2026-10-08 07:33:31.94+07	2026-10-08 07:33:31.94+07
11	Dr. Kholili Hasib	dr-kholili-hasib	KH	M.Ud.	Pakar Tasawuf & Akidah	INPAS Surabaya	\N	\N	11	published	2026-10-08 07:33:31.985+07	2026-10-08 07:33:31.985+07
12	Dr. Deden Anjar H, M.Hum	dr-deden-anjar-h	DH	M.Hum.	Peneliti Filologi & Sastra Islam	Universitas Padjadjaran	\N	\N	12	published	2026-10-08 07:33:32.024+07	2026-10-08 07:33:32.024+07
13	Dr. Akhmad R. Damyati	dr-akhmad-r-damyati	AD	Ph.D.	Pakar Pemikiran Islam Kontemporer	INSISTS	\N	\N	13	published	2026-10-08 07:33:32.063+07	2026-10-08 07:33:32.063+07
14	Dr. Bahrul Ulum	dr-bahrul-ulum	BU	M.Ud.	Peneliti Media & Pemikiran Islam	INSISTS	\N	\N	14	published	2026-10-08 07:33:32.098+07	2026-10-08 07:33:32.098+07
15	Dr. Susiyanto	dr-susiyanto	SU	M.Pd.I.	Pakar Sejarah & Kristologi	Pusat Kajian Islam Surakarta	\N	\N	15	published	2026-10-08 07:33:32.133+07	2026-10-08 07:33:32.133+07
16	Ahmad Rofiqi, Lc., M.Pd.I	ahmad-rofiqi	AR	Lc., M.Pd.I.	Pengajar Bahasa Arab & Syariah	SPI Pusat	\N	\N	16	published	2026-10-08 07:33:32.252+07	2026-10-08 07:33:32.252+07
17	Muhammad Fadhila Azka, S.Th.I., M.Ag.	muhammad-fadhila-azka	MA	S.Th.I., M.Ag.	Peneliti Tafsir & Pemikiran	SPI Pusat	\N	\N	17	published	2026-10-08 07:33:32.513+07	2026-10-08 07:33:32.513+07
18	Erwyn Kurniawan, S.IP	erwyn-kurniawan	EK	S.IP.	Praktisi Media & Komunikasi	SPI Pusat	\N	\N	18	published	2026-10-08 07:33:32.813+07	2026-10-08 07:33:32.811+07
19	Adi Zulfikar, S.T.	adi-zulfikar	AZ	S.T.	Peneliti Isu Gender & Pemikiran	SPI Bandung	\N	\N	19	published	2026-10-08 07:33:33.315+07	2026-10-08 07:33:33.315+07
20	Hafizh Muftisanny	hafizh-muftisanny	HM	S.Sos.	Jurnalis & Peneliti Media	SPI Pusat	\N	\N	20	published	2026-10-08 07:33:33.374+07	2026-10-08 07:33:33.374+07
21	Anila Gusfani	anila-gusfani	AG	S.Si.	Pegiat Literasi & Pendidikan	SPI Pusat	\N	\N	21	published	2026-10-08 07:33:33.414+07	2026-10-08 07:33:33.414+07
22	Rani Nur Asriani, S.Fil	rani-nur-asriani	RA	S.Fil.	Peneliti Filsafat & Kajian Barat	SPI Pusat	\N	\N	22	published	2026-10-08 07:33:33.471+07	2026-10-08 07:33:33.471+07
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, alt, caption, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	Tumpukan batu tersusun rapi, melambangkan keteraturan adab	Ilustrasi konsep adab	2026-10-08 07:32:26.157+07	2026-10-08 07:32:26.157+07	/api/media/file/spi-adab-blocks.webp	\N	spi-adab-blocks.webp	image/webp	67362	820	480	50	50
2	Tumpukan batu tersusun rapi, melambangkan keteraturan adab	Ilustrasi konsep adab	2026-10-08 07:32:43.425+07	2026-10-08 07:32:43.425+07	/api/media/file/spi-adab-blocks-1.webp	\N	spi-adab-blocks-1.webp	image/webp	67362	820	480	50	50
3	Tumpukan batu tersusun rapi, melambangkan keteraturan adab	Ilustrasi konsep adab	2026-10-08 07:33:21.012+07	2026-10-08 07:33:21.012+07	/api/media/file/spi-adab-blocks-2.webp	\N	spi-adab-blocks-2.webp	image/webp	67362	820	480	50	50
4	Poster Daurah Pemikiran Islam	Daurah Worldview Islam & Sekularisme	2026-10-08 07:33:54.127+07	2026-10-08 07:33:54.127+07	/api/media/file/event-thumb1_1.webp	\N	event-thumb1_1.webp	image/png	7316	276	420	50	50
5	Poster Kuliah Umum Masjid Bintaro	Kuliah Umum Dinamika Gerakan Pemikiran Islam	2026-10-08 07:33:54.169+07	2026-10-08 07:33:54.169+07	/api/media/file/event-thumb1_2.webp	\N	event-thumb1_2.webp	image/png	7316	276	420	50	50
\.


--
-- Data for Name: papers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.papers (id, title, slug, status, published_at, paper_type, year, author, category_id, abstract, explanation, cover_image_id, external_url, page_count, ai_summary, ai_key_points, ai_status, ai_generated_at, meta_title, meta_description, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y) FROM stdin;
1	Epistemologi Islam dan Krisis Sains Modern	epistemologi-islam-dan-krisis-sains-modern	published	2026-10-08 07:34:02.161+07	jurnal	2025	Tim Peneliti SPI	2	Makalah ini menelaah krisis epistemologi dalam sains modern dan menawarkan kerangka Ru'yat al-Islam sebagai landasan integrasi ilmu, wahyu, dan akal.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tulisan ini cocok dibaca sebagai pengantar sebelum mengikuti kelas epistemologi. Perhatikan bagian argumen tentang hubungan antara sumber ilmu dan otoritas.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	\N	\N	1	\N	\N	none	\N	\N	\N	2026-10-08 07:34:02.165+07	2026-10-08 07:34:02.165+07	/api/papers/file/epistemologi-islam.pdf	\N	epistemologi-islam.pdf	application/pdf	756	\N	\N	\N	\N
2	Adab dan Tradisi Ilmu dalam Pendidikan	adab-dan-tradisi-ilmu-dalam-pendidikan	published	2026-10-08 07:34:02.266+07	makalah	2024	A. Rahman, B. Hakim	1	Kajian tentang kedudukan adab sebagai prasyarat ilmu dalam tradisi pendidikan Islam dan relevansinya bagi lembaga pendidikan kontemporer.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Makalah ini ditulis untuk peserta program dasar. Bacalah bersama bahan kajian adab pada pekan pertama.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	\N	\N	1	\N	\N	none	\N	\N	\N	2026-10-08 07:34:02.27+07	2026-10-08 07:34:02.27+07	/api/papers/file/adab-tradisi-ilmu.pdf	\N	adab-tradisi-ilmu.pdf	application/pdf	752	\N	\N	\N	\N
3	Tantangan Sekularisme terhadap Worldview Islam	tantangan-sekularisme-terhadap-worldview-islam	draft	\N	working-paper	2026	C. Pratama	2	Draf kerja mengenai bagaimana sekularisme membentuk cara pandang terhadap ilmu, etika, dan kehidupan publik.	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Draf internal, belum dipublikasikan.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "direction": "ltr"}}	\N	\N	1	\N	\N	none	\N	\N	\N	2026-10-08 07:34:02.44+07	2026-10-08 07:34:02.44+07	/api/papers/file/sekularisme-worldview.pdf	\N	sekularisme-worldview.pdf	application/pdf	760	\N	\N	\N	\N
\.


--
-- Data for Name: papers_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.papers_rels (id, "order", parent_id, path, tags_id) FROM stdin;
1	1	1	tags	2
2	2	1	tags	4
3	1	2	tags	1
4	2	2	tags	3
5	1	3	tags	4
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, categories_id, tags_id, authors_id, articles_id, events_id, papers_id, lecturers_id, chapters_id, gallery_albums_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-10-08 07:35:37.39+07	2026-10-08 06:39:12.554+07
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
9	collection-chapters	{}	2026-10-08 07:08:59.938+07	2026-10-08 07:08:59.938+07
7	collection-papers	{"editViewType": "default"}	2026-10-08 07:10:27.805+07	2026-10-08 07:08:57.871+07
3	collection-tags	{"editViewType": "default"}	2026-10-08 07:11:14.004+07	2026-10-08 07:08:54.364+07
4	collection-authors	{"limit": 10, "editViewType": "default"}	2026-10-08 07:34:58.741+07	2026-10-08 07:08:55.302+07
8	collection-lecturers	{"editViewType": "default"}	2026-10-08 07:36:04.982+07	2026-10-08 07:08:58.675+07
6	collection-events	{"editViewType": "default"}	2026-10-08 07:36:21.849+07	2026-10-08 07:08:56.876+07
2	collection-categories	{"editViewType": "default"}	2026-10-08 07:36:57.038+07	2026-10-08 07:08:53.415+07
12	collection-users	{}	2026-10-08 07:37:03.582+07	2026-10-08 07:37:03.582+07
11	global-site-settings	{"fields": {"_index-0": {"tabIndex": 0}}, "editViewType": "default"}	2026-10-08 07:37:10.624+07	2026-10-08 07:09:12.465+07
5	collection-articles	{"editViewType": "default"}	2026-10-08 07:44:01.575+07	2026-10-08 07:08:56.097+07
1	collection-media	{"editViewType": "default"}	2026-10-08 07:44:37.049+07	2026-10-08 07:08:52.19+07
10	collection-gallery-albums	{"editViewType": "default"}	2026-10-08 07:44:51.83+07	2026-10-08 07:09:01.191+07
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
9	\N	9	user	1
12	\N	7	user	1
13	\N	3	user	1
15	\N	4	user	1
16	\N	8	user	1
17	\N	6	user	1
18	\N	2	user	1
19	\N	12	user	1
24	\N	11	user	1
25	\N	5	user	1
26	\N	1	user	1
27	\N	10	user	1
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_settings (id, general_site_name, general_tagline, general_logo_light_id, general_logo_dark_id, general_favicon_id, seo_default_title, seo_default_description, seo_keywords, seo_default_og_image_id, seo_locale, contact_email, contact_phone, contact_whatsapp, contact_address, contact_google_maps_url, contact_operating_hours, social_instagram, social_youtube, social_facebook, social_x_twitter, social_telegram, social_tiktok, social_linkedin, announcement_enabled, announcement_badge, announcement_text, announcement_link_url, announcement_link_label, announcement_open_in_new_tab, footer_copyright_text, footer_footer_description, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tags (id, name, slug, updated_at, created_at) FROM stdin;
1	Adab	adab	2026-10-08 07:32:08.129+07	2026-10-08 07:32:08.129+07
2	Al-Attas	al-attas	2026-10-08 07:32:08.166+07	2026-10-08 07:32:08.166+07
3	Tradisi Ilmu	tradisi-ilmu	2026-10-08 07:32:08.202+07	2026-10-08 07:32:08.201+07
4	Ghazwul Fikri	ghazwul-fikri	2026-10-08 07:32:08.236+07	2026-10-08 07:32:08.236+07
5	Peradaban	peradaban	2026-10-08 07:32:08.281+07	2026-10-08 07:32:08.281+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, reset_password_requested_at, login_attempts, lock_until) FROM stdin;
1	SPI Local Administrator	2026-10-08 07:31:19.601+07	2026-10-08 06:39:18.306+07	admin@pemikiranislam.id	\N	\N	bebeba141ff3e47a2b46dd895b7a4f8acf4d3279b080e04926a67974340c1148	pbkdf2-sha256-v1:b491a809f5cf662a9a56e69fb61d96c451564a7cbd67ce29fead59ff9c230c4a	\N	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	3dd43392-e9c1-41f3-8ac1-7b822e702773	2026-10-08 07:32:07.873+07	2026-10-08 09:32:07.873+07
2	1	37266e0c-5611-4981-bbc6-5370f5d65895	2026-10-08 07:32:26.015+07	2026-10-08 09:32:26.015+07
3	1	eef98d04-424b-4543-b6f8-634fa80d1f44	2026-10-08 07:32:42.922+07	2026-10-08 09:32:42.922+07
4	1	8c01320c-88d3-462d-9c8b-fd2a7a7dc8a9	2026-10-08 07:33:20.422+07	2026-10-08 09:33:20.422+07
5	1	744be6ae-2995-4e57-98b2-065b24ac0110	2026-10-08 07:33:31.548+07	2026-10-08 09:33:31.548+07
6	1	096c3d74-59f0-4cec-9b35-1182cd76cae8	2026-10-08 07:33:54.07+07	2026-10-08 09:33:54.07+07
7	1	506ebcac-d191-48c6-b232-cb474fb66e55	2026-10-08 07:34:01.858+07	2026-10-08 09:34:01.858+07
8	1	569ebc0b-5b39-48a0-bd5c-aabba7414881	2026-10-08 07:34:20.226+07	2026-10-08 09:34:20.226+07
9	1	c83f775d-c502-4726-8e15-00426b69266d	2026-10-08 07:34:33.642+07	2026-10-08 09:34:33.642+07
10	1	1b770955-e8f2-44a5-9670-21c651932e09	2026-10-08 07:35:01.383+07	2026-10-08 09:35:01.383+07
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.articles_id_seq', 1, true);


--
-- Name: articles_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.articles_rels_id_seq', 3, true);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.authors_id_seq', 3, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 15, true);


--
-- Name: chapters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.chapters_id_seq', 6, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.events_id_seq', 3, true);


--
-- Name: gallery_albums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gallery_albums_id_seq', 1, false);


--
-- Name: lecturers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lecturers_id_seq', 22, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 5, true);


--
-- Name: papers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.papers_id_seq', 3, true);


--
-- Name: papers_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.papers_rels_id_seq', 5, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 1, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 2, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 12, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 27, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tags_id_seq', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: articles_rels articles_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_rels
    ADD CONSTRAINT articles_rels_pkey PRIMARY KEY (id);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: gallery_albums gallery_albums_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gallery_albums
    ADD CONSTRAINT gallery_albums_pkey PRIMARY KEY (id);


--
-- Name: lecturers lecturers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT lecturers_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: papers papers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers
    ADD CONSTRAINT papers_pkey PRIMARY KEY (id);


--
-- Name: papers_rels papers_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers_rels
    ADD CONSTRAINT papers_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: articles_author_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_author_idx ON public.articles USING btree (author_id);


--
-- Name: articles_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_category_idx ON public.articles USING btree (category_id);


--
-- Name: articles_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_created_at_idx ON public.articles USING btree (created_at);


--
-- Name: articles_featured_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_featured_image_idx ON public.articles USING btree (featured_image_id);


--
-- Name: articles_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_rels_order_idx ON public.articles_rels USING btree ("order");


--
-- Name: articles_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_rels_parent_idx ON public.articles_rels USING btree (parent_id);


--
-- Name: articles_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_rels_path_idx ON public.articles_rels USING btree (path);


--
-- Name: articles_rels_tags_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_rels_tags_id_idx ON public.articles_rels USING btree (tags_id);


--
-- Name: articles_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX articles_slug_idx ON public.articles USING btree (slug);


--
-- Name: articles_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_updated_at_idx ON public.articles USING btree (updated_at);


--
-- Name: authors_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX authors_created_at_idx ON public.authors USING btree (created_at);


--
-- Name: authors_photo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX authors_photo_idx ON public.authors USING btree (photo_id);


--
-- Name: authors_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX authors_updated_at_idx ON public.authors USING btree (updated_at);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: chapters_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX chapters_created_at_idx ON public.chapters USING btree (created_at);


--
-- Name: chapters_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX chapters_image_idx ON public.chapters USING btree (image_id);


--
-- Name: chapters_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX chapters_slug_idx ON public.chapters USING btree (slug);


--
-- Name: chapters_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX chapters_updated_at_idx ON public.chapters USING btree (updated_at);


--
-- Name: events_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_created_at_idx ON public.events USING btree (created_at);


--
-- Name: events_featured_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_featured_image_idx ON public.events USING btree (featured_image_id);


--
-- Name: events_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX events_slug_idx ON public.events USING btree (slug);


--
-- Name: events_speaker_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_speaker_idx ON public.events USING btree (speaker_id);


--
-- Name: events_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_updated_at_idx ON public.events USING btree (updated_at);


--
-- Name: gallery_albums_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX gallery_albums_created_at_idx ON public.gallery_albums USING btree (created_at);


--
-- Name: gallery_albums_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX gallery_albums_slug_idx ON public.gallery_albums USING btree (slug);


--
-- Name: gallery_albums_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX gallery_albums_updated_at_idx ON public.gallery_albums USING btree (updated_at);


--
-- Name: lecturers_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lecturers_created_at_idx ON public.lecturers USING btree (created_at);


--
-- Name: lecturers_photo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lecturers_photo_idx ON public.lecturers USING btree (photo_id);


--
-- Name: lecturers_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX lecturers_slug_idx ON public.lecturers USING btree (slug);


--
-- Name: lecturers_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lecturers_updated_at_idx ON public.lecturers USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: papers_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_category_idx ON public.papers USING btree (category_id);


--
-- Name: papers_cover_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_cover_image_idx ON public.papers USING btree (cover_image_id);


--
-- Name: papers_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_created_at_idx ON public.papers USING btree (created_at);


--
-- Name: papers_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX papers_filename_idx ON public.papers USING btree (filename);


--
-- Name: papers_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_rels_order_idx ON public.papers_rels USING btree ("order");


--
-- Name: papers_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_rels_parent_idx ON public.papers_rels USING btree (parent_id);


--
-- Name: papers_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_rels_path_idx ON public.papers_rels USING btree (path);


--
-- Name: papers_rels_tags_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_rels_tags_id_idx ON public.papers_rels USING btree (tags_id);


--
-- Name: papers_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX papers_slug_idx ON public.papers USING btree (slug);


--
-- Name: papers_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX papers_updated_at_idx ON public.papers USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_articles_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_articles_id_idx ON public.payload_locked_documents_rels USING btree (articles_id);


--
-- Name: payload_locked_documents_rels_authors_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_authors_id_idx ON public.payload_locked_documents_rels USING btree (authors_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_chapters_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_chapters_id_idx ON public.payload_locked_documents_rels USING btree (chapters_id);


--
-- Name: payload_locked_documents_rels_events_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_events_id_idx ON public.payload_locked_documents_rels USING btree (events_id);


--
-- Name: payload_locked_documents_rels_gallery_albums_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_gallery_albums_id_idx ON public.payload_locked_documents_rels USING btree (gallery_albums_id);


--
-- Name: payload_locked_documents_rels_lecturers_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_lecturers_id_idx ON public.payload_locked_documents_rels USING btree (lecturers_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_papers_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_papers_id_idx ON public.payload_locked_documents_rels USING btree (papers_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_tags_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_tags_id_idx ON public.payload_locked_documents_rels USING btree (tags_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: site_settings_general_general_favicon_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_general_general_favicon_idx ON public.site_settings USING btree (general_favicon_id);


--
-- Name: site_settings_general_general_logo_dark_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_general_general_logo_dark_idx ON public.site_settings USING btree (general_logo_dark_id);


--
-- Name: site_settings_general_general_logo_light_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_general_general_logo_light_idx ON public.site_settings USING btree (general_logo_light_id);


--
-- Name: site_settings_seo_seo_default_og_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_seo_seo_default_og_image_idx ON public.site_settings USING btree (seo_default_og_image_id);


--
-- Name: tags_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tags_created_at_idx ON public.tags USING btree (created_at);


--
-- Name: tags_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tags_slug_idx ON public.tags USING btree (slug);


--
-- Name: tags_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tags_updated_at_idx ON public.tags USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: articles articles_author_id_authors_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_id_authors_id_fk FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE SET NULL;


--
-- Name: articles articles_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: articles articles_featured_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: articles_rels articles_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_rels
    ADD CONSTRAINT articles_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: articles_rels articles_rels_tags_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_rels
    ADD CONSTRAINT articles_rels_tags_fk FOREIGN KEY (tags_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: authors authors_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: chapters chapters_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: events events_featured_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_featured_image_id_media_id_fk FOREIGN KEY (featured_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: events events_speaker_id_authors_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_speaker_id_authors_id_fk FOREIGN KEY (speaker_id) REFERENCES public.authors(id) ON DELETE SET NULL;


--
-- Name: lecturers lecturers_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT lecturers_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: papers papers_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers
    ADD CONSTRAINT papers_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: papers papers_cover_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers
    ADD CONSTRAINT papers_cover_image_id_media_id_fk FOREIGN KEY (cover_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: papers_rels papers_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers_rels
    ADD CONSTRAINT papers_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.papers(id) ON DELETE CASCADE;


--
-- Name: papers_rels papers_rels_tags_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papers_rels
    ADD CONSTRAINT papers_rels_tags_fk FOREIGN KEY (tags_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_articles_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_articles_fk FOREIGN KEY (articles_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_authors_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_authors_fk FOREIGN KEY (authors_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_chapters_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_chapters_fk FOREIGN KEY (chapters_id) REFERENCES public.chapters(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_events_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_events_fk FOREIGN KEY (events_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_gallery_albums_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_gallery_albums_fk FOREIGN KEY (gallery_albums_id) REFERENCES public.gallery_albums(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_lecturers_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_lecturers_fk FOREIGN KEY (lecturers_id) REFERENCES public.lecturers(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_papers_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_papers_fk FOREIGN KEY (papers_id) REFERENCES public.papers(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_tags_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_tags_fk FOREIGN KEY (tags_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: site_settings site_settings_general_favicon_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_general_favicon_id_media_id_fk FOREIGN KEY (general_favicon_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: site_settings site_settings_general_logo_dark_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_general_logo_dark_id_media_id_fk FOREIGN KEY (general_logo_dark_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: site_settings site_settings_general_logo_light_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_general_logo_light_id_media_id_fk FOREIGN KEY (general_logo_light_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: site_settings site_settings_seo_default_og_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_seo_default_og_image_id_media_id_fk FOREIGN KEY (seo_default_og_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict M4Yu6tmFwx00y8IaonNjGUH88sehW3Bc9mnb1j1N5e1fQY2fmAwWC7HXCRaFfTi

