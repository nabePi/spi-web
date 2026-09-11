import Breadcrumb from "@/components/shared/Breadcrumb";
import CoursesClassicSection from "@/components/pages/inner/courses-v1/CoursesClassicSection";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Program",
  description:
    "Kelas Reguler, Kursus Singkat, dan Program Daring Sekolah Pemikiran Islam — sembilan topik kajian, seluruhnya gratis.",
  path: "/courses-v1",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title="Program"
        items={[{ label: "Beranda", href: "/" }, { label: "Program" }]}
      />
      <CoursesClassicSection />
    </>
  );
};

export default Page;
