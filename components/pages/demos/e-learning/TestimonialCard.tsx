import type { ReactNode } from "react";
import type { TestimonialItem } from "@/types/demos/e-learning/home";
import Image from "next/image";
import Icon0f4d0427 from "@/icons/Icon0f4d0427";
import Icon3e85322e from "@/icons/Icon3e85322e";
import Icon9b45a496 from "@/icons/Icon9b45a496";
import Icona66d259b from "@/icons/Icona66d259b";
import Iconb2afec7d from "@/icons/Iconb2afec7d";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const logoOverlays: Record<TestimonialItem["id"], ReactNode> = {
  emily: (
    <Icon3e85322e className="logo-overlay" />
  ),
  eleanor: (
    <Icon0f4d0427 className="logo-overlay" />
  ),
};

const brandLogos: Record<TestimonialItem["id"], ReactNode> = {
  emily: (
    <Icon9b45a496 className="brand-logo" />
  ),
  eleanor: (
    <Iconb2afec7d className="brand-logo" />
  ),
};

const TestimonialCard = ({ item }: { item: TestimonialItem }) => {
  return (
    <div className="testimonial2__card fade-anim" data-delay={item.delay}>
      <div className="testimonial2__thumb">
        <Image src={item.thumb.src} alt={item.thumb.alt} />
        {logoOverlays[item.id]}
      </div>
      <div className="testimonial2__content">
        <div className="testimonial2__content-top">
          <Icona66d259b className="testimonial2__bg-quote" />

          <div className="testimonial2__rating">
            <span>{item.rating}</span>
            <div className="stars">
              <StarFiveIcon />

              <StarFiveIcon />

              <StarFiveIcon />

              <StarFiveIcon />

              <StarAltIcon />
            </div>
          </div>

          <h3 className="testimonial2__quote-text">{item.quote}</h3>
        </div>

        <div className="testimonial2__author-box">
          <div className="author-info">
            <Image src={item.author.src} alt={item.author.alt} />
            <div className="author-info__content">
              <div className="author-info__content-name">{item.authorName}</div>
              <p className="author-info__content-designation">
                {item.designation}
              </p>
            </div>
          </div>

          {brandLogos[item.id]}
        </div>
      </div>
      <div className="testimonial2__stats-box">
        <div className="testimonial2__avatars">
          {item.avatars.map((avatar) => (
            <Image
              key={avatar.src.src}
              src={avatar.src}
              className="avatar"
              alt={avatar.alt}
            />
          ))}
          <span className="label">{item.studentsLabel}</span>
        </div>
        <div className="testimonial2__avatars-bottom">
          <h2 className="testimonial2__number">{item.statNumber}</h2>
          <p className="testimonial2__label">{item.statLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
