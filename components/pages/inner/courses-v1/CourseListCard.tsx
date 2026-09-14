import Link from "next/link";
import type { CourseListItem } from "@/types/inner/courses";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icond177e7fb from "@/icons/Icond177e7fb";
import LessonsIcon2ecc from "@/icons/LessonsIcon2ecc";
import StudentsIcon from "@/icons/StudentsIcon";
import StarEmptyIcon from "@/icons/StarEmptyIcon";
import StarFullIcon from "@/icons/StarFullIcon";
import StarHalfIcon from "@/icons/StarHalfIcon";
import LessonsIcon from "@/icons/LessonsIcon";
import Icon897f4030 from "@/icons/Icon897f4030";

const fullStarPath =
  "M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z";
const halfStarPath =
  "M7.67083 8.6625L7.18958 6.5625L8.80833 5.1625L6.67917 4.97292L5.83333 2.98958V7.53958L7.67083 8.6625ZM2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z";
const emptyStarPath =
  "M3.28344 7.90183L5.12094 6.7935L6.95844 7.91642L6.47719 5.81642L8.09594 4.41642L5.96677 4.22683L5.12094 2.2435L4.2751 4.21225L2.14594 4.40183L3.76469 5.81642L3.28344 7.90183ZM1.95635 9.73146L2.79212 6.13273L0 3.71306L3.6839 3.3934L5.12094 0L6.55798 3.3934L10.2419 3.71306L7.44975 6.13273L8.28552 9.73146L5.12094 7.82221L1.95635 9.73146Z";

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

type CourseListCardProps = {
  course: CourseListItem;
  cardClass?: string;
};

const CourseListCard = ({ course, cardClass = "courses2__card" }: CourseListCardProps) => {
  return (
    <div className={cardClass}>
      <div className="courses2__thumb">
        <div className="courses2__thumb-bg">
          <Image src={course.thumb} alt={course.alt} />
        </div>
      </div>
      <div className="courses2__card-content">
        <div className="courses2__info">
          <div className="courses2__info-top">
            <div className="courses2__rating">
              <span className="score">{course.rating}</span>
              <ul className="stars">
                {starKinds(course.rating).map((kind, index) => (
                  <li key={`${course.title}-star-${index}`}>
                    <Star kind={kind} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="courses2__level">{course.level}</div>
        </div>
        <div className="courses2__title">
          <Link href={course.href}>{course.title}</Link>
        </div>
        <div className="courses2__details">
          <div className="courses2__detail-item">
            <LessonsIcon2ecc />
            <span>{course.lessons}</span>
          </div>
          <div className="courses2__detail-item">
            <Icond177e7fb />
            <span>{course.duration}</span>
          </div>
          <div className="courses2__detail-item">
            <StudentsIcon />
            <span>{course.students}</span>
          </div>
          <div className="courses2__price">{course.price}</div>
        </div>
        <div className="courses2__footer">
          <div className="courses2__instructor-info">
            <span className="label">Instructors:</span>
            <span className="name">{course.author}</span>
          </div>
          <Link href={course.href} className="theme-btn">
            <span className="text">View details</span>
            <span className="icon">
              <ArrowOutwardIcon fill="#0065B5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseListCard;
