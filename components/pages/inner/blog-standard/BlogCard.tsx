import Link from "next/link";
import type { BlogStandardCardItem } from "@/types/inner/blog-standard";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";

const BlogCard = ({ item }: { item: BlogStandardCardItem }) => {
  return (
    <div className={item.fade ? "blog2__card mb-50 fade-anim" : "blog2__card mb-50"}>
      <div className="blog2__thumb">
        <Link href={item.href} className="blog2__category">{item.category}</Link>
        <Link href={item.href}>
          <Image
            src={item.thumb.src}
            alt={item.thumb.alt}
          />
        </Link>
      </div>
      <div className="blog2__content p-30">
        <div className="blog2__meta">
          <Link href={item.href} className="author">
            <Image
              src={item.author.src}
              alt={item.author.alt}
            />
            <span>{item.authorName}</span>
          </Link>
          <Link href={item.href} className="date">{item.date}</Link>
          <Link href={item.href} className="time">{item.time}</Link>
        </div>
        <div className="blog2__title">
          <Link href={item.href}>{item.title}</Link>
        </div>

        <Link href={item.href} className="theme-btn mt-33">
          <span className="text">{item.cta}</span>
          <span className="icon">
            <ArrowOutwardIcon fill="#F8F5F2" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
