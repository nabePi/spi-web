import jQuery from "jquery";

export type MeanMenuOptions = {
  meanMenuTarget?: JQuery;
  meanMenuContainer?: string;
  meanMenuClose?: string;
  meanMenuCloseSize?: string;
  meanMenuOpen?: string;
  meanRevealPosition?: "left" | "right" | "center";
  meanRevealPositionDistance?: string;
  meanRevealColour?: string;
  meanScreenWidth?: string;
  meanNavPush?: string;
  meanShowChildren?: boolean;
  meanExpandableChildren?: boolean;
  meanExpand?: string;
  meanContract?: string;
  meanRemoveAttrs?: boolean;
  onePage?: boolean;
  meanDisplay?: string;
  removeElements?: string;
};

type MeanMenuSettings = Required<
  Omit<MeanMenuOptions, "meanMenuTarget">
> & {
  meanMenuTarget: JQuery;
};

const defaults: Omit<MeanMenuSettings, "meanMenuTarget"> = {
  meanMenuContainer: "body",
  meanMenuClose: "X",
  meanMenuCloseSize: "18px",
  meanMenuOpen: "<span /><span /><span />",
  meanRevealPosition: "right",
  meanRevealPositionDistance: "0",
  meanRevealColour: "",
  meanScreenWidth: "480",
  meanNavPush: "",
  meanShowChildren: true,
  meanExpandableChildren: true,
  meanExpand: "+",
  meanContract: "-",
  meanRemoveAttrs: false,
  onePage: false,
  meanDisplay: "block",
  removeElements: "",
};

function viewportWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth;
}

function isMobileDevice(): boolean {
  return /iPhone|iPod|iPad|Android|Blackberry|Windows Phone/i.test(
    navigator.userAgent,
  );
}

function revealPositionStyle(
  position: MeanMenuSettings["meanRevealPosition"],
  distance: string,
): string {
  if (position === "left") return `left:${distance};right:auto;`;
  if (position === "center") {
    const left = `${viewportWidth() / 2 - 22}px`;
    return `left:${left};right:auto;`;
  }
  return `right:${distance};left:auto;`;
}

function destroyMeanMenu($nav: JQuery, display: string): void {
  const $ = jQuery;
  $(window).off("resize.meanmenu");
  $(".mean-bar, .mean-push").remove();
  $(".mean-container").removeClass("mean-container");
  $nav.css("display", display);
}

function initMeanMenu($nav: JQuery, options: MeanMenuSettings): void {
  const $ = jQuery;
  const screenLimit = Number(options.meanScreenWidth);
  const mobile = isMobileDevice();
  let currentWidth = viewportWidth();
  let opened = false;
  let built = false;

  if (
    navigator.userAgent.match(/MSIE 8/i) ||
    navigator.userAgent.match(/MSIE 7/i)
  ) {
    $("html").css("overflow-y", "scroll");
  }

  const revealStyle = () =>
    `background:${options.meanRevealColour};color:${options.meanRevealColour};${revealPositionStyle(
      options.meanRevealPosition,
      options.meanRevealPositionDistance,
    )}`;

  const syncCenterReveal = () => {
    if (options.meanRevealPosition !== "center") return;
    const left = `${viewportWidth() / 2 - 22}px`;
    const $reveal = $(".meanmenu-reveal");
    if (mobile) {
      $reveal.animate({ left });
    } else {
      $reveal.css("left", left);
    }
  };

  const removeMenu = () => {
    $(".mean-bar, .mean-push").remove();
    $(options.meanMenuContainer).removeClass("mean-container");
    $nav.css("display", options.meanDisplay);
    $(options.removeElements).removeClass("mean-remove");
    opened = false;
    built = false;
  };

  const updateRevealIcon = ($reveal: JQuery) => {
    $reveal.html(
      $reveal.is(".meanmenu-reveal.meanclose")
        ? options.meanMenuClose
        : options.meanMenuOpen,
    );
  };

  const buildMenu = () => {
    currentWidth = viewportWidth();
    if (currentWidth > screenLimit) {
      removeMenu();
      return;
    }

    $(options.removeElements).addClass("mean-remove");
    built = true;
    $(options.meanMenuContainer).addClass("mean-container");
    $(".mean-container").prepend(
      `<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="${revealStyle()}">Show Navigation</a><nav class="mean-nav"></nav></div>`,
    );
    $(".mean-nav").html($nav.html() ?? "");

    if (options.meanRemoveAttrs) {
      $("nav.mean-nav ul, nav.mean-nav ul *").each(function () {
        const $el = $(this);
        if ($el.is(".mean-remove")) {
          $el.attr("class", "mean-remove");
        } else {
          $el.removeAttr("class");
        }
        $el.removeAttr("id");
      });
    }

    $nav.before('<div class="mean-push" />');
    $(".mean-push").css("margin-top", options.meanNavPush);
    $nav.hide();
    $(".meanmenu-reveal").show().html(options.meanMenuOpen);
    $(".mean-nav ul").hide();

    if (options.meanShowChildren && options.meanExpandableChildren) {
      $(".mean-nav ul ul").each(function () {
        if ($(this).children().length) {
          $(this)
            .parent()
            .append(
              `<a class="mean-expand" href="#" style="font-size: ${options.meanMenuCloseSize}">${options.meanExpand}</a>`,
            );
        }
      });

      $(".mean-expand").on("click", function (event) {
        event.preventDefault();
        const $expand = $(this);
        if ($expand.hasClass("mean-clicked")) {
          $expand.text(options.meanExpand);
          $expand.prev("ul").slideUp(300);
        } else {
          $expand.text(options.meanContract);
          $expand.prev("ul").slideDown(300);
        }
        $expand.toggleClass("mean-clicked");
      });
    } else if (options.meanShowChildren) {
      $(".mean-nav ul ul").show();
    } else {
      $(".mean-nav ul ul").hide();
    }

    $(".mean-nav ul li").last().addClass("mean-last");

    const $reveal = $(".meanmenu-reveal");
    $reveal.removeClass("meanclose").on("click", function (event) {
      event.preventDefault();
      if (!opened) {
        $reveal.css({
          "text-align": "center",
          "text-indent": "0",
          "font-size": options.meanMenuCloseSize,
        });
        $(".mean-nav ul:first").slideDown();
        opened = true;
      } else {
        $(".mean-nav ul:first").slideUp();
        opened = false;
      }
      $reveal.toggleClass("meanclose");
      updateRevealIcon($reveal);
      $(options.removeElements).addClass("mean-remove");
    });

    if (options.onePage) {
      $(".mean-nav ul > li > a:first-child").on("click", () => {
        $(".mean-nav ul:first").slideUp();
        opened = false;
        $reveal.toggleClass("meanclose").html(options.meanMenuOpen);
      });
    }
  };

  const onResize = () => {
    currentWidth = viewportWidth();
    if (mobile) {
      syncCenterReveal();
      if (currentWidth <= screenLimit) {
        if (!built) buildMenu();
      } else {
        removeMenu();
      }
      return;
    }

    removeMenu();
    if (currentWidth <= screenLimit) {
      buildMenu();
      syncCenterReveal();
    }
  };

  $(window).off("resize.meanmenu").on("resize.meanmenu", onResize);
  buildMenu();
}

function registerMeanMenu(): void {
  if (typeof jQuery.fn.meanmenu === "function") return;

  jQuery.fn.meanmenu = function (
    this: JQuery,
    options?: MeanMenuOptions | "destroy",
  ): JQuery {
    if (options === "destroy") {
      destroyMeanMenu(this, defaults.meanDisplay);
      return this;
    }

    const settings: MeanMenuSettings = {
      ...defaults,
      ...options,
      meanMenuTarget: options?.meanMenuTarget ?? this,
    };

    return this.each(function () {
      initMeanMenu(jQuery(this), {
        ...settings,
        meanMenuTarget: jQuery(this),
      });
    });
  };
}

registerMeanMenu();
