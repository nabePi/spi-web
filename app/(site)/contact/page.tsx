import Breadcrumb from "@/components/shared/Breadcrumb";
import GetInTouchSection from "@/components/pages/inner/contact/GetInTouchSection";
import MapSection from "@/components/pages/inner/contact/MapSection";
import { contactBreadcrumbContent } from "@/content/inner/contact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kontak",
  description:
    "Hubungi Sekretariat Pusat Sekolah Pemikiran Islam di Bogor, atau kontak cabang di Jakarta, Bandung, Yogyakarta, Tangerang, dan Padang.",
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
