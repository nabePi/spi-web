import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogDetailsSection from "@/components/pages/inner/blog-details-standard/BlogDetailsSection";
import RelatedBlogSection from "@/components/pages/inner/blog-details-standard/RelatedBlogSection";
import { blogDetailsStandardBreadcrumbContent } from "@/content/inner/blog-details-standard";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Konsep Adab",
  description:
    "Adab adalah meletakkan sesuatu pada tempatnya. Mengapa hilangnya adab menjadi akar kebingungan umat, dan bagaimana SPI menjawabnya.",
  path: "/blog-details-standard",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title={blogDetailsStandardBreadcrumbContent.title}
        items={blogDetailsStandardBreadcrumbContent.items}
      />
      <BlogDetailsSection />
      <RelatedBlogSection />
    </>
  );
};

export default Page;
