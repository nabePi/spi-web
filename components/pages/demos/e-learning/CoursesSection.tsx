import Link from "next/link";
import CourseCard from "@/components/pages/demos/e-learning/CourseCard";
import { eLearningCoursesContent } from "@/content/demos/e-learning/home";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIcon9877 from "@/icons/DotIcon9877";

const CoursesSection = () => {
  const { subtitle, titleBefore, titleHighlight, cta, items } = eLearningCoursesContent;

  return (
    <div className="courses1 bg-white section-padding">
      <div className="container container-1330">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-8 text-center fade-anim" data-delay="0.30">
            <div className="section-top text-center">
              <span className="section-top__subtitle px-12">
                <DotIcon9877 />
                {subtitle}
              </span>
              <h2 className="section-top__title move-anim" data-delay="0.45">
                {titleBefore}
                <br />
                started <span> {titleHighlight} </span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-10 mb-2">
          {items.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>

        <div className="bottom-btn-wrapper mt-60 fade-anim" data-delay="0.60">
          <Link href={cta.href} className="theme-btn bg-white">
            <span className="text">{cta.label}</span>
            <span className="icon">
              <ArrowOutwardIcon fill="#1A453B" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
