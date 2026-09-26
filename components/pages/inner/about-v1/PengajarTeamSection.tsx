import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const PengajarTeamSection = () => {
  const content = aboutV1PengajarContent;

  return (
    <section className="team1 v2 section-padding">
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
            <div className="col-6 col-md-4 col-lg-3" key={member.name}>
              <div className="team1__card">
                <div className="team1__thumb team1__thumb--placeholder">
                  {member.initials}
                </div>
                <div className="team1__content">
                  <div className="team1__info">
                    <h3 className="team1__name">
                      <span>{member.name}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PengajarTeamSection;
