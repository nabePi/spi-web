import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogStandardSection from "@/components/pages/inner/blog-standard/BlogStandardSection";
import { blogStandardBreadcrumbContent } from "@/content/inner/blog-standard";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Berita & Artikel",
  description:
    "Berita kegiatan dan artikel pemikiran dari Sekolah Pemikiran Islam — adab, tradisi ilmu, dan tantangan pemikiran kontemporer.",
  path: "/blog-standard",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title={blogStandardBreadcrumbContent.title}
        items={blogStandardBreadcrumbContent.items}
      />
      <BlogStandardSection />
    </>
  );
};

export default Page;
