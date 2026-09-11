import BlogSidebarSearch from "@/components/forms/BlogSidebarSearch";
import Link from "next/link";
import { blogStandardGridContent, blogStandardSidebarContent } from "@/content/inner/blog-standard";
import BlogCard from "@/components/pages/inner/blog-standard/BlogCard";
import RecentPostCard from "@/components/pages/inner/blog-standard/RecentPostCard";
import Image from "next/image";
import ListingPagination from "@/components/shared/ListingPagination";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";

const BlogStandardSection = () => {
  const { items, pagination } = blogStandardGridContent;
  const sidebar = blogStandardSidebarContent;

  return (
    <div className="blog-standard section-padding">
      <div className="container">
        <div className="row gy-4 gy-lg-5 d-flex justify-content-between">
          <div className="col-xl-7 col-lg-7 order-2 order-lg-1">
            {items.map((item) => (
              <BlogCard key={item.thumb.src.src} item={item} />
            ))}

            <ListingPagination items={pagination} nextIcon={<ArrowForwardIcon />} />
          </div>
          <div
            className="col-xl-5 col-lg-5 order-1 order-lg-2 d-flex justify-content-xl-end"
          >
            <div className="blog-sidebar">
              {/* Search Widget */}
              <div className="blog-sidebar__widget">
                <div className="blog-sidebar__widget-title">{sidebar.searchTitle}</div>
                <BlogSidebarSearch placeholder={sidebar.searchPlaceholder} />
              </div>

              {/* Recent Posts Widget */}
              <div
                className="blog-sidebar__widget fade-anim"
                data-delay="0.10"
              >
                <div className="blog-sidebar__widget-title">{sidebar.recentTitle}</div>
                <div className="blog-sidebar__recent-posts">
                  {sidebar.recentPosts.map((item) => (
                    <RecentPostCard key={item.title} item={item} />
                  ))}
                </div>
              </div>

              {/* Popular Tags Widget */}
              <div
                className="blog-sidebar__widget fade-anim"
                data-delay="0.10"
              >
                <div className="blog-sidebar__widget-title">{sidebar.tagsTitle}</div>
                <div className="blog-sidebar__tags">
                  {sidebar.tags.map((tag, index) => (
                    <a key={`${tag.label}-${index}`} href="#" className={tag.active ? "active" : undefined}>{tag.label}</a>
                  ))}
                </div>
              </div>

              {/* CTA Widget */}
              <div className="blog-sidebar__cta">
                <div className="bg">
                  <Image
                    src={sidebar.cta.bg.src}
                    alt={sidebar.cta.bg.alt}
                  />
                </div>
                <div className="blog-sidebar__cta-content">
                  <div className="title">
                    {sidebar.cta.titleLine1} <br />
                    {sidebar.cta.titleLine2}
                  </div>
                  <Link href={sidebar.cta.button.href} className="theme-btn sidebar-cta-btn">
                    <span className="text">{sidebar.cta.button.label}</span>
                    <span className="icon">
                      <ArrowOutwardIcon />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogStandardSection;
