import type { ReactNode } from "react";
import { eLearningFeatureStatsContent } from "@/content/demos/e-learning/home";
import type { FeatureStatItem } from "@/types/demos/e-learning/home";
import Icon07210ba5 from "@/icons/Icon07210ba5";
import Iconaf894f30 from "@/icons/Iconaf894f30";
import Iconb64bd05c from "@/icons/Iconb64bd05c";
import Icone14aa005 from "@/icons/Icone14aa005";

const featureStatIcons: Record<FeatureStatItem["id"], ReactNode> = {
  courses: (
    <Iconaf894f30 />
  ),
  flexible: (
    <Iconb64bd05c />
  ),
  learners: (
    <Icon07210ba5 />
  ),
  membership: (
    <Icone14aa005 />
  ),
};

const FeatureStatsSection = () => {
  return (
    <div className="feature-stats-2">
      <div className="container">
        <div className="feature-stats-2__wrapper">
          {eLearningFeatureStatsContent.items.map((item) => (
            <div
              key={item.id}
              className="feature-stats-2__item fade-anim"
              data-delay={item.delay}
            >
              <div className="feature-stats-2__icon">
                {featureStatIcons[item.id]}
              </div>
              <div className="feature-stats-2__content">
                <div className="feature-stats-2__title">{item.title}</div>
                <p className="feature-stats-2__text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureStatsSection;
