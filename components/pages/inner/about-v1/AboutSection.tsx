import { Fragment } from "react";
import { aboutV1AboutContent } from "@/content/inner/about-v1";
import Image from "next/image";
import Icon63224449 from "@/icons/Icon63224449";
import Icon665517df from "@/icons/Icon665517df";
import Icon6850d5c2 from "@/icons/Icon6850d5c2";
import Icon7f069a0b from "@/icons/Icon7f069a0b";

const AboutSection = () => {
  const about = aboutV1AboutContent;

  return (
    <section className="about-section section-padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="about-section__thumbs">
              <div className="thumb thumb-one">
                <Image
                  src={about.thumbs[0].src}
                  alt={about.thumbs[0].alt}
                />
              </div>
              <div className="thumb thumb-two">
                <Image
                  src={about.thumbs[1].src}
                  alt={about.thumbs[1].alt}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row row-padding-top">
          <div className="col-12">
            <div className="about-section__content">
              <div className="section-header v3">
                <span className="sub-title">
                  <span className="material-symbols-sharp filled size-20"
                    >school</span>
                  {about.subtitle}
                </span>
                <h2 className="title move-anim">
                  {about.titleLines.map((line, index) => (
                    <Fragment key={`${line.before}-${index}`}>
                      {index > 0 ? <br /> : null}
                      <span className="title-line">
                        {line.before}
                        {line.highlight ? <span>{line.highlight}</span> : null}
                        {line.after}
                      </span>
                    </Fragment>
                  ))}
                </h2>
                <p
                  className="text fade-anim"
                  data-stagger="0.15"
                  data-translatey="30"
                >
                  {about.paragraphs[0]}
                </p>
                <p
                  className="text fade-anim"
                  data-stagger="0.15"
                  data-translatey="30"
                >
                  {about.paragraphs[1]}
                </p>
              </div>
              <div
                className="about-section__info-card fade-anim"
                data-stagger="0.15"
                data-translatey="30"
              >
                <div className="info-card-top">
                  <p className="percentage">{about.satisfaction}<span>%</span></p>
                  <p className="text">{about.satisfactionLabel}</p>
                </div>
                <div className="info-card-divider"></div>
                <div className="info-card-bottom">
                  <div className="rating-wrap">
                    <span className="rating-number">{about.rating}</span>
                    <div className="stars">
                      <span className="material-symbols-sharp filled"
                        >star</span>
                      <span className="material-symbols-sharp filled"
                        >star</span>
                      <span className="material-symbols-sharp filled"
                        >star</span>
                      <span className="material-symbols-sharp filled"
                        >star</span>
                      <span className="material-symbols-sharp">star</span>
                    </div>
                  </div>
                  <p className="trusted-text">
                    {about.trustedBefore}<span>{about.trustedHighlight}</span>{about.trustedAfter}
                  </p>
                </div>
                <div className="info-card-image">
                  <Image
                    src={about.infoThumb.src}
                    alt={about.infoThumb.alt}
                  />
                </div>
              </div>
            </div>
            <div className="about-section__items fade-anim">
              <div className="about-section__item">
                <div className="item-inner">
                  <div className="item-icon">
                    <Icon665517df />
                  </div>
                  <div className="item-body">
                    <div className="acheved-number">
                      <span className="odometer-num" data-final={about.stats[0].value}
                        >0</span>
                      <span>{about.stats[0].suffix}</span>
                    </div>
                    <h6 className="acheved-title">{about.stats[0].title}</h6>
                  </div>
                </div>
              </div>
              <div className="about-section__item">
                <div className="item-inner">
                  <div className="item-icon">
                    <Icon63224449 />
                  </div>
                  <div className="item-body">
                    <div className="acheved-number">
                      <span className="odometer-num" data-final={about.stats[1].value}
                        >0</span>
                      <span>{about.stats[1].suffix}</span>
                    </div>
                    <h6 className="acheved-title">{about.stats[1].title}</h6>
                  </div>
                </div>
              </div>
              <div className="about-section__item">
                <div className="item-inner">
                  <div className="item-icon">
                    <Icon7f069a0b />
                  </div>
                  <div className="item-body">
                    <div className="acheved-number">
                      <span className="odometer-num" data-final={about.stats[2].value}
                        >0</span>
                      <span>{about.stats[2].suffix}</span>
                    </div>
                    <h6 className="acheved-title">{about.stats[2].title}</h6>
                  </div>
                </div>
              </div>
              <div className="about-section__item">
                <div className="item-inner">
                  <div className="item-icon">
                    <Icon6850d5c2 />
                  </div>
                  <div className="item-body">
                    <div className="acheved-number">
                      <span className="odometer-num" data-final={about.stats[3].value}
                        >0</span>
                      <span>{about.stats[3].suffix}</span>
                    </div>
                    <h6 className="acheved-title">{about.stats[3].title}</h6>
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

export default AboutSection;
