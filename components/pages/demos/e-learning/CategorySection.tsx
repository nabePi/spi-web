import Link from "next/link";
import CategoryCard from "@/components/pages/demos/e-learning/CategoryCard";
import { eLearningCategoryContent } from "@/content/demos/e-learning/home";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIconaaf8 from "@/icons/DotIconaaf8";

const CategorySection = () => {
  const content = eLearningCategoryContent;

  return (
    <section className="category2">
      <div className="container">
        <div className="category2__wrap section-padding">
          <div
            className="row g-5 align-items-center d-flex justify-content-between"
          >
            <div className="col-lg-4">
              <div className="category2__content">
                <div className="section-top text-start mb-0">
                  <span className="section-top__subtitle px-12">
                    <DotIconaaf8 />

                    {content.subtitle}</span>
                  <h2 className="section-top__title word-anim">
                    {content.title}
                  </h2>
                </div>
                <p className="category2__desc">
                  {content.desc}
                </p>
                <Link href={content.cta.href} className="theme-btn">
                  <span className="text">{content.cta.label}</span>
                  <span className="icon"
                    ><ArrowOutwardIcon fill="#F8F5F2" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-lg-7 pe-xl-1 ps-xl-3">
              <div className="row category2__grid-row">
                {content.items.map((item) => (
                  <CategoryCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
