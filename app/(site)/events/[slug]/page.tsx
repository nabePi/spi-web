import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import EventDetailsSection from "@/components/pages/inner/events/EventDetailsSection";
import { getEventBySlug } from "@/lib/getEvents";
import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return createMetadata({
      title: "Kegiatan Tidak Ditemukan",
      description: "Informasi kegiatan yang Anda cari tidak ditemukan di Sekolah Pemikiran Islam.",
      path: `/events/${slug}`,
    });
  }

  const metaTitle = event.meta?.title || event.title;
  const metaDesc = event.meta?.description || event.summary;

  return createMetadata({
    title: metaTitle,
    description: metaDesc,
    path: `/events/${event.slug}`,
  });
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Beranda", href: "/" },
    { label: "Agenda & Kegiatan", href: "/events" },
    { label: event.title },
  ];

  return (
    <>
      <Breadcrumb
        title={event.title}
        items={breadcrumbItems}
      />
      <EventDetailsSection event={event} />
    </>
  );
}
