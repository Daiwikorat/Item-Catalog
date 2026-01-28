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
    console.error("Add Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {error?.message ?? "An unexpected error occurred."}
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
          >
            Retry
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
