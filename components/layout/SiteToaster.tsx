"use client";

import { Toaster } from "react-hot-toast";

const SiteToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#1a453b",
        color: "#f8f5f2",
        borderRadius: "10px",
        fontFamily: "inherit",
        fontSize: "14px",
      },
      success: {
        iconTheme: { primary: "#d17232", secondary: "#f8f5f2" },
      },
      error: {
        iconTheme: { primary: "#e85d4c", secondary: "#f8f5f2" },
      },
    }}
  />
);

export default SiteToaster;
