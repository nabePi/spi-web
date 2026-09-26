import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const PengajarSection = () => {
  const content = aboutV1PengajarContent;

  return (
    <section className="about-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="section-top">
              <span className="section-top__subtitle px-12">
                <SectionBooksIcon />
                {content.subtitle}
              </span>
              <h2 className="section-top__title move-anim">{content.title}</h2>
            </div>
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="instructor-details__text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="row g-20 row-margin-top">
          {content.members.map((member) => (
            <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={member.name}>
              <div className="pengajar-card">
                <div className="pengajar-card__avatar">{member.initials}</div>
                <p className="pengajar-card__name">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PengajarSection;
