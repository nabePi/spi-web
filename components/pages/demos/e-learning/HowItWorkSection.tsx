import HowItWorkItem from "@/components/pages/demos/e-learning/HowItWorkItem";
import { eLearningHowItWorkContent } from "@/content/demos/e-learning/home";
import DotIconaaf8 from "@/icons/DotIconaaf8";

const HowItWorkSection = () => {
  const { subtitle, titleBefore, titleHighlight, items } =
    eLearningHowItWorkContent;

  return (
    <section className="how-it-work-2 section-padding">
      <div className="container">
        <div className="section-top text-center">
          <span className="section-top__subtitle px-12">
            <DotIconaaf8 />
            {subtitle}</span>
          <h2 className="section-top__title word-anim">
            {titleBefore} <span>{titleHighlight}</span>
          </h2>
        </div>

        <div className="how-it-work-2__wrapper">
          {items.map((item) => (
            <HowItWorkItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
