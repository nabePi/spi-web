import Image from "next/image";
import type { ChapterDoc } from "@/lib/getChapters";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";

interface ChapterCardProps {
  chapter: ChapterDoc;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  // Format WhatsApp clean link
  const waNumber = chapter.phone ? chapter.phone.replace(/[^0-9]/g, "") : null;
  const waUrl = waNumber ? `https://wa.me/${waNumber}` : null;

  // Format Instagram clean link
  const igHandle = chapter.instagram ? chapter.instagram.replace(/^@/, "").trim() : null;
  const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

  const imageUrl = chapter.image?.url || "/assets/imgs/home/spi-cabang-jakarta.webp";
  const imageAlt = chapter.image?.alt || `${chapter.name} - ${chapter.city}`;

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="card h-100 shadow-sm border-0"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              color: "#ffffff",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}
          >
            {chapter.city}
          </span>
        </div>

        <div className="card-body p-4 d-flex flex-column" style={{ flex: "1 1 auto" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "6px", color: "#1e293b" }}>
            {chapter.name}
          </h3>

          {chapter.venue && (
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#d97706",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {chapter.venue}
            </p>
          )}

          {chapter.description && (
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "16px", lineHeight: 1.6 }}>
              {chapter.description}
            </p>
          )}

          {chapter.address && (
            <div
              style={{
                fontSize: "0.85rem",
                color: "#475569",
                marginBottom: "20px",
                backgroundColor: "#f8fafc",
                padding: "10px 12px",
                borderRadius: "8px",
                borderLeft: "3px solid #cbd5e1",
              }}
            >
              {chapter.address}
            </div>
          )}

          <div className="mt-auto pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
              {chapter.contactPerson && (
                <span style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8" }}>
                  Narahubung: <strong style={{ color: "#334155" }}>{chapter.contactPerson}</strong>
                </span>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              {igUrl && (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-secondary"
                  style={{ borderRadius: "8px", fontSize: "0.8rem", padding: "4px 8px" }}
                  title={`Instagram ${chapter.instagram}`}
                >
                  Instagram
                </a>
              )}
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-success d-inline-flex align-items-center gap-1"
                  style={{ borderRadius: "8px", fontSize: "0.8rem", padding: "4px 10px", fontWeight: 600 }}
                >
                  <span>WhatsApp</span>
                  <ArrowOutwardIcon fill="#ffffff" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
