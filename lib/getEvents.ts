import type { Where } from "payload";

export interface EventDoc {
  id: number;
  title: string;
  slug: string;
  eventType: "webinar" | "offline" | "daurah" | "workshop" | "kuliah-umum";
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
  endDate?: string | null;
  timeLabel?: string | null;
  locationType: "online" | "offline" | "hybrid";
  locationName: string;
  locationAddress?: string | null;
  featuredImage?: {
    id: number;
    url?: string;
    alt?: string;
  } | null;
  speaker?: {
    id: number;
    name: string;
    designation?: string | null;
    bio?: string | null;
    photo?: {
      url?: string;
      alt?: string;
    } | null;
  } | null;
  speakerCustom?: string | null;
  summary: string;
  description?: Record<string, unknown> | null;
  isFree?: boolean;
  price?: number | null;
  priceNote?: string | null;
  externalCta?: {
    label?: string;
    url?: string;
  } | null;
  meta?: {
    title?: string;
    description?: string;
  } | null;
}

export interface EventsQueryResult {
  docs: EventDoc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

/**
 * Fetch upcoming or ongoing events sorted chronologically (ascending by startDate)
 */
export async function getUpcomingEvents({
  limit = 10,
  eventType,
}: {
  limit?: number;
  eventType?: string;
} = {}): Promise<EventsQueryResult> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const where: Where = {
      status: {
        in: ["upcoming", "ongoing"],
      },
    };

    if (eventType) {
      where.eventType = {
        equals: eventType,
      };
    }

    const res = await payload.find({
      collection: "events",
      where,
      limit,
      sort: "startDate",
      depth: 2,
    });

    return {
      docs: res.docs as unknown as EventDoc[],
      totalDocs: res.totalDocs,
      limit: res.limit,
      totalPages: res.totalPages,
      page: res.page ?? 1,
      hasPrevPage: res.hasPrevPage,
      hasNextPage: res.hasNextPage,
    };
  } catch (error) {
    console.error("Error in getUpcomingEvents:", error);
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
 * Fetch past/archived events sorted reverse-chronologically (descending by startDate)
 */
export async function getPastEvents({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<EventsQueryResult> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const where: Where = {
      status: {
        equals: "completed",
      },
    };

    const res = await payload.find({
      collection: "events",
      where,
      limit,
      page,
      sort: "-startDate",
      depth: 2,
    });

    return {
      docs: res.docs as unknown as EventDoc[],
      totalDocs: res.totalDocs,
      limit: res.limit,
      totalPages: res.totalPages,
      page: res.page ?? 1,
      hasPrevPage: res.hasPrevPage,
      hasNextPage: res.hasNextPage,
    };
  } catch (error) {
    console.error("Error in getPastEvents:", error);
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
 * Fetch a single event by unique slug
 */
export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const res = await payload.find({
      collection: "events",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
    });

    if (!res.docs || res.docs.length === 0) {
      return null;
    }

    return res.docs[0] as unknown as EventDoc;
  } catch (error) {
    console.error(`Error in getEventBySlug(${slug}):`, error);
    return null;
  }
}

/**
 * Get all event slugs for static paths or sitemap generation
 */
export async function getAllEventSlugs(): Promise<string[]> {
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });

    const res = await payload.find({
      collection: "events",
      limit: 100,
      depth: 0,
    });

    return res.docs.map((doc) => doc.slug).filter(Boolean) as string[];
  } catch (error) {
    console.error("Error in getAllEventSlugs:", error);
    return [];
  }
}
