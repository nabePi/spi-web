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

\unrestrict GcLBVyLFYTVYA485crjrIsgd2xZDOXP7ywHv6LhgtVS1gqcnc5u523WM0MiS0BI

