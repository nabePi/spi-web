import Link from "next/link";
import Image from "next/image";
import { eLearningTeamContent } from "@/content/demos/e-learning/home";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIconaaf8 from "@/icons/DotIconaaf8";
import { getPublishedChapters } from "@/lib/getChapters";

const TeamSection = async () => {
  const { subtitle, titleLine1, titleLine2Before, titleHighlight } = eLearningTeamContent;
  const chapters = await getPublishedChapters();

  return (
    <section className="team2 section-padding">
      <div className="container">
        <div className="section-top text-start">
          <div className="row d-flex align-items-end justify-content-between g-4">
            <div className="col-md-7 fade-anim">
              <span className="section-top__subtitle px-12">
                <DotIconaaf8 />
                {subtitle}
              </span>
              <h2 className="section-top__title word-anim">
                {titleLine1} <br />
                {titleLine2Before}
                <span>{titleHighlight}</span>
              </h2>
            </div>
            <div className="col-md-5 fade-anim" data-delay="0.30">
              <div className="section-top__btn text-md-end">
                <Link href="/cabang" className="theme-btn theme-btn--white">
                  <span className="text">Lihat Semua Cabang</span>
                  <span className="icon">
                    <ArrowOutwardIcon fill="#F2F5F8" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-20">
          {chapters.map((chapter, idx) => {
            const imageUrl = chapter.image?.url || "/assets/imgs/home/spi-cabang-jakarta.webp";
            const imageAlt = chapter.image?.alt || `${chapter.name} - ${chapter.city}`;
            const delay = (0.1 * (idx + 1)).toFixed(2);

            return (
              <div
                className="col-lg-4 col-md-6 fade-anim mb-4"
                data-delay={delay}
                key={chapter.slug}
              >
                <div
                  className="team2__card h-100"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div className="team2__top d-flex justify-content-between align-items-center p-3">
                    <span
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {chapter.city}
                    </span>
                    {chapter.phone && (
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        Aktif
                      </span>
                    )}
                  </div>

                  <div className="team2__thumb" style={{ position: "relative", height: "180px", width: "100%" }}>
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="team2__content p-4">
                    <h3 className="team2__name mb-1">
                      <Link href="/cabang" style={{ color: "#0f172a", fontWeight: 700 }}>
                        {chapter.name}
                      </Link>
                    </h3>
                    <p className="team2__title mb-2" style={{ color: "#d97706", fontSize: "0.85rem", fontWeight: 600 }}>
                      {chapter.venue || chapter.city}
                    </p>
                    {chapter.description && (
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#64748b",
                          lineHeight: 1.5,
                          marginBottom: "12px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {chapter.description}
                      </p>
                    )}
                    <Link
                      href="/cabang"
                      className="d-inline-flex align-items-center gap-1 mt-2"
                      style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb" }}
                    >
                      <span>Lihat Detail & Kontak</span>
                      <ArrowOutwardIcon fill="#2563eb" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
