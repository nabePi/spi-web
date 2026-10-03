import Image from "next/image";
import Link from "next/link";
import type { EventDoc } from "@/lib/getEvents";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import EventCountdown from "./EventCountdown";
import defaultAuthorThumb from "@/public/assets/imgs/placeholder/blog-user2_1.svg";

interface EventDetailsSectionProps {
  event: EventDoc;
}

const formatLabels: Record<string, string> = {
  webinar: "Webinar Online",
  offline: "Kegiatan Tatap Muka (Offline)",
  daurah: "Daurah Pemikiran Islam",
  workshop: "Workshop & Pelatihan",
  "kuliah-umum": "Kuliah Umum Terbuka",
};

export default function EventDetailsSection({ event }: EventDetailsSectionProps) {
  const heroSrc = event.featuredImage?.url || "/assets/imgs/inner/event-details/event-details-thumb-1.webp";
  const heroAlt = event.featuredImage?.alt || event.title;

  const speakerName = event.speaker?.name || event.speakerCustom || "Asatidzah & Peneliti SPI";
  const speakerRole = event.speaker?.designation || "Narasumber SPI";
  const speakerBio =
    event.speaker?.bio ||
    "Pakar dan pengajar Sekolah Pemikiran Islam yang berdedikasi mengkaji tradisi keilmuan dan tantangan pemikiran kontemporer.";
  const speakerPhoto = event.speaker?.photo?.url || defaultAuthorThumb;

  const startDateFormatted = new Date(event.startDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDateFormatted = event.endDate
    ? new Date(event.endDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const priceText = event.isFree
    ? "Gratis"
    : event.price
      ? `Rp ${event.price.toLocaleString("id-ID")}`
      : "Infaq";

  const ctaUrl = event.externalCta?.url && event.externalCta.url !== "#"
    ? event.externalCta.url
    : null;
  const ctaLabel = event.externalCta?.label || "Daftar Sekarang";

  return (
    <section className="event-details section-padding">
      <div className="container">
        <div className="event-details__wrapper">
          {/* Main Content Area (Left) */}
          <div className="event-details__content">
            {/* Featured Poster Banner */}
            <div className="content-thumb">
              <Image
                src={heroSrc}
                alt={heroAlt}
                width={1200}
                height={700}
                priority
                style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>

            {/* Badges Bar */}
            <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
              <span className="badge rounded-pill bg-light text-dark border px-3 py-2 fw-medium">
                {formatLabels[event.eventType] || event.eventType}
              </span>
              <span className={`badge rounded-pill px-3 py-2 fw-medium ${event.isFree ? "bg-success text-white" : "bg-warning text-dark"}`}>
                {priceText}
              </span>
              <span className={`badge rounded-pill px-3 py-2 fw-medium ${event.status === "completed" ? "bg-secondary text-white" : "bg-primary text-white"}`}>
                {event.status === "completed" ? "Kegiatan Telah Selesai" : "Pendaftaran Dibuka"}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="content-title" style={{ fontSize: "32px", lineHeight: "1.25" }}>
              {event.title}
            </h1>

            {/* Summary Lead */}
            <div className="alert alert-light border p-4 my-4" style={{ borderLeft: "4px solid var(--secondary) !important" }}>
              <p className="mb-0 fw-medium text-dark" style={{ fontSize: "17px", lineHeight: "1.6" }}>
                {event.summary}
              </p>
            </div>

            {/* Rich Text Rundown / Description */}
            {event.description ? (
              <div className="content-text mt-4">
                <RichText data={event.description as unknown as SerializedEditorState} />
              </div>
            ) : null}

            {/* Venue & Location Details Box */}
            <div className="content-location card p-4 border rounded my-5">
              <h4 className="fw-bold mb-3 text-primary">📍 Lokasi & Akses Acara</h4>
              <p className="mb-2">
                <strong>Platform / Tempat:</strong> {event.locationName}
              </p>
              {event.locationAddress && (
                <p className="mb-0 text-muted">
                  <strong>Alamat:</strong> {event.locationAddress}
                </p>
              )}
            </div>

            {/* Speaker Spotlight Card */}
            <div className="card p-4 border rounded mb-5">
              <h4 className="fw-bold mb-3 text-primary">🎙️ Profil Narasumber</h4>
              <div className="d-flex align-items-start gap-3">
                <Image
                  src={speakerPhoto}
                  alt={speakerName}
                  width={80}
                  height={80}
                  className="rounded-circle object-fit-cover border"
                  style={{ width: "80px", height: "80px", flexShrink: 0 }}
                />
                <div>
                  <h5 className="mb-1 fw-bold text-dark">{speakerName}</h5>
                  <p className="text-secondary mb-2 small fw-medium">{speakerRole}</p>
                  <p className="text-muted mb-0 small">{speakerBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets (Right) */}
          <div className="event-details__sidebar d-flex flex-column gap-4">
            {/* Real-time Countdown Timer */}
            <div className="event-widget">
              <EventCountdown targetDate={event.startDate} isCompleted={event.status === "completed"} />
            </div>

            {/* Pricing & Registration Widget */}
            <div className="event-widget event-widget__ticket">
              <h4 className="widget-title">Informasi Pendaftaran</h4>
              <div className="ticket-pricing mb-4">
                <div className="pricing-item">
                  <span className="label">Biaya Masuk</span>
                  <span className="value">{priceText}</span>
                </div>
                <div className="pricing-item text-end">
                  <span className="label">Format</span>
                  <span className="value" style={{ fontSize: "20px" }}>{event.locationType.toUpperCase()}</span>
                </div>
              </div>

              {event.priceNote && (
                <div className="p-3 bg-light rounded border mb-4">
                  <span className="small text-muted d-block">ℹ️ <strong>Ketentuan:</strong> {event.priceNote}</span>
                </div>
              )}

              {/* Action Button */}
              {ctaUrl ? (
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-btn btn-primary w-100 text-center py-3 fw-bold rounded shadow-sm d-block"
                  style={{ textDecoration: "none" }}
                >
                  {ctaLabel} <i className="fa-solid fa-arrow-up-right-from-square ms-2" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="theme-btn btn-secondary w-100 text-center py-3 fw-bold rounded d-block"
                >
                  {event.status === "completed" ? "Pendaftaran Telah Ditutup" : "Pendaftaran Segera Dibuka"}
                </button>
              )}
            </div>

            {/* Event Summary Checklist */}
            <div className="event-widget event-widget__calander">
              <h4 className="widget-title">Jadwal Singkat</h4>
              <div className="calander-items">
                <div className="calander-item">
                  <span className="fs-5 me-2">📅</span>
                  <div>
                    <span className="d-block small text-muted">Tanggal Mulai</span>
                    <strong className="calander-label">{startDateFormatted}</strong>
                  </div>
                </div>

                {endDateFormatted && (
                  <div className="calander-item">
                    <span className="fs-5 me-2">📆</span>
                    <div>
                      <span className="d-block small text-muted">Tanggal Selesai</span>
                      <strong className="calander-label">{endDateFormatted}</strong>
                    </div>
                  </div>
                )}

                <div className="calander-item">
                  <span className="fs-5 me-2">⏰</span>
                  <div>
                    <span className="d-block small text-muted">Waktu</span>
                    <strong className="calander-label">{event.timeLabel || "09:00 - 12:00 WIB"}</strong>
                  </div>
                </div>

                <div className="calander-item">
                  <span className="fs-5 me-2">📍</span>
                  <div>
                    <span className="d-block small text-muted">Tempat / Ruang</span>
                    <strong className="calander-label">{event.locationName}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Events Button */}
            <div className="text-center mt-2">
              <Link href="/events" className="text-muted small text-decoration-none">
                ← Kembali ke Semua Agenda Kegiatan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
