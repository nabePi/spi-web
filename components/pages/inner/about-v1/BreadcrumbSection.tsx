import { Fragment } from "react";
import Link from "next/link";
import { aboutV1BreadcrumbContent } from "@/content/inner/about-v1";
import Image from "next/image";
import Icond37aeee4 from "@/icons/Icond37aeee4";

const BreadcrumbSection = () => {
  const breadcrumb = aboutV1BreadcrumbContent;

  return (
    <section className="breadcrumb1 v2">
      <div className="breadcrumb1__bg">
        <Image
          src={breadcrumb.bg.src}
          alt={breadcrumb.bg.alt}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb1__content text-center">
              <ul className="breadcrumb1__list">
                {breadcrumb.items.map((item, index) => {
                  const isLast = index === breadcrumb.items.length - 1;
                  return (
                    <Fragment key={`${item.label}-${index}`}>
                      {index > 0 && (
                        <li className="separator">
                          <Icond37aeee4 />
                        </li>
                      )}
                      <li className={isLast ? "current" : undefined}>
                        {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
              <h1 className="breadcrumb1__title">{breadcrumb.title}</h1>
              <p className="breadcrumb1__text">
                {breadcrumb.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbSection;
