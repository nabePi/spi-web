import type { ReactNode } from "react";
import type { HowItWorkItem } from "@/types/demos/e-learning/home";
import Image from "next/image";
import Icon3f87292f from "@/icons/Icon3f87292f";
import Icon63224449 from "@/icons/Icon63224449";
import Iconafc5e477 from "@/icons/Iconafc5e477";
import Iconf044e3ed from "@/icons/Iconf044e3ed";

const howItWorkIcons: Record<HowItWorkItem["id"], ReactNode> = {
  choose: (
    <Icon63224449 />
  ),
  learn: (
    <Iconafc5e477 />
  ),
  practice: (
    <Iconf044e3ed />
  ),
  certified: (
    <Icon3f87292f />
  ),
};

const HowItWorkItem = ({ item }: { item: HowItWorkItem }) => {
  return (
    <div
      className={`how-it-work-2__item ${item.modifier}${item.active ? " active" : ""} fade-anim`}
      data-delay={item.delay}
    >
      <div className="how-it-work-2__image">
        <Image src={item.thumb.src} alt={item.thumb.alt} />
      </div>
      <div className="how-it-work-2__item-inner">
        <div className="how-it-work-2__icon">{howItWorkIcons[item.id]}</div>
        <span className="how-it-work-2__step">{item.step}</span>
        <h3 className="how-it-work-2__title">{item.title}</h3>
        <p className="how-it-work-2__desc">{item.desc}</p>
      </div>
    </div>
  );
};

export default HowItWorkItem;
