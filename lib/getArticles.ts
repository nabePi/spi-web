export interface ArticleDoc {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  publishedAt?: string | null;
  readTime?: string | null;
  excerpt: string;
  content?: Record<string, unknown> | null;
  featuredImage: {
    id: number;
    url?: string;
    alt?: string;
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  author: {
    id: number;
    name: string;
    designation?: string | null;
    bio?: string | null;
    photo?: {
      url?: string;
      alt?: string;
    } | null;
  } | null;
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface ArticlesQueryResult {
  docs: ArticleDoc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

/**
 * Fetch published articles with pagination and optional filtering
 */
export async function getPublishedArticles({
  page = 1,
  limit = 12,
  categorySlug,
  tagSlug,
}: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  tagSlug?: string;
} = {}): Promise<ArticlesQueryResult> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const where: Record<string, unknown> = {
      status: {
        equals: "published",
      },
    };

    if (categorySlug) {
      where["category.slug"] = {
        equals: categorySlug,
      };
    }

    if (tagSlug) {
      where["tags.slug"] = {
        equals: tagSlug,
      };
    }

    const res = await payload.find({
      collection: "articles",
      where,
      limit,
      page,
      sort: "-publishedAt",
      depth: 2,
    });

    return {
      docs: res.docs as unknown as ArticleDoc[],
      totalDocs: res.totalDocs,
      limit: res.limit,
      totalPages: res.totalPages,
      page: res.page ?? 1,
      hasPrevPage: res.hasPrevPage,
      hasNextPage: res.hasNextPage,
    };
  } catch (err) {
    console.warn("Failed to fetch articles from Payload, using empty list:", err);
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 1,
      page: 1,
      hasPrevPage: false,
      hasNextPage: false,
    };
  }
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDoc | null> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const res = await payload.find({
      collection: "articles",
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: "published",
        },
      },
      limit: 1,
      depth: 2,
    });

    if (res.docs.length > 0) {
      return res.docs[0] as unknown as ArticleDoc;
    }
    return null;
  } catch (err) {
    console.warn(`Failed to fetch article slug "${slug}":`, err);
    return null;
  }
}

/**
 * Fetch related articles in the same category
 */
export async function getRelatedArticles(
  currentArticleId: number,
  categoryId?: number,
  limit = 3
): Promise<ArticleDoc[]> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const where: Record<string, unknown> = {
      status: {
        equals: "published",
      },
      id: {
        not_equals: currentArticleId,
      },
    };

    if (categoryId) {
      where["category"] = {
        equals: categoryId,
      };
    }

    const res = await payload.find({
      collection: "articles",
      where,
      limit,
      sort: "-publishedAt",
      depth: 2,
    });

    return res.docs as unknown as ArticleDoc[];
  } catch (err) {
    console.warn("Failed to fetch related articles:", err);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const res = await payload.find({
      collection: "categories",
      limit: 100,
      sort: "name",
    });

    return res.docs;
  } catch (err) {
    console.warn("Failed to fetch categories:", err);
    return [];
  }
}
