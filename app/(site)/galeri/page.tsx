import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import AlbumCard from "@/components/pages/inner/galeri/AlbumCard";
import { getPublishedAlbums } from "@/lib/getGallery";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Galeri Kegiatan",
  description:
    "Dokumentasi foto kegiatan Sekolah Pemikiran Islam (SPI): kelas, daurah, kuliah umum, dan acara cabang.",
  path: "/galeri",
});

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GaleriPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const pageNum = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page);
  const page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

  const result = await getPublishedAlbums({ page, limit: 12 });
  const pageHref = (p: number) => (p > 1 ? `/galeri?page=${p}` : "/galeri");

  return (
    <>
      <Breadcrumb
        title="Galeri Kegiatan"
        items={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]}
      />

      <div className="blog-grid section-padding">
        <div className="container">
          {result.docs.length > 0 ? (
            <div className="row gx-35 gy-60">
              {result.docs.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <div className="card p-5 text-center bg-light">
              <p className="fs-1 mb-2">📷</p>
              <h4 className="fw-semibold">Belum Ada Album</h4>
              <p className="text-muted mb-0 small">Album dokumentasi kegiatan akan segera hadir.</p>
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
