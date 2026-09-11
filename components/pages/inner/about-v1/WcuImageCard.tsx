import type { WcuImageCardData } from "@/types/inner/about-v1";
import Image from "next/image";
import PlayCircleIcon from "@/icons/PlayCircleIcon";

const WcuImageCard = ({ card }: { card: WcuImageCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--image">
        <Image
          src={card.thumb.src}
          alt={card.thumb.alt}
        />
        <a href={card.videoHref} className="play-btn video-popup">
          <PlayCircleIcon />
        </a>
        <div className="content">
          <h3 className="title">{card.title}</h3>
          <p className="desc">
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WcuImageCard;
