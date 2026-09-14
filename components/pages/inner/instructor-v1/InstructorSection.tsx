import Link from "next/link";
import { instructorV1InstructorContent } from "@/content/inner/instructor-v1";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icon330f6f20 from "@/icons/Icon330f6f20";
import Icon599fa41f from "@/icons/Icon599fa41f";
import Icon6458ca62 from "@/icons/Icon6458ca62";
import Icon7f069a0b from "@/icons/Icon7f069a0b";
import Iconbb251fcb from "@/icons/Iconbb251fcb";
import Iconeb2b15f0 from "@/icons/Iconeb2b15f0";

const InstructorSection = () => {
  const { bg, subtitle, titleBefore, titleHighlight, text, cta, thumb, stats } =
    instructorV1InstructorContent;
  const instructorsStat = stats[0];
  const studentsStat = stats[1];

  return (
    <section className="instructor1 v2">
      <div className="instructor1__bg">
        <Image
          src={bg.src}
          alt={bg.alt}
        />
      </div>
      <div className="container">
        <div className="instructor1__wrap">
          <div className="row gy-5 align-items-center">
            {/* Left: Content */}
            <div className="col-lg-5 col-md-6 pe-xl-5">
              <div className="instructor1__content">
                <div className="section-top text-start mb-0">
                  <span className="section-top__subtitle">
                    <Iconbb251fcb />

                    {subtitle}
                  </span>
                  <h2
                    className="section-top__title move-anim"
                    data-delay="0.45"
                  >
                    {titleBefore}
                    <span>{titleHighlight}</span>
                  </h2>

                  <p className="section-top__text">
                    {text}
                  </p>
                </div>

                <div className="instructor1__actions">
                  <Link href={cta.href} className="theme-btn button-bg-whitev2">
                    <span className="text">{cta.label}</span>
                    <span className="icon"
                      ><ArrowOutwardIcon fill="#0065B5" />
                    </span>
                  </Link>
                  <div className="instructor1__badges">
                    {/* Badge 1: Laurel wreath */}
                    <div className="instructor1__badge-seal">
                      <Icon599fa41f fill="#0065B5" />
                    </div>
                    {/* Badge 2: ULTRA badge */}
                    <div className="instructor1__badge-seal">
                      <Icon330f6f20 fill="#0065B5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Thumb */}
            <div className="col-lg-7 col-md-6 position-relative">
              <div className="instructor1__thumb-wrap">
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  className="instructor1__thumb"
                />

                <div className="instructor1__thumb-bg1"></div>
                <div className="instructor1__thumb-bg2"></div>

                {/* Stat Card: Instructors */}
                <div
                  className="instructor1__stat instructor1__stat--instructors"
                >
                  <div className="instructor1__stat-icon">
                    <Icon6458ca62 fill="white" />
                  </div>
                  <div className="instructor1__stat-info">
                    <strong className="instructor1__stat-num">{instructorsStat.value}</strong>
                    <span className="instructor1__stat-label"
                      >{instructorsStat.label}</span>
                  </div>
                </div>

                {/* Stat Card: Students */}
                <div
                  className="instructor1__stat instructor1__stat--students"
                >
                  <div className="instructor1__stat-icon">
                    <Icon7f069a0b />
                  </div>
                  <div className="instructor1__stat-info">
                    <strong className="instructor1__stat-num">{studentsStat.value}</strong>
                    <span className="instructor1__stat-label">{studentsStat.label}</span>
                  </div>
                </div>

                {/* Floating book icon bubble */}
                <div className="instructor1__bubble">
                  <Iconeb2b15f0 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Doodle pattern */}
      <div className="instructor1__pattern" aria-hidden="true"></div>
    </section>
  );
};

export default InstructorSection;
