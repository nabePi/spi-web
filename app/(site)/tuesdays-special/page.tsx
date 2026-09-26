import BreadcrumbTwo from "@/components/shared/BreadcrumbTwo";
import CourseDetailsSection from "@/components/pages/inner/course-details-classic-v1/CourseDetailsSection";
import { tuesdaysSpecialContent } from "@/content/inner/tuesdays-special";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tuesday's Special",
  description:
    "Tuesday's Special: kajian isu aktual dan fenomena kekinian dari sudut pandang The Worldview of Islam.",
  path: "/tuesdays-special",
});

const Page = () => {
  return (
    <>
      <BreadcrumbTwo
        title="Tuesday's Special"
        titleClassName="v2"
        items={[
          { label: "Beranda", href: "/" },
          { label: "Program", href: "/courses-v1" },
          { label: "Tuesday's Special" },
        ]}
        category="Tuesday's Special"
        instructor="Dr. Akmal Sjafril"
      />
      <CourseDetailsSection content={tuesdaysSpecialContent} />
    </>
  );
};

export default Page;
