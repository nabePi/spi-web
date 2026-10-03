import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import DynamicArticleDetailsSection from "@/components/pages/inner/blog-details-standard/DynamicArticleDetailsSection";
import RelatedBlogSection from "@/components/pages/inner/blog-details-standard/RelatedBlogSection";
import { getArticleBySlug, getRelatedArticles } from "@/lib/getArticles";
import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return createMetadata({
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak dapat ditemukan di Sekolah Pemikiran Islam.",
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

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

  breadcrumbItems.push({
    label: article.title,
  });

  return (
    <>
      <Breadcrumb title={article.title} items={breadcrumbItems} />
      <DynamicArticleDetailsSection article={article} />
      <RelatedBlogSection relatedArticles={relatedArticles} />
    </>
  );
}
