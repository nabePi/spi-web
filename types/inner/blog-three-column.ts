import type { ImageAsset } from "@/types/image";
import type { ListingPaginationItem } from "@/types/pagination";

export type { ImageAsset };

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BlogThreeColumnBreadcrumbContent = {
  title: string;
  items: BreadcrumbItem[];
};

export type BlogThreeColumnCardItem = {
  href: string;
  category: string;
  thumb: ImageAsset;
  author: ImageAsset;
  authorName: string;
  date: string;
  title: string;
  delay: string;
};

export type BlogThreeColumnGridContent = {
  items: BlogThreeColumnCardItem[];
  pagination: ListingPaginationItem[];
};
