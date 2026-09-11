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
    "Sekolah Pemikiran Islam berdiri pada 2014 untuk menghidupkan kembali tradisi ilmu. Visi, misi, dan konsep adab yang menjadi landasannya.",
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
