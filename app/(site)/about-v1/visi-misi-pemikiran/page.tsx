import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import HeroSection from "@/components/pages/inner/about-v1/HeroSection";
import { aboutV1VisiMisiHeroContent } from "@/content/inner/about-v1";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Visi, Misi, & Pemikiran",
  description:
    "Arah dan tujuan yang menjadi landasan kajian Sekolah Pemikiran Islam.",
  path: "/about-v1/visi-misi-pemikiran",
});

const Page = () => {
  return (
    <>
      <BreadcrumbSection content={aboutV1VisiMisiHeroContent.breadcrumb} />
      <HeroSection content={aboutV1VisiMisiHeroContent} />
    </>
  );
};

export default Page;
