import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
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
            404
          </h1>
          <p style={{ fontSize: "18px", margin: "0 0 28px", opacity: 0.8 }}>
            Page not found.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              textDecoration: "none",
              borderRadius: "999px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#f2f5f8",
              background: "#0065b5",
            }}
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
