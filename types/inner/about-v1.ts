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

export type AboutV1BreadcrumbContent = {
  bg: ImageAsset;
  items: BreadcrumbItem[];
  title: string;
  text: string;
};

export type AboutTitleLine = {
  before: string;
  highlight?: string;
  after?: string;
};

export type AboutStatItem = {
  id: "students" | "courses" | "instructors" | "certificates";
  value: string;
  suffix: string;
  title: string;
};

export type AboutV1AboutContent = {
  thumbs: ImageAsset[];
  subtitle: string;
  titleLines: AboutTitleLine[];
  paragraphs: string[];
  satisfaction: string;
  satisfactionLabel: string;
  rating: string;
  trustedBefore: string;
  trustedHighlight: string;
  trustedAfter: string;
  infoThumb: ImageAsset;
  stats: AboutStatItem[];
};

export type WcuQualityCardData = {
  delay: string;
  bg: ImageAsset;
  number: string;
  title: string;
  desc: string;
};

export type WcuCertificationItem = {
  lines: [string, string];
};

export type WcuCertificationCardData = {
  delay: string;
  bg: ImageAsset;
  title: string;
  desc: string;
  items: WcuCertificationItem[];
};

export type WcuImageCardData = {
  delay: string;
  thumb: ImageAsset;
  videoHref: string;
  title: string;
  desc: string;
};

export type WcuInstructorsCardData = {
  delay: string;
  bg: ImageAsset;
  leftAvatars: number[];
  rightAvatars: number[];
  title: string;
  desc: string;
};

export type WcuSupportCardData = {
  delay: string;
  bg: ImageAsset;
  title: string;
  desc: string;
  cta: LinkItem;
  mailTitle: string;
  mailHref: string;
  mailLabel: string;
  person: {
    name: string;
    role: string;
    thumb: ImageAsset;
  };
};

export type WcuSatisfactionCardData = {
  delay: string;
  bg: ImageAsset;
  number: string;
  title: string;
  desc: string;
};

export type AboutV1WcuContent = {
  subtitle: string;
  titleLine1: string;
  titleLine2Before: string;
  titleHighlight: string;
  quality: WcuQualityCardData;
  certification: WcuCertificationCardData;
  image: WcuImageCardData;
  instructors: WcuInstructorsCardData;
  support: WcuSupportCardData;
  satisfaction: WcuSatisfactionCardData;
};

export type AboutV1TeamMember = {
  href: string;
  thumb: ImageAsset;
  name: string;
  role: string;
  rating: string;
  active?: boolean;
};

export type AboutV1TeamContent = {
  subtitle: string;
  titleBefore: string;
  titleMid: string;
  titleHighlight: string;
  cta: LinkItem;
  members: AboutV1TeamMember[];
};

export type AboutV1TestimonialQuote = {
  kind: "quote";
  delay: string;
  rating: string;
  quote: string;
  author: ImageAsset;
  authorName: string;
  designation: string;
  company: "zoom" | "paypal" | "webflow" | "figma";
};

export type AboutV1TestimonialImage = {
  kind: "image";
  delay: string;
  thumb: ImageAsset;
  overlay?: boolean;
  title?: string;
  videoHref?: string;
};

export type AboutV1TestimonialItem = AboutV1TestimonialQuote | AboutV1TestimonialImage;

export type AboutV1TestimonialContent = {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  items: AboutV1TestimonialItem[];
  widget: {
    avatars: ImageAsset[];
    rating: string;
    number: string;
    label: string;
  };
};

export type AboutV1ClientContent = {
  subtitle: string;
  titleBefore: string;
  titleMid: string;
  titleHighlight: string;
  cta: LinkItem;
};
