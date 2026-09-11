import type { SVGProps } from "react";

const ArrowOutwardIcon = ({ fill = "white", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
                            <path
                              d="M1.28333 11.9167L0 10.6333L8.8 1.83333H0.916667V0H11.9167V11H10.0833V3.11667L1.28333 11.9167Z"
                              fill={fill}
                            />
                          </svg>
);

export default ArrowOutwardIcon;
