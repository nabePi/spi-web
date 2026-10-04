import { photoThumbUrl, photoUrl, type AlbumPhoto } from "@/lib/googlePhotosAlbum";

interface AlbumPhotoGridProps {
  title: string;
  photos: AlbumPhoto[];
}

/** Thumbnail grid; `.image-popup` anchors are wired to Magnific Popup by pagePlugins. */
export default function AlbumPhotoGrid({ title, photos }: AlbumPhotoGridProps) {
  return (
    <div className="row g-3">
      {photos.map((photo, index) => (
        <div className="col-lg-3 col-md-4 col-6" key={photo.url}>
          <a
            href={photoUrl(photo.url, 2000)}
            className="image-popup d-block overflow-hidden rounded"
            aria-label={`${title} — foto ${index + 1}`}
          >
            <img
              src={photoThumbUrl(photo.url, 480, 480)}
              alt={`${title} — foto ${index + 1}`}
              width={480}
              height={480}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover" }}
            />
          </a>
        </div>
      ))}
    </div>
  );
}
