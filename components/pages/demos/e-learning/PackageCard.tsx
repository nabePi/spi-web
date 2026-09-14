import Link from "next/link";
import type { CoursePackageItem } from "@/types/demos/e-learning/home";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icon897f4030 from "@/icons/Icon897f4030";
import LessonsIcon from "@/icons/LessonsIcon";
import StarFullIcon from "@/icons/StarFullIcon";
import StarHalfIcon from "@/icons/StarHalfIcon";
import StudentsIcon from "@/icons/StudentsIcon";

const PackageCard = ({ item }: { item: CoursePackageItem }) => {
  return (
    <div className="col-xl-4 col-md-6">
      <div className="courses1__card without-img-border padding-30">
        <div className="courses1__thumb m-0 bblr-0 bbrr-0">
          {item.offer ? <div className="courses1__offer1">{item.offer}</div> : null}
          <Link href={item.href}>
            <Image
              className="bblr-0 bbrr-0"
              src={item.thumb.src}
              alt={item.thumb.alt}
            />
          </Link>
        </div>
        <div className="courses1__content">
          <div className="courses1__meta-top">
            <span className="rating"
              >{item.rating}
              <StarFullIcon />

              <StarFullIcon />

              <StarFullIcon />

              <StarFullIcon />

              <StarHalfIcon />
            </span>
            <span className="author"
              >By <strong>{item.author}</strong></span>
          </div>
          <h3 className="courses1__title">
            <Link href={item.href}>{item.title}</Link>
          </h3>
          <div className="courses1__meta-bottom gap-18">
            <span
              ><LessonsIcon />
              {item.lessons}</span>
            <span>
              <Icon897f4030 />
              {item.courses}</span>
            <span>
              <StudentsIcon />
              {item.students}</span>
          </div>
        </div>
        <div className="courses1__footer">
          <div className="price">
            <span className="current">{item.price}</span>
            <span className="old">{item.oldPrice}</span>
          </div>
          <Link href={item.href} className="courses1__btn-arrow mt-10">
            <ArrowOutwardIcon fill="#0082E4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
