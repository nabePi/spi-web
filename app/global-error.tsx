"use client";

import { useEffect } from "react";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#f2f5f8",
          color: "#0065b5",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <h1
            style={{
              fontSize: "clamp(64px, 12vw, 120px)",
              lineHeight: 1,
              margin: "0 0 16px",
              fontWeight: 700,
            }}
          >
            500
          </h1>
          <p style={{ fontSize: "18px", margin: "0 0 28px", opacity: 0.8 }}>
            Something went wrong. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "999px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#f2f5f8",
              background: "#0065b5",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
