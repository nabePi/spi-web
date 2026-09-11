import { courseDetailsClassicV1RelatedContent } from "@/content/inner/course-details-classic-v1";
import RelatedCourseCard from "@/components/pages/inner/course-details-classic-v1/RelatedCourseCard";

const RelatedCoursesSection = () => {
  const related = courseDetailsClassicV1RelatedContent;

  return (
    <section className="related-courses section-padding pt-0">
      <div className="container">
        <div className="section-top">
          <h2 className="section-top__title text-start">{related.title}</h2>
        </div>
        <div className="row g-20 fade-anim" data-stagger="0.10" data-translatey="30">
          {related.items.map((course, index) => (
            <RelatedCourseCard
              key={`related-${index}`}
              course={course}
              colClass="col-md-6 col-lg-4 col-xl-3"
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCoursesSection;
