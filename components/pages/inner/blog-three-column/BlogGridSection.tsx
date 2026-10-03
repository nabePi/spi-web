import { blogThreeColumnGridContent } from "@/content/inner/blog-three-column";
import BlogCard from "@/components/pages/inner/blog-three-column/BlogCard";
import ListingPagination from "@/components/shared/ListingPagination";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";
import { getPublishedArticles } from "@/lib/getArticles";
import defaultAuthorThumb from "@/public/assets/imgs/placeholder/blog-user2_1.svg";

const BlogGridSection = async () => {
  const cmsResult = await getPublishedArticles({ limit: 12 });
  const hasCmsArticles = cmsResult.docs.length > 0;

  const displayItems = hasCmsArticles
    ? cmsResult.docs.map((doc, idx) => ({
        href: `/blog-details-standard`,
        category: doc.category?.name || "Artikel",
        thumb: {
          src: doc.featuredImage?.url || "/assets/imgs/inner/blog/spi-adab-blocks.webp",
          alt: doc.featuredImage?.alt || doc.title,
        },
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
        delay: (0.1 * ((idx % 3) + 1)).toFixed(2),
      }))
    : blogThreeColumnGridContent.items;

  return (
    <div className="blog-grid section-padding">
      <div className="container">
        <div className="row gx-35 gy-60">
          {displayItems.map((item, idx) => (
            <BlogCard
              key={typeof item.thumb.src === "string" ? `${item.thumb.src}-${idx}` : item.thumb.src.src}
              item={item}
            />
          ))}
        </div>

        <ListingPagination items={blogThreeColumnGridContent.pagination} nextIcon={<ArrowForwardIcon />} />
      </div>
    </div>
  );
};

export default BlogGridSection;
