import SiteChrome from "@/components/layout/SiteChrome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteChrome
      headerVariant="area2"
      headerCta={{
        kind: "theme-btn",
        href: "/courses-v1",
        label: "Enroll now",
        modifierClass: "button-bg-secondary",
      }}
    >
      {children}
    </SiteChrome>
  );
}
