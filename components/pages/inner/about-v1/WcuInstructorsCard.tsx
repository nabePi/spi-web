import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { WcuInstructorsCardData } from "@/types/inner/about-v1";
import wcuUser1 from "@/public/assets/imgs/home1/wcu/wcu-user1_1.webp";
import wcuUser2 from "@/public/assets/imgs/home1/wcu/wcu-user1_2.webp";
import wcuUser3 from "@/public/assets/imgs/home1/wcu/wcu-user1_3.webp";
import wcuUser4 from "@/public/assets/imgs/home1/wcu/wcu-user1_4.webp";
import wcuUser5 from "@/public/assets/imgs/home1/wcu/wcu-user1_5.webp";
import wcuUser6 from "@/public/assets/imgs/home1/wcu/wcu-user1_6.webp";
import wcuUser7 from "@/public/assets/imgs/home1/wcu/wcu-user1_7.webp";
import wcuUser8 from "@/public/assets/imgs/home1/wcu/wcu-user1_8.webp";
import wcuUser9 from "@/public/assets/imgs/home1/wcu/wcu-user1_9.webp";
import wcuUser10 from "@/public/assets/imgs/home1/wcu/wcu-user1_10.webp";

const instructorAvatars: Record<number, StaticImageData> = {
  1: wcuUser1,
  2: wcuUser2,
  3: wcuUser3,
  4: wcuUser4,
  5: wcuUser5,
  6: wcuUser6,
  7: wcuUser7,
  8: wcuUser8,
  9: wcuUser9,
  10: wcuUser10,
};

const Avatar = ({ n }: { n: number }) => (
  <div className="avatar">
    <Image src={instructorAvatars[n]} alt="Avatar" />
  </div>
);

const WcuInstructorsCard = ({ card }: { card: WcuInstructorsCardData }) => {
  return (
    <div className="fade-anim" data-delay={card.delay}>
      <div className="wcu1__card wcu1__card--avatars">
        <Image
          src={card.bg.src}
          className="wcu1__bg-img"
          alt={card.bg.alt}
        />
        <div className="avatar-grid">
          <div className="avatar-marquee avatar-marquee--left">
            {card.leftAvatars.map((n, index) => (
              <Avatar key={`left-${index}`} n={n} />
            ))}
          </div>
          <div className="avatar-marquee avatar-marquee--right">
            {card.rightAvatars.map((n, index) => (
              <Avatar key={`right-${index}`} n={n} />
            ))}
          </div>
        </div>
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

export default WcuInstructorsCard;
