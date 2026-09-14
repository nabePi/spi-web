import Link from "next/link";
import { eLearningTeamContent } from "@/content/demos/e-learning/home";
import TeamCard from "@/components/pages/demos/e-learning/TeamCard";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import DotIconaaf8 from "@/icons/DotIconaaf8";

const TeamSection = () => {
  const { subtitle, titleLine1, titleLine2Before, titleHighlight, cta, members } =
    eLearningTeamContent;

  return (
    <section className="team2 section-padding">
      <div className="container">
        <div className="section-top text-start">
          <div className="row d-flex align-items-end justify-content-between g-4">
            <div className="col-md-7 fade-anim">
              <span className="section-top__subtitle px-12">
                <DotIconaaf8 />
                {subtitle}
              </span>
              <h2 className="section-top__title word-anim">
                {titleLine1} <br />
                {titleLine2Before}
                <span>{titleHighlight}</span>
              </h2>
            </div>
            <div className="col-md-5 fade-anim" data-delay="0.30">
              <div className="section-top__btn text-md-end">
                <Link href={cta.href} className="theme-btn theme-btn--white">
                  <span className="text">{cta.label}</span>
                  <span className="icon">
                    <ArrowOutwardIcon fill="#F2F5F8" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-20">
          {members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
