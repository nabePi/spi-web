import Link from "next/link";
import { eLearningHeroContent } from "@/content/demos/e-learning/home";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import ArrowOutwardSmIcon from "@/icons/ArrowOutwardSmIcon";
import Icon4b6bf082 from "@/icons/Icon4b6bf082";
import Icona174edad from "@/icons/Icona174edad";
import Iconf0980b2a from "@/icons/Iconf0980b2a";
import StarAltIcon from "@/icons/StarAltIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";

const HeroSection = () => {
  const hero = eLearningHeroContent;

  return (
    <section className="hero2">
      <div className="hero2__bg">
        <Image src={hero.bg.src} alt={hero.bg.alt} />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero2__content">
              <div className="hero2__badge">
                <span>{hero.badgePrefix}</span> {hero.badgeText}
              </div>
              <h1 className="hero2__title move-anim">
                {hero.titleBefore}
                <span>{hero.titleHighlight}</span>
              </h1>
              <p className="hero2__text fade-anim" data-delay="0.30">
                {hero.text}
              </p>
              <div className="hero2__btns">
                <Link href={hero.primaryCta.href} className="theme-btn button-bg-white">
                  <span className="text">{hero.primaryCta.label}</span>
                  <span className="icon">
                    <ArrowOutwardIcon />
                  </span>
                </Link>
                <Link href={hero.secondaryCta.href} className="theme-btn theme-btn--light">
                  <span className="text">{hero.secondaryCta.label}</span>
                  <ArrowOutwardSmIcon fill="white" />
                </Link>
              </div>
              <div className="hero2__features">
                <div className="hero2__feature-item">
                  <span className="icon">
                    <Iconf0980b2a />
                  </span>
                  {hero.features[0].label}
                </div>
                <div className="hero2__feature-item">
                  <span className="icon">
                    <Icona174edad />
                  </span>
                  {hero.features[1].label}
                </div>
                <div className="hero2__feature-item">
                  <span className="icon">
                    <Icon4b6bf082 />
                  </span>
                  {hero.features[2].label}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero2__thumb">
              <div className="hero2__thumb-img">
                <Image
                  src={hero.thumb.src}
                  alt={hero.thumb.alt}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="hero2__card">
                <div className="hero2__card-users">
                  {hero.users.map((user) => (
                    <div className="user" key={user.src.src}>
                      <Image src={user.src} alt={user.alt} />
                    </div>
                  ))}
                </div>
                <div className="hero2__card-info">
                  <div className="rating">
                    <span>{hero.rating}</span>
                    <div className="stars">
                      <StarFiveIcon />
                      <StarFiveIcon />
                      <StarFiveIcon />
                      <StarFiveIcon />

                      <StarAltIcon />
                    </div>
                  </div>
                  <p className="text">{hero.learnersText}</p>
                </div>
              </div>
              <div className="hero2__thumb-pattern">
                <Image src={hero.pattern.src} alt={hero.pattern.alt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
