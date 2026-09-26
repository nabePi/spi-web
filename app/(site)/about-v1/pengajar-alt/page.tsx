import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import PengajarTeamSection from "@/components/pages/inner/about-v1/PengajarTeamSection";
import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import { createMetadata } from "@/lib/metadata";

// Alternative layout for /about-v1/pengajar, for side-by-side comparison —
// same content, styled after the /alumni card grid (photo-slot card) instead
// of the compact initials-circle grid. Not linked from navigation.
export const metadata = createMetadata({
  title: "Pengajar (Alternatif)",
  description:
    "Pengajar, peneliti, dan praktisi Sekolah Pemikiran Islam dengan latar belakang keilmuan di berbagai bidang, dari pemikiran Islam hingga isu-isu kontemporer.",
  path: "/about-v1/pengajar-alt",
});

const Page = () => {
  return (
    <>
      <BreadcrumbSection content={aboutV1PengajarContent.breadcrumb} />
      <PengajarTeamSection />
    </>
  );
};

export default Page;
