import type {
  CourseCardData,
  ELearningAppContent,
  ELearningBlogContent,
  ELearningBrandContent,
  ELearningCategoryContent,
  ELearningCoursesContent,
  ELearningFeatureStatsContent,
  ELearningHeroContent,
  ELearningHowItWorkContent,
  ELearningInstagramContent,
  ELearningPackagesContent,
  ELearningTeamContent,
  ELearningTestimonialContent,
  ELearningVideoContent,
} from "@/types/demos/e-learning/home";
import home2heroheroBg21 from "@/public/assets/imgs/home2/hero/hero-bg2_1.webp";
import home2heroheroThumb21 from "@/public/assets/imgs/placeholder/hero-thumb2_1.svg";
import home2heroheroThumbUser21 from "@/public/assets/imgs/placeholder/hero-thumb-user2_1.svg";
import home2heroheroThumbUser22 from "@/public/assets/imgs/placeholder/hero-thumb-user2_2.svg";
import home2heroheroThumbUser23 from "@/public/assets/imgs/placeholder/hero-thumb-user2_3.svg";
import home2heroheroThumbPattern21 from "@/public/assets/imgs/home2/hero/hero-thumb-pattern2_1.webp";
import home2coursestopCoursesThumb11 from "@/public/assets/imgs/placeholder/top-courses-thumb1_1.svg";
import home2coursestopCoursesThumb12 from "@/public/assets/imgs/placeholder/top-courses-thumb1_2.svg";
import home2coursestopCoursesThumb13 from "@/public/assets/imgs/placeholder/top-courses-thumb1_3.svg";
import home2coursestopCoursesThumb14 from "@/public/assets/imgs/placeholder/top-courses-thumb1_4.svg";
import home2videovideoThumb from "@/public/assets/imgs/placeholder/video-thumb.svg";
import home2coursescourses1Bg from "@/public/assets/imgs/home2/courses/courses1-bg.webp";
import home2coursescoursesThumb11 from "@/public/assets/imgs/placeholder/courses-thumb1_1.svg";
import home2coursescoursesThumb12 from "@/public/assets/imgs/placeholder/courses-thumb1_2.svg";
import home2coursescoursesThumb13 from "@/public/assets/imgs/placeholder/courses-thumb1_3.svg";
import home2wpwpThumb11 from "@/public/assets/imgs/placeholder/wp-thumb1_1.svg";
import home2wpwpThumb12 from "@/public/assets/imgs/placeholder/wp-thumb1_2.svg";
import home2wpwpThumb13 from "@/public/assets/imgs/placeholder/wp-thumb1_3.svg";
import home2wpwpThumb14 from "@/public/assets/imgs/placeholder/wp-thumb1_4.svg";
import home2teamteamThumb21 from "@/public/assets/imgs/placeholder/team-thumb2_1.svg";
import home2teamteamThumb22 from "@/public/assets/imgs/placeholder/team-thumb2_2.svg";
import home2teamteamThumb23 from "@/public/assets/imgs/placeholder/team-thumb2_3.svg";
import home2teamteamThumb24 from "@/public/assets/imgs/placeholder/team-thumb2_4.svg";
import home2testimonialtestimonialThumb21 from "@/public/assets/imgs/placeholder/testimonial-thumb2_1.svg";
import home2testimonialtestimonialThumbUser21 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_1.svg";
import home2testimonialtestimonialThumbUser22 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_2.svg";
import home2testimonialtestimonialThumbUser23 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_3.svg";
import home2testimonialtestimonialThumbUser24 from "@/public/assets/imgs/placeholder/testimonial-thumb-user2_4.svg";
import home2testimonialtestimonialThumb22 from "@/public/assets/imgs/placeholder/testimonial-thumb2_2.svg";
import home2app2appBgThumb11 from "@/public/assets/imgs/home2/app2/app-bg-thumb1_1.webp";
import home2app2appThumb11 from "@/public/assets/imgs/placeholder/app-thumb1_1.svg";
import home2app2appThumbShape11 from "@/public/assets/imgs/home2/app2/app-thumb-shape1_1.webp";
import home2blogblogThumb21 from "@/public/assets/imgs/placeholder/blog-thumb2_1.svg";
import home2blogblogUser21 from "@/public/assets/imgs/placeholder/blog-user2_1.svg";
import home2blogblogThumb22 from "@/public/assets/imgs/placeholder/blog-thumb2_2.svg";
import home2blogblogUser22 from "@/public/assets/imgs/placeholder/blog-user2_2.svg";
import home2blogblogThumb23 from "@/public/assets/imgs/placeholder/blog-thumb2_3.svg";
import home2blogblogUser23 from "@/public/assets/imgs/placeholder/blog-user2_3.svg";
import home2instagraminstagramThumb21 from "@/public/assets/imgs/placeholder/instagram-thumb2_1.svg";
import home2instagraminstagramThumb22 from "@/public/assets/imgs/placeholder/instagram-thumb2_2.svg";
import home2instagraminstagramThumb23 from "@/public/assets/imgs/placeholder/instagram-thumb2_3.svg";
import home2instagraminstagramThumb24 from "@/public/assets/imgs/placeholder/instagram-thumb2_4.svg";
import home2instagraminstagramThumb25 from "@/public/assets/imgs/placeholder/instagram-thumb2_5.svg";
import home2instagraminstagramThumb26 from "@/public/assets/imgs/placeholder/instagram-thumb2_6.svg";

export const eLearningHeroContent: ELearningHeroContent = {
  badgePrefix: "Lorem",
  badgeText: "Ipsum dolor sit",
  titleBefore: "Amet consectetur adipiscing elit sed\u00a0",
  titleHighlight: "Do",
  text: "Eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco.",
  primaryCta: { label: "Laboris nisi", href: "/courses-v1" },
  secondaryCta: { label: "Aliquip ex", href: "/courses-v2" },
  features: [
    { label: "Ea commodo" },
    { label: "Consequat duis" },
    { label: "Aute" },
  ],
  bg: { src: home2heroheroBg21, alt: "placeholder" },
  thumb: { src: home2heroheroThumb21, alt: "placeholder" },
  users: [
    { src: home2heroheroThumbUser21, alt: "placeholder" },
    { src: home2heroheroThumbUser22, alt: "placeholder" },
    { src: home2heroheroThumbUser23, alt: "placeholder" },
  ],
  rating: "4.9/5",
  learnersText: "Irure in reprehenderit",
  pattern: {
    src: home2heroheroThumbPattern21,
    alt: "placeholder",
  },
};

export const eLearningFeatureStatsContent: ELearningFeatureStatsContent = {
  items: [
    { id: "courses", title: "Voluptate", text: "Velit esse", delay: "0.1" },
    { id: "flexible", title: "Cillum eu", text: "Fugiat nulla", delay: "0.2" },
    { id: "learners", title: "Pariatur", text: "Excepteur sint", delay: "0.3" },
    { id: "membership", title: "Occaecat", text: "Cupidatat", delay: "0.4" },
  ],
};

export const eLearningCategoryContent: ELearningCategoryContent = {
  subtitle: "Non proident",
  title: "Sunt culpa",
  desc: "Qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit.",
  cta: { label: "Amet consectetur adipiscing", href: "/courses-v2" },
  items: [
    { id: "programming", name: "Elit", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "designing", name: "Sed", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "ai", name: "Do eiusmod", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "academic", name: "Tempor", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "language", name: "Incididunt", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "marketing", name: "Ut", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "business", name: "Labore", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "data-science", name: "Et dolore", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
    { id: "health", name: "Magna", learners: "50,148,521 Learners", href: "/course-details-classic-v2" },
  ],
};

const courses: CourseCardData[] = [
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb11,
    title: "Aliqua enim ad",
    author: "Minim veniam",
    rating: "4/5",
    ratingValue: 4,
    lessons: "12 Lessones",
    students: "80 Students",
    price: "$29.00",
    oldPrice: "$56.00",
    offer: "Quis nostrud",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb12,
    title: "Exercitation ullamco laboris",
    author: "Nisi aliquip",
    rating: "3/5",
    ratingValue: 3,
    lessons: "12 Lessones",
    students: "16 Students",
    price: "$56.00",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb13,
    title: "Ex ea commodo",
    author: "Consequat duis",
    rating: "4.5/5",
    ratingValue: 4.5,
    lessons: "12 Lessons",
    students: "36 Students",
    price: "$56.00",
  },
  {
    href: "/course-details-classic-v1",
    thumb: home2coursestopCoursesThumb14,
    title: "Aute irure in reprehenderit voluptate",
    author: "Velit esse",
    rating: "5/5",
    ratingValue: 5,
    lessons: "12 Lessons",
    students: "40 Students",
    price: "$49.00",
    oldPrice: "$99.00",
    offer: "Cillum eu",
  },
];

export const eLearningCoursesContent: ELearningCoursesContent = {
  subtitle: "Fugiat nulla",
  titleBefore: "Pariatur excepteur sint occaecat cupidatat",
  titleHighlight: "Non",
  cta: { label: "Proident sunt culpa", href: "/courses-v2" },
  items: courses,
};

export const eLearningVideoContent: ELearningVideoContent = {
  left: [
    { kind: "odometer", value: "500", suffix: "k+", label: "Qui officia" },
    { kind: "odometer", value: "100", suffix: "+", label: "Deserunt mollit" },
  ],
  right: [
    { kind: "rating", rating: "4.8", ratingMax: "5", label: "Anim id" },
    { kind: "odometer", value: "50", suffix: "+", label: "Est laborum" },
  ],
  thumb: { src: home2videovideoThumb, alt: "placeholder" },
  videoHref: "https://www.youtube.com/watch?v=7e90gBu4pas",
};

export const eLearningPackagesContent: ELearningPackagesContent = {
  bg: { src: home2coursescourses1Bg, alt: "placeholder" },
  subtitle: "Lorem ipsum",
  titleBefore: "Dolor sit",
  titleHighlight: "Amet",
  titleAfter: "Consectetur adipiscing elit",
  cta: { label: "Sed do eiusmod", href: "/courses-v2" },
  items: [
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb11, alt: "placeholder" },
      rating: "4.9/5",
      author: "Tempor incididunt",
      title: "Ut labore et",
      lessons: "5 Lessons",
      courses: "4 Courses",
      students: "20 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb12, alt: "placeholder" },
      offer: "Dolore magna",
      rating: "4.9/5",
      author: "Aliqua enim",
      title: "Ad minim veniam quis nostrud",
      lessons: "20 Lessons",
      courses: "8 Courses",
      students: "20 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
    {
      href: "/course-details-classic-v2",
      thumb: { src: home2coursescoursesThumb13, alt: "placeholder" },
      rating: "4.9/5",
      author: "Exercitation ullamco",
      title: "Laboris nisi aliquip",
      lessons: "12 Lessons",
      courses: "4 Courses",
      students: "80 Students",
      price: "$156.00",
      oldPrice: "$256.00",
    },
  ],
};

export const eLearningBrandContent: ELearningBrandContent = {
  subtitle: "Ex",
  titleBefore: "Ea commodo consequat",
  titleHighlight: "Duis",
};

export const eLearningHowItWorkContent: ELearningHowItWorkContent = {
  subtitle: "Aute irure in",
  titleBefore: "Reprehenderit voluptate",
  titleHighlight: "Velit",
  items: [
    {
      id: "choose",
      modifier: "how-it-work-2__item--purple",
      active: true,
      delay: "0.1",
      thumb: { src: home2wpwpThumb11, alt: "placeholder" },
      step: "Esse cillum",
      title: "Eu fugiat nulla",
      desc: "Pariatur excepteur sint occaecat cupidatat non proident sunt culpa.",
    },
    {
      id: "learn",
      modifier: "how-it-work-2__item--green",
      delay: "0.2",
      thumb: { src: home2wpwpThumb12, alt: "placeholder" },
      step: "Qui officia",
      title: "Deserunt mollit anim id",
      desc: "Est laborum lorem ipsum dolor sit amet.",
    },
    {
      id: "practice",
      modifier: "how-it-work-2__item--orange",
      delay: "0.3",
      thumb: { src: home2wpwpThumb13, alt: "placeholder" },
      step: "Consectetur adipiscing",
      title: "Elit sed do",
      desc: "Eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "certified",
      modifier: "how-it-work-2__item--indigo",
      delay: "0.4",
      thumb: { src: home2wpwpThumb14, alt: "placeholder" },
      step: "Enim ad",
      title: "Minim veniam",
      desc: "Quis nostrud exercitation ullamco laboris nisi aliquip ex.",
    },
  ],
};

export const eLearningTeamContent: ELearningTeamContent = {
  subtitle: "Ea",
  titleLine1: "Meet with world-class",
  titleLine2Before: "& dope",
  titleHighlight: "Commodo",
  cta: { label: "Consequat duis aute", href: "/instructor-v1" },
  members: [
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb21, alt: "placeholder" },
      name: "Irure in reprehenderit",
      role: "Voluptate velit esse",
      rating: "4.5",
      delay: "0.10",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb22, alt: "placeholder" },
      name: "Cillum eu fugiat",
      role: "Nulla pariatur",
      rating: "4.5",
      delay: "0.20",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb23, alt: "placeholder" },
      name: "Excepteur sint occaecat",
      role: "Cupidatat non",
      rating: "4.5",
      delay: "0.30",
    },
    {
      href: "/instructor-details",
      thumb: { src: home2teamteamThumb24, alt: "placeholder" },
      name: "Proident sunt culpa",
      role: "Qui officia",
      rating: "4.5",
      delay: "0.40",
    },
  ],
};

export const eLearningTestimonialContent: ELearningTestimonialContent = {
  subtitle: "Deserunt",
  titleLine1: "Our learners say honestly",
  titleLine2: "worldwide",
  titleHighlight: "Mollit",
  items: [
    {
      id: "emily",
      delay: "0.10",
      thumb: {
        src: home2testimonialtestimonialThumb21,
        alt: "placeholder",
      },
      quote:
        "“ Before joining this platform, I struggled to find structured and practical learning resources. The courses here are extremely well-organized, and the instructors explain. ”",
      author: {
        src: home2testimonialtestimonialThumbUser21,
        alt: "placeholder",
      },
      authorName: "Anim id est",
      designation: "Laborum lorem",
      rating: "4.9/5",
      statNumber: "50k+",
      statLabel: "Ipsum dolor",
      studentsLabel: "Sit amet consectetur",
      avatars: [
        { src: home2testimonialtestimonialThumbUser22, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser23, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser24, alt: "placeholder" },
      ],
    },
    {
      id: "eleanor",
      delay: "0.20",
      thumb: {
        src: home2testimonialtestimonialThumb22,
        alt: "placeholder",
      },
      quote:
        "“ I was looking for a flexible and reliable learning platform, and this exceeded my expectations. The variety of courses, clear learning paths, and practical assignments helped. ”",
      author: {
        src: home2testimonialtestimonialThumbUser24,
        alt: "placeholder",
      },
      authorName: "Adipiscing elit sed",
      designation: "Do eiusmod",
      rating: "4.9/5",
      statNumber: "95%",
      statLabel: "Tempor incididunt",
      studentsLabel: "Ut labore et",
      avatars: [
        { src: home2testimonialtestimonialThumbUser22, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser23, alt: "placeholder" },
        { src: home2testimonialtestimonialThumbUser24, alt: "placeholder" },
      ],
    },
  ],
};

export const eLearningAppContent: ELearningAppContent = {
  bg: home2app2appBgThumb11,
  subtitle: "Dolore magna aliqua",
  titleBefore: "Enim ad minim veniam quis nostrud",
  titleHighlight: "Exercitation",
  titleAfter: "Ullamco laboris nisi",
  thumb: { src: home2app2appThumb11, alt: "placeholder" },
  shape: { src: home2app2appThumbShape11, alt: "placeholder" },
};

export const eLearningBlogContent: ELearningBlogContent = {
  subtitle: "Aliquip ex ea",
  titleLine1: "Get the latest learning",
  titleLine2: "tips and",
  titleHighlight: "Commodo",
  cta: { label: "Consequat duis aute", href: "/blog-standard" },
  items: [
    {
      href: "/blog-details-rightsidebar",
      category: "Irure",
      thumb: { src: home2blogblogThumb21, alt: "placeholder" },
      author: { src: home2blogblogUser21, alt: "placeholder" },
      authorName: "In reprehenderit",
      date: "May 15, 2026",
      title: "Voluptate velit esse cillum eu fugiat nulla pariatur.",
      delay: "0.10",
    },
    {
      href: "/blog-details-rightsidebar",
      category: "Excepteur",
      thumb: { src: home2blogblogThumb22, alt: "placeholder" },
      author: { src: home2blogblogUser22, alt: "placeholder" },
      authorName: "Sint occaecat",
      date: "May 25, 2026",
      title: "Cupidatat non proident sunt culpa qui officia deserunt mollit anim.",
      delay: "0.20",
    },
    {
      href: "/blog-details-rightsidebar",
      category: "Id",
      thumb: { src: home2blogblogThumb23, alt: "placeholder" },
      author: { src: home2blogblogUser23, alt: "placeholder" },
      authorName: "Est laborum",
      date: "Jun 28, 2026",
      title: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.",
      delay: "0.30",
    },
  ],
};

export const eLearningInstagramContent: ELearningInstagramContent = {
  username: "Eiusmod",
  slides: [
    { src: home2instagraminstagramThumb21, alt: "placeholder" },
    { src: home2instagraminstagramThumb22, alt: "placeholder" },
    { src: home2instagraminstagramThumb23, alt: "placeholder" },
    { src: home2instagraminstagramThumb24, alt: "placeholder" },
    { src: home2instagraminstagramThumb25, alt: "placeholder" },
    { src: home2instagraminstagramThumb26, alt: "placeholder" },
    { src: home2instagraminstagramThumb21, alt: "placeholder" },
    { src: home2instagraminstagramThumb22, alt: "placeholder" },
    { src: home2instagraminstagramThumb23, alt: "placeholder" },
  ],
};
