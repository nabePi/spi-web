import type { WcuQualityCardData } from "@/types/inner/about-v1";
import Image from "next/image";
import Icon7718c6db from "@/icons/Icon7718c6db";

const WcuQualityCard = ({ card }: { card: WcuQualityCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--orange">
        <Image
          src={card.bg.src}
          className="wcu1__bg-img"
          alt={card.bg.alt}
        />
        <div className="icon">
          <Icon7718c6db />
        </div>
        <div className="number-box">
          <div className="number">{card.number}</div>
          <h3 className="title">{card.title}</h3>
        </div>
        <p className="desc">
          {card.desc}
        </p>
      </div>
    </div>
  );
};

export default WcuQualityCard;
