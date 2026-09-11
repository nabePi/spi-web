import TestimonialCard from "@/components/pages/inner/instructor-v1/TestimonialCard";
import { instructorV1TestimonialContent } from "@/content/inner/instructor-v1";
import Image from "next/image";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const StarFull = () => (
  <StarFiveIcon />
);

const StarHalf = () => (
  <StarAltIcon />
);

const TestimonialSection = () => {
  const content = instructorV1TestimonialContent;

  return (
    <section className="testimonial1 section-padding">
      <div className="container">
        {/* Section Heading */}
        <div className="row justify-content-center">
          <div className="col-lg-5 fade-anim" data-delay="0.30">
            <div className="section-top text-center">
              <span className="section-top__subtitle"
                ><SectionBooksIcon />
                {content.subtitle}</span>
              <h2 className="section-top__title move-anim">
                {content.titleBefore}
                <span>{content.titleHighlight}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className="row g-4 fade-anim"
          data-stagger="0.10"
          data-translatey="30"
        >
          {content.items.map((item, index) => (
            <TestimonialCard key={`${item.kind}-${index}`} item={item} />
          ))}
        </div>

        {/* Bottom Widget */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="testimonial1__widget">
              <div className="testimonial1__avatars">
                {content.widget.avatars.map((avatar) => (
                  <Image key={avatar.src.src} src={avatar.src} alt={avatar.alt} />
                ))}
              </div>
              <div className="testimonial1__widget-text">
                <div className="stars">
                  <span> {content.widget.rating} </span>
                  <StarFull />
                  <StarFull />
                  <StarFull />
                  <StarFull />
                  <StarHalf />
                </div>
                <div className="label">
                  <span className="number">{content.widget.number}</span> {content.widget.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
