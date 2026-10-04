import Link from "next/link";
import { photoThumbUrl } from "@/lib/googlePhotosAlbum";
import type { GalleryAlbumDoc } from "@/lib/getGallery";

const DEFAULT_COVER = "/assets/imgs/inner/blog/spi-adab-blocks.webp";

export default function AlbumCard({ album }: { album: GalleryAlbumDoc }) {
  const href = `/galeri/${album.slug}`;
  const cover = album.coverUrl ? photoThumbUrl(album.coverUrl, 820, 480) : DEFAULT_COVER;
  const date = album.albumDate
    ? new Date(album.albumDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="col-lg-4 col-md-6">
      <div className="blog2__card h-100">
        <div className="blog2__thumb">
          {album.photoCount ? (
            <Link href={href} className="blog2__category">
              {album.photoCount} Foto
            </Link>
          ) : null}
          <Link href={href}>
            {/* External Google Photos URL: plain <img> (next/image optimization is off site-wide). */}
            <img
              src={cover}
              alt={album.title}
              width={820}
              height={480}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{ width: "100%", height: "auto", aspectRatio: "820 / 480", objectFit: "cover" }}
            />
          </Link>
        </div>
        <div className="blog2__content">
          {date && (
            <div className="blog2__meta">
              <span className="date">{date}</span>
            </div>
          )}
          <div className="blog2__title">
            <Link href={href}>{album.title}</Link>
          </div>
          {album.description && (
            <p
              className="text-muted small mt-2 mb-0"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {album.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
