import Link from "next/link";
import type { AboutV1TeamMember } from "@/types/inner/about-v1";
import Image from "next/image";
import FacebookSquareIcon from "@/icons/FacebookSquareIcon";
import StarFiveIcon from "@/icons/StarFiveIcon";
import TwitterXIcon from "@/icons/TwitterXIcon";

const TeamCard = ({ member }: { member: AboutV1TeamMember }) => {
  return (
    <div className="col-md-6">
      <div className={`team1__card${member.active ? " active" : ""}`}>
        <div className="team1__thumb tw-clip-anim">
          <Image
            className="tw-anim-img w-100 h-100"
            data-animate="true"
            src={member.thumb.src}
            alt={member.thumb.alt}
          />
          <div className="team1__rating">
            {member.rating}
            <StarFiveIcon />
          </div>
        </div>
        <div className="team1__content">
          <div className="team1__info">
            <h3 className="team1__name">
              <Link href={member.href}>{member.name}</Link>
            </h3>
            <span className="team1__designation"
              >{member.role}</span>
          </div>
          <div className="team1__social">
            <a href="#">
              <TwitterXIcon />
            </a>
            <a href="#">
              <FacebookSquareIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
