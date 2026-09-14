import Link from "next/link";
import type { CourseGridCardVariant, CourseGridItem } from "@/types/inner/courses";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import StarEmptyIcon from "@/icons/StarEmptyIcon";
import StarFullIcon from "@/icons/StarFullIcon";
import StarHalfIcon from "@/icons/StarHalfIcon";
import LessonsIcon from "@/icons/LessonsIcon";
import StudentsIcon from "@/icons/StudentsIcon";
import Icon897f4030 from "@/icons/Icon897f4030";


const starKinds = (rating: string): Array<"full" | "half" | "empty"> => {
  if (rating.startsWith("5/")) return ["full", "full", "full", "full", "full"];
  if (rating.startsWith("4.9")) return ["full", "full", "full", "full", "half"];
  if (rating.startsWith("3/")) return ["full", "full", "full", "empty", "empty"];
  return ["full", "full", "full", "full", "half"];
};

const Star = ({ kind }: { kind: "full" | "half" | "empty" }) => {
  if (kind === "empty") return <StarEmptyIcon />;
  if (kind === "half") return <StarHalfIcon />;
  return <StarFullIcon />;
};

type CourseGridCardProps = {
  course: CourseGridItem;
  colClass: string;
  variant: CourseGridCardVariant;
};

const CourseGridCard = ({ course, colClass, variant }: CourseGridCardProps) => {
  const isClassic = variant === "classic";

  return (
    <div className={colClass}>
      <div className={isClassic ? "courses1__card without-img-border" : "courses1__card"}>
        <div className={isClassic ? "courses1__thumb m-0 bblr-0 bbrr-0" : "courses1__thumb without-img-border"}>
          <Link href={course.href}>
            <Image
              className={isClassic ? "bblr-0 bbrr-0" : undefined}
              src={course.thumb}
              alt={course.alt}
            />
          </Link>
        </div>
        <div className="courses1__content">
          <div className="courses1__meta-top">
            <span className="rating">
              {course.rating}
              {starKinds(course.rating).map((kind, index) => (
                <Star key={`${course.clipId}-star-${index}`} kind={kind} />
              ))}
            </span>
            <span className="author">
              By <strong>{course.author}</strong>
            </span>
          </div>
          <h3 className="courses1__title">
            <Link href={course.href}>{course.title}</Link>
          </h3>
          <div className={isClassic ? "courses1__meta-bottom gap-18" : "courses1__meta-bottom"}>
            <span>
              <LessonsIcon />
              {course.lessons}
            </span>
            {isClassic && course.courses ? (
              <span>
                <Icon897f4030 />
                {course.courses}
              </span>
            ) : null}
            <span>
              <StudentsIcon />
              {course.students}
            </span>
          </div>
        </div>
        <div className="courses1__footer">
          <div className="price">
            <span className="current">{course.price}</span>
            {course.oldPrice ? <span className="old">{course.oldPrice}</span> : null}
          </div>
          <Link
            href={course.href}
            className={isClassic ? "courses1__btn-arrow mt-10" : "courses1__btn-arrow"}
          >
            <ArrowOutwardIcon fill="#0082E4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseGridCard;
