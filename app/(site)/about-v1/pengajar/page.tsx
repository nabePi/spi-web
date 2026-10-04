import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import PengajarSection from "@/components/pages/inner/about-v1/PengajarSection";
import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import { getPublishedLecturers } from "@/lib/getLecturers";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pengajar",
  description:
    "Pengajar, peneliti, dan praktisi Sekolah Pemikiran Islam dengan latar belakang keilmuan di berbagai bidang, dari pemikiran Islam hingga isu-isu kontemporer.",
  path: "/about-v1/pengajar",
});

export const revalidate = 60;

const Page = async () => {
  const lecturers = await getPublishedLecturers();

  return (
    <>
      <BreadcrumbSection content={aboutV1PengajarContent.breadcrumb} />
      <PengajarSection lecturers={lecturers} />
    </>
  );
};

export default Page;
