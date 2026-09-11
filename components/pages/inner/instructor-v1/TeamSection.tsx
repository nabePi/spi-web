import { instructorV1TeamContent } from "@/content/inner/instructor-v1";
import TeamCard from "@/components/pages/inner/instructor-v1/TeamCard";

const TeamSection = () => {
  const { members } = instructorV1TeamContent;

  return (
    <section className="team1 v2 section-padding">
      <div className="container">
        <div className="row g-20">
          {members.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
