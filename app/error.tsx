"use client";

import { useEffect } from "react";

/**
 * Global error boundary. Wraps the root layout so any rendering failure shows
 * a branded, recoverable state instead of a blank screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real deployment this is where you would report to an error service.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: 12,
              color: "#f19c29",
              fontWeight: 600,
            }}
          >
            Something went wrong
          </p>
          <h1 style={{ fontSize: 32, margin: "16px 0 8px", letterSpacing: "-0.03em" }}>
            We hit a snag.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 420, margin: "0 auto" }}>
            An unexpected error occurred while loading this page. Your watchlist
            is safe — try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              background: "#f19c29",
              color: "#0f0f0f",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
