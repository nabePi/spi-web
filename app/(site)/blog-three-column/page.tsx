import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogGridSection from "@/components/pages/inner/blog-three-column/BlogGridSection";
import { blogThreeColumnBreadcrumbContent } from "@/content/inner/blog-three-column";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Berita & Artikel",
  description:
    "Berita kegiatan dan artikel pemikiran dari Sekolah Pemikiran Islam — adab, tradisi ilmu, dan tantangan pemikiran kontemporer.",
  path: "/blog-three-column",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title={blogThreeColumnBreadcrumbContent.title}
        items={blogThreeColumnBreadcrumbContent.items}
      />
      <BlogGridSection />
    </>
  );
};

export default Page;
