import type { SVGProps } from "react";

const StarEmptyIcon = ({ fill = "#0082E4", ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="11" height="10" viewBox="0 0 11 10" fill="none" {...props}>
    <path
      d="M3.28344 7.90183L5.12094 6.7935L6.95844 7.91642L6.47719 5.81642L8.09594 4.41642L5.96677 4.22683L5.12094 2.2435L4.2751 4.21225L2.14594 4.40183L3.76469 5.81642L3.28344 7.90183ZM1.95635 9.73146L2.79212 6.13273L0 3.71306L3.6839 3.3934L5.12094 0L6.55798 3.3934L10.2419 3.71306L7.44975 6.13273L8.28552 9.73146L5.12094 7.82221L1.95635 9.73146Z"
      fill={fill}
    />
  </svg>
);

export default StarEmptyIcon;
