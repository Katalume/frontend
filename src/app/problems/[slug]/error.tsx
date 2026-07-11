"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { reportError } from "@/lib/observability";

export default function ProblemArenaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "problem-arena", digest: error.digest });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 px-6 text-zinc-100">
      <p className="text-sm text-red-300">{error.message}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
        >
          Retry
        </button>
        <button
          onClick={() => router.push("/problems")}
          className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
        >
          Back to Problems
        </button>
      </div>
    </div>
  );
}
