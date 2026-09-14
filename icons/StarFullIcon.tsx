import type { SVGProps } from "react";

const StarFullIcon = ({ fill = "#0082E4", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
    <path
      d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z"
      fill={fill}
    />
  </svg>
);

export default StarFullIcon;
