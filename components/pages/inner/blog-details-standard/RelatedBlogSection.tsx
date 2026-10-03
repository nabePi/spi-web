import { blogDetailsStandardRelatedContent } from "@/content/inner/blog-details-standard";
import RelatedBlogCard from "@/components/pages/inner/blog-details-standard/RelatedBlogCard";
import type { ArticleDoc } from "@/lib/getArticles";
import defaultAuthorThumb from "@/public/assets/imgs/placeholder/blog-user2_1.svg";

interface Props {
  relatedArticles?: ArticleDoc[];
}

const RelatedBlogSection = ({ relatedArticles }: Props) => {
  const hasCmsRelated = relatedArticles && relatedArticles.length > 0;

  const items = hasCmsRelated
    ? relatedArticles.map((doc) => ({
        href: `/blog/${doc.slug}`,
        category: doc.category?.name || "Artikel",
        categoryLinked: true,
        thumb: {
          src: doc.featuredImage?.url || "/assets/imgs/inner/blog/spi-adab-blocks.webp",
          alt: doc.featuredImage?.alt || doc.title,
        },
        thumbLinked: true,
        author: {
          src: doc.author?.photo?.url || defaultAuthorThumb,
          alt: doc.author?.name || "Penulis",
        },
        authorName: doc.author?.name || "Redaksi SPI",
        date: doc.publishedAt
          ? new Date(doc.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Baru saja",
        title: doc.title,
        linkedMeta: true,
      }))
    : blogDetailsStandardRelatedContent.items;

  return (
    <section
      className="related-blog section-padding pt-0 fade-anim"
      data-delay="0.10"
    >
      <div className="container">
        <div className="section-top text-start">
          <h2 className="section-top__title">{blogDetailsStandardRelatedContent.title}</h2>
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
