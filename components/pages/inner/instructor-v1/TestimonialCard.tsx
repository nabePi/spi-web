import type { ReactNode } from "react";
import type {
  InstructorV1TestimonialItem,
} from "@/types/inner/instructor-v1";
import Image from "next/image";
import Icon4b6dd657 from "@/icons/Icon4b6dd657";
import Icon6c04299e from "@/icons/Icon6c04299e";
import Icon9b45a496 from "@/icons/Icon9b45a496";
import Iconfd0663d3 from "@/icons/Iconfd0663d3";
import PlayCircleIcon from "@/icons/PlayCircleIcon";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const StarFull = () => (
  <StarFiveIcon />
);

const StarHalf = () => (
  <StarAltIcon />
);

const Stars = () => (
  <div className="stars">
    <StarFull />
    <StarFull />
    <StarFull />
    <StarFull />
    <StarHalf />
  </div>
);

const companyLogos: Record<"slack" | "paypal" | "webflow" | "stripe", ReactNode> = {
  slack: (
    <Icon9b45a496 />
  ),
  paypal: (
    <Icon6c04299e />
  ),
  webflow: (
    <Icon4b6dd657 />
  ),
  stripe: (
    <Iconfd0663d3 />
  ),
};

const TestimonialCard = ({ item }: { item: InstructorV1TestimonialItem }) => {
  if (item.kind === "image" && item.overlay) {
    return (
      <div className="col-md-6 col-lg-4 fade-anim" data-delay={item.delay}>
        <div className="testimonial1__img-card overlay">
          <Image
            className="main-img"
            src={item.thumb.src}
            alt={item.thumb.alt}
          />
          <div className="testimonial1__img-content">
            <div className="title">{item.title}</div>
            <a
              href={item.videoHref}
              className="t-btn-play video-popup"
            >
              <PlayCircleIcon />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (item.kind === "image") {
    return (
      <div className="col-md-6 col-lg-4 fade-anim" data-delay={item.delay}>
        <div className="testimonial1__img-card">
          <Image
            className="main-img"
            src={item.thumb.src}
            alt={item.thumb.alt}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-6 col-lg-4 fade-anim" data-delay={item.delay}>
      <div className="testimonial1__card">
        <div className="testimonial1__rating">
          <span>{item.rating}</span>
          <Stars />
        </div>
        <p className="testimonial1__desc">
          {item.quote}
        </p>
        <div className="testimonial1__author-box">
          <div className="testimonial1__author">
            <div className="testimonial1__author-img">
              <Image src={item.author.src} alt={item.author.alt} />
            </div>
            <div className="testimonial1__author-info">
              <div className="name">{item.authorName}</div>
              <span className="designation">{item.designation}</span>
            </div>
          </div>
          <div className="testimonial1__company">
            {companyLogos[item.company]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
