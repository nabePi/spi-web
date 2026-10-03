import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PaperCard from "@/components/pages/inner/papers/PaperCard";
import PapersFilterBar from "@/components/pages/inner/papers/PapersFilterBar";
import { getPaperYears, getPublishedPapers, PAPER_TYPE_LABELS } from "@/lib/getPapers";
import { getCategories } from "@/lib/getArticles";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Karya Tulis",
  description:
    "Perpustakaan karya ilmiah Sekolah Pemikiran Islam (SPI): jurnal, skripsi/tesis, makalah, dan working paper dengan pratinjau PDF.",
  path: "/papers",
});

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function PapersPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const yearNum = Number(first(sp.year));
  const pageNum = Number(first(sp.page));
  const type = first(sp.type);

  const filters = {
    q: first(sp.q)?.trim() || undefined,
    categorySlug: first(sp.category),
    tagSlug: first(sp.tag),
    year: Number.isInteger(yearNum) && yearNum > 0 ? yearNum : undefined,
    paperType: type && type in PAPER_TYPE_LABELS ? type : undefined,
  };
  const page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

  const [result, categories, years] = await Promise.all([
    getPublishedPapers({ ...filters, page, limit: 12 }),
    getCategories(),
    getPaperYears(),
  ]);

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.categorySlug) params.set("category", filters.categorySlug);
    if (filters.tagSlug) params.set("tag", filters.tagSlug);
    if (filters.year) params.set("year", String(filters.year));
    if (filters.paperType) params.set("type", filters.paperType);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/papers?${qs}` : "/papers";
  };

  return (
    <>
      <Breadcrumb
        title="Karya Tulis"
        items={[{ label: "Beranda", href: "/" }, { label: "Karya Tulis" }]}
      />

      <div className="blog-grid section-padding">
        <div className="container">
          <PapersFilterBar
            categories={categories.map((c) => ({ slug: String(c.slug), name: String(c.name) }))}
            years={years}
            current={filters}
          />

          {result.docs.length > 0 ? (
            <div className="row gx-35 gy-60">
              {result.docs.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="card p-5 text-center bg-light">
              <p className="fs-1 mb-2">📄</p>
              <h4 className="fw-semibold">Belum Ada Karya Tulis</h4>
              <p className="text-muted mb-0 small">
                Tidak ada karya yang cocok dengan pencarian ini, atau belum ada karya yang dipublikasikan.
              </p>
            </div>
          )}

          {result.totalPages > 1 && (
            <nav className="d-flex justify-content-center gap-3 align-items-center mt-5" aria-label="Paginasi">
              {result.hasPrevPage && (
                <Link href={pageHref(result.page - 1)} className="btn btn-light border">
                  ← Sebelumnya
                </Link>
              )}
              <span className="small text-muted">
                Halaman {result.page} dari {result.totalPages}
              </span>
              {result.hasNextPage && (
                <Link href={pageHref(result.page + 1)} className="btn btn-light border">
                  Berikutnya →
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
