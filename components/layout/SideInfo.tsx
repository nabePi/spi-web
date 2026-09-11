"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import OffcanvasOverlay from "@/components/layout/OffcanvasOverlay";
import SideInfoClose from "@/components/layout/SideInfoClose";
import Link from "next/link";
import { closeSideInfo } from "@/lib/template/sideInfo";

function sideInfoLogos(pathname: string) {
  if (pathname.startsWith("/kindergarten")) {
    return {
      header: "/assets/imgs/logo/logo-blue2.svg",
      footer: "/assets/imgs/logo/logo-blue2.svg",
    };
  }
  if (pathname.startsWith("/language-school")) {
    return {
      header: "/assets/imgs/logo/logo-blue.svg",
      footer: "/assets/imgs/logo/logo-blue.svg",
    };
  }
  if (pathname.startsWith("/cooking-course")) {
    return {
      header: "/assets/imgs/logo/logo-orange.svg",
      footer: "/assets/imgs/logo/logo-blue2.svg",
    };
  }
  if (pathname.startsWith("/business-coach")) {
    return {
      header: "/assets/imgs/logo/logo-green.svg",
      footer: "/assets/imgs/logo/logo-blue2.svg",
    };
  }
  if (pathname.startsWith("/health-coaching")) {
    return {
      header: "/assets/imgs/logo/logo-tan.svg",
      footer: "/assets/imgs/logo/logo-tan.svg",
    };
  }
  return {
    header: "/assets/imgs/logo/logo.svg",
    footer: "/assets/imgs/logo/logo.svg",
  };
}

const SideInfo = () => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const logos = sideInfoLogos(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    closeSideInfo();
  }, [pathname]);

  return (
    <>
      <aside className="fix">
        <div className="side-info">
          <div className="side-info-content">
            <div className="offset-widget offset-header side-info__item">
              <div className="offset-logo">
                <Link href="/">
                  <img src={logos.header} alt="site logo" />
                </Link>
              </div>
              <SideInfoClose id="side-info-close" className="side-info-close">
                <span className="material-symbols-outlined">close</span>
              </SideInfoClose>
            </div>
            <div className="mobile-menu d-xl-none fix side-info__item" />
            <div className="offset-info-box side-info__item">
              <h2 className="title">Hello There!</h2>
              <p className="text">
                We offer comprehensive range of services to help your business
                thrive.
              </p>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Information</h2>
              <div className="contact-meta">
                <div className="contact-item">
                  <span className="text">
                    <a href="tel:+22306965119">+2230 6965 119</a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="text">
                    <a href="mailto:InstituteFlow@gmail.com">InstituteFlow@gmail.com</a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="text">Avenue de Roma 1588, Lisboa</span>
                </div>
              </div>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Connect Us On</h2>
              <div className="social-links">
                <a href="#">FB</a>
                <a href="#">LN</a>
                <a href="#">IN</a>
                <a href="#">BE</a>
              </div>
            </div>
            <div className="offset-logo-footer side-info__item">
              <img src={logos.footer} alt="image" />
            </div>
          </div>
        </div>
      </aside>
      <OffcanvasOverlay />
    </>
  );
};

export default SideInfo;
