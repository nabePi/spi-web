"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import favicon from "@/public/assets/imgs/favicon.webp";

const FIRST_HIDE_MS = 1000;
const ROUTE_HIDE_MS = 600;

function PreloaderOverlay() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const routeChange = document.readyState === "complete";
    const delay = routeChange ? ROUTE_HIDE_MS : FIRST_HIDE_MS;
    let timer = 0;

    const hide = () => {
      gsap.to(el, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => setFadeOut(true),
      });
    };

    const startHide = () => {
      timer = window.setTimeout(hide, delay);
    };

    if (routeChange) {
      startHide();
    } else {
      window.addEventListener("load", startHide);
    }

    return () => {
      window.removeEventListener("load", startHide);
      window.clearTimeout(timer);
      gsap.killTweensOf(el);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      id="preloader"
      ref={nodeRef}
      className={fadeOut ? "preloader-modern hide-preloader" : "preloader-modern"}
      onTransitionEnd={() => {
        if (fadeOut) setRemoved(true);
      }}
    >
      <div className="loader-container">
        <div className="loader-icon">
          <Image src={favicon} alt="Logo" priority />
        </div>
      </div>
    </div>
  );
}

const Preloader = () => {
  const pathname = usePathname();
  return <PreloaderOverlay key={pathname} />;
};

export default Preloader;
