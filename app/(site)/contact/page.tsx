import Breadcrumb from "@/components/shared/Breadcrumb";
import GetInTouchSection from "@/components/pages/inner/contact/GetInTouchSection";
import MapSection from "@/components/pages/inner/contact/MapSection";
import { contactBreadcrumbContent } from "@/content/inner/contact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kontak",
  description:
    "Hubungi Sekretariat Pusat Sekolah Pemikiran Islam di Jagakarsa, Jakarta Selatan, atau kontak cabang di Bandung, Yogyakarta, Bogor, Tangerang, dan Padang.",
  path: "/contact",
});

const Page = () => {
  return (
    <>
      <Breadcrumb
        title={contactBreadcrumbContent.title}
        items={contactBreadcrumbContent.items}
      />
      <GetInTouchSection />
      <MapSection />
    </>
  );
};

export default Page;
