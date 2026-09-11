import type { SVGProps } from "react";

const CheckBoldIcon = ({ fill = "currentColor", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" {...props}>
    <path
      d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z"
      fill={fill}
    />
  </svg>
);

export default CheckBoldIcon;
