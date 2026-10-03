import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { PAPER_TYPE_LABELS, type PaperDoc } from "@/lib/getPapers";

export default function PaperDetailsSection({ paper }: { paper: PaperDoc }) {
  const typeLabel = PAPER_TYPE_LABELS[paper.paperType] ?? paper.paperType;
  const hasPdf = Boolean(paper.filename);

  return (
    <div className="blog-details-area section-padding">
      <div className="container">
        <div className="blog-details__wrap">
          <div className="blog-details blog-details--ful-width">
            <div className="blog-details__content">
              {/* Meta row */}
              <div className="blog-details__meta mb-30">
                <div className="author">
                  <span>{paper.author}</span>
                </div>
                {paper.year && <span className="date">{paper.year}</span>}
                <span
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "rgba(0, 101, 181, 0.08)",
                    color: "var(--primary)",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {typeLabel}
                </span>
                {paper.category && (
                  <Link
                    href={`/papers?category=${paper.category.slug}`}
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {paper.category.name}
                  </Link>
                )}
                {paper.pageCount ? (
                  <span className="read-time">{paper.pageCount} halaman</span>
                ) : null}
              </div>

              <h1 className="blog-details__title mb-25" style={{ fontSize: "32px", lineHeight: "1.3" }}>
                {paper.title}
              </h1>

              {/* Abstract */}
              <div
                className="blog-details__lead mb-30"
                style={{
                  fontFamily: "var(--font_dm)",
                  fontSize: "17px",
                  lineHeight: "1.6",
                  color: "var(--primary)",
                  borderLeft: "3px solid var(--secondary)",
                  paddingLeft: "18px",
                }}
              >
                <strong className="d-block mb-1" style={{ fontSize: "14px" }}>
                  Abstrak
                </strong>
                <p className="mb-0">{paper.abstract}</p>
              </div>

              {/* Admin explanation */}
              {paper.explanation && (
                <div className="blog-details__text blog-details__rich-text mb-50">
                  <h2 className="h4 mb-3">Tentang Karya Ini</h2>
                  <RichText data={paper.explanation as unknown as SerializedEditorState} />
                </div>
              )}

              {/* Inline PDF preview (no download link) */}
              {hasPdf && (
                <div className="mb-50">
                  <h2 className="h4 mb-3">Pratinjau Dokumen</h2>
                  <iframe
                    src={`/papers/${paper.slug}/preview#toolbar=0&navpanes=0`}
                    title={`Pratinjau PDF: ${paper.title}`}
                    style={{
                      width: "100%",
                      height: "80vh",
                      minHeight: "480px",
                      border: "1px solid var(--border, #e5e5e5)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              {paper.externalUrl && (
                <p className="mb-50">
                  <a href={paper.externalUrl} target="_blank" rel="noopener noreferrer">
                    Lihat sumber asli (DOI / jurnal) ↗
                  </a>
                </p>
              )}

              <div className="blog-details__bottom">
                <div className="tags">
                  {paper.tags?.map((tag) => (
                    <Link href={`/papers?tag=${tag.slug}`} key={tag.id}>
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
