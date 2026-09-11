import Link from "next/link";
import { aboutV1ClientContent } from "@/content/inner/about-v1";
import ArrowOutwardIcon from "@/icons/ArrowOutwardIcon";
import Icon055583c0 from "@/icons/Icon055583c0";
import Icon0dfd9a8e from "@/icons/Icon0dfd9a8e";
import Icon10493685 from "@/icons/Icon10493685";
import Icon122c68d7 from "@/icons/Icon122c68d7";
import Icon6889c12a from "@/icons/Icon6889c12a";
import Icon9e692e5e from "@/icons/Icon9e692e5e";
import Iconafb4c8cc from "@/icons/Iconafb4c8cc";
import Icondeadd464 from "@/icons/Icondeadd464";
import SectionBooksIcon from "@/icons/SectionBooksIcon";

const ClientSection = () => {
  const client = aboutV1ClientContent;

  return (
    <section className="client1">
      <div className="container">
        <div className="client1__wrap section-padding">
          <div className="row align-items-center g-4">
            {/* Left Content */}
            <div className="col-lg-5 fade-anim" data-delay="0.30">
              <div className="section-top text-start mb-30 mb-lg-0 pr-lg-5">
                <span className="section-top__subtitle">
                  <SectionBooksIcon />
                  {client.subtitle}</span>
                <h2 className="section-top__title move-anim">
                  {client.titleBefore}<br />
                  {client.titleMid}<span>{client.titleHighlight}</span>
                </h2>
                <Link href={client.cta.href} className="theme-btn">
                  <span className="text">{client.cta.label}</span>
                  <span className="icon"
                    ><ArrowOutwardIcon fill="#F8F5F2" />
                  </span>
                </Link>
              </div>
            </div>
            {/* Right Content Grid */}
            <div className="col-lg-7 fade-anim" data-delay="0.45">
              <div className="row g-1">
                <div className="col-6 col-sm-4 fade-anim" data-delay="0.15">
                  <div className="client1__box">
                    <Icon9e692e5e />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box client1__box--stroke-effect">
                    <Iconafb4c8cc />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <Icon10493685 />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <Icon6889c12a />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <Icon0dfd9a8e />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <Icondeadd464 />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box client1__box--stroke-effect">
                    <Icon055583c0 />
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <div className="brand-logo-viewport">
                      <div className="brand-logo-track">
                        <span className="brand-logo-slide"
                          ><Icon122c68d7 />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="client1__box">
                    <div className="brand-logo-viewport">
                      <Icon122c68d7 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
