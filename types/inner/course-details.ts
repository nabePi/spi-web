import type { ImageAsset, StaticImageData } from "@/types/image";

export type { ImageAsset };

export type CourseDetailsTab = {
  id: string;
  target: string;
  label: string;
  active?: boolean;
};

export type CourseCurriculumLesson = {
  title: string;
  preview?: boolean;
  videoId?: string;
};

export type CourseCurriculumSection = {
  id: string;
  headingId: string;
  collapseId: string;
  title: string;
  open?: boolean;
  lessons: CourseCurriculumLesson[];
};

export type CourseReviewBar = {
  stars: string;
  width: string;
  count: string;
};

export type CourseReviewItem = {
  name: string;
  text: string;
  thumb: ImageAsset;
  rating: string;
};

export type CourseIncludeItem = {
  id: "lessons" | "duration" | "level" | "language" | "certificate";
  label: string;
  value: string;
};

export type CourseDetailsInstructor = {
  name: string;
  thumb: ImageAsset;
  rating: string;
  ratingLabel: string;
  students: string;
  courses: string;
  bio: string;
  socials: { label: string; href: string; icon: "facebook" | "youtube" | "twitter" }[];
};

export type CourseDetailsContent = {
  layout: "tabs" | "stacked";
  rowClass: string;
  sidebarClass: string;
  tabs?: CourseDetailsTab[];
  overviewTitle?: string;
  overviewParagraphs: string[];
  highlightsTitle: string;
  highlights: string[];
  learnTitle: string;
  learnItems: string[];
  curriculum: CourseCurriculumSection[];
  instructor: CourseDetailsInstructor;
  reviewsTitle: string;
  reviewScore: string;
  reviewCount: string;
  reviewBars: CourseReviewBar[];
  reviews: CourseReviewItem[];
  sidebarThumb: ImageAsset;
  videoId: string;
  price: string;
  enrollCta: { label: string; href: string };
  includesTitle: string;
  includes: CourseIncludeItem[];
  shareLabel: string;
};
