// app/edit/[id]/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Edit Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white border rounded p-6 text-center">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Unable to load product
        </h2>

        <p className="text-sm text-gray-600 mb-5">
          {error?.message ??
            "The product you’re trying to edit could not be found."}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm border rounded"
          >
            Go back
          </button>

          <button
            onClick={() => reset()}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
