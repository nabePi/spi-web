import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { Header } from "@/components/layout/Header";
import type { HeaderCta, HeaderVariant } from "@/components/layout/Header";
import Footer1 from "@/components/layout/Footer1";

export type { HeaderVariant, HeaderCta };

type SiteChromeProps = {
  children: ReactNode;
  headerVariant?: HeaderVariant;
  headerCta?: HeaderCta;
  headerLogoSrc?: StaticImageData;
  headerShowTop?: boolean;
};

const SiteChrome = ({
  children,
  headerVariant = "area2",
  headerCta,
  headerLogoSrc,
  headerShowTop = true,
}: SiteChromeProps) => {
  return (
    <>
      <Header
        variant={headerVariant}
        cta={headerCta}
        logoSrc={headerLogoSrc}
        showHeaderTop={headerShowTop}
      />
      <div className="has-smooth" id="has_smooth" suppressHydrationWarning />
      <div id="smooth-wrapper" suppressHydrationWarning>
        <div id="smooth-content" suppressHydrationWarning>
          <main suppressHydrationWarning>{children}</main>
          <Footer1 />
        </div>
      </div>
    </>
  );
};

export default SiteChrome;
