import { eLearningBrandContent } from "@/content/demos/e-learning/home";
import DotIconaaf8 from "@/icons/DotIconaaf8";
import Icon055583c0 from "@/icons/Icon055583c0";
import Icon0dfd9a8e from "@/icons/Icon0dfd9a8e";
import Icon6889c12a from "@/icons/Icon6889c12a";
import Icon8ace96a2 from "@/icons/Icon8ace96a2";
import Icon9b7826bf from "@/icons/Icon9b7826bf";
import Iconb2afec7d from "@/icons/Iconb2afec7d";
import Iconefda51d1 from "@/icons/Iconefda51d1";
import Iconf96f0866 from "@/icons/Iconf96f0866";

const BrandSection = () => {
  const { subtitle, titleBefore, titleHighlight } = eLearningBrandContent;

  return (
    <section className="brand2">
      <div className="container">
        <div className="brand2__wrap section-padding">
          <div
            className="row align-items-center d-flex justify-content-between"
          >
            <div className="col-lg-3">
              <div className="brand2__content">
                <div className="section-top text-start mb-xl-0">
                  <span className="section-top__subtitle px-12">
                    <DotIconaaf8 />

                    {subtitle}</span>
                  <h2 className="section-top__title word-anim">
                    {titleBefore}
                    <span> {titleHighlight} </span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-9 fade-anim">
              <div className="row brand2__grid-row g-10">
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Iconb2afec7d />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Icon8ace96a2 />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Iconefda51d1 />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Icon6889c12a />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Iconf96f0866 />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Icon0dfd9a8e fill="#0065B5" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Icon055583c0 />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="brand2__item">
                    <Icon9b7826bf />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
