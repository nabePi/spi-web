import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import AboutSection from "@/components/pages/inner/about-v1/AboutSection";
import WcuSection from "@/components/pages/inner/about-v1/WcuSection";
import TeamSection from "@/components/pages/inner/about-v1/TeamSection";
import TestimonialSection from "@/components/pages/inner/about-v1/TestimonialSection";
import ClientSection from "@/components/pages/inner/about-v1/ClientSection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tentang Kami",
  description:
    "Sekolah Pemikiran Islam adalah lembaga pendidikan nonformal yang menghadirkan kajian tematik berbasis pemikiran Islam, sejarah, dan peradaban.",
  path: "/about-v1",
});

const Page = () => {
  return (
    <>
      <BreadcrumbSection />
      <AboutSection />
      {/* <WcuSection /> */}
      {/* <TeamSection /> */}
      {/* <TestimonialSection /> */}
      {/* <ClientSection /> */}
    </>
  );
};

export default Page;
