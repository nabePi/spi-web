import SiteChrome from "@/components/layout/SiteChrome";

/**
 * Base layout for the SPI site.
 *
 * Chrome variants are inherited from the InstituteFlow `e-learning` demo,
 * chosen as the design base — see PRD §21.1 / Appendix C.
 */
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteChrome
      headerVariant="area2"
      headerCta={{
        kind: "theme-btn",
        // TODO(route): points at the homepage until /pendaftaran exists — PRD R1
        href: "/",
        label: "Daftar Sekarang",
        modifierClass: "button-bg-secondary",
      }}
    >
      {children}
    </SiteChrome>
  );
}
