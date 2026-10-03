import Link from "next/link";
import Image from "next/image";
import type { ArticleDoc } from "@/lib/getArticles";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import defaultAuthorThumb from "@/public/assets/imgs/placeholder/blog-user2_1.svg";
import FacebookFIcon from "@/icons/FacebookFIcon";
import TwitterXIcon from "@/icons/TwitterXIcon";
import Iconf22e7d1f from "@/icons/Iconf22e7d1f";
import Icon930baab3 from "@/icons/Icon930baab3";

interface Props {
  article: ArticleDoc;
}

export default function DynamicArticleDetailsSection({ article }: Props) {
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru saja";

  const heroSrc = article.featuredImage?.url || "/assets/imgs/inner/blog/spi-adab-blocks.webp";
  const heroAlt = article.featuredImage?.alt || article.title;
  const authorPhoto = article.author?.photo?.url || defaultAuthorThumb;
  const authorName = article.author?.name || "Redaksi SPI";
  const authorRole = article.author?.designation || "Penulis SPI";
  const authorBio =
    article.author?.bio ||
    "Penulis dan peneliti kajian pemikiran Islam di lingkungan Sekolah Pemikiran Islam.";

  return (
    <div className="blog-details-area section-padding">
      <div className="container">
        <div className="blog-details__wrap">
          <div className="blog-details blog-details--ful-width">
            <div className="blog-details__top">
              {/* Featured Image */}
              <div className="blog-details__main-img mb-60">
                <Image
                  src={heroSrc}
                  alt={heroAlt}
                  width={1200}
                  height={675}
                  priority
                  style={{ width: "100%", height: "auto", maxHeight: "550px", objectFit: "cover" }}
                />
              </div>

              <div className="blog-details__content fade-anim" data-delay="0.10">
                {/* Meta Row */}
                <div className="blog-details__meta mb-30">
                  <div className="author">
                    <Image
                      src={authorPhoto}
                      alt={authorName}
                      width={22}
                      height={22}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <span>{authorName}</span>
                  </div>
                  <span className="date">{publishedDate}</span>
                  {article.readTime && <span className="read-time">{article.readTime}</span>}
                  {article.category && (
                    <Link
                      href={`/blog-three-column?category=${article.category.slug}`}
                      className="category-badge"
                      style={{
                        padding: "4px 12px",
                        backgroundColor: "rgba(0, 101, 181, 0.08)",
                        color: "var(--primary)",
                        borderRadius: "100px",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {article.category.name}
                    </Link>
                  )}
                </div>

                {/* Title */}
                <h1 className="blog-details__title mb-25" style={{ fontSize: "32px", lineHeight: "1.3" }}>
                  {article.title}
                </h1>

                {/* Excerpt */}
                {article.excerpt && (
                  <div
                    className="blog-details__lead mb-30"
                    style={{
                      fontFamily: "var(--font_dm)",
                      fontSize: "18px",
                      lineHeight: "1.6",
                      color: "var(--primary)",
                      borderLeft: "3px solid var(--secondary)",
                      paddingLeft: "18px",
                      fontStyle: "italic",
                    }}
                  >
                    <p>{article.excerpt}</p>
                  </div>
                )}

                {/* Rich Text Body */}
                <div className="blog-details__text blog-details__rich-text mb-50">
                  {article.content ? (
                    <RichText data={article.content as unknown as SerializedEditorState} />
                  ) : (
                    <p>{article.excerpt}</p>
                  )}
                </div>

                {/* Tags & Social Share */}
                <div className="blog-details__bottom">
                  <div className="tags">
                    {article.tags && article.tags.length > 0 ? (
                      article.tags.map((tag) => (
                        <Link href={`/blog-three-column?tag=${tag.slug}`} key={tag.id}>
                          #{tag.name}
                        </Link>
                      ))
                    ) : (
                      <Link href="/blog-three-column">#PemikiranIslam</Link>
                    )}
                  </div>
                  <div className="social-share">
                    <span style={{ fontSize: "14px", color: "var(--text2)", marginRight: "8px" }}>
                      Bagikan:
                    </span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <FacebookFIcon />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                    >
                      <TwitterXIcon fill="#555555" />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                    >
                      <Icon930baab3 />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Iconf22e7d1f />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Credential Card */}
            <div className="blog-details__author">
              <div className="thumb">
                <Image
                  src={authorPhoto}
                  alt={authorName}
                  width={180}
                  height={180}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="content">
                <span className="name">{authorName}</span>
                <span className="designation">{authorRole}</span>
                <p>{authorBio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
