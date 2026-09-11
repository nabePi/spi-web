import HeroSection from "@/components/pages/demos/e-learning/HeroSection";
import FeatureStatsSection from "@/components/pages/demos/e-learning/FeatureStatsSection";
import CategorySection from "@/components/pages/demos/e-learning/CategorySection";
import CoursesSection from "@/components/pages/demos/e-learning/CoursesSection";
import VideoSection from "@/components/pages/demos/e-learning/VideoSection";
import CoursesPackageSection from "@/components/pages/demos/e-learning/CoursesPackageSection";
import BrandSection from "@/components/pages/demos/e-learning/BrandSection";
import HowItWorkSection from "@/components/pages/demos/e-learning/HowItWorkSection";
import TeamSection from "@/components/pages/demos/e-learning/TeamSection";
import TestimonialSection from "@/components/pages/demos/e-learning/TestimonialSection";
import AppSection from "@/components/pages/demos/e-learning/AppSection";
import BlogSection from "@/components/pages/demos/e-learning/BlogSection";
import InstagramSection from "@/components/pages/demos/e-learning/InstagramSection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "E-Learning Hub",
  description: "A modern e-learning hub with featured courses, learning packages and a mobile app experience.",
  path: "/",
});

const Page = () => {
  return (
    <>
      <HeroSection />
      <FeatureStatsSection />
      <CategorySection />
      <CoursesSection />
      <VideoSection />
      <CoursesPackageSection />
      <BrandSection />
      <HowItWorkSection />
      <TeamSection />
      <TestimonialSection />
      <AppSection />
      <BlogSection />
      <InstagramSection />
    </>
  );
};

export default Page;
