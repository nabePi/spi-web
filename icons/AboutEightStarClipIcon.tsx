import type { SVGProps } from "react";

const AboutEightStarClipIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="0" height="0" style={{ position: "absolute" }} {...props}>
    <defs>
      <clipPath id="clip-path-star" clipPathUnits="objectBoundingBox">
        <path d="M 0.5 0 L 0.6945 0.3055 L 1 0.5 L 0.6945 0.6945 L 0.5 1 L 0.3055 0.6945 L 0 0.5 L 0.3055 0.3055 Z" />
      </clipPath>
    </defs>
  </svg>
);

export default AboutEightStarClipIcon;
