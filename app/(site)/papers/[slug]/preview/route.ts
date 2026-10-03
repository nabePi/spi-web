import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPaperBySlug } from "@/lib/getPapers";

// Always evaluated per request: access depends on headers and the session.
export const dynamic = "force-dynamic";

const EMBED_DESTINATIONS = new Set(["iframe", "embed", "object"]);

const forbidden = () =>
  new NextResponse("Forbidden", {
    status: 403,
    headers: { "Cache-Control": "private, no-store" },
  });

/**
 * Gated PDF stream. Only reachable from the preview <iframe> on the paper page:
 * direct navigation (pasting the URL) and cross-site embedding are rejected.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const dest = request.headers.get("sec-fetch-dest");
  const site = request.headers.get("sec-fetch-site");
  if (!dest || !EMBED_DESTINATIONS.has(dest) || site !== "same-origin") {
    return forbidden();
  }

  const { slug } = await params;

  // Admins may preview drafts; everyone else only sees published papers.
  let isAdmin = false;
  try {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: request.headers });
    isAdmin = Boolean(user);
  } catch {
    isAdmin = false;
  }

  const paper = await getPaperBySlug(slug, { includeDraft: isAdmin });
  if (!paper?.filename) {
    return new NextResponse("Not Found", { status: 404 });
  }

  let file: Buffer;
  try {
    // basename() guards against path traversal through the stored filename.
    file = await readFile(
      path.join(process.cwd(), "papers", path.basename(paper.filename)),
    );
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Content-Length": String(file.length),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
