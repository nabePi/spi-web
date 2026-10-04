import type { Where } from "payload";
import type { AlbumPhoto } from "@/lib/googlePhotosAlbum";

export interface GalleryAlbumDoc {
  id: number;
  title: string;
  slug: string;
  shareUrl: string;
  description?: string | null;
  albumDate?: string | null;
  coverUrl?: string | null;
  syncStatus: "pending" | "ok" | "failed";
  photoCount?: number | null;
  photos?: AlbumPhoto[] | null;
  status: "draft" | "published";
  meta?: { title?: string | null; description?: string | null } | null;
}

export interface GalleryQueryResult {
  docs: GalleryAlbumDoc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

async function getPayloadClient() {
  const { getPayload } = await import("payload");
  const config = (await import("@payload-config")).default;
  return getPayload({ config });
}

const publishedOnly: Where = { status: { equals: "published" } };

/**
 * Fetch published albums, newest first. The (potentially large) photo list is
 * only needed on the detail page, so it is omitted here.
 */
export async function getPublishedAlbums({
  page = 1,
  limit = 12,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<GalleryQueryResult> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "gallery-albums",
      where: publishedOnly,
      limit,
      page,
      sort: ["-albumDate", "-createdAt"],
      depth: 0,
      select: {
        title: true,
        slug: true,
        shareUrl: true,
        description: true,
        albumDate: true,
        coverUrl: true,
        photoCount: true,
        syncStatus: true,
        status: true,
      },
    });

    return {
      docs: res.docs as unknown as GalleryAlbumDoc[],
      totalDocs: res.totalDocs,
      limit: res.limit,
      totalPages: res.totalPages,
      page: res.page ?? 1,
      hasPrevPage: res.hasPrevPage,
      hasNextPage: res.hasNextPage,
    };
  } catch (error) {
    console.error("Error in getPublishedAlbums:", error);
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 1,
      page,
      hasPrevPage: false,
      hasNextPage: false,
    };
  }
}

/**
 * Fetch a single published album (with photos) by slug
 */
export async function getAlbumBySlug(slug: string): Promise<GalleryAlbumDoc | null> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "gallery-albums",
      where: { and: [{ slug: { equals: slug } }, publishedOnly] },
      limit: 1,
      depth: 0,
    });

    return (res.docs[0] as unknown as GalleryAlbumDoc) ?? null;
  } catch (error) {
    console.error(`Error in getAlbumBySlug(${slug}):`, error);
    return null;
  }
}

/**
 * Get all published album slugs for sitemap generation
 */
export async function getAllAlbumSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "gallery-albums",
      where: publishedOnly,
      limit: 500,
      depth: 0,
      select: { slug: true },
    });

    return res.docs.map((doc) => doc.slug).filter(Boolean) as string[];
  } catch (error) {
    console.error("Error in getAllAlbumSlugs:", error);
    return [];
  }
}
