import type { AboutV1TestimonialImage } from "@/types/inner/about-v1";
import Image from "next/image";
import PlayCircleIcon from "@/icons/PlayCircleIcon";

const TestimonialImageCard = ({ card }: { card: AboutV1TestimonialImage }) => {
  return (
    <div className="col-md-6 col-lg-4 fade-anim" data-delay={card.delay}>
      <div className={card.overlay ? "testimonial1__img-card overlay" : "testimonial1__img-card"}>
        <Image className="main-img" src={card.thumb.src} alt={card.thumb.alt} />
        {card.title && card.videoHref ? (
          <div className="testimonial1__img-content">
            <div className="title">{card.title}</div>
            <a href={card.videoHref} className="t-btn-play video-popup">
              <PlayCircleIcon />
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TestimonialImageCard;
