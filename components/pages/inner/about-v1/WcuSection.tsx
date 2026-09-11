import WcuCertificationCard from "@/components/pages/inner/about-v1/WcuCertificationCard";
import WcuImageCard from "@/components/pages/inner/about-v1/WcuImageCard";
import WcuInstructorsCard from "@/components/pages/inner/about-v1/WcuInstructorsCard";
import WcuQualityCard from "@/components/pages/inner/about-v1/WcuQualityCard";
import WcuSatisfactionCard from "@/components/pages/inner/about-v1/WcuSatisfactionCard";
import WcuSupportCard from "@/components/pages/inner/about-v1/WcuSupportCard";
import { aboutV1WcuContent } from "@/content/inner/about-v1";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const WcuSection = () => {
  const wcu = aboutV1WcuContent;

  return (
    <section className="wcu1 bg-white">
      <div className="container">
        <div className="wcu1__wrap section-padding">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-8 text-center fade-anim" data-delay="0.30">
              <div className="section-top text-center">
                <span className="section-top__subtitle">
                  <SectionBooksIcon />
                  {wcu.subtitle}
                </span>
                <h2
                  className="section-top__title move-anim"
                  data-delay="0.45"
                >
                  {wcu.titleLine1}
                  <br />{wcu.titleLine2Before}
                  <span>{wcu.titleHighlight}</span>
                </h2>
              </div>
            </div>
          </div>
          <div
            className="wcu1__flex-row mb-10 fade-anim"
            data-stagger="0.15"
            data-translatey="30"
          >
            <WcuQualityCard card={wcu.quality} />
            <WcuCertificationCard card={wcu.certification} />
            <WcuImageCard card={wcu.image} />
            <WcuInstructorsCard card={wcu.instructors} />
            <WcuSupportCard card={wcu.support} />
            <WcuSatisfactionCard card={wcu.satisfaction} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WcuSection;
