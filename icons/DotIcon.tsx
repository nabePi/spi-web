import type { SVGProps } from "react";

const DotIcon = ({ fill = "white", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" {...props}>
                  <circle cx="2" cy="2" r="2" fill={fill} />
                </svg>
);

export default DotIcon;
