import Link from "next/link";
import Image from "next/image";
import type { EventDoc } from "@/lib/getEvents";

interface EventCardProps {
  event: EventDoc;
}

const formatLabels: Record<string, string> = {
  webinar: "Webinar",
  offline: "Offline",
  daurah: "Daurah",
  workshop: "Workshop",
  "kuliah-umum": "Kuliah Umum",
};

const locationBadges: Record<string, { label: string; bg: string }> = {
  online: { label: "Online", bg: "badge bg-info text-dark" },
  offline: { label: "Offline", bg: "badge bg-primary text-white" },
  hybrid: { label: "Hybrid", bg: "badge bg-success text-white" },
};

export default function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.startDate);
  const day = isNaN(dateObj.getTime()) ? "--" : dateObj.toLocaleDateString("id-ID", { day: "2-digit" });
  const month = isNaN(dateObj.getTime()) ? "--" : dateObj.toLocaleDateString("id-ID", { month: "short" });

  const formatText = formatLabels[event.eventType] || event.eventType;
  const locBadge = locationBadges[event.locationType] || { label: event.locationType, bg: "badge bg-secondary" };
  const speakerName = event.speaker?.name || event.speakerCustom || "Asatidzah SPI";

  const priceText = event.isFree
    ? "Gratis"
    : event.price
      ? `Rp ${event.price.toLocaleString("id-ID")}`
      : "Infaq";

  const imgUrl = event.featuredImage?.url || "/assets/imgs/inner/event-details/event-details-thumb-1.webp";
  const imgAlt = event.featuredImage?.alt || event.title;

  return (
    <div className="event1__card">
      <div className="event1__body">
        {/* Top Badges & Date */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="event1__date">
            <span className="event1__date-num">{day}</span>
            <span className="event1__date-month">{month}</span>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="badge rounded-pill bg-light text-dark border px-3 py-2 fw-medium">
              {formatText}
            </span>
            <span className={`${locBadge.bg} rounded-pill px-3 py-2 fw-medium`}>
              {locBadge.label}
            </span>
            <span className={`badge rounded-pill px-3 py-2 fw-medium ${event.isFree ? "bg-success text-white" : "bg-warning text-dark"}`}>
              {priceText}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="event1__title">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </h3>

        {/* Summary Excerpt */}
        <p className="event1__desc">{event.summary}</p>

        {/* Meta details */}
        <div className="event1__meta">
          <div className="event1__meta-item">
            <span>⏰ <strong>Waktu:</strong> {event.timeLabel || "09:00 - 12:00 WIB"}</span>
          </div>
          <div className="event1__meta-item">
            <span>📍 <strong>Tempat:</strong> {event.locationName}</span>
          </div>
          <div className="event1__meta-item">
            <span>🎙️ <strong>Narasumber:</strong> {speakerName}</span>
          </div>
          {event.priceNote && (
            <div className="event1__meta-item">
              <span className="text-muted small">ℹ️ {event.priceNote}</span>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="event1__footer mt-auto">
          <Link href={`/events/${event.slug}`} className="theme-btn btn-black-border">
            <span>Detail Acara</span>
            <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
          {event.status === "completed" && (
            <span className="badge bg-secondary ms-auto px-3 py-2">Arsip Selesai</span>
          )}
        </div>
      </div>

      {/* Thumbnail Flyer */}
      <div className="event1__thumb">
        <Link href={`/events/${event.slug}`}>
          <Image
            src={imgUrl}
            alt={imgAlt}
            width={400}
            height={480}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      </div>
    </div>
  );
}
