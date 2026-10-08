import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://www.gravatar.com https://secure.gravatar.com",
      "media-src 'self' https://videos.pexels.com",
      "connect-src 'self'",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

// The PDF preview route is framed by the paper page, so it must allow
// same-origin framing (the global policy denies all framing).
const previewHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; frame-ancestors 'self'",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ["import"],
  },
  transpilePackages: [
    "animate.css",
    "bootstrap",
    "counterup2",
    "gsap",
    "jquery",
    "jquery-nice-select",
    "magnific-popup",
    "odometer",
    "swiper",
    "vanilla-tilt",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/papers/:slug/preview",
        headers: previewHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
