import ToastForm from "@/components/forms/ToastForm";
import Link from "next/link";
import { blogDetailsStandardArticleContent } from "@/content/inner/blog-details-standard";
import Image from "next/image";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import CheckIcon from "@/icons/CheckIcon";
import FacebookFIcon from "@/icons/FacebookFIcon";
import Icon348a3e38 from "@/icons/Icon348a3e38";
import Icon6c101542 from "@/icons/Icon6c101542";
import Icon930baab3 from "@/icons/Icon930baab3";
import Icon9d1d79d9 from "@/icons/Icon9d1d79d9";
import Iconf22e7d1f from "@/icons/Iconf22e7d1f";
import TwitterXIcon from "@/icons/TwitterXIcon";

const BlogDetailsSection = () => {
  const article = blogDetailsStandardArticleContent;

  return (
    <div className="blog-details-area section-padding">
      <div className="container">
        <div className="blog-details__wrap">
          <div className="blog-details blog-details--ful-width">
            <div className="blog-details__top">
              <div className="blog-details__main-img mb-60">
                <Image
                  src={article.hero.src}
                  alt={article.hero.alt}
                />
              </div>

              <div
                className="blog-details__content fade-anim"
                data-delay="0.10"
              >
                <div className="blog-details__meta mb-30">
                  <Link href={article.metaHref} className="author">
                    <Image
                      src={article.author.src}
                      alt={article.author.alt}
                    />
                    <span>{article.authorName}</span>
                  </Link>
                  <Link href={article.metaHref} className="date">{article.date}</Link>
                  <Link href={article.metaHref} className="read-time">{article.readTime}</Link>
                </div>

                <h2 className="blog-details__title mb-20">
                  {article.title}
                </h2>

                <div className="blog-details__text mb-30">
                  <p className="mb-15">
                    {article.intro[0]}
                  </p>
                  <p>
                    {article.intro[1]}
                  </p>
                </div>

                <div className="blog-details__content-box">
                  <div className="blog-details__content-boxleft">
                    <h3 className="box-title mb-20">
                      {article.boxTitle}
                    </h3>
                    <p className="mb-25">
                      {article.boxText}
                    </p>

                    <div className="checklist__wrapper">
                      <ul className="checklist">
                        {article.checklist.map((item) => (
                          <li key={item}>
                            <Icon9d1d79d9 />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <ul className="checklist">
                        {(article.checklistSecondary ?? []).map((item) => (
                          <li key={item}>
                            <Icon9d1d79d9 />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p>
                        {article.boxExtraText}
                      </p>
                    </div>
                  </div>
                  <div className="blog-details__content-boxright">
                    <div className="content-thumb">
                      <Image
                        src={article.boxThumb.src}
                        alt={article.boxThumb.alt}
                      />
                    </div>
                  </div>
                </div>

                <div className="blog-details__text mb-40">
                  <p>
                    {article.midText[0]}
                  </p>
                </div>

                <h2 className="blog-details__h3-green mb-25">
                  {article.highlight}
                </h2>

                <div className="blog-details__text mb-25">
                  <p>
                    {article.techText}
                  </p>
                </div>

                <div className="blog-details__img-grid mb-25">
                  {article.grid.map((image) => (
                    <div className="thumb" key={image.src.src}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>

                <div className="blog-details__text mb-60">
                  <p>
                    {article.wellness[0]}
                  </p>
                  <p>
                    {article.wellness[1]}
                  </p>
                </div>

                <div className="blog-details__bottom">
                  <div className="tags">
                    {article.tags.map((tag) => (
                      <a href="#" key={tag}>{tag}</a>
                    ))}
                  </div>
                  <div className="social-share">
                    <a href="#">
                      <FacebookFIcon />
                    </a>
                    <a href="#">
                      <Iconf22e7d1f />
                    </a>
                    <a href="#">
                      <TwitterXIcon fill="#555555" />
                    </a>
                    <a href="#">
                      <Icon930baab3 />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Box */}
            <div className="blog-details__author">
              <div className="thumb">
                <Image
                  src={article.authorBox.thumb.src}
                  alt={article.authorBox.thumb.alt}
                />
              </div>
              <div className="content">
                <span className="name">{article.authorBox.name}</span>
                <span className="designation">{article.authorBox.designation}</span>
                <p>
                  {article.authorBox.text}
                </p>
              </div>
            </div>

            {/* Comment Form */}
            <div className="blog-details__form">
              <ToastForm className="comment-form" successMessage="Comment posted successfully.">
                <div className="row gx-34 gy-30">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{article.form.nameLabel}<span>*</span></label>
                      <div className="field-wrap">
                        <input type="text" name="name" placeholder={article.form.namePlaceholder} required />
                        <Icon6c101542 className="icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{article.form.emailLabel}<span>*</span></label>

                      <div className="field-wrap">
                        <input
                          type="email"
                          name="email"
                          placeholder={article.form.emailPlaceholder}
                          required
                        />
                        <Icon348a3e38 className="icon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>{article.form.messageLabel}<span>*</span></label>
                      <div className="field-wrap">
                        <textarea
                          name="message"
                          placeholder={article.form.messagePlaceholder}
                          required
                        ></textarea>
                        <CheckIcon className="icon2" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="theme-btn">
                      <span className="text">{article.form.submit}</span>
                      <span className="icon">
                        <ArrowOutwardIcon />
                      </span>
                    </button>
                  </div>
                </div>
              </ToastForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSection;
