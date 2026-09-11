import Link from "next/link";
import type { CourseCardData } from "@/types/demos/e-learning/home";
import Image from "next/image";
import Iconba405c8e from "@/icons/Iconba405c8e";
import LessonsIcon4c8f from "@/icons/LessonsIcon4c8f";

export type { CourseCardData };

const starIcon = (kind: "full" | "half" | "empty") => {
  if (kind === "full") return "star_purple500";
  if (kind === "half") return "star_half";
  return "star";
};

const CourseCard = ({ course }: { course: CourseCardData }) => {
  const clipId = `clip-elearn-${course.title.replace(/\s+/g, "-").toLowerCase()}`;
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index + 1 <= Math.floor(course.ratingValue)) return "full" as const;
    if (index < course.ratingValue) return "half" as const;
    return "empty" as const;
  });

  return (
    <div className="col-xl-3 col-md-6">
      <div className="courses-six__item v2">
        <Link href={course.href} className="item-thumb">
          <Image src={course.thumb} alt={course.title} />
          {course.offer ? <span className="tag">{course.offer}</span> : null}
        </Link>
        <div className="item-content">
          <div className="content-header">
            <div className="content-meta-top">
              <div className="rating">
                <span className="rating-text">{course.rating}</span>
                <ul>
                  {stars.map((kind, index) => (
                    <li key={`${course.title}-star-${index}`}>
                      <span className="material-icons-outlined">{starIcon(kind)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="author">
                <em className="author-text">by</em>&nbsp;
                <span className="author-name">{course.author}</span>
              </div>
            </div>
            <h2 className="content-title">
              <Link href={course.href}>{course.title}</Link>
            </h2>
          </div>
          <div className="content-footer">
            <div className="content-meta-bottom">
              <div className="meta-item lesson-meta">
                <span className="mata-icon">
                  <LessonsIcon4c8f />
                </span>
                <span className="meta-text"> {course.lessons} </span>
              </div>
              <div className="meta-item student-meta">
                <span className="mata-icon">
                  <Iconba405c8e />
                </span>
                <span className="meta-text"> {course.students} </span>
              </div>
            </div>
            <div className="content-footer-bottom">
              <span className="price">
                <ins>{course.price}</ins>
                {course.oldPrice ? <del>{course.oldPrice}</del> : null}
              </span>
              <Link href={course.href} className="button-square">
                <span className="material-symbols-sharp">arrow_outward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
