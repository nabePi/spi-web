import Image from "next/image";
import { aboutV1PengajarContent } from "@/content/inner/about-v1";
import SectionBooksIcon from "@/icons/SectionBooksIcon";
import type { LecturerDoc } from "@/lib/getLecturers";

interface PengajarTeamSectionProps {
  lecturers?: LecturerDoc[];
}

const PengajarTeamSection = ({ lecturers }: PengajarTeamSectionProps) => {
  const content = aboutV1PengajarContent;
  const items = lecturers && lecturers.length > 0 ? lecturers : content.members;

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
            const photo =
              "photo" in member && (member as LecturerDoc).photo?.url
                ? (member as LecturerDoc).photo?.url
                : null;
            const role = "role" in member ? (member as LecturerDoc).role : null;
            const institution = "institution" in member ? (member as LecturerDoc).institution : null;

            return (
              <div className="col-6 col-md-4 col-lg-3" key={name}>
                <div className="team1__card">
                  {photo ? (
                    <div className="team1__thumb" style={{ position: "relative", width: "100%", height: "220px" }}>
                      <Image
                        src={photo}
                        alt={name}
                        fill
                        style={{ objectFit: "cover", borderRadius: "12px" }}
                      />
                    </div>
                  ) : (
                    <div className="team1__thumb team1__thumb--placeholder">
                      {initials}
                    </div>
                  )}
                  <div className="team1__content">
                    <div className="team1__info">
                      <h3 className="team1__name">
                        <span>{name}</span>
                      </h3>
                      {(role || institution) && (
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--color-text-muted, #71717a)",
                            marginTop: "4px",
                          }}
                        >
                          {role || institution}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PengajarTeamSection;
