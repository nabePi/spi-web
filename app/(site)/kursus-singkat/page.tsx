import BreadcrumbTwo from "@/components/shared/BreadcrumbTwo";
import CourseDetailsSection from "@/components/pages/inner/course-details-classic-v1/CourseDetailsSection";
import { kursusSingkatContent } from "@/content/inner/kursus-singkat";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kursus Singkat",
  description:
    "Program Kursus Singkat Reguler SPI: dua semester pembelajaran, dari fondasi pemikiran Islam hingga tantangan pemikiran kontemporer.",
  path: "/kursus-singkat",
});

const Page = () => {
  return (
    <>
      <BreadcrumbTwo
        title="Kursus Singkat"
        titleClassName="v2"
        items={[
          { label: "Beranda", href: "/" },
          { label: "Program", href: "/courses-v1" },
          { label: "Kursus Singkat" },
        ]}
        category="Kursus Singkat"
        instructor="Dr. Akmal Sjafril"
      />
      <CourseDetailsSection content={kursusSingkatContent} />
    </>
  );
};

export default Page;
