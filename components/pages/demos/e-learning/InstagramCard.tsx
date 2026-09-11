import type { InstagramSlide } from "@/types/demos/e-learning/home";
import Image from "next/image";
import Icon2a9f449d from "@/icons/Icon2a9f449d";

const InstagramCard = ({ slide }: { slide: InstagramSlide }) => {
  return (
    <div className="swiper-slide">
      <div className="instagram__card">
        <a href="#">
          <Image src={slide.src} alt={slide.alt} />
          <span className="instagram__overlay">
            <Icon2a9f449d />
          </span>
        </a>
      </div>
    </div>
  );
};

export default InstagramCard;
