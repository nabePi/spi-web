import ToastForm from "@/components/forms/ToastForm";
import { coursesV1Content } from "@/content/inner/courses-v1";
import CourseGridCard from "@/components/pages/inner/courses-v1/CourseGridCard";
import CourseListCard from "@/components/pages/inner/courses-v1/CourseListCard";
import ListingPagination from "@/components/shared/ListingPagination";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";
import Icon16e664c1 from "@/icons/Icon16e664c1";
import Icon95bb8f36 from "@/icons/Icon95bb8f36";
import Icon9e9a1e76 from "@/icons/Icon9e9a1e76";
import SearchIcon from "@/icons/SearchIcon";

const CoursesClassicSection = () => {
  const content = coursesV1Content;
  const isListDefault = content.filter.defaultTab === "list";

  return (
    <div className="courses-classic section-padding">
      <div className="container">
        <div className="course-filter">
          <div className="course-filter__inner">
            <div className="course-filter__results">
              {content.filter.showingBefore} <span>{content.filter.showingRange}</span> {content.filter.showingMid} <span>{content.filter.showingTotal}</span> {content.filter.showingAfter}
            </div>
            <div className="course-filter__tools">
              <div className="course-filter__views">
                <ul className="course-filter__tab" id="course-filter-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={isListDefault ? "course-filter__view-btn" : "course-filter__view-btn active"}
                      id="pills-grid-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-grid"
                      type="button"
                      role="tab"
                      aria-controls="pills-grid"
                      aria-selected="true"
                      title={content.filter.gridViewTitle}
                    >
                      <Icon9e9a1e76 />
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={isListDefault ? "course-filter__view-btn active" : "course-filter__view-btn"}
                      id="pills-list-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-list"
                      type="button"
                      role="tab"
                      aria-controls="pills-list"
                      aria-selected="true"
                      title={content.filter.listViewTitle}
                    >
                      <Icon95bb8f36 />
                    </button>
                  </li>
                </ul>
              </div>
              <div className="course-filter__search">
                <ToastForm successMessage="Search submitted.">
                  <input type="search" name="q" placeholder={content.filter.searchPlaceholder} required />
                  <button type="submit">
                    <SearchIcon fill="#1A453B" />
                  </button>
                </ToastForm>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-content mt-60" id="course-filter-tabContent">
          <div
            className={isListDefault ? "tab-pane fade" : "tab-pane fade show active"}
            id="pills-grid"
            role="tabpanel"
            aria-labelledby="pills-grid-tab"
            tabIndex={0}
          >
            <div className="row g-20 mb-2 fade-anim">
              {content.grid.map((course, index) => (
                <CourseGridCard
                  key={`grid-${index}`}
                  course={course}
                  colClass="col-xl-4 col-md-6"
                  variant="classic"
                />
              ))}
            </div>
          </div>
          <div
            className={isListDefault ? "tab-pane fade show active" : "tab-pane fade"}
            id="pills-list"
            role="tabpanel"
            aria-labelledby="pills-list-tab"
            tabIndex={0}
          >
            <div className="row gy-40 justify-content-center">
              <div className="col-xl-12">
                {content.list.map((course, index) => (
                  <CourseListCard key={`list-${index}`} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ListingPagination
          items={content.pagination}
          prevIcon={<Icon16e664c1 />}
          nextIcon={<ArrowForwardIcon />}
        />
      </div>
    </div>
  );
};

export default CoursesClassicSection;
