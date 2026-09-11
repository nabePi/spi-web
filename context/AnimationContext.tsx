"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
gsap.config({ nullTargetWarn: false });

const CLIP_INITIAL = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
  "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
  "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
  "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
  "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
  "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
  "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const CLIP_FINAL = [
  "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
  "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
  "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
  "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
  "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
  "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
  "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
  "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
];

const CLIP_ORDER = [
  [".mask-1"],
  [".mask-2", ".mask-4"],
  [".mask-3", ".mask-5", ".mask-7"],
  [".mask-6", ".mask-8"],
  [".mask-9"],
];

function deviceWidth(): number {
  return window.screen.width;
}

function attr(el: Element, name: string): string | null {
  return el.getAttribute(name);
}

function numAttr(el: Element, name: string, fallback: number): number {
  const raw = attr(el, name);
  return raw !== null ? parseFloat(raw) : fallback;
}

function initScrollSmoother(): void {
  if (deviceWidth() <= 767) return;
  const flag = document.querySelector("#has_smooth");
  if (!flag?.classList.contains("has-smooth")) return;
  if (!document.querySelector("#smooth-wrapper")) return;

  ScrollSmoother.create({
    smooth: 0.9,
    effects: deviceWidth() < 1025 ? false : true,
    smoothTouch: 0.1,
    normalizeScroll: { allowNestedScroll: true },
    ignoreMobileResize: true,
  });
}

function initHeroThumbParallax(): () => void {
  const heroThumb = document.querySelector<HTMLElement>(".hero1__thumb");
  if (!heroThumb) return () => undefined;

  const layers = [
    { el: heroThumb.querySelector(".hero1__floating--book"), depth: 0.055 },
    { el: heroThumb.querySelector(".hero1__floating--flask"), depth: -0.045 },
    { el: heroThumb.querySelector(".hero1__floating--rating"), depth: 0.04 },
  ]
    .filter((layer): layer is { el: Element; depth: number } => Boolean(layer.el))
    .map((layer) => ({
      ...layer,
      setX: gsap.quickTo(layer.el, "x", { duration: 0.6, ease: "power2.out" }),
      setY: gsap.quickTo(layer.el, "y", { duration: 0.6, ease: "power2.out" }),
    }));

  const onMove = (event: MouseEvent) => {
    const rect = heroThumb.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    layers.forEach(({ setX, setY, depth }) => {
      setX(relX * depth * rect.width);
      setY(relY * depth * rect.height);
    });
  };

  const onLeave = () => {
    layers.forEach(({ setX, setY }) => {
      setX(0);
      setY(0);
    });
  };

  heroThumb.addEventListener("mousemove", onMove);
  heroThumb.addEventListener("mouseleave", onLeave);

  return () => {
    heroThumb.removeEventListener("mousemove", onMove);
    heroThumb.removeEventListener("mouseleave", onLeave);
  };
}

function initImageRevealAnimation(): void {
  document.querySelectorAll<HTMLElement>(".img_anim_reveal").forEach((reveal) => {
    const image = reveal.querySelector("img");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: reveal, start: "top 50%" },
    });
    tl.set(reveal, { autoAlpha: 1 });
    tl.from(reveal, { duration: 1.5, yPercent: -100, ease: "power2.out" });
    if (image) {
      tl.from(image, {
        duration: 1.5,
        yPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: "power2.out",
      });
    }
  });
}

function initStackingHeaderPin(): void {
  if (!document.querySelectorAll(".header-stacking-items").length) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 991px)", () => {
    const items = gsap.utils.toArray<HTMLElement>(".item");
    items.forEach((item, index) => {
      const content = item.querySelector(".body");
      const header = item.querySelector<HTMLElement>(".header");
      if (!content || !header) return;
      gsap.to(content, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: `top ${header.clientHeight * index}`,
          endTrigger: ".final",
          end: `top ${header.clientHeight * items.length}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    });
  });
}

function initStackingScalePin(): void {
  if (!document.querySelectorAll(".pin-panel").length) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 991px)", () => {
    const scaleItems = document.querySelectorAll<HTMLElement>(".pin-panel");
    gsap.set(scaleItems, { scale: 1 });
    scaleItems.forEach((item) => {
      gsap.to(item, {
        scale: 0.8,
        scrollTrigger: {
          trigger: item,
          pin: item,
          scrub: 1,
          start: "top 10%",
          end: "bottom 90%",
          endTrigger: ".footer1",
          pinSpacing: false,
        },
      });
    });
  });
}

function initFadeAnimations(): void {
  const items = gsap.utils.toArray<HTMLElement>(".fade-anim");
  items.forEach((item) => {
    const direction = attr(item, "data-direction") ?? "bottom";
    const onScroll = numAttr(item, "data-on-scroll", 1);
    const duration = numAttr(item, "data-duration", 1.15);
    const offset = numAttr(item, "data-offset", 50);
    const delay = numAttr(item, "data-delay", 0.15);
    const ease = attr(item, "data-ease") ?? "power2.out";

    const settings: gsap.TweenVars = { opacity: 0, ease, duration, delay };
    if (direction === "top") settings.y = -offset;
    if (direction === "left") settings.x = -offset;
    if (direction === "bottom") settings.y = offset;
    if (direction === "right") settings.x = offset;
    if (onScroll === 1) {
      settings.scrollTrigger = { trigger: item, start: "top 85%" };
    }
    gsap.from(item, settings);
  });
}

function initMoveAnimation(): void {
  gsap.utils.toArray<HTMLElement>(".move-anim").forEach((line) => {
    const delay = numAttr(line, "data-delay", 0.1);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        scrub: false,
        toggleActions: "play none none none",
      },
    });
    const split = new SplitText(line, { type: "lines" });
    gsap.set(line, { perspective: 400 });
    split.split({ type: "lines" });
    tl.from(split.lines, {
      duration: 1,
      delay,
      opacity: 0,
      rotationX: -80,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1,
    });
  });
}

function wordTween(
  el: HTMLElement,
  vars: gsap.TweenVars,
  onScroll: boolean,
  start = "top 90%",
): void {
  const split = new SplitText(el, { type: "chars, words" });
  gsap.from(split.words, {
    ...vars,
    ...(onScroll ? { scrollTrigger: { trigger: el, start } } : {}),
  });
}

function initWordAnimation(): void {
  document.querySelectorAll<HTMLElement>(".word-anim").forEach((item) => {
    const stagger = numAttr(item, "data-stagger", 0.04);
    const translateX = attr(item, "data-translateX");
    const translateY = attr(item, "data-translateY");
    const onScroll = numAttr(item, "data-on-scroll", 1) === 1;
    const delay = numAttr(item, "data-delay", 0.1);
    const duration = numAttr(item, "data-duration", 0.75);

    if (onScroll) {
      if (translateX && !translateY) {
        wordTween(item, { duration, x: translateX, autoAlpha: 0, stagger, delay }, true);
      } else if (translateY && !translateX) {
        wordTween(item, { duration: 1, delay, y: translateY, autoAlpha: 0, stagger }, true);
      } else if (translateX && translateY) {
        wordTween(
          item,
          { duration: 1, delay, x: translateX, y: translateY, autoAlpha: 0, stagger },
          true,
        );
      } else {
        wordTween(
          item,
          { duration: 1, delay, x: 20, autoAlpha: 0, stagger },
          true,
          "top 85%",
        );
      }
      return;
    }

    if (translateX && !translateY) {
      wordTween(item, { duration: 1, delay, x: translateX, autoAlpha: 0, stagger }, false);
    } else if (translateY && !translateX) {
      wordTween(item, { duration: 1, delay, y: translateY, autoAlpha: 0, stagger }, false);
    } else if (translateX && translateY) {
      wordTween(
        item,
        { duration: 1, delay, x: translateX, y: translateY, autoAlpha: 0, stagger },
        false,
      );
    } else {
      wordTween(item, { duration: 1, delay, x: 20, autoAlpha: 0, stagger }, false);
    }
  });
}

function charTween(
  el: HTMLElement,
  vars: gsap.TweenVars,
  onScroll: boolean,
): void {
  const split = new SplitText(el, { type: "chars, words" });
  gsap.from(split.chars, {
    ...vars,
    ...(onScroll ? { scrollTrigger: { trigger: el, start: "top 85%" } } : {}),
  });
}

function initCharAnimation(): void {
  document.querySelectorAll<HTMLElement>(".char-anim").forEach((item) => {
    const stagger = numAttr(item, "data-stagger", 0.05);
    const translateXRaw = attr(item, "data-translateX");
    const translateYRaw = attr(item, "data-translateY");
    const translateX = translateXRaw !== null ? parseFloat(translateXRaw) : 20;
    const translateY = translateYRaw !== null ? parseFloat(translateYRaw) : 0;
    const onScroll = numAttr(item, "data-on-scroll", 1) === 1;
    const delay = numAttr(item, "data-delay", 0.1);
    const duration = numAttr(item, "data-duration", 1);
    const ease = attr(item, "data-ease") ?? "power2.out";

    if (onScroll) {
      if (translateX > 0 && !translateY) {
        charTween(item, { duration, delay, x: translateX, autoAlpha: 0, stagger, ease }, true);
      } else if (translateY > 0 && !translateX) {
        charTween(item, { duration, delay, y: translateY, autoAlpha: 0, ease, stagger }, true);
      } else if (translateX && translateY) {
        charTween(
          item,
          { duration: 2, delay, y: translateY, x: translateX, autoAlpha: 0, ease, stagger },
          true,
        );
      } else {
        charTween(item, { duration: 1, delay, x: 50, autoAlpha: 0, stagger, ease }, true);
      }
      return;
    }

    if (translateX > 0 && !translateY) {
      charTween(item, { duration: 1, delay, x: translateX, ease, autoAlpha: 0, stagger }, false);
    } else if (translateY > 0 && !translateX) {
      charTween(item, { duration: 1, delay, y: translateY, autoAlpha: 0, ease, stagger }, false);
    } else if (translateX && translateY) {
      charTween(
        item,
        { duration: 1, delay, y: translateY, x: translateX, ease, autoAlpha: 0, stagger },
        false,
      );
    } else {
      charTween(item, { duration: 1, delay, ease, x: 50, autoAlpha: 0, stagger }, false);
    }
  });
}

function initPinOnBottom(): void {
  document.querySelectorAll<HTMLElement>(".pin-on-bottom").forEach((el) => {
    gsap.to(el, {
      paddingBottom: "500px",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        pin: true,
        start: "bottom 90%",
        end: "bottom top",
        pinSpacing: false,
        scrub: 3,
      },
    });
  });
}

function removeClipMasks(): void {
  document.querySelectorAll(".tw-clip-anim .mask").forEach((mask) => mask.remove());
}

function initTwClipAnim(): void {
  document.querySelectorAll<HTMLElement>(".tw-clip-anim").forEach((wrapper) => {
    const img = wrapper.querySelector<HTMLImageElement>(".tw-anim-img[data-animate='true']");
    if (!img) return;
    wrapper.querySelectorAll(".mask").forEach((mask) => mask.remove());
    for (let index = 0; index < 9; index += 1) {
      const mask = document.createElement("div");
      mask.className = `mask mask-${index + 1}`;
      Object.assign(mask.style, {
        backgroundImage: `url(${img.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: "0",
      });
      wrapper.appendChild(mask);
    }
  });

  gsap.utils.toArray<HTMLElement>(".tw-clip-anim").forEach((wrapper) => {
    const masks = wrapper.querySelectorAll<HTMLElement>(".mask");
    if (!masks.length) return;
    gsap.set(masks, { clipPath: (i: number) => CLIP_INITIAL[i] });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 75%" },
    });
    CLIP_ORDER.forEach((targets, step) => {
      const valid = targets
        .map((selector) => wrapper.querySelector(selector))
        .filter((el): el is Element => Boolean(el));
      if (!valid.length) return;
      tl.to(
        valid,
        {
          clipPath: (_j: number, el: Element) => CLIP_FINAL[Array.from(masks).indexOf(el as HTMLElement)],
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        step * 0.125,
      );
    });
  });
}

function initTeam1StickyPin(): void {
  if (!document.querySelector(".team1__sticky") || deviceWidth() <= 1024) return;
  gsap.to(".team1__sticky", {
    scrollTrigger: {
      trigger: ".team1",
      pin: ".team1__sticky",
      start: "top 120px",
      end: "bottom bottom",
      pinSpacing: false,
    },
  });
}

function initFindCourseStickyPin(): void {
  if (deviceWidth() <= 991) return;
  const sticky = document.querySelector(".find-course1__sticky");
  if (!sticky) return;
  ScrollTrigger.create({
    trigger: ".find-course1",
    start: "top 120px",
    end: "bottom bottom",
    pin: sticky,
    pinSpacing: false,
  });
}

function initHeroBgAnimation(): void {
  gsap.from(".hero-ten .hero-bg img", {
    scale: 1.5,
    duration: 2,
    ease: "power3.out",
    transformOrigin: "center center",
  });
}

function initHeroNineAnimation(): void {
  const hero = document.querySelector(".hero-nine");
  if (!hero || !window.matchMedia("(min-width: 992px)").matches) return;

  const tl = gsap.timeline({ delay: 0.3 });
  tl.from(".hero-nine .thumb-bg-pattern", {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 1,
    ease: "power3.inOut",
  });
  tl.from(
    ".hero-nine .thumb-img img",
    { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2, duration: 1, ease: "power3.inOut" },
    "-=0.6",
  );
  tl.from(
    ".hero-nine .hero-content > *:not(a)",
    { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" },
    "-=0.8",
  );
  tl.from(
    ".hero-nine .hero-info-area > *",
    { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
    "-=0.6",
  );
}

function initHeroEightAnimation(): void {
  const hero = document.querySelector(".hero-eight__wrapper");
  if (!hero || !window.matchMedia("(min-width: 992px)").matches) return;

  const tl = gsap.timeline({ delay: 0.3 });
  tl.from(".hero-eight__thumb > img", {
    clipPath: "inset(100% 0% 0% 0%)",
    scale: 1.2,
    duration: 1.2,
    ease: "power3.inOut",
  });
  tl.from(
    ".hero-eight__thumb .user-batch",
    { x: -30, y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
    "-=0.6",
  );
  tl.from(
    ".hero-eight__thumb .user-review",
    { x: 30, y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
    "-=0.6",
  );
}

function initCtaNineAnimation(): void {
  const thumb = document.querySelector(".cta-nine__thumb");
  if (!thumb) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: thumb, start: "top 85%" },
  });
  tl.from(".cta-nine__thumb .img-2", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
  tl.from(
    ".cta-nine__thumb .img-1",
    { x: 60, y: 60, rotation: 0, opacity: 0, duration: 1.2, ease: "power3.out" },
    "-=0.9",
  );
  tl.from(
    ".cta-nine__thumb .img-3",
    { x: -60, y: 60, rotation: 0, opacity: 0, duration: 1.2, ease: "power3.out" },
    "<",
  );
}

function initSplitAnimations(): void {
  document.querySelectorAll<HTMLElement>(".title-animation").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-parent",
      wordsClass: "split-word",
      charsClass: "split-child",
    });
    gsap.set(el, { opacity: 1 });
    gsap.set(split.lines, { overflow: "hidden" });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1.2,
      yPercent: 120,
      rotationZ: 8,
      autoAlpha: 0,
      stagger: { amount: 0.5 },
      ease: "power4.out",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-lg").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-lg",
      wordsClass: "split-word-lg",
      charsClass: "split-char-lg",
    });
    gsap.set(el, { opacity: 1 });
    gsap.set(split.lines, { overflow: "hidden" });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 0.8,
      yPercent: 130,
      rotationZ: 15,
      scale: 0.8,
      autoAlpha: 0,
      stagger: { amount: 0.8, from: "center", ease: "power1.out" },
      ease: "power4.out",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-sd").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-sd",
      wordsClass: "split-word-sd",
      charsClass: "split-char-sd",
    });
    gsap.set(el, { opacity: 1 });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1,
      opacity: 0,
      scale: 2,
      filter: "blur(10px)",
      y: 20,
      stagger: { amount: 0.6, from: "random" },
      ease: "power4.out",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-color").forEach((el) => {
    const split = new SplitText(el, { type: "words", wordsClass: "split-word" });
    void split;
    const wordSpans = el.querySelectorAll(".split-word");
    gsap.set(el, { opacity: 1 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      })
      .to(wordSpans, {
        color: getComputedStyle(el).getPropertyValue("--char-active"),
        stagger: 0.2,
        ease: "none",
      });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-cinematic").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-cinematic",
      wordsClass: "split-word-cinematic",
      charsClass: "split-char-cinematic",
    });
    gsap.set(el, { opacity: 1 });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1.5,
      x: (i, _target, chars) => (i - chars.length / 2) * 10,
      opacity: 0,
      filter: "blur(12px)",
      scale: 1.5,
      stagger: { amount: 0.8, from: "edges" },
      ease: "expo.out",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-wave").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-hyper",
      wordsClass: "split-word-hyper",
      charsClass: "split-char-hyper",
    });
    gsap.set(el, { opacity: 1 });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1.2,
      yPercent: 100,
      opacity: 0,
      scale: 0.5,
      rotationZ: -10,
      stagger: { amount: 0.8, from: "start" },
      ease: "elastic.out(1, 0.4)",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-stretch").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-stretch",
      wordsClass: "split-word-stretch",
      charsClass: "split-char-stretch",
    });
    gsap.set(el, { opacity: 1 });
    gsap.set(split.lines, {
      clipPath: "polygon(-5% -15%, 105% -15%, 105% 115%, -5% 115%)",
    });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1.4,
      scaleY: 3.5,
      scaleX: 1,
      opacity: 0,
      transformOrigin: "50% 50%",
      stagger: { amount: 0.6, from: "start" },
      ease: "expo.out",
    });
  });

  document.querySelectorAll<HTMLElement>(".title-animation-jelly").forEach((el) => {
    const split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "split-line-jelly",
      wordsClass: "split-word-jelly",
      charsClass: "split-char-jelly",
    });
    gsap.set(el, { opacity: 1 });
    gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
    }).from(split.chars, {
      duration: 1.2,
      scaleX: 0,
      scaleY: 3,
      yPercent: -100,
      opacity: 0,
      transformOrigin: "center center",
      stagger: { amount: 0.6, from: "start" },
      ease: "elastic.out(1, 0.3)",
    });
  });
}

function runPageGsap(): () => void {
  initScrollSmoother();
  const disposeParallax = initHeroThumbParallax();
  initImageRevealAnimation();
  initStackingHeaderPin();
  initStackingScalePin();
  initFadeAnimations();
  initMoveAnimation();
  initWordAnimation();
  initCharAnimation();
  initPinOnBottom();
  initTwClipAnim();
  initTeam1StickyPin();
  initFindCourseStickyPin();
  initHeroBgAnimation();
  initHeroNineAnimation();
  initHeroEightAnimation();
  initCtaNineAnimation();

  return () => {
    disposeParallax();
    removeClipMasks();
  };
}

const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const headerRan = useRef(false);

  useLayoutEffect(() => {
    if (headerRan.current) return undefined;
    headerRan.current = true;
    const ctx = gsap.context(() => {
      gsap.from("header:not(.header-inner)", {
        y: -200,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "all",
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      cleanups.push(runPageGsap());
    });

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      const splitCtx = gsap.context(() => {
        initSplitAnimations();
      });
      cleanups.push(() => splitCtx.revert());
    });

    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [pathname]);

  return children;
};

export default AnimationProvider;
