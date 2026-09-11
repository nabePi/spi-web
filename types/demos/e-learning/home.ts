import type { ImageAsset, StaticImageData } from "@/types/image";

export type { ImageAsset };

export type LinkItem = {
  label: string;
  href: string;
};

export type CourseCardData = {
  href: string;
  thumb: StaticImageData;
  title: string;
  author: string;
  rating: string;
  ratingValue: number;
  lessons: string;
  students: string;
  price: string;
  oldPrice?: string;
  offer?: string;
};

export type HeroFeature = {
  label: string;
};

export type ELearningHeroContent = {
  badgePrefix: string;
  badgeText: string;
  titleBefore: string;
  titleHighlight: string;
  text: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  features: HeroFeature[];
  bg: ImageAsset;
  thumb: ImageAsset;
  users: ImageAsset[];
  rating: string;
  learnersText: string;
  pattern: ImageAsset;
};

export type FeatureStatItem = {
  id: "courses" | "flexible" | "learners" | "membership";
  title: string;
  text: string;
  delay: string;
};

export type ELearningFeatureStatsContent = {
  items: FeatureStatItem[];
};

export type CategoryCardItem = {
  id:
    | "programming"
    | "designing"
    | "ai"
    | "academic"
    | "language"
    | "marketing"
    | "business"
    | "data-science"
    | "health";
  name: string;
  learners: string;
  href: string;
};

export type ELearningCategoryContent = {
  subtitle: string;
  title: string;
  desc: string;
  cta: LinkItem;
  items: CategoryCardItem[];
};

export type ELearningCoursesContent = {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  cta: LinkItem;
  items: CourseCardData[];
};

export type VideoStat = {
  kind: "odometer" | "rating";
  value?: string;
  suffix?: string;
  rating?: string;
  ratingMax?: string;
  label: string;
};

export type ELearningVideoContent = {
  left: VideoStat[];
  right: VideoStat[];
  thumb: ImageAsset;
  videoHref: string;
};

export type CoursePackageItem = {
  href: string;
  thumb: ImageAsset;
  offer?: string;
  rating: string;
  author: string;
  title: string;
  lessons: string;
  courses: string;
  students: string;
  price: string;
  oldPrice: string;
};

export type ELearningPackagesContent = {
  bg: ImageAsset;
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  cta: LinkItem;
  items: CoursePackageItem[];
};

export type ELearningBrandContent = {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
};

export type HowItWorkItem = {
  id: "choose" | "learn" | "practice" | "certified";
  modifier: string;
  active?: boolean;
  delay: string;
  thumb: ImageAsset;
  step: string;
  title: string;
  desc: string;
};

export type ELearningHowItWorkContent = {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  items: HowItWorkItem[];
};

export type TeamMember = {
  href: string;
  thumb: ImageAsset;
  name: string;
  role: string;
  rating: string;
  delay: string;
};

export type ELearningTeamContent = {
  subtitle: string;
  titleLine1: string;
  titleLine2Before: string;
  titleHighlight: string;
  cta: LinkItem;
  members: TeamMember[];
};

export type TestimonialItem = {
  id: "emily" | "eleanor";
  delay: string;
  thumb: ImageAsset;
  quote: string;
  author: ImageAsset;
  authorName: string;
  designation: string;
  rating: string;
  statNumber: string;
  statLabel: string;
  studentsLabel: string;
  avatars: ImageAsset[];
};

export type ELearningTestimonialContent = {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  items: TestimonialItem[];
};

export type ELearningAppContent = {
  bg: StaticImageData;
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  thumb: ImageAsset;
  shape: ImageAsset;
};

export type BlogCardItem = {
  href: string;
  category: string;
  thumb: ImageAsset;
  author: ImageAsset;
  authorName: string;
  date: string;
  title: string;
  delay: string;
};

export type ELearningBlogContent = {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  cta: LinkItem;
  items: BlogCardItem[];
};

export type InstagramSlide = {
  src: StaticImageData;
  alt: string;
};

export type ELearningInstagramContent = {
  username: string;
  slides: InstagramSlide[];
};
