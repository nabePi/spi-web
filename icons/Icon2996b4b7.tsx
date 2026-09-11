import { useId, type SVGProps } from "react";

const Icon2996b4b7 = ({ ...props }: SVGProps<SVGSVGElement>) => {
  const uid = useId().replace(/:/g, "");
  return (
    <svg width="34" height="24" viewBox="0 0 34 24" fill="none" {...props}>
                        <g
                          opacity="0.2"
                          clipPath={`url(#${uid})`}
                        >
                          <path
                            d="M26.1071 0C30.4662 3.86566e-07 34 3.49218 34 7.8C34 12.1078 30.4662 15.6 26.1071 15.6H20.937L29.437 24H19.1345L9.56724 14.5453C8.908 13.8938 8.5 12.9941 8.5 12C8.5 10.0118 10.131 8.4 12.1429 8.4H26.1071C26.4425 8.4 26.7143 8.13138 26.7143 7.8C26.7143 7.46862 26.4425 7.2 26.1071 7.2H12.1429C9.46032 7.2 7.28571 9.34902 7.28571 12C7.28571 13.4341 7.92212 14.7208 8.93107 15.6H8.91741L17.4174 24H12.1429C5.43655 24 0 18.6274 0 12C0 5.37259 5.43654 0 12.1429 0H26.1071Z"
                            fill="#1A453B"
                          ></path>
                          <path
                            d="M33.9999 16.8V24H31.1539L23.8682 16.8H33.9999Z"
                            fill="#1A453B"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id={uid}>
                            <rect
                              width="34"
                              height="24"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
  );
};

export default Icon2996b4b7;
