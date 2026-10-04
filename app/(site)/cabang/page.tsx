import BreadcrumbSection from "@/components/pages/inner/about-v1/BreadcrumbSection";
import ChapterCard from "@/components/pages/inner/cabang/ChapterCard";
import { getPublishedChapters } from "@/lib/getChapters";
import { createMetadata } from "@/lib/metadata";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import innerbreadcumbbreadcumbBgPattern2 from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern2.png";
import Link from "next/link";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";

export const metadata = createMetadata({
  title: "Cabang SPI — Enam Kota di Indonesia",
  description:
    "Sekolah Pemikiran Islam (SPI) hadir di 6 cabang di seluruh Indonesia: Jakarta, Bandung, Yogyakarta, Bogor, Tangerang, dan Padang. Temukan informasi lokasi, jadwal, dan kontak tiap cabang.",
  path: "/cabang",
});

export const revalidate = 60;

export default async function CabangPage() {
  const chapters = await getPublishedChapters();

  return (
    <>
      <BreadcrumbSection
        content={{
          bg: { src: innerbreadcumbbreadcumbBgPattern2, alt: "pattern" },
          title: "Cabang SPI",
          text: "Jaringan kajian dan perkuliahan tatap muka Sekolah Pemikiran Islam di enam kota.",
          items: [
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "/about-v1" },
            { label: "Cabang" },
          ],
        }}
      />

      <section className="section-padding" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-8 mx-auto text-center">
              <div className="section-top text-center mb-0">
                <span className="section-top__subtitle px-12">
                  <SectionBooksIcon />
                  Jaringan Wilayah
                </span>
                <h2 className="section-top__title">
                  Enam Cabang di Seluruh Indonesia
                </h2>
                <p className="mt-3 text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                  Sejak didirikan pada tahun 2014, Sekolah Pemikiran Islam (SPI) telah meluaskan jangkauan dakwah intelektual ke enam kota utama di Indonesia. Setiap cabang menyelenggarakan kelas reguler terstruktur, seminar, dan majelis kajian bersama pengajar muktabar.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>

          {/* Sekretariat Pusat info banner */}
          <div className="row mt-4">
            <div className="col-12">
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "30px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "8px", color: "#0f172a" }}>
                    Ingin Membuka Cabang atau Kerja Sama Program?
                  </h4>
                  <p style={{ margin: 0, color: "#64748b", maxWidth: "680px" }}>
                    Hubungi Sekretariat Pusat SPI di Jakarta Selatan untuk informasi pembukaan cabang baru, kemitraan lembaga dakwah kampus, atau penyelenggaraan kursus singkat di kota Anda.
                  </p>
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="theme-btn theme-btn--orange"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <span className="text">Hubungi Sekretariat</span>
                    <span className="icon">
                      <ArrowOutwardIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
