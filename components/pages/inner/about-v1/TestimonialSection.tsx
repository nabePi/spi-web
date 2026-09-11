import { aboutV1TestimonialContent } from "@/content/inner/about-v1";
import TestimonialQuoteCard from "@/components/pages/inner/about-v1/TestimonialQuoteCard";
import TestimonialImageCard from "@/components/pages/inner/about-v1/TestimonialImageCard";
import Image from "next/image";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const TestimonialSection = () => {
  const testimonial = aboutV1TestimonialContent;

  return (
    <section className="testimonial1 section-padding">
      <div className="container">
        {/* Section Heading */}
        <div className="row justify-content-center">
          <div className="col-lg-5 fade-anim" data-delay="0.30">
            <div className="section-top text-center">
              <span className="section-top__subtitle"
                ><SectionBooksIcon />
                {testimonial.subtitle}</span>
              <h2 className="section-top__title move-anim">
                {testimonial.titleBefore}
                <span>{testimonial.titleHighlight}</span>
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
          {testimonial.items.map((item) =>
            item.kind === "quote" ? (
              <TestimonialQuoteCard key={`${item.authorName}-${item.delay}`} card={item} />
            ) : (
              <TestimonialImageCard key={`${item.thumb.src}-${item.delay}`} card={item} />
            )
          )}
        </div>

        {/* Bottom Widget */}
        <div className="row">
          <div className="col-12 text-center">
            <div className="testimonial1__widget">
              <div className="testimonial1__avatars">
                {testimonial.widget.avatars.map((avatar) => (
                  <Image key={avatar.src.src} src={avatar.src} alt={avatar.alt} />
                ))}
              </div>
              <div className="testimonial1__widget-text">
                <div className="stars">
                  <span>{testimonial.widget.rating}</span>
                  <StarFiveIcon />

                  <StarFiveIcon />

                  <StarFiveIcon />

                  <StarFiveIcon />

                  <StarAltIcon />
                </div>
                <div className="label">
                  <span className="number">{testimonial.widget.number}</span>
                  {testimonial.widget.label}
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
