import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import AlbumPhotoGrid from "@/components/pages/inner/galeri/AlbumPhotoGrid";
import { getAlbumBySlug } from "@/lib/getGallery";
import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    return createMetadata({
      title: "Album Tidak Ditemukan",
      description: "Album yang Anda cari tidak ditemukan di Sekolah Pemikiran Islam.",
      path: `/galeri/${slug}`,
    });
  }

  return createMetadata({
    title: album.meta?.title || album.title,
    description: album.meta?.description || album.description || undefined,
    path: `/galeri/${album.slug}`,
  });
}

export default async function AlbumPage({ params }: PageProps) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  const photos = album.photos ?? [];
  const date = album.albumDate
    ? new Date(album.albumDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Breadcrumb
        title={album.title}
        items={[
          { label: "Beranda", href: "/" },
          { label: "Galeri", href: "/galeri" },
          { label: album.title },
        ]}
      />

      <div className="section-padding">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              {date && <p className="text-muted small mb-1">{date}</p>}
              {album.description && <p className="mb-0">{album.description}</p>}
            </div>
            <a
              href={album.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Buka di Google Photos
            </a>
          </div>

          {photos.length > 0 ? (
            <AlbumPhotoGrid title={album.title} photos={photos} />
          ) : (
            <div className="card p-5 text-center bg-light">
              <p className="fs-1 mb-2">📷</p>
              <h4 className="fw-semibold">Foto belum dapat ditampilkan</h4>
              <p className="text-muted mb-0 small">
                Lihat seluruh foto langsung di Google Photos melalui tombol di atas.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
