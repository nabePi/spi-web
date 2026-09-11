import type { ImageAsset, StaticImageData } from "@/types/image";

export type { ImageAsset };

export type LinkItem = {
  label: string;
  href: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BlogDetailsStandardBreadcrumbContent = {
  title: string;
  items: BreadcrumbItem[];
};

export type BlogDetailsRelatedItem = {
  href: string;
  category?: string;
  categoryLinked?: boolean;
  thumb: ImageAsset;
  thumbLinked?: boolean;
  author: ImageAsset;
  authorName: string;
  date: string;
  title: string;
  linkedMeta?: boolean;
};

export type BlogDetailsRelatedContent = {
  title: string;
  items: BlogDetailsRelatedItem[];
};

export type BlogDetailsRecentPost = {
  href: string;
  thumb: ImageAsset;
  date: string;
  title: string;
  dateLinked?: boolean;
};

export type BlogDetailsSidebarContent = {
  searchTitle: string;
  searchPlaceholder: string;
  recentTitle: string;
  recentPosts: BlogDetailsRecentPost[];
  tagsTitle: string;
  tags: { label: string; active?: boolean }[];
  cta: {
    bg: ImageAsset;
    titleLine1: string;
    titleLine2: string;
    button: LinkItem;
  };
};

export type BlogDetailsArticleContent = {
  hero: ImageAsset;
  author: ImageAsset;
  authorName: string;
  metaHref: string;
  date: string;
  readTime: string;
  title: string;
  intro: [string, string];
  boxTitle: string;
  boxText: string;
  checklist: string[];
  checklistSecondary?: string[];
  boxExtraText?: string;
  boxThumb: ImageAsset;
  midText: string[];
  highlight: string;
  techText: string;
  grid: [ImageAsset, ImageAsset];
  wellness: [string, string];
  tags: string[];
  authorBox: {
    thumb: ImageAsset;
    name: string;
    designation: string;
    text: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
  };
};
