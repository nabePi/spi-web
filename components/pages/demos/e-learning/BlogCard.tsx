import Link from "next/link";
import type { BlogCardItem } from "@/types/demos/e-learning/home";
import Image from "next/image";

const BlogCard = ({ item }: { item: BlogCardItem }) => {
  return (
    <div className="col-lg-4 col-md-6 fade-anim" data-delay={item.delay}>
      <div className="blog2__card">
        <div className="blog2__thumb">
          <span className="blog2__category">{item.category}</span>
          <Link href={item.href}>
            <Image src={item.thumb.src} alt={item.thumb.alt} />
          </Link>
        </div>
        <div className="blog2__content">
          <div className="blog2__meta">
            <Link href={item.href} className="author">
              <Image src={item.author.src} alt={item.author.alt} />
              <span>{item.authorName}</span>
            </Link>
            <Link href={item.href} className="date">
              {item.date}
            </Link>
          </div>
          <div className="blog2__title">
            <Link href={item.href}>{item.title}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
