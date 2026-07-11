"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/observability";

// Catches errors thrown in the root layout itself. Must render its own
// <html>/<body> because it replaces the root layout when it triggers.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { boundary: "global", digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Something went wrong
        </h1>
        <p style={{ maxWidth: "28rem", fontSize: "0.875rem", opacity: 0.7 }}>
          A critical error occurred while loading the app.
        </p>
        <button
          onClick={reset}
          style={{
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
