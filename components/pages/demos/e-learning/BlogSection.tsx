import Link from "next/link";
import { eLearningBlogContent } from "@/content/demos/e-learning/home";
import BlogCard from "@/components/pages/demos/e-learning/BlogCard";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIconaaf8 from "@/icons/DotIconaaf8";

const BlogSection = () => {
  const { subtitle, titleLine1, titleLine2, titleHighlight, cta, items } =
    eLearningBlogContent;

  return (
    <section className="blog2 section-padding">
      <div className="container">
        <div className="section-top text-center">
          <span className="section-top__subtitle px-12">
            <DotIconaaf8 />
            {subtitle}
          </span>
          <h2 className="section-top__title word-anim">
            {titleLine1} <br />
            {titleLine2}
            <span>{titleHighlight}</span>
          </h2>
        </div>

        <div className="row g-35">
          {items.map((item) => (
            <BlogCard key={item.title} item={item} />
          ))}
        </div>

        <div className="text-center mt-60 fade-anim" data-delay="0.40">
          <Link href={cta.href} className="theme-btn theme-btn--white">
            <span className="text">{cta.label}</span>
            <span className="icon">
              <ArrowOutwardIcon fill="#F2F5F8" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
