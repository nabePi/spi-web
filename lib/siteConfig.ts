export const siteConfig = {
  name: "InstituteFlow",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  title: "InstituteFlow - Education & Online Course NextJS Template",
  description:
    "InstituteFlow - Education & Online Course NextJS Template for schools, coaching and e-learning sites. Browse courses, instructors, events and inner pages.",
  ogImage: "/assets/imgs/home1/hero/hero-bg1_1.webp",
  locale: "en_US",
  contact: {
    email: "info@instituteflow.com",
    phone: "+1 415 123 4567",
    address: "740 Park Avenue, New York, NY 10021, USA",
  },
  social: {
    facebook: "https://facebook.com/",
    x: "https://x.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
