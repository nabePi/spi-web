import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PaperDetailsSection from "@/components/pages/inner/papers/PaperDetailsSection";
import PaperCard from "@/components/pages/inner/papers/PaperCard";
import { getPaperBySlug, getRelatedPapers } from "@/lib/getPapers";
import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);

  if (!paper) {
    return createMetadata({
      title: "Karya Tulis Tidak Ditemukan",
      description: "Karya tulis yang Anda cari tidak ditemukan di Sekolah Pemikiran Islam.",
      path: `/papers/${slug}`,
    });
  }

  return createMetadata({
    title: paper.meta?.title || paper.title,
    description: paper.meta?.description || paper.abstract,
    path: `/papers/${paper.slug}`,
  });
}

export default async function PaperPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  const related = await getRelatedPapers(paper.id, paper.category?.id, 3);

  return (
    <>
      <Breadcrumb
        title={paper.title}
        items={[
          { label: "Beranda", href: "/" },
          { label: "Karya Tulis", href: "/papers" },
          { label: paper.title },
        ]}
      />
      <PaperDetailsSection paper={paper} />
      {related.length > 0 && (
        <div className="blog-grid section-padding pt-0">
          <div className="container">
            <h2 className="h4 mb-4">Karya Terkait</h2>
            <div className="row gx-35 gy-60">
              {related.map((p) => (
                <PaperCard key={p.id} paper={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
