import { blogDetailsStandardRelatedContent } from "@/content/inner/blog-details-standard";
import RelatedBlogCard from "@/components/pages/inner/blog-details-standard/RelatedBlogCard";

const RelatedBlogSection = () => {
  const { title, items } = blogDetailsStandardRelatedContent;

  return (
    <section
      className="related-blog section-padding pt-0 fade-anim"
      data-delay="0.10"
    >
      <div className="container">
        <div className="section-top text-start">
          <h2 className="section-top__title">{title}</h2>
        </div>
        <div className="related-blog__slider swiper">
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <RelatedBlogCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogSection;
