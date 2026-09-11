import Link from "next/link";
import type { WcuSupportCardData } from "@/types/inner/about-v1";
import Image from "next/image";
import ArrowOutwardSmIcon from "@/icons/ArrowOutwardSmIcon";
import Icon7343ed43 from "@/icons/Icon7343ed43";

const WcuSupportCard = ({ card }: { card: WcuSupportCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--white style2">
        <Image
          src={card.bg.src}
          className="wcu1__bg-img"
          alt={card.bg.alt}
        />
        <div>
          <h3 className="title">{card.title}</h3>
          <p className="desc">
            {card.desc}
          </p>
          <Link href={card.cta.href} className="enroll-link mt-4">{card.cta.label}
            <ArrowOutwardSmIcon />
          </Link>
        </div>
        <div className="support-footer">
          <div className="item">
            <div className="icon">
              <Icon7343ed43 />
            </div>
            <div className="info">
              <h4>{card.mailTitle}</h4>
              <span>
                <a href={card.mailHref}>{card.mailLabel}</a>
              </span>
            </div>
          </div>
          <div className="item">
            <div className="icon img-box">
              <Image
                src={card.person.thumb.src}
                alt={card.person.thumb.alt}
              />
            </div>
            <div className="info">
              <h4>{card.person.name}</h4>
              <span>{card.person.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WcuSupportCard;
