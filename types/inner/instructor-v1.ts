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

export type InstructorV1BreadcrumbContent = {
  title: string;
  items: BreadcrumbItem[];
};

export type InstructorV1TeamMember = {
  href: string;
  thumb: ImageAsset;
  name: string;
  role: string;
  rating: string;
  active?: boolean;
};

export type InstructorV1TeamContent = {
  members: InstructorV1TeamMember[];
};

export type InstructorV1Stat = {
  id: "instructors" | "students";
  modifier: string;
  value: string;
  label: string;
};

export type InstructorV1InstructorContent = {
  bg: ImageAsset;
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  text: string;
  cta: LinkItem;
  thumb: ImageAsset;
  stats: InstructorV1Stat[];
};

export type InstructorV1TestimonialTextItem = {
  kind: "text";
  delay: string;
  rating: string;
  quote: string;
  author: ImageAsset;
  authorName: string;
  designation: string;
  company: "slack" | "paypal" | "webflow" | "stripe";
};

export type InstructorV1TestimonialImageItem = {
  kind: "image";
  delay: string;
  overlay?: boolean;
  thumb: ImageAsset;
  title?: string;
  videoHref?: string;
};

export type InstructorV1TestimonialItem =
  | InstructorV1TestimonialTextItem
  | InstructorV1TestimonialImageItem;

export type InstructorV1TestimonialContent = {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  items: InstructorV1TestimonialItem[];
  widget: {
    avatars: ImageAsset[];
    rating: string;
    number: string;
    label: string;
  };
};
