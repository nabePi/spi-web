import { gsap } from "gsap";

export function openSideInfo(): void {
  const items = document.querySelectorAll(".side-info__item");
  gsap.killTweensOf(items);
  document.querySelector(".side-info")?.classList.add("info-open");
  document.querySelector(".offcanvas-overlay")?.classList.add("overlay-open");
  gsap.fromTo(
    items,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 },
  );
}

export function closeSideInfo(): void {
  document.querySelector(".side-info")?.classList.remove("info-open");
  document.querySelector(".offcanvas-overlay")?.classList.remove("overlay-open");
  gsap.killTweensOf(".side-info__item");
  gsap.to(".side-info__item", {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power2.in",
  });
}
