import { eLearningVideoContent } from "@/content/demos/e-learning/home";
import type { VideoStat } from "@/types/demos/e-learning/home";
import Image from "next/image";
import Iconc2065262 from "@/icons/Iconc2065262";

const VideoStatItem = ({ stat, extraClass }: { stat: VideoStat; extraClass?: string }) => {
  if (stat.kind === "rating") {
    return (
      <div className="video2__item">
        <h3 className={`video2__number${extraClass ? ` ${extraClass}` : ""}`}>
          {stat.rating}/<span>{stat.ratingMax}</span>
        </h3>
        <p className="video2__label">{stat.label}</p>
      </div>
    );
  }

  return (
    <div className="video2__item">
      <h3 className="video2__number">
        <span className="odometer-num" data-final={stat.value}>
          0
        </span>
        {stat.suffix === "k+" ? (
          <>
            k<span>+</span>
          </>
        ) : (
          <span>{stat.suffix}</span>
        )}
      </h3>
      <p className="video2__label">{stat.label}</p>
    </div>
  );
};

const VideoSection = () => {
  const { left, right, thumb, videoHref } = eLearningVideoContent;

  return (
    <section className="video2 section-padding-bottom">
      <div className="container">
        <div className="video2__wrap fade-anim">
          <div className="video2__content video2__content--left">
            {left.map((stat) => (
              <VideoStatItem key={stat.label} stat={stat} />
            ))}
          </div>
          <div className="video2__thumb-wrap">
            <div className="video2__thumb">
              <Image src={thumb.src} alt={thumb.alt} />
              <a href={videoHref} className="video2__play-btn video-popup">
                <Iconc2065262 />
              </a>
            </div>
          </div>
          <div className="video2__content video2__content--right">
            {right.map((stat) => (
              <VideoStatItem
                key={stat.label}
                stat={stat}
                extraClass={stat.kind === "rating" ? "mb-18" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
