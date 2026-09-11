import Link from "next/link";
import type { BlogDetailsRelatedItem } from "@/types/inner/blog-details-standard";
import Image from "next/image";

const RelatedBlogCard = ({ item }: { item: BlogDetailsRelatedItem }) => {
  const category = item.category ? (
    item.categoryLinked ? (
      <Link href={item.href} className="blog2__category">{item.category}</Link>
    ) : (
      <span className="blog2__category">{item.category}</span>
    )
  ) : null;

  const thumb = item.thumbLinked ? (
    <Link href={item.href}>
      <Image
        src={item.thumb.src}
        alt={item.thumb.alt}
      />
    </Link>
  ) : (
    <Image
      src={item.thumb.src}
      alt={item.thumb.alt}
    />
  );

  const author = item.linkedMeta ? (
    <Link href={item.href} className="author">
      <Image
        src={item.author.src}
        alt={item.author.alt}
      />
      <span>{item.authorName}</span>
    </Link>
  ) : (
    <div className="author">
      <Image
        src={item.author.src}
        alt={item.author.alt}
      />
      <span>{item.authorName}</span>
    </div>
  );

  const date = item.linkedMeta ? (
    <Link href={item.href} className="date">{item.date}</Link>
  ) : (
    <span className="date">{item.date}</span>
  );

  return (
    <div className="swiper-slide">
      <div className="blog2__card">
        <div className="blog2__thumb">
          {category}
          {thumb}
        </div>
        <div className="blog2__content p-30">
          <div className="blog2__meta">
            {author}
            {date}
          </div>
          <div className="blog2__title">
            <Link href={item.href}>{item.title}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogCard;
