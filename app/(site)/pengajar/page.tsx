import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import PengajarTeamSection from "@/components/pages/inner/about-v1/PengajarTeamSection";
import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import { getPublishedLecturers } from "@/lib/getLecturers";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pengajar & Dewan Peneliti",
  description:
    "Pengajar, peneliti, dan praktisi Sekolah Pemikiran Islam (SPI) dengan latar belakang keilmuan di berbagai bidang, dari pemikiran Islam hingga isu kontemporer.",
  path: "/pengajar",
});

export const revalidate = 60;

const Page = async () => {
  const lecturers = await getPublishedLecturers();

  return (
    <>
      <BreadcrumbSection
        content={{
          ...aboutV1PengajarContent.breadcrumb,
          title: "Pengajar & Dewan Peneliti",
          text: "Pengajar, peneliti, dan praktisi lintas bidang keilmuan Islam muktabar.",
          items: [
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "/about-v1" },
            { label: "Pengajar" },
          ],
        }}
      />
      <PengajarTeamSection lecturers={lecturers} />
    </>
  );
};

export default Page;
