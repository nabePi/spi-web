import Link from "next/link";
import type { TeamMember } from "@/types/demos/e-learning/home";
import Image from "next/image";
import FacebookSquareIcon from "@/icons/FacebookSquareIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";
import TwitterXIcon from "@/icons/TwitterXIcon";

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="col-lg-3 col-md-6 fade-anim" data-delay={member.delay}>
      <div className="team2__card">
        <div className="team2__top">
          <span className="team2__rating">
            {member.rating}
            <StarFiveIcon />
          </span>
          <div className="team2__social">
            <a href="#">
              <TwitterXIcon />
            </a>
            <a href="#">
              <FacebookSquareIcon />
            </a>
          </div>
        </div>
        <div className="team2__thumb">
          <Image src={member.thumb.src} alt={member.thumb.alt} />
        </div>
        <div className="team2__content">
          <h3 className="team2__name">
            <Link href={member.href}>{member.name}</Link>
          </h3>
          <p className="team2__title">{member.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
