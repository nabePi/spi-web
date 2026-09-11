import { blogThreeColumnGridContent } from "@/content/inner/blog-three-column";
import BlogCard from "@/components/pages/inner/blog-three-column/BlogCard";
import ListingPagination from "@/components/shared/ListingPagination";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";

const BlogGridSection = () => {
  const { items, pagination } = blogThreeColumnGridContent;

  return (
    <div className="blog-grid section-padding">
      <div className="container">
        <div className="row gx-35 gy-60">
          {items.map((item) => (
            <BlogCard key={item.thumb.src.src} item={item} />
          ))}
        </div>

        <ListingPagination items={pagination} nextIcon={<ArrowForwardIcon />} />
      </div>
    </div>
  );
};

export default BlogGridSection;
