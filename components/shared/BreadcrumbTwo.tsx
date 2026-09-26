import { Fragment } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import breadcrumbBgPattern from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern.png";
import Icon0056b4b0 from "@/icons/Icon0056b4b0";
import Icond37aeee4 from "@/icons/Icond37aeee4";
import StudentsIcon0a68 from "@/icons/StudentsIcon0a68";

type BreadcrumbTwoItem = {
  label: string;
  href?: string;
};

type BreadcrumbTwoProps = {
  title: string;
  titleClassName?: string;
  items: BreadcrumbTwoItem[];
  category: string;
  instructor: string;
  bgPattern?: StaticImageData;
};

const BreadcrumbTwo = ({
  title,
  titleClassName,
  items,
  category,
  instructor,
  bgPattern = breadcrumbBgPattern,
}: BreadcrumbTwoProps) => {
  return (
    <section className="breadcrumb2">
      <div className="breadcrumb2__bg">
        <Image src={bgPattern} alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb2__content">
              <ul className="breadcrumb2__list">
                {items.map((item, index) => {
                  const isLast = index === items.length - 1;
                  return (
                    <Fragment key={`${item.label}-${index}`}>
                      <li className={isLast ? "current" : undefined}>
                        {item.href ? (
                          <Link href={item.href}>{item.label}</Link>
                        ) : (
                          item.label
                        )}
                      </li>
                      {!isLast && (
                        <li className="separator">
                          <Icond37aeee4 />
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
              <h1
                className={
                  titleClassName
                    ? `breadcrumb2__title ${titleClassName}`
                    : "breadcrumb2__title"
                }
              >
                {title}
              </h1>

              <div className="breadcrumb2__meta">
                <div className="breadcrumb2__meta-item">
                  <span className="icon">
                    <Icon0056b4b0 />
                  </span>
                  {category}
                </div>
                <div className="breadcrumb2__meta-item">
                  <span className="icon">
                    <StudentsIcon0a68 fill="white" />
                  </span>
                  {instructor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbTwo;
