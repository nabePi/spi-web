import { eLearningAppContent } from "@/content/demos/e-learning/home";
import Image from "next/image";
import DotIcon from "@/icons/DotIcon";
import Icon459f869e from "@/icons/Icon459f869e";
import Icon585d37db from "@/icons/Icon585d37db";

const AppSection = () => {
  const app = eLearningAppContent;

  return (
    <section className="app1">
      <div className="container">
        <div
          className="app1__wrap bg-img"
          style={{ backgroundImage: `url("${app.bg.src}")` }}
        >
          <div className="app1__content fade-anim">
            <div className="section-top text-start">
              <span
                className="section-top__subtitle px-12 text-start text-white"
              >
                <DotIcon />

                {app.subtitle}</span>
              <h2
                className="section-top__title text-start text-white word-anim"
              >
                {app.titleBefore} <span>{app.titleHighlight}</span> {app.titleAfter}
              </h2>
            </div>
            <div className="app1__btns">
              <a href="#" className="app1__btn">
                <Icon585d37db />
              </a>
              <a href="#" className="app1__btn">
                <Icon459f869e />
              </a>
            </div>
          </div>
          <div className="app1__thumb fade-anim" data-delay="0.30">
            <div className="app1__thumb-main">
              <Image src={app.thumb.src} alt={app.thumb.alt} />
            </div>
            <div className="app1__thumb-shape">
              <Image src={app.shape.src} alt={app.shape.alt} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
