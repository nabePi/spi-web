import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { Header } from "@/components/layout/Header";
import type { HeaderCta, HeaderVariant } from "@/components/layout/Header";
import Footer1 from "@/components/layout/Footer1";
import { getSiteSettings } from "@/lib/getSiteSettings";

export type { HeaderVariant, HeaderCta };

type SiteChromeProps = {
  children: ReactNode;
  headerVariant?: HeaderVariant;
  headerCta?: HeaderCta;
  headerLogoSrc?: StaticImageData;
  headerShowTop?: boolean;
};

const SiteChrome = async ({
  children,
  headerVariant = "area2",
  headerCta,
  headerLogoSrc,
  headerShowTop = true,
}: SiteChromeProps) => {
  const settings = await getSiteSettings();

  return (
    <>
      <Header
        variant={headerVariant}
        cta={headerCta}
        logoSrc={headerLogoSrc}
        showHeaderTop={headerShowTop}
        settings={settings}
      />
      <div className="has-smooth" id="has_smooth" suppressHydrationWarning />
      <div id="smooth-wrapper" suppressHydrationWarning>
        <div id="smooth-content" suppressHydrationWarning>
          <main suppressHydrationWarning>{children}</main>
          <Footer1 settings={settings} />
        </div>
      </div>
    </>
  );
};

export default SiteChrome;
