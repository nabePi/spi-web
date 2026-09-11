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

export type ContactBreadcrumbContent = {
  title: string;
  items: BreadcrumbItem[];
};

export type ContactInfoItem = {
  id: "email" | "hours-1" | "hours-2";
  iconClass: string;
  label: string;
  value: string;
  href?: string;
};

export type ContactFormField = {
  label: string;
  placeholder?: string;
  options?: string[];
};

export type ContactContent = {
  subtitle: string;
  titleBefore: string;
  titleMid: string;
  titleHighlight: string;
  info: ContactInfoItem[];
  form: {
    fullName: ContactFormField;
    lastName: ContactFormField;
    email: ContactFormField;
    phone: ContactFormField;
    subject: ContactFormField;
    message: ContactFormField;
    submit: string;
  };
};

export type ContactMapContent = {
  src: string;
};
