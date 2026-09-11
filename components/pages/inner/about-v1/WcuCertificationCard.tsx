import type { WcuCertificationCardData } from "@/types/inner/about-v1";
import Image from "next/image";
import Icon076ef828 from "@/icons/Icon076ef828";
import Icon5f548d9e from "@/icons/Icon5f548d9e";

const WcuCertificationCard = ({ card }: { card: WcuCertificationCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--white">
        <Image
          src={card.bg.src}
          className="wcu1__bg-img"
          alt={card.bg.alt}
        />
        <div className="wcu1__card-top">
          <h3 className="title">{card.title}</h3>
          <p className="desc">
            {card.desc}
          </p>
        </div>

        <div className="wcu1__card-bottom">
          <div className="cert-footer">
            <div className="item">
              <div className="icon">
                <Icon5f548d9e />
              </div>
              <p>{card.items[0].lines[0]}<br />{card.items[0].lines[1]}</p>
            </div>
            <div className="item">
              <div className="icon">
                <Icon076ef828 />
              </div>
              <p>{card.items[1].lines[0]}<br />{card.items[1].lines[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WcuCertificationCard;
