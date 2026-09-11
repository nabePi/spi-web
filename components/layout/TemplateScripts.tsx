"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { initPagePlugins } from "@/lib/template/pagePlugins";

interface VendorLoader {
  package: string;
  load: () => Promise<void>;
}

type WindowVendorKey =
  | "jQuery"
  | "$"
  | "Swiper"
  | "counterUp"
  | "Odometer"
  | "gsap"
  | "ScrollTrigger"
  | "ScrollSmoother"
  | "SplitText"
  | "VanillaTilt";

function setWindow(key: WindowVendorKey, value: unknown): void {
  Object.assign(window, { [key]: value });
}

function getJQuery(): JQueryStatic {
  const $ = window.jQuery;
  if (!$) {
    throw new Error(
      "[TemplateScripts] jQuery must load before dependent plugins",
    );
  }
  return $;
}

function initBackToTop($: JQueryStatic): void {
  const path = document.querySelector<SVGPathElement>(".progress-wrap path");
  if (!path) return;

  const length = path.getTotalLength();
  path.style.transition = path.style.webkitTransition = "none";
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.getBoundingClientRect();
  path.style.transition = path.style.webkitTransition =
    "stroke-dashoffset 10ms linear";

  const updateProgress = () => {
    const scroll = $(window).scrollTop() ?? 0;
    const docHeight = $(document).height() ?? 0;
    const winHeight = $(window).height() ?? 0;
    const height = docHeight - winHeight;
    const offset = length - (scroll * length) / (height || 1);
    path.style.strokeDashoffset = `${offset}`;
  };

  updateProgress();
  $(window).on("scroll", updateProgress);

  $(window).on("scroll", () => {
    if (($(window).scrollTop() ?? 0) > 50) {
      $(".progress-wrap").addClass("active-progress");
    } else {
      $(".progress-wrap").removeClass("active-progress");
    }
  });

  $(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 550);
    return false;
  });
}

const VENDOR_LOADERS: VendorLoader[] = [
  {
    package: "jquery",
    load: async () => {
      const $ = (await import("jquery")).default;
      setWindow("jQuery", $);
      setWindow("$", $);
    },
  },
  {
    package: "bootstrap",
    load: async () => {
      await import("bootstrap/dist/js/bootstrap.bundle.min.js");
    },
  },
  {
    package: "magnific-popup",
    load: async () => {
      getJQuery();
      await import("magnific-popup/dist/jquery.magnific-popup.js");
    },
  },
  {
    package: "swiper",
    load: async () => {
      const { default: Swiper } = await import("swiper/bundle");
      setWindow("Swiper", Swiper);
    },
  },
  {
    package: "counterup2",
    load: async () => {
      const counterUp = await import("counterup2");
      setWindow("counterUp", counterUp);
    },
  },
  {
    package: "odometer",
    load: async () => {
      const mod = await import("odometer");
      setWindow("Odometer", mod.default ?? mod);
    },
  },
  {
    package: "gsap",
    load: async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");
      const { SplitText } = await import("gsap/SplitText");

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
      gsap.config({ nullTargetWarn: false });
      setWindow("gsap", gsap);
      setWindow("ScrollTrigger", ScrollTrigger);
      setWindow("ScrollSmoother", ScrollSmoother);
      setWindow("SplitText", SplitText);
    },
  },
  {
    package: "jquery-nice-select",
    load: async () => {
      getJQuery();
      await import("jquery-nice-select/js/jquery.nice-select.min.js");
    },
  },
  {
    package: "meanmenu",
    load: async () => {
      getJQuery();
      await import("@/lib/vendor/meanmenu");
    },
  },
  {
    package: "vanilla-tilt",
    load: async () => {
      const mod = await import("vanilla-tilt");
      setWindow("VanillaTilt", mod.default ?? mod);
    },
  },
];

let loadPromise: Promise<void> | null = null;

function loadTemplateVendors(): Promise<void> {
  if (!loadPromise) {
    loadPromise = (async () => {
      for (const { package: pkg, load } of VENDOR_LOADERS) {
        try {
          await load();
        } catch (error) {
          loadPromise = null;
          console.error(
            `[TemplateScripts] Failed to load package: ${pkg}`,
            error,
          );
          throw error;
        }
      }

      initBackToTop(getJQuery());
    })();
  }

  return loadPromise;
}

function bootPagePlugins(): void {
  initPagePlugins();
  requestAnimationFrame(() => {
    try {
      window.ScrollTrigger?.refresh();
    } catch {
      // ignore
    }
  });
}

export function TemplateScripts() {
  const pathname = usePathname();
  const scriptsReady = useRef(false);

  useEffect(() => {
    document.body.classList.add("template-hydrated");

    let cancelled = false;

    async function boot() {
      try {
        if (!scriptsReady.current) {
          await loadTemplateVendors();
          if (cancelled) return;
          scriptsReady.current = true;
        }
        bootPagePlugins();
      } catch (error) {
        console.error(
          "[TemplateScripts] Failed to boot template scripts:",
          error,
        );
      }
    }

    void boot();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
