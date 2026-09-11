import Link from "next/link";
import { eLearningPackagesContent } from "@/content/demos/e-learning/home";
import PackageCard from "@/components/pages/demos/e-learning/PackageCard";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIcon9877 from "@/icons/DotIcon9877";

const CoursesPackageSection = () => {
  const { bg, subtitle, titleBefore, titleHighlight, titleAfter, cta, items } =
    eLearningPackagesContent;

  return (
    <div className="courses1 section-padding">
      <div className="courses1__bg">
        <Image src={bg.src} alt={bg.alt} />
      </div>
      <div className="container">
        {/* Section Heading */}
        <div className="row g-4 justify-content-center">
          <div className="col-lg-8 text-center fade-anim" data-delay="0.30">
            <div className="section-top text-center mb-50">
              <span className="section-top__subtitle px-12">
                <DotIcon9877 />
                {subtitle}
              </span>
              <h2 className="section-top__title word-anim" data-delay="0.45">
                {titleBefore}
                <span> {titleHighlight} </span>
                <br />
                {titleAfter}
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-20 mb-2 fade-anim">
          {items.map((item, index) => (
            <PackageCard key={`package-${index}`} item={item} />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="bottom-btn-wrapper mt-60 fade-anim" data-delay="0.60">
          <Link href={cta.href} className="theme-btn">
            <span className="text">{cta.label}</span>
            <span className="icon"
              ><ArrowOutwardIcon fill="#1A453B" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesPackageSection;
