import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogDetailsSection from "@/components/pages/inner/blog-details-standard/BlogDetailsSection";
import DynamicArticleDetailsSection from "@/components/pages/inner/blog-details-standard/DynamicArticleDetailsSection";
import RelatedBlogSection from "@/components/pages/inner/blog-details-standard/RelatedBlogSection";
import { blogDetailsStandardBreadcrumbContent } from "@/content/inner/blog-details-standard";
import { getPublishedArticles, getRelatedArticles } from "@/lib/getArticles";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Konsep Adab",
  description:
    "Adab adalah meletakkan sesuatu pada tempatnya. Mengapa hilangnya adab menjadi akar kebingungan umat, dan bagaimana SPI menjawabnya.",
  path: "/blog-details-standard",
});

const Page = async () => {
  const { docs } = await getPublishedArticles({ limit: 1 });
  const article = docs[0];

  if (article) {
    const relatedArticles = await getRelatedArticles(article.id, article.category?.id, 3);
    const breadcrumbItems: Array<{ label: string; href?: string }> = [
      { label: "Beranda", href: "/" },
      { label: "Blog", href: "/blog-three-column" },
    ];
    if (article.category) {
      breadcrumbItems.push({
        label: article.category.name,
        href: `/blog-three-column?category=${article.category.slug}`,
      });
    }
    breadcrumbItems.push({ label: article.title });

    return (
      <>
        <Breadcrumb title={article.title} items={breadcrumbItems} />
        <DynamicArticleDetailsSection article={article} />
        <RelatedBlogSection relatedArticles={relatedArticles} />
      </>
    );
  }

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
