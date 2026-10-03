import Breadcrumb from "@/components/shared/Breadcrumb";
import EventCard from "@/components/pages/inner/events/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/lib/getEvents";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Agenda Kegiatan & Daurah",
  description:
    "Jadwal seminar, webinar pemikiran Islam, daurah tematik, kuliah umum, dan pelatihan intensif Sekolah Pemikiran Islam (SPI).",
  path: "/events",
});

export const revalidate = 60; // Revalidate every minute

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents({ limit: 20 }),
    getPastEvents({ limit: 20 }),
  ]);

  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Beranda", href: "/" },
    { label: "Agenda & Kegiatan" },
  ];

  return (
    <>
      <Breadcrumb
        title="Agenda Kegiatan & Daurah"
        items={breadcrumbItems}
      />

      <div className="section-padding py-5">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="badge bg-light text-primary border px-3 py-2 fw-medium mb-3">
              Informasi & Jadwal Acara
            </span>
            <h2 className="section-title fw-bold" style={{ fontSize: "36px", color: "var(--primary)" }}>
              Agenda Terkini SPI
            </h2>
            <p className="text-muted" style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
              Ikuti berbagai forum ilmiah, diskusi kritis, dan pendalaman pemikiran Islam yang diselenggarakan baik secara daring maupun tatap muka.
            </p>
          </div>

          {/* 1. Upcoming Events */}
          <div className="mb-5 pb-4">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <div>
                <h3 className="h4 fw-bold text-primary mb-1">
                  📅 Kegiatan Mendatang
                </h3>
                <p className="text-muted small mb-0">
                  Pendaftaran dibuka untuk kegiatan yang akan segera berlangsung
                </p>
              </div>
              <span className="badge bg-primary rounded-pill px-3 py-2">
                {upcoming.totalDocs} Kegiatan
              </span>
            </div>

            {upcoming.docs.length > 0 ? (
              <div className="row g-4">
                {upcoming.docs.map((event) => (
                  <div key={event.id} className="col-12 col-xl-6">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-5 text-center border-dashed bg-light">
                <p className="fs-1 mb-2">🗓️</p>
                <h4 className="fw-semibold text-dark">Belum Ada Agenda Mendatang</h4>
                <p className="text-muted mb-0 small">
                  Saat ini belum ada jadwal kegiatan baru yang dipublikasikan. Silakan pantau terus kanal informasi kami.
                </p>
              </div>
            )}
          </div>

          {/* 2. Past Events Archive */}
          <div className="mt-5 pt-3">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <div>
                <h3 className="h4 fw-bold text-secondary mb-1">
                  📚 Arsip Kegiatan Terlaksana
                </h3>
                <p className="text-muted small mb-0">
                  Daftar rekaman kajian, daurah, dan kuliah umum yang telah selesai
                </p>
              </div>
              <span className="badge bg-secondary rounded-pill px-3 py-2">
                {past.totalDocs} Arsip
              </span>
            </div>

            {past.docs.length > 0 ? (
              <div className="row g-4">
                {past.docs.map((event) => (
                  <div key={event.id} className="col-12 col-xl-6">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-4 text-center border bg-light">
                <p className="text-muted mb-0 small">Belum ada arsip kegiatan lampau.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
