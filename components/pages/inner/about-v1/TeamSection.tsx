import Link from "next/link";
import TeamCard from "@/components/pages/inner/about-v1/TeamCard";
import { aboutV1TeamContent } from "@/content/inner/about-v1";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const TeamSection = () => {
  const team = aboutV1TeamContent;

  return (
    <section className="team1 section-padding">
      <div className="container">
        <div className="row g-5 g-lg-4 align-items-start">
          {/* Left Content */}
          <div className="col-lg-5 fade-anim" data-delay="0.30">
            <div className="team1__sticky">
              <div className="section-top text-start">
                <span className="section-top__subtitle">
                  <SectionBooksIcon />
                  {team.subtitle}</span>
                <h2 className="section-top__title move-anim">
                  {team.titleBefore} <br />
                  {team.titleMid} <span>{team.titleHighlight}</span>
                </h2>
              </div>
              <Link href={team.cta.href} className="theme-btn">
                <span className="text">{team.cta.label}</span>
                <span className="icon"
                  ><ArrowOutwardIcon fill="#F8F5F2" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Content (Grid) */}
          <div className="col-lg-7 fade-anim" data-delay="0.45">
            <div
              className="row g-20 fade-anim"
              data-stagger="0.10"
              data-translatey="30"
            >
              {team.members.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
