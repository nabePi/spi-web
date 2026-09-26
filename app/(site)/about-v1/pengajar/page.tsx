import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import PengajarSection from "@/components/pages/inner/about-v1/PengajarSection";
import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pengajar",
  description:
    "Pengajar, peneliti, dan praktisi Sekolah Pemikiran Islam dengan latar belakang keilmuan di berbagai bidang, dari pemikiran Islam hingga isu-isu kontemporer.",
  path: "/about-v1/pengajar",
});

const Page = () => {
  return (
    <>
      <BreadcrumbSection content={aboutV1PengajarContent.breadcrumb} />
      <PengajarSection />
    </>
  );
};

export default Page;
