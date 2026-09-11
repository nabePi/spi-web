import { Fragment } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import breadcrumbBgPattern from "@/public/assets/imgs/inner/breadcumb/breadcumb-bg-pattern.png";
import Icond37aeee4 from "@/icons/Icond37aeee4";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  variant?: "breadcrumb1" | "breadcrumb1-v2" | "breadcrumb2" | "breadcrumb-kindergarten";
  title: string;
  titleClassName?: string;
  items: BreadcrumbItem[];
  bgPattern?: StaticImageData;
};

const Breadcrumb = ({
  variant = "breadcrumb1",
  title,
  titleClassName,
  items,
  bgPattern = breadcrumbBgPattern,
}: BreadcrumbProps) => {
  const sectionClass =
    variant === "breadcrumb-kindergarten"
      ? "breadcrumb-kindergarten"
      : variant === "breadcrumb2"
        ? "breadcrumb2"
        : variant === "breadcrumb1-v2"
          ? "breadcrumb1 v2"
          : "breadcrumb1";

  return (
    <section className={sectionClass}>
      <div className="breadcrumb1__bg">
        <Image src={bgPattern} alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb1__content text-center">
              <ul className="breadcrumb1__list">
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
              <h1 className={`breadcrumb1__title${titleClassName ? ` ${titleClassName}` : ""}`}>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
