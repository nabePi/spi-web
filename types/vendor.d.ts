declare module "bootstrap/dist/js/bootstrap.bundle.min.js";
declare module "magnific-popup/dist/jquery.magnific-popup.js";
declare module "jquery-nice-select/js/jquery.nice-select.min.js";
declare module "odometer";
declare module "counterup2";

interface JQuery {
  niceSelect(method?: "update" | "destroy"): JQuery;
  meanmenu(
    options?:
      | {
          meanMenuContainer?: string;
          meanScreenWidth?: string;
          meanMenuCloseSize?: string;
          meanExpand?: string;
          meanContract?: string;
          meanShowChildren?: boolean;
          meanExpandableChildren?: boolean;
          meanDisplay?: string;
        }
      | "destroy",
  ): JQuery;
  magnificPopup(options?: Record<string, unknown>): JQuery;
}

interface JQueryStatic {
  magnificPopup?: unknown;
}

interface Window {
  jQuery?: JQueryStatic;
  $?: JQueryStatic;
  Swiper?: new (
    container: string | Element,
    options?: Record<string, unknown>,
  ) => { destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void };
  Odometer?: new (options: {
    el: Element;
    value: number;
    format?: string;
    theme?: string;
  }) => { update: (value: number | string) => void };
  counterUp?: { default?: unknown };
  gsap?: {
    to: (target: object, vars: Record<string, unknown>) => unknown;
    registerPlugin: (...plugins: unknown[]) => void;
    config: (config: Record<string, unknown>) => void;
  };
  ScrollTrigger?: { refresh: () => void };
  ScrollSmoother?: unknown;
  SplitText?: unknown;
  VanillaTilt?: unknown;
}
