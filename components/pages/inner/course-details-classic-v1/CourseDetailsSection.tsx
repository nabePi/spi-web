import Link from "next/link";
import { courseDetailsClassicV1Content } from "@/content/inner/course-details-classic-v1";
import type { CourseDetailsContent, CourseIncludeItem } from "@/types/inner/course-details";
import Image from "next/image";
import CheckBoldIcon from "@/icons/CheckBoldIcon";
import FacebookFIcon from "@/icons/FacebookFIcon";
import FacebookSquareIcon from "@/icons/FacebookSquareIcon";
import Icon0158b583 from "@/icons/Icon0158b583";
import Icon13b79cc0 from "@/icons/Icon13b79cc0";
import Icon3498a0f5 from "@/icons/Icon3498a0f5";
import Icon36c148da from "@/icons/Icon36c148da";
import Icon3d6b8ab6 from "@/icons/Icon3d6b8ab6";
import Icon4c4dff6a from "@/icons/Icon4c4dff6a";
import Icon5182e5db from "@/icons/Icon5182e5db";
import Iconbc9dfc29 from "@/icons/Iconbc9dfc29";
import Iconc493c764 from "@/icons/Iconc493c764";
import Iconcc22b57f from "@/icons/Iconcc22b57f";
import StarFullIcon from "@/icons/StarFullIcon";
import StarHalfIcon from "@/icons/StarHalfIcon";
import StudentsIcon403c from "@/icons/StudentsIcon403c";
import TwitterXIcon from "@/icons/TwitterXIcon";

const checkIcon = (
  <span className="icon">
    <CheckBoldIcon />
  </span>
);

const lessonIcon = (
  <Iconbc9dfc29 />
);

const lockIcon = (
  <span className="lock-icon">
    <Icon5182e5db />
  </span>
);

const fullStar = (
  <StarFullIcon />
);

const halfStar = (
  <StarHalfIcon />
);

const includeIcon = (id: CourseIncludeItem["id"]) => {
  if (id === "lessons") {
    return (
      <Icon13b79cc0 />
    );
  }
  if (id === "duration") {
    return (
      <Icon3498a0f5 />
    );
  }
  if (id === "level") {
    return (
      <Iconc493c764 />
    );
  }
  if (id === "language") {
    return (
      <Icon36c148da />
    );
  }
  return (
    <Icon3d6b8ab6 />
  );
};

const OverviewBlock = ({ content }: { content: CourseDetailsContent }) => (
  <div className="course-details1__overview">
    {content.overviewTitle ? <h3 className="overview-title">{content.overviewTitle}</h3> : null}
    {content.overviewParagraphs.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
    <div className="highlight-list">
      <h3 className="title">{content.highlightsTitle}</h3>
      <ul>
        {content.highlights.map((item) => (
          <li key={item}>
            {checkIcon}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="highlight-list mb-0">
      <h3 className="title">{content.learnTitle}</h3>
      <ul>
        {content.learnItems.map((item) => (
          <li key={item}>
            {checkIcon}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CurriculumBlock = ({ content }: { content: CourseDetailsContent }) => (
  <div className="course-details1__curriculum">
    <div className="accordion" id="curriculumAccordion">
      {content.curriculum.map((section) => (
        <div className="accordion-item" key={section.id}>
          <h2 className="accordion-header" id={section.headingId}>
            <button
              className={section.open ? "accordion-button" : "accordion-button collapsed"}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${section.collapseId}`}
              aria-expanded={section.open ? "true" : "false"}
              aria-controls={section.collapseId}
            >
              {section.title}
              <span className="icon">
                <Icon0158b583 />
              </span>
            </button>
          </h2>
          <div
            id={section.collapseId}
            className={section.open ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
            aria-labelledby={section.headingId}
            data-bs-parent="#curriculumAccordion"
          >
            <div className="accordion-body">
              <ul>
                {section.lessons.map((lesson) => (
                  <li key={lesson.title}>
                    <div className="left">
                      {lessonIcon}
                      <span>{lesson.title}</span>
                    </div>
                    <div className="right">
                      {lesson.preview ? (
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#globalVideoModal"
                          data-video-id={lesson.videoId}
                          className="preview-btn"
                        >
                          Preview
                        </button>
                      ) : (
                        lockIcon
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InstructorBlock = ({ content }: { content: CourseDetailsContent }) => (
  <div className="course-details1__instructor">
    <div className="thumb">
      <Image src={content.instructor.thumb.src} alt={content.instructor.thumb.alt} />
    </div>
    <div className="info">
      <h3 className="name">{content.instructor.name}</h3>
      <div className="meta">
        <div className="rating">
          <span>{content.instructor.rating}</span>
          <span className="icons">
            {fullStar}
            {fullStar}
            {fullStar}
            {fullStar}
            {halfStar}
          </span>
          {content.instructor.ratingLabel}
        </div>
        <div className="students">
          <div className="icon">
            <StudentsIcon403c />
          </div>
          <span>{content.instructor.students}</span>
        </div>
        <div className="courses">
          <div className="icon">
            <StudentsIcon403c />
          </div>
          <span>{content.instructor.courses}</span>
        </div>
      </div>
      <p className="desc">{content.instructor.bio}</p>
      <div className="social">
        {content.instructor.socials.map((social) => (
          <a href={social.href} key={social.label}>
            <span className="icon">
              <i
                className={
                  social.icon === "facebook"
                    ? "fab fa-facebook-f"
                    : social.icon === "youtube"
                      ? "fab fa-youtube"
                      : "fab fa-twitter"
                }
              ></i>
            </span>
            {social.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const ReviewsBlock = ({ content }: { content: CourseDetailsContent }) => (
  <div className="course-details1__reviews">
    <h3 className="title mb-30">{content.reviewsTitle}</h3>
    <div className="review-summary">
      <div className="overall">
        <div className="score">{content.reviewScore}</div>
        <div className="stars">
          {fullStar}
          {fullStar}
          {fullStar}
          {fullStar}
          {halfStar}
        </div>
        <div className="count">{content.reviewCount}</div>
      </div>
      <div className="bars">
        {content.reviewBars.map((bar) => (
          <div className="bar-item" key={bar.stars}>
            <div className="stars">
              {bar.stars}
              {fullStar}
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: bar.width }}></div>
            </div>
            <div className="count">{bar.count}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="review-list mt-50">
      {content.reviews.map((item) => (
        <div className="review-item" key={item.name}>
          <div className="avatar">
            <Image src={item.thumb.src} alt={item.thumb.alt} />
          </div>
          <div className="content">
            <div className="top">
              <div className="stars">
                {fullStar}
                {fullStar}
                {fullStar}
                {fullStar}
                {halfStar}
              </div>
              <h4 className="name">{item.name}</h4>
            </div>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CourseDetailsSection = () => {
  const content = courseDetailsClassicV1Content;
  const useTabs = content.layout === "tabs";

  return (
    <section className="course-details1 v3">
      <div className="container">
        <div className={`row ${content.rowClass}`}>
          <div className="col-lg-7">
            <div className="course-details1__content">
              {useTabs && content.tabs ? (
                <>
                  <ul className="nav nav-tabs" id="courseDetailsTabs" role="tablist">
                    {content.tabs.map((tab) => (
                      <li className="nav-item" role="presentation" key={tab.id}>
                        <button
                          className={tab.active ? "nav-link active" : "nav-link"}
                          id={tab.id}
                          data-bs-toggle="tab"
                          data-bs-target={`#${tab.target}`}
                          type="button"
                          role="tab"
                          aria-controls={tab.target}
                          aria-selected={tab.active ? "true" : "false"}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content" id="courseDetailsTabsContent">
                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <OverviewBlock content={content} />
                    </div>
                    <div className="tab-pane fade" id="curriculum" role="tabpanel" aria-labelledby="curriculum-tab">
                      <CurriculumBlock content={content} />
                    </div>
                    <div className="tab-pane fade" id="instructor" role="tabpanel" aria-labelledby="instructor-tab">
                      <InstructorBlock content={content} />
                    </div>
                    <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                      <ReviewsBlock content={content} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <OverviewBlock content={content} />
                  <CurriculumBlock content={content} />
                  <InstructorBlock content={content} />
                  <ReviewsBlock content={content} />
                </>
              )}
            </div>
          </div>
          <div className="col-lg-5">
            <div className={content.sidebarClass}>
              <div className="course-details1__sidebar-thumb">
                <Image src={content.sidebarThumb.src} alt={content.sidebarThumb.alt} />
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#globalVideoModal"
                  data-video-id={content.videoId}
                  className="play-btn popup-video"
                >
                  <Icon4c4dff6a />
                </button>
              </div>
              <div className="course-details1__sidebar-price">{content.price}</div>
              <div className="course-details1__sidebar-actions">
                <Link href={content.enrollCta.href} className="btn-two v10 w-100 justify-content-between">
                  <span className="btn-text">{content.enrollCta.label}</span>
                  <span className="btn-icon">
                    <span className="material-symbols-sharp">arrow_outward</span>
                  </span>
                </Link>
              </div>
              <div className="course-details1__sidebar-includes">
                <h4 className="title">{content.includesTitle}</h4>
                <ul>
                  {content.includes.map((item) => (
                    <li key={item.id}>
                      <div className="left">
                        {includeIcon(item.id)}
                        <span>{item.label}</span>
                      </div>
                      <div className="right">{item.value}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="course-details1__sidebar-share">
                <span className="label">{content.shareLabel}</span>
                <div className="social-links">
                  <a href="#">
                    <FacebookFIcon fill="white" />
                  </a>
                  <a href="#">
                    <TwitterXIcon />
                  </a>
                  <a href="#">
                    <FacebookSquareIcon />
                  </a>
                  <a href="#">
                    <Iconcc22b57f />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsSection;
