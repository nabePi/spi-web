import type { SVGProps } from "react";

const ArrowOutwardSmIcon = ({ fill = "#0065B5", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" {...props}>
              <path
                d="M0.933333 8.66667L0 7.73333L6.4 1.33333H0.666667V0H8.66667V8H7.33333V2.26667L0.933333 8.66667Z"
                fill={fill}
              />
            </svg>
);

export default ArrowOutwardSmIcon;
