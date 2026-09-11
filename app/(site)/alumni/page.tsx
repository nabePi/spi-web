import Breadcrumb from "@/components/shared/Breadcrumb";
import TeamSection from "@/components/pages/inner/instructor-v1/TeamSection";
import InstructorSection from "@/components/pages/inner/instructor-v1/InstructorSection";
import TestimonialSection from "@/components/pages/inner/instructor-v1/TestimonialSection";
import { instructorV1BreadcrumbContent } from "@/content/inner/instructor-v1";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kisah Alumni",
  description:
    "Alumni Sekolah Pemikiran Islam kembali ke komunitasnya untuk mentransmisikan ilmu, menjadi pelopor intelektual, dan berkontribusi pada riset dan publikasi.",
  path: "/alumni",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title={instructorV1BreadcrumbContent.title}
        items={instructorV1BreadcrumbContent.items}
      />
      <TeamSection />
      <InstructorSection />
      {/* <TestimonialSection /> */}
    </>
  );
};

export default Page;
