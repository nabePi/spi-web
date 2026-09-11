import { gsap } from "gsap";

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
};

const swipers: SwiperInstance[] = [];
let odometerObserver: IntersectionObserver | null = null;
let typewriterTimer: ReturnType<typeof setInterval> | null = null;
let promoTimer: ReturnType<typeof setInterval> | null = null;
let chromeBound = false;
let videoModalBound = false;
let tickerAdded = false;

function getJQuery(): JQueryStatic {
  const $ = (window as Window & { jQuery?: JQueryStatic }).jQuery;
  if (!$) {
    throw new Error("[pagePlugins] jQuery is not loaded");
  }
  return $;
}

function SwiperCtor() {
  const Ctor = window.Swiper;
  if (!Ctor) {
    throw new Error("[pagePlugins] Swiper is not loaded");
  }
  return Ctor;
}

function once(el: Element, key: string): boolean {
  const dataset = (el as HTMLElement).dataset;
  if (dataset[key] === "true") return false;
  dataset[key] = "true";
  return true;
}

function initPinnedHeader($: JQueryStatic): void {
  if (chromeBound) return;
  let lastScrollTop = 500;

  $(window).on("scroll.ifPinnedHeader", function () {
    const current = $(this).scrollTop() ?? 0;
    const sticky = $(".header-sticky");
    if (current > lastScrollTop) {
      sticky.removeClass("sticky-header").addClass("transformed");
    } else if (current <= 500) {
      sticky.removeClass("sticky-header").removeClass("transformed");
    } else {
      sticky.addClass("sticky-header").removeClass("transformed");
    }
    lastScrollTop = current;
  });
}

function tidyMeanMenu($: JQueryStatic): void {
  const $mobile = $(".mobile-menu");
  $mobile.find(".mean-bar > a:not(.meanmenu-reveal)").remove();
  $mobile.find("a.meanmenu-reveal").remove();
  $mobile.find(".mega-menu-home").remove();
  $mobile
    .find(".mean-nav > ul")
    .first()
    .css({ display: "block", height: "auto" });
}

export function initMeanMenu($: JQueryStatic): void {
  const $menu = $(".main-menu");
  if (!$menu.length || typeof $menu.meanmenu !== "function") return;

  try {
    $menu.meanmenu("destroy");
  } catch {
    // first init
  }
  $(".mobile-menu").empty();
  $menu.meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "1199",
    meanMenuCloseSize: "28px",
  });
  tidyMeanMenu($);
  $(window)
    .off("resize.ifMeanTidy")
    .on("resize.ifMeanTidy", () => {
      requestAnimationFrame(() => tidyMeanMenu($));
    });
}

export function initNiceSelect($: JQueryStatic): void {
  if (typeof $.fn?.niceSelect !== "function") return;

  $("select").each(function () {
    const $select = $(this);
    if ($select.next(".nice-select").length) {
      $select.niceSelect("update");
    } else {
      $select.niceSelect();
    }
  });
}

function initOdometerCounters(): void {
  if (!("counterUp" in window) || !window.Odometer) return;

  odometerObserver?.disconnect();
  odometerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (
          !entry.isIntersecting ||
          el.classList.contains("odometer-initialized")
        ) {
          return;
        }
        const raw =
          el.getAttribute("data-final") ?? el.innerText.replace(/[^0-9.]/g, "");
        const finalValue = parseFloat(String(raw));
        if (Number.isNaN(finalValue)) return;
        const od = new window.Odometer!({
          el,
          value: 0,
          format: el.getAttribute("data-format") || "",
          theme: "default",
        });
        od.update(finalValue);
        el.classList.add("odometer-initialized");
      });
    },
    { threshold: 1 },
  );

  document
    .querySelectorAll(".odometer-num")
    .forEach((el) => odometerObserver?.observe(el));
}

function initVideoPopup($: JQueryStatic): void {
  if (!$(".video-popup").length || !("magnificPopup" in $)) return;
  $(".video-popup").each(function () {
    if (!once(this, "mfpVideo")) return;
    $(this).magnificPopup({
      type: "iframe",
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
          "</div>",
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "https://www.youtube-nocookie.com/embed/%id%?autoplay=1",
          },
        },
      },
    });
  });
}

function initImagePopup($: JQueryStatic): void {
  if (!$(".image-popup").length || !("magnificPopup" in $)) return;
  $(".image-popup").each(function () {
    if (!once(this, "mfpImage")) return;
    $(this).magnificPopup({
      type: "image",
      gallery: { enabled: true },
    });
  });
}

function addSlider(
  el: string | Element | null,
  options: Record<string, unknown>,
): void {
  if (!el) return;
  const target = typeof el === "string" ? document.querySelector(el) : el;
  if (!target) return;
  swipers.push(new (SwiperCtor())(target, options));
}

function destroySliders(): void {
  while (swipers.length) {
    const instance = swipers.pop();
    try {
      instance?.destroy(true, true);
    } catch {
      // unmounted
    }
  }
}

function initInstituteFlowSliders(): void {
  destroySliders();
  const Swiper = SwiperCtor();

  const categorySix = document.querySelector(".category-six__slider");
  if (categorySix) {
    swipers.push(
      new Swiper(categorySix, {
        loop: true,
        slidesPerView: 2,
        speed: 800,
        spaceBetween: 10,
        navigation: {
          nextEl: document.querySelector(
            ".category-six__navigation .navigation-next",
          ),
          prevEl: document.querySelector(
            ".category-six__navigation .navigation-prev",
          ),
        },
        breakpoints: {
          425: { slidesPerView: 3 },
          992: { slidesPerView: 4, spaceBetween: 20 },
        },
      }),
    );
  }

  const categoryNine = document.querySelector(".category-nine__slider");
  if (categoryNine) {
    swipers.push(
      new Swiper(categoryNine, {
        loop: true,
        slidesPerView: 2,
        speed: 800,
        spaceBetween: 10,
        navigation: {
          nextEl: document.querySelector(
            ".category-nine__navigation .button-next",
          ),
          prevEl: document.querySelector(
            ".category-nine__navigation .button-prev",
          ),
        },
        breakpoints: {
          425: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },
      }),
    );
  }

  addSlider(".instagram__slider", {
    loop: true,
    centeredSlides: false,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      992: { slidesPerView: 4, spaceBetween: 20 },
      1200: { slidesPerView: 6, spaceBetween: 20 },
    },
  });

  addSlider(".related-blog__slider", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    breakpoints: {
      767: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  });

  addSlider(".featured__courses1-slider", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    pagination: { el: ".swiper-pagination", type: "progressbar" },
    breakpoints: {
      767: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  });

  addSlider(".courses-six__slider", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 1000,
    pagination: { el: ".courses-six__pagination", clickable: true },
    breakpoints: {
      767: { slidesPerView: 2 },
      992: { slidesPerView: 3, spaceBetween: 20 },
      1400: { slidesPerView: 4 },
    },
  });

  addSlider(".category3__slider", {
    loop: true,
    autoplay: true,
    slidesPerView: 2,
    spaceBetween: 10,
    speed: 1000,
    pagination: { el: ".category3__pagination", type: "progressbar" },
    breakpoints: {
      576: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    },
  });

  addSlider(".testimonial3__slider", {
    loop: true,
    autoplay: { delay: 5000 },
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    pagination: { el: ".testimonial3__pagination", clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });

  addSlider(".testimonial4__slider", {
    loop: true,
    autoplay: { delay: 5000 },
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    navigation: {
      nextEl: ".testimonial4__next",
      prevEl: ".testimonial4__prev",
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 2 },
    },
  });

  addSlider(".testimonial-seven__slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    navigation: {
      nextEl: ".testimonial-seven__navigation .button-next",
      prevEl: ".testimonial-seven__navigation .button-prev",
    },
    breakpoints: { 768: { slidesPerView: 2 } },
  });

  document.querySelectorAll(".testimonial-nine__slider").forEach((sliderEl) => {
    const reverse = sliderEl.getAttribute("data-direction") === "right";
    swipers.push(
      new Swiper(sliderEl, {
        loop: true,
        spaceBetween: 15,
        slidesPerView: "auto",
        speed: 6000,
        allowTouchMove: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
        },
        breakpoints: { 992: { spaceBetween: 20 } },
      }),
    );
  });

  addSlider(".about2__client-slider", {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    slidesPerView: 2,
    spaceBetween: 22,
    speed: 1000,
    breakpoints: {
      768: { slidesPerView: 3 },
      1200: { slidesPerView: 5 },
    },
  });

  addSlider(".tricker-img-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 0, disableOnInteraction: false },
    speed: 6000,
    allowTouchMove: false,
  });
}

function initVideoOnHover(): void {
  document.querySelectorAll(".video-container").forEach((container) => {
    if (!once(container, "videoHoverBound")) return;
    const video = container.querySelector<HTMLVideoElement>(".video_on_hover");
    if (!video) return;
    container.addEventListener("mouseover", () => {
      void video.play();
    });
    container.addEventListener("mouseout", () => {
      video.pause();
    });
  });
}

function initHoverMoveButtons(): void {
  const buttons = gsap.utils.toArray<HTMLElement>(".btn-move");
  const circles = gsap.utils.toArray<HTMLElement>(".btn-item");

  buttons.forEach((btn, index) => {
    if (!once(btn, "btnMoveBound")) return;
    const target = circles[index];
    btn.addEventListener("mousemove", (event) => {
      if (!target) return;
      const rect = btn.getBoundingClientRect();
      const relX = event.clientX - rect.left;
      const relY = event.clientY - rect.top;
      gsap.to(target, {
        duration: 0.3,
        x: ((relX - rect.width / 2) / rect.width) * 80,
        y: ((relY - rect.height / 2) / rect.height) * 80,
        scale: 1.1,
        ease: "power2.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      if (!target) return;
      gsap.to(target, {
        duration: 0.3,
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out",
      });
    });
  });
}

function initTypewriter($: JQueryStatic): void {
  const el = $(".typewriter-text");
  if (!el.length) return;
  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }

  const phrases = el.data("text") as string[] | undefined;
  if (!phrases?.length) return;

  const typing = (index: number) => {
    let textIndex = 1;
    typewriterTimer = setInterval(() => {
      if (textIndex < phrases[index].length + 1) {
        el.text(phrases[index].substr(0, textIndex));
        textIndex += 1;
      } else {
        window.setTimeout(() => deleting(index), 2000);
        if (typewriterTimer) clearInterval(typewriterTimer);
      }
    }, 150);
  };

  const deleting = (index: number) => {
    let textIndex = phrases[index].length;
    typewriterTimer = setInterval(() => {
      if (textIndex + 1 > 0) {
        el.text(phrases[index].substr(0, textIndex));
        textIndex -= 1;
      } else {
        const next = index + 1 === phrases.length ? 0 : index + 1;
        typing(next);
        if (typewriterTimer) clearInterval(typewriterTimer);
      }
    }, 150);
  };

  typing(0);
}

const mouse = { x: 0, y: 0 };
const pos = { x: 0, y: 0 };
const ratio = 0.65;

function mouseMoveBtn(event: MouseEvent): void {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  mouse.x = event.pageX;
  mouse.y = event.pageY - scrollTop;
}

function updatePosition(): void {
  pos.x += (mouse.x - pos.x) * ratio;
  pos.y += (mouse.y - pos.y) * ratio;
}

function initParallaxHoverButtons(): void {
  if (!tickerAdded) {
    gsap.ticker.add(updatePosition);
    tickerAdded = true;
  }

  document.querySelectorAll<HTMLElement>(".parallax-wrap").forEach((wrap) => {
    if (!once(wrap, "parallaxBound")) return;
    wrap.addEventListener("mousemove", mouseMoveBtn);
    wrap.addEventListener("mouseenter", () => {
      gsap.to(wrap, { duration: 0.3, scale: 2 });
      gsap.to(wrap.children, { duration: 0.3, scale: 0.5 });
    });
    wrap.addEventListener("mouseleave", () => {
      gsap.to(wrap, { duration: 0.3, scale: 1 });
      gsap.to(wrap.children, { duration: 0.3, scale: 1, x: 0, y: 0 });
    });
    wrap.addEventListener("mousemove", (event) => {
      const rect = wrap.getBoundingClientRect();
      const relX = event.pageX - rect.left;
      const relY = event.pageY - rect.top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const target = wrap.querySelector(".parallax-element");
      if (target) {
        gsap.to(target, {
          duration: 0.3,
          x: ((relX - rect.width / 2) / rect.width) * 20,
          y: ((relY - rect.height / 2 - scrollTop) / rect.height) * 20,
          ease: "power2.out",
        });
      }
    });
  });
}

function initSmoothAnchorNav(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((anchor) => {
      if (!once(anchor, "smoothAnchorBound")) return;
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const id = anchor.getAttribute("href")?.substring(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
      });
    });
}

function initHowItWorkStickyHover(): void {
  const items = document.querySelectorAll<HTMLElement>(".how-it-work-2__item");
  items.forEach((item) => {
    if (!once(item, "howItWorkBound")) return;
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth <= 991) return;
      items.forEach((other) => other.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

function initPromoCountdown(): void {
  const items = document.querySelectorAll(".promo1__countdown .count-item");
  if (!items.length) return;
  if (promoTimer) {
    clearInterval(promoTimer);
    promoTimer = null;
  }

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const update = () => {
    const distance = targetDate.getTime() - Date.now();
    const nums = [
      Math.floor(distance / (1000 * 60 * 60 * 24)),
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      Math.floor((distance % (1000 * 60)) / 1000),
    ];
    items.forEach((item, index) => {
      const numEl = item.querySelector(".number");
      if (numEl) {
        numEl.textContent =
          nums[index] < 10 ? `0${nums[index]}` : String(nums[index]);
      }
    });
    if (distance < 0 && promoTimer) {
      clearInterval(promoTimer);
    }
  };

  promoTimer = setInterval(update, 1000);
  update();
}

function setHoverActiveClass(
  listenerSelector: string,
  targetSelector: string,
  activeClass = "active",
): void {
  const listeners = document.querySelectorAll<HTMLElement>(listenerSelector);
  if (!listeners.length) return;

  let current: Element | null = null;
  listeners.forEach((listener) => {
    const target = listener.querySelector(targetSelector) ?? listener;
    if (target.classList.contains(activeClass)) current = target;
  });
  if (!current) {
    current = listeners[0].querySelector(targetSelector) ?? listeners[0];
    current.classList.add(activeClass);
  }

  listeners.forEach((listener) => {
    if (!once(listener, "hoverActiveBound")) return;
    const target = listener.querySelector(targetSelector) ?? listener;
    listener.addEventListener("mouseenter", () => {
      if (current && current !== target) current.classList.remove(activeClass);
      target.classList.add(activeClass);
      current = target;
    });
  });
}

function initHoverActiveClassWidgets(): void {
  setHoverActiveClass(".program-seven__item", ".program-seven__item");
  setHoverActiveClass(".category-eight__item", ".category-eight__item");
  setHoverActiveClass(".program-eight__item", ".program-eight__item");
  setHoverActiveClass(".process-nine__item", ".process-nine__item");
  setHoverActiveClass(".pricing-ten__item", ".pricing-ten__item");
}

function initTicketQuantityCounter(): void {
  const ticketQty = document.getElementById("ticket-qty");
  if (!ticketQty || !once(ticketQty, "qtyBound")) return;

  const priceEl = document.getElementById("ticket-price");
  const ticketPrice = parseFloat(priceEl?.getAttribute("data-price") ?? "0");
  const ticketSubtotal = document.getElementById("ticket-subtotal");
  const summaryQty = document.getElementById("summary-qty");
  const summaryTotal = document.getElementById("summary-total");

  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let currentQty = parseInt(ticketQty.innerText, 10);
      if (btn.classList.contains("increment")) currentQty += 1;
      else if (btn.classList.contains("decrement") && currentQty > 1)
        currentQty -= 1;
      ticketQty.innerText = String(currentQty);
      if (summaryQty) summaryQty.innerText = String(currentQty);
      const total = currentQty * ticketPrice;
      if (ticketSubtotal) ticketSubtotal.innerText = `$${total}`;
      if (summaryTotal) summaryTotal.innerText = `$${total}`;
    });
  });
}

function initPriceRangeSlider(): void {
  const sliderMin = document.getElementById(
    "slider-min",
  ) as HTMLInputElement | null;
  const sliderMax = document.getElementById(
    "slider-max",
  ) as HTMLInputElement | null;
  if (!sliderMin || !sliderMax || !once(sliderMin, "rangeBound")) return;

  const rangeProgress = document.getElementById("range-progress");
  const priceRangeDisplay = document.getElementById("price-range-display");

  const updateSlider = () => {
    let minVal = parseInt(sliderMin.value, 10);
    let maxVal = parseInt(sliderMax.value, 10);
    if (minVal >= maxVal) {
      if (minVal === parseInt(sliderMin.max, 10))
        sliderMin.value = String(maxVal - 1);
      else sliderMax.value = String(minVal + 1);
      minVal = parseInt(sliderMin.value, 10);
      maxVal = parseInt(sliderMax.value, 10);
    }
    if (rangeProgress) {
      rangeProgress.style.left = `${(minVal / parseInt(sliderMin.max, 10)) * 100}%`;
      rangeProgress.style.right = `${100 - (maxVal / parseInt(sliderMax.max, 10)) * 100}%`;
    }
    if (priceRangeDisplay)
      priceRangeDisplay.innerText = `$${minVal} - $${maxVal}`;
  };

  sliderMin.addEventListener("input", updateSlider);
  sliderMax.addEventListener("input", updateSlider);
  updateSlider();
}

function initProductQuantitySelector(): void {
  document.querySelectorAll(".quantity-controls").forEach((control) => {
    if (!once(control, "qtyControlsBound")) return;
    const btnMinus = control.querySelector(".btn-minus");
    const btnPlus = control.querySelector(".btn-plus");
    const input = control.querySelector<HTMLInputElement>(
      "input[type='number']",
    );
    if (!btnMinus || !btnPlus || !input) return;

    btnMinus.addEventListener("click", (event) => {
      event.preventDefault();
      const current = parseInt(input.value, 10) || 1;
      const min = parseInt(input.getAttribute("min") ?? "1", 10);
      if (current > min) input.value = String(current - 1);
    });
    btnPlus.addEventListener("click", (event) => {
      event.preventDefault();
      const current = parseInt(input.value, 10) || 1;
      input.value = String(current + 1);
    });
  });
}

function initCartRemoveButtons(): void {
  document.querySelectorAll(".cart-remove-btn").forEach((btn) => {
    if (!once(btn, "cartRemoveBound")) return;
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      btn.closest("tr")?.remove();
    });
  });
}

function initVideoModal(): void {
  if (videoModalBound) return;
  const videoModal = document.getElementById("globalVideoModal");
  const videoFrame = document.getElementById(
    "globalVideoIFrame",
  ) as HTMLIFrameElement | null;
  if (!videoModal || !videoFrame) return;
  videoModalBound = true;

  videoModal.addEventListener("show.bs.modal", (event) => {
    const button = (event as unknown as { relatedTarget?: Element })
      .relatedTarget;
    const videoId = button?.getAttribute("data-video-id");
    if (videoId) {
      videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    }
  });
  videoModal.addEventListener("hide.bs.modal", () => {
    videoFrame.src = "";
  });
}

function initPricingToggle(): void {
  const toggle = document.getElementById(
    "pricing-toggle",
  ) as HTMLInputElement | null;
  if (!toggle || !once(toggle, "toggleBound")) return;

  toggle.addEventListener("change", () => {
    const yearly = toggle.checked;
    document
      .querySelectorAll(".monthly-price")
      .forEach((el) => el.classList.toggle("d-none", yearly));
    document
      .querySelectorAll(".yearly-price")
      .forEach((el) => el.classList.toggle("d-none", !yearly));
    document.querySelectorAll(".plan-price .period").forEach((el) => {
      el.textContent = yearly ? "/ Year" : "/ Month";
    });
  });
}

export function initPagePlugins(): void {
  const $ = getJQuery();

  initPinnedHeader($);
  chromeBound = true;

  initMeanMenu($);
  initNiceSelect($);
  initOdometerCounters();
  initVideoPopup($);
  initImagePopup($);
  initInstituteFlowSliders();
  initVideoOnHover();
  initHoverMoveButtons();
  initTypewriter($);
  initParallaxHoverButtons();
  initSmoothAnchorNav();
  initHowItWorkStickyHover();
  initPromoCountdown();
  initHoverActiveClassWidgets();
  initTicketQuantityCounter();
  initPriceRangeSlider();
  initProductQuantitySelector();
  initCartRemoveButtons();
  initVideoModal();
  initPricingToggle();
}
