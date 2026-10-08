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
    header: "/assets/imgs/logo/logo-spi/logo-color-horizontal-small.png",
    footer: "/assets/imgs/logo/logo-spi/logo-icon-color.png",
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
              <h2 className="title">Assalamu’alaykum!</h2>
              <p className="text">
                Mari mengenal Islam lebih mendalam melalui kajian pemikiran, sejarah, dan peradaban secara terstruktur. 
              </p>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Information</h2>
              <div className="contact-meta">
                <div className="contact-item">
                  <span className="text">
                    <a
                      href="https://wa.me/6281285574547"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +62 812-8557-4547
                    </a>
                  </span>
                </div>
                
                <div className="contact-item">
                  <span className="text">
                    <a href="mailto:markaz.spi@gmail.com">markaz.spi@gmail.com</a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="text">Jagakarsa, Jakarta Selatan 12630, DKI Jakarta</span>
                </div>
              </div>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Connect Us On</h2>
              <div className="social-links">
                <a
                  href="https://www.facebook.com/Sekolah.Pemikiran.Islam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FB
                </a>
                <a
                  href="https://www.instagram.com/spi.indonesia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IG
                </a>
                <a
                  href="https://www.youtube.com/@SekolahPemikiranIslam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YT
                </a>
                <a
                  href="https://www.threads.com/@spi.indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  T
                </a>
                <a
                  href="https://x.com/MarkazSPI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>
            </div>
            <div className="offset-logo-footer side-info__item d-none">
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
