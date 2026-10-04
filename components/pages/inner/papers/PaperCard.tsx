import Link from "next/link";
import Image from "next/image";
import { PAPER_TYPE_LABELS, type PaperDoc } from "@/lib/getPapers";

const DEFAULT_COVER = "/assets/imgs/inner/blog/spi-adab-blocks.webp";

export default function PaperCard({ paper }: { paper: PaperDoc }) {
  const href = `/papers/${paper.slug}`;
  const typeLabel = PAPER_TYPE_LABELS[paper.paperType] ?? paper.paperType;

  return (
    <div className="col-lg-4 col-md-6">
      <div className="blog2__card h-100">
        <div className="blog2__thumb">
          <Link href={href} className="blog2__category">
            {paper.category?.name ?? typeLabel}
          </Link>
          <Link href={href}>
            <Image
              src={paper.coverImage?.url || DEFAULT_COVER}
              alt={paper.coverImage?.alt || paper.title}
              width={820}
              height={480}
            />
          </Link>
        </div>
        <div className="blog2__content">
          <div className="blog2__meta">
            <span className="author">
              <span>{paper.author}</span>
            </span>
            <span className="date">
              {[typeLabel, paper.year].filter(Boolean).join(" · ")}
            </span>
          </div>
          <div className="blog2__title">
            <Link href={href}>{paper.title}</Link>
          </div>
          <p
            className="text-muted small mt-2 mb-0"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {paper.abstract}
          </p>
        </div>
      </div>
    </div>
  );
}
