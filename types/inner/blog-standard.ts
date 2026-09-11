import type { ImageAsset, StaticImageData } from "@/types/image";
import type { ListingPaginationItem } from "@/types/pagination";

export type { ImageAsset };

export type LinkItem = {
  label: string;
  href: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BlogStandardBreadcrumbContent = {
  title: string;
  items: BreadcrumbItem[];
};

export type BlogStandardCardItem = {
  href: string;
  category: string;
  thumb: ImageAsset;
  author: ImageAsset;
  authorName: string;
  date: string;
  time: string;
  title: string;
  cta: string;
  fade?: boolean;
};

export type BlogStandardRecentPost = {
  href: string;
  thumb: ImageAsset;
  date: string;
  title: string;
};

export type BlogStandardGridContent = {
  items: BlogStandardCardItem[];
  pagination: ListingPaginationItem[];
};

export type BlogStandardSidebarContent = {
  searchTitle: string;
  searchPlaceholder: string;
  recentTitle: string;
  recentPosts: BlogStandardRecentPost[];
  tagsTitle: string;
  tags: { label: string; active?: boolean }[];
  cta: {
    bg: ImageAsset;
    titleLine1: string;
    titleLine2: string;
    button: LinkItem;
  };
};
