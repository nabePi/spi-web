import type { AboutV1HeroContent } from "@/types/inner/about-v1";
import Image from "next/image";
import Icon996c69f3 from "@/icons/Icon996c69f3";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const FA_ICON_CLASS: Record<string, string> = {
  Facebook: "fa-brands fa-facebook-f icon",
  YouTube: "fa-brands fa-youtube icon",
  X: "fa-brands fa-twitter icon",
};

const HeroSection = ({ content: hero }: { content: AboutV1HeroContent }) => {
  return (
    <section className="instructor-details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="instructor-details__wrapper section-padding-bottom">
              <div className="instructor-details__thumb">
                <Image src={hero.thumb.src} alt={hero.thumb.alt} />
              </div>
              <div className="instructor-details__content">
                <div className="section-top text-start">
                  <span className="section-top__subtitle px-12">
                    <SectionBooksIcon />
                    {hero.subtitle}
                  </span>
                  <h2 className="section-top__title move-anim" data-delay="0.45">
                    {hero.title}
                  </h2>
                </div>

                {hero.since ? (
                  <div className="content-meta">
                    <div className="meta-item">
                      <span className="material-symbols-outlined mata-icon">
                        calendar_month
                      </span>
                      <span className="meta-text">{hero.since}</span>
                    </div>
                  </div>
                ) : null}

                <div className="instructor-details__info row-margin-top">
                  <div className="instructor-details__about">
                    <h4 className="instructor-details__title-sm">{hero.aboutTitle}</h4>
                    <p className="instructor-details__text">{hero.aboutText}</p>
                  </div>

                  <div className="instructor-details__skills">
                    <h4 className="instructor-details__title-sm">{hero.milestonesTitle}</h4>
                    {hero.milestonesItems ? (
                      <ol className="instructor-details__text">
                        {hero.milestonesItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="instructor-details__text">{hero.milestonesText}</p>
                    )}
                    {hero.stats && hero.stats.length > 0 ? (
                      <div className="instructor-details__tags">
                        {hero.stats.map((stat) => (
                          <span className="instructor-tag" key={stat.label}>
                            <span className="material-symbols-outlined icon">{stat.icon}</span>
                            {stat.label}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="instructor-details__socials">
                    <h4 className="instructor-details__title-sm">{hero.followTitle}</h4>
                    <p className="instructor-details__text">{hero.followText}</p>
                    <div className="instructor-details__tags">
                      {hero.socials.map((social) => (
                        <a
                          href={social.href}
                          className="social-tag"
                          key={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {FA_ICON_CLASS[social.label] ? (
                            <i className={FA_ICON_CLASS[social.label]}></i>
                          ) : (
                            <Icon996c69f3 />
                          )}
                          {social.label}
                        </a>
                      ))}
                    </div>
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

export default HeroSection;
