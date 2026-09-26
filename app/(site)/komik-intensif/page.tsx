import BreadcrumbTwo from "@/components/shared/BreadcrumbTwo";
import CourseDetailsSection from "@/components/pages/inner/course-details-classic-v1/CourseDetailsSection";
import { komikIntensifContent } from "@/content/inner/komik-intensif";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "KOMIK Intensif",
  description:
    "KOMIK Intensif (Kelas Online Pemikiran Islam Intensif): kajian pemikiran Islam secara daring, sistematis, dan terstruktur.",
  path: "/komik-intensif",
});

const Page = () => {
  return (
    <>
      <BreadcrumbTwo
        title="KOMIK Intensif"
        titleClassName="v2"
        items={[
          { label: "Beranda", href: "/" },
          { label: "Program", href: "/courses-v1" },
          { label: "KOMIK Intensif" },
        ]}
        category="KOMIK Intensif (Kelas Online Pemikiran Islam Intensif)"
        instructor="Dr. Akmal Sjafril"
      />
      <CourseDetailsSection content={komikIntensifContent} />
    </>
  );
};

export default Page;
