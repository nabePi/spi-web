import BreadcrumbTwo from "@/components/shared/BreadcrumbTwo";
import CourseDetailsSection from "@/components/pages/inner/course-details-classic-v1/CourseDetailsSection";
import RelatedCoursesSection from "@/components/pages/inner/course-details-classic-v1/RelatedCoursesSection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kelas Reguler",
  description:
    "Kajian pemikiran Islam dua semester: sekitar tujuh bulan, dua puluh sesi, sekali pertemuan setiap pekan — dan gratis.",
  path: "/course-details-classic-v1",
});

const Page = () => {
  return (
    <>
      <BreadcrumbTwo
        title="Kelas Reguler"
        titleClassName="v2"
        items={[
          { label: "Beranda", href: "/" },
          { label: "Program", href: "/courses-v1" },
          { label: "Kelas Reguler" },
        ]}
        category="Kelas Reguler"
        instructor="Dr. Akmal Sjafril"
        reviewsCount={0}
      />
      <CourseDetailsSection />
      <RelatedCoursesSection />
    </>
  );
};

export default Page;
