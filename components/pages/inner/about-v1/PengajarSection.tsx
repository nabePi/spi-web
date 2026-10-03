import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import type { LecturerDoc } from "@/lib/getLecturers";

interface PengajarSectionProps {
  lecturers?: LecturerDoc[];
}

const PengajarSection = ({ lecturers }: PengajarSectionProps) => {
  const content = aboutV1PengajarContent;
  const items = lecturers && lecturers.length > 0 ? lecturers : content.members;

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
          {items.map((member) => {
            const name = member.name;
            const initials =
              "initials" in member && member.initials
                ? member.initials
                : name
                    .replace(/\b(Dr|Prof|Ph\.D|Lc|M\.Ud|M\.Si|M\.Pd\.I|S\.S|M\.Hum|S\.Th\.I|S\.IP|S\.T|S\.Fil)\b\.?/gi, "")
                    .replace(/[.,]/g, "")
                    .trim()
                    .slice(0, 2)
                    .toUpperCase();
            const role = "role" in member ? (member as LecturerDoc).role : null;
            const institution = "institution" in member ? (member as LecturerDoc).institution : null;

            return (
              <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={name}>
                <div className="pengajar-card">
                  <div className="pengajar-card__avatar">{initials}</div>
                  <p className="pengajar-card__name">{name}</p>
                  {(role || institution) && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted, #71717a)",
                        marginTop: "4px",
                        lineHeight: "1.2",
                      }}
                    >
                      {role || institution}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PengajarSection;
