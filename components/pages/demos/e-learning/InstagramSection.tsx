import { eLearningInstagramContent } from "@/content/demos/e-learning/home";
import InstagramCard from "@/components/pages/demos/e-learning/InstagramCard";

const InstagramSection = () => {
  const { username, slides } = eLearningInstagramContent;

  return (
    <div className="instagram">
      <div className="container">
        <div className="instagram__wrap section-padding">
          <div className="text-center mb-30 fade-anim">
            <span className="instagram__username">{username}</span>
          </div>
          <div
            className="instagram__slider swiper fade-anim"
            data-delay="0.30"
          >
            <div className="swiper-wrapper">
              {slides.map((slide, index) => (
                <InstagramCard key={`${slide.src}-${index}`} slide={slide} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;
