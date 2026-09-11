import { eLearningTestimonialContent } from "@/content/demos/e-learning/home";
import TestimonialCard from "@/components/pages/demos/e-learning/TestimonialCard";
import DotIconaaf8 from "@/icons/DotIconaaf8";

const TestimonialSection = () => {
  const { subtitle, titleLine1, titleLine2, titleHighlight, items } =
    eLearningTestimonialContent;

  return (
    <section className="testimonial2 section-padding">
      <div className="container">
        <div className="section-top text-center">
          <span className="section-top__subtitle px-12">
            <DotIconaaf8 />
            {subtitle}
          </span>
          <h2 className="section-top__title word-anim">
            {titleLine1} <br />
            {titleLine2}
            <span>{titleHighlight}</span>
          </h2>
        </div>

        <div className="testimonial2__list">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
