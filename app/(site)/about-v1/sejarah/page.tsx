import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import HeroSection from "@/components/pages/inner/about-v1/HeroSection";
import { aboutV1SejarahHeroContent } from "@/content/inner/about-v1";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sejarah",
  description:
    "Perjalanan Sekolah Pemikiran Islam sejak berdiri pada 2014 hingga hadir di 6 kota di Indonesia.",
  path: "/about-v1/sejarah",
});

const Page = () => {
  return (
    <>
      <BreadcrumbSection content={aboutV1SejarahHeroContent.breadcrumb} />
      <HeroSection content={aboutV1SejarahHeroContent} />
    </>
  );
};

export default Page;
