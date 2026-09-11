"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import OffcanvasOverlay from "@/components/layout/OffcanvasOverlay";
import SideInfoClose from "@/components/layout/SideInfoClose";
import Link from "next/link";
import { closeSideInfo } from "@/lib/template/sideInfo";
import { siteConfig } from "@/lib/siteConfig";

// TODO(brand): replace with the SPI logo — PRD W-T5
const LOGO_SRC = "/assets/imgs/logo/logo.svg";

const socialLinks = [
  { label: "IG", href: siteConfig.social.instagram, title: "Instagram" },
  { label: "FB", href: siteConfig.social.facebook, title: "Facebook" },
  { label: "X", href: siteConfig.social.x, title: "Twitter/X" },
  { label: "MD", href: siteConfig.social.medium, title: "Medium" },
];

/**
 * Off-canvas panel. Also hosts the MeanMenu mount point
 * (`.mobile-menu`), so this component carries the mobile navigation —
 * it cannot be removed while MeanMenu is the mobile menu (PRD G2/G11).
 */
const SideInfo = () => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

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
                  <img src={LOGO_SRC} alt={siteConfig.name} />
                </Link>
              </div>
              <SideInfoClose id="side-info-close" className="side-info-close">
                <span className="material-symbols-outlined">close</span>
              </SideInfoClose>
            </div>
            {/* MeanMenu injects the mobile navigation here — do not remove */}
            <div className="mobile-menu d-xl-none fix side-info__item" />
            <div className="offset-info-box side-info__item">
              <h2 className="title">{siteConfig.shortName}</h2>
              <p className="text">
                Kajian pemikiran Islam yang terencana dan terukur — gratis,
                terbuka untuk umum.
              </p>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Informasi</h2>
              <div className="contact-meta">
                <div className="contact-item">
                  <span className="text">
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="text">
                    <a href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  </span>
                </div>
                <div className="contact-item">
                  <span className="text">{siteConfig.contact.address}</span>
                </div>
              </div>
            </div>
            <div className="offset-widget-box side-info__item">
              <h2 className="title">Ikuti Kami</h2>
              <div className="social-links">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    title={item.title}
                    aria-label={item.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="offset-logo-footer side-info__item">
              <img src={LOGO_SRC} alt="" />
            </div>
          </div>
        </div>
      </aside>
      <OffcanvasOverlay />
    </>
  );
};

export default SideInfo;
