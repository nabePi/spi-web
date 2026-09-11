import type { StaticImageData } from "@/types/image";
import type { ListingPaginationItem } from "@/types/pagination";

export type CourseGridItem = {
  href: string;
  title: string;
  author: string;
  rating: string;
  thumb: StaticImageData;
  alt: string;
  clipId: string;
  price: string;
  oldPrice?: string;
  lessons: string;
  courses?: string;
  students: string;
  level?: string;
};

export type CourseListItem = {
  href: string;
  title: string;
  author: string;
  rating: string;
  thumb: StaticImageData;
  alt: string;
  price: string;
  lessons: string;
  duration: string;
  students: string;
  level: string;
};

export type CourseSortOption = {
  value: string;
  label: string;
};

export type CourseFilterContent = {
  showingBefore: string;
  showingRange: string;
  showingMid: string;
  showingTotal: string;
  showingAfter: string;
  searchPlaceholder: string;
  gridViewTitle: string;
  listViewTitle: string;
  defaultTab: "grid" | "list";
  sortOptions?: CourseSortOption[];
};

export type CourseSidebarContent = {
  searchPlaceholder: string;
  categoriesTitle: string;
  categories: string[];
  levelTitle: string;
  levels: string[];
  priceTitle: string;
  prices: string[];
  instructorTitle: string;
  instructors: string[];
  clearLabel: string;
};

export type CoursesListingContent = {
  filter: CourseFilterContent;
  grid: CourseGridItem[];
  list: CourseListItem[];
  pagination: ListingPaginationItem[];
  sidebar?: CourseSidebarContent;
};

export type RelatedCoursesContent = {
  title: string;
  items: CourseGridItem[];
};

export type CourseGridCardVariant = "classic" | "compact";
