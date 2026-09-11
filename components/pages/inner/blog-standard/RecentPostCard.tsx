import Link from "next/link";
import type { BlogStandardRecentPost } from "@/types/inner/blog-standard";
import Image from "next/image";

const RecentPostCard = ({ item }: { item: BlogStandardRecentPost }) => {
  return (
    <div className="item">
      <div className="thumb">
        <Link href={item.href}>
          <Image
            src={item.thumb.src}
            alt={item.thumb.alt}
          />
        </Link>
      </div>
      <div className="content">
        <span className="date">{item.date}</span>
        <div className="title">
          <Link href={item.href}>{item.title}</Link>
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;
