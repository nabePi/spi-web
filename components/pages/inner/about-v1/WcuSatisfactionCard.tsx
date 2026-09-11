import type { WcuSatisfactionCardData } from "@/types/inner/about-v1";
import Image from "next/image";
import Icon6458ca62 from "@/icons/Icon6458ca62";

const WcuSatisfactionCard = ({ card }: { card: WcuSatisfactionCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--purple">
        <Image
          src={card.bg.src}
          className="wcu1__bg-img"
          alt={card.bg.alt}
        />
        <div className="icon-box">
          <Icon6458ca62 />
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

export default WcuSatisfactionCard;
