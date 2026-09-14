"use client";

import { Toaster } from "react-hot-toast";

const SiteToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#0065b5",
        color: "#f2f5f8",
        borderRadius: "10px",
        fontFamily: "inherit",
        fontSize: "14px",
      },
      success: {
        iconTheme: { primary: "#d17232", secondary: "#f2f5f8" },
      },
      error: {
        iconTheme: { primary: "#e85d4c", secondary: "#f2f5f8" },
      },
    }}
  />
);

export default SiteToaster;
