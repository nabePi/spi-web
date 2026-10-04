/**
 * Google Photos shared-album adapter.
 *
 * Since 31 March 2025 the official Library API can no longer read albums an
 * app did not create, so existing albums are read from their public share page
 * ("anyone with the link"). This is unofficial and may break if Google changes
 * the page; every caller must treat a failure as non-fatal.
 *
 * Kept free of Payload/Next imports so it can be used from collection hooks,
 * scripts and tests alike.
 */

export interface AlbumPhoto {
  /** Base URL without a size suffix; append `=w800` etc. via `photoUrl()`. */
  url: string;
  width?: number;
  height?: number;
}

export interface AlbumSnapshot {
  title: string | null;
  coverUrl: string | null;
  photos: AlbumPhoto[];
}

const ALLOWED_SHARE_HOSTS = ["photos.app.goo.gl", "photos.google.com"];
const FETCH_TIMEOUT_MS = 15_000;
const MAX_PHOTOS = 500;

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** True for share links on Google's own hosts (also guards the server-side fetch). */
export function isGooglePhotosShareUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ALLOWED_SHARE_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}

/** Build a sized image URL from a stored base URL. */
export function photoUrl(base: string, width: number): string {
  return `${base}=w${width}`;
}

/** Cropped thumbnail of fixed aspect ratio. */
export function photoThumbUrl(base: string, width: number, height: number): string {
  return `${base}=w${width}-h${height}-c`;
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function metaContent(html: string, property: string): string | null {
  const re = new RegExp(
    `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const match = html.match(re);
  return match ? decodeHtml(match[1]) : null;
}

/** Strip the `=w…-h…` size suffix Google appends to image URLs. */
function toBaseUrl(url: string): string {
  return url.replace(/=[wsh]\d.*$/i, "");
}

/** Pure parser: share-page HTML -> album snapshot. Exported for testing. */
export function parseAlbumHtml(html: string): AlbumSnapshot {
  // Embedded JSON escapes "=" and "/"; undo that so URLs match a plain pattern.
  const normalized = html.replace(/\\u003d/g, "=").replace(/\\\//g, "/");

  const photos = new Map<string, AlbumPhoto>();
  const re =
    /\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[A-Za-z0-9_-]+)(?:=[^"]*)?",(\d+),(\d+)/g;
  for (const match of normalized.matchAll(re)) {
    if (photos.size >= MAX_PHOTOS) break;
    const [, url, width, height] = match;
    if (!photos.has(url)) {
      photos.set(url, { url, width: Number(width), height: Number(height) });
    }
  }

  const ogImage = metaContent(normalized, "og:image");
  const ogTitle = metaContent(normalized, "og:title");

  return {
    title: ogTitle,
    coverUrl: ogImage ? toBaseUrl(ogImage) : (photos.keys().next().value ?? null),
    photos: [...photos.values()],
  };
}

/** Fetch a public share link and extract the album's photos. Throws on failure. */
export async function fetchAlbum(shareUrl: string): Promise<AlbumSnapshot> {
  if (!isGooglePhotosShareUrl(shareUrl)) {
    throw new Error("Bukan tautan album Google Photos yang valid.");
  }

  const res = await fetch(shareUrl, {
    headers: { "User-Agent": USER_AGENT, "Accept-Language": "id,en;q=0.8" },
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Google Photos mengembalikan status ${res.status}.`);
  }
  if (!isGooglePhotosShareUrl(res.url)) {
    throw new Error("Tautan dialihkan ke luar Google Photos.");
  }

  const snapshot = parseAlbumHtml(await res.text());
  if (snapshot.photos.length === 0) {
    throw new Error(
      "Tidak ada foto yang terbaca. Pastikan album dibagikan ke 'siapa saja yang memiliki tautan'.",
    );
  }
  return snapshot;
}
