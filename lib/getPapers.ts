import type { Where } from "payload";

export const PAPER_TYPE_LABELS: Record<string, string> = {
  jurnal: "Jurnal",
  "skripsi-tesis": "Skripsi / Tesis",
  makalah: "Makalah",
  "working-paper": "Working Paper",
  lainnya: "Lainnya",
};

export interface PaperDoc {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  publishedAt?: string | null;
  paperType: string;
  year?: number | null;
  author: string;
  abstract: string;
  explanation?: Record<string, unknown> | null;
  externalUrl?: string | null;
  pageCount?: number | null;
  /** Only present for server-side callers (never exposed to the public API). */
  filename?: string | null;
  coverImage: { id: number; url?: string; alt?: string } | null;
  category: { id: number; name: string; slug: string } | null;
  tags?: Array<{ id: number; name: string; slug: string }>;
  meta?: { title?: string | null; description?: string | null } | null;
}

export interface PapersQueryResult {
  docs: PaperDoc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface PapersFilters {
  page?: number;
  limit?: number;
  categorySlug?: string;
  tagSlug?: string;
  year?: number;
  paperType?: string;
  q?: string;
}

// Server-side reads opt in to seeing the file location (hidden from the public API).
const internalContext = { internal: true };

async function getPayloadClient() {
  const { getPayload } = await import("payload");
  const config = (await import("@payload-config")).default;
  return getPayload({ config });
}

const emptyResult = (limit: number): PapersQueryResult => ({
  docs: [],
  totalDocs: 0,
  limit,
  totalPages: 1,
  page: 1,
  hasPrevPage: false,
  hasNextPage: false,
});

/**
 * Fetch published papers with pagination, filters and free-text search
 */
export async function getPublishedPapers({
  page = 1,
  limit = 12,
  categorySlug,
  tagSlug,
  year,
  paperType,
  q,
}: PapersFilters = {}): Promise<PapersQueryResult> {
  try {
    const payload = await getPayloadClient();

    const where: Where = { status: { equals: "published" } };

    if (categorySlug) where["category.slug"] = { equals: categorySlug };
    if (tagSlug) where["tags.slug"] = { equals: tagSlug };
    if (year) where.year = { equals: year };
    if (paperType) where.paperType = { equals: paperType };
    if (q) {
      where.or = [
        { title: { like: q } },
        { author: { like: q } },
        { abstract: { like: q } },
      ];
    }

    const res = await payload.find({
      collection: "papers",
      where,
      limit,
      page,
      sort: "-publishedAt",
      depth: 2,
      context: internalContext,
    });

    return {
      docs: res.docs as unknown as PaperDoc[],
      totalDocs: res.totalDocs,
      limit: res.limit,
      totalPages: res.totalPages,
      page: res.page ?? 1,
      hasPrevPage: res.hasPrevPage,
      hasNextPage: res.hasNextPage,
    };
  } catch (err) {
    console.warn("Failed to fetch papers from Payload, using empty list:", err);
    return emptyResult(limit);
  }
}

/**
 * Fetch a single paper by slug. Drafts are returned only when `includeDraft` is set
 * (the caller is responsible for verifying the viewer is an admin).
 */
export async function getPaperBySlug(
  slug: string,
  { includeDraft = false }: { includeDraft?: boolean } = {},
): Promise<PaperDoc | null> {
  try {
    const payload = await getPayloadClient();

    const where: Where = { slug: { equals: slug } };
    if (!includeDraft) where.status = { equals: "published" };

    const res = await payload.find({
      collection: "papers",
      where,
      limit: 1,
      depth: 2,
      context: internalContext,
    });

    return (res.docs[0] as unknown as PaperDoc) ?? null;
  } catch (err) {
    console.warn(`Failed to fetch paper slug "${slug}":`, err);
    return null;
  }
}

/**
 * Fetch related papers, preferring the same category
 */
export async function getRelatedPapers(
  currentPaperId: number,
  categoryId?: number,
  limit = 3,
): Promise<PaperDoc[]> {
  try {
    const payload = await getPayloadClient();

    const where: Where = {
      status: { equals: "published" },
      id: { not_equals: currentPaperId },
    };
    if (categoryId) where.category = { equals: categoryId };

    const res = await payload.find({
      collection: "papers",
      where,
      limit,
      sort: "-publishedAt",
      depth: 2,
      context: internalContext,
    });

    return res.docs as unknown as PaperDoc[];
  } catch (err) {
    console.warn("Failed to fetch related papers:", err);
    return [];
  }
}

/**
 * Distinct publication years of published papers (newest first), for the filter bar
 */
export async function getPaperYears(): Promise<number[]> {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "papers",
      where: { status: { equals: "published" } },
      limit: 1000,
      depth: 0,
      select: { year: true },
      context: internalContext,
    });
    const years = new Set<number>();
    for (const d of res.docs as unknown as Array<{ year?: number | null }>) {
      if (d.year) years.add(d.year);
    }
    return [...years].sort((a, b) => b - a);
  } catch (err) {
    console.warn("Failed to fetch paper years:", err);
    return [];
  }
}
