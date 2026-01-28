"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an error while loading this page. Please check your internet connection or try again later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={
            () => reset()
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm"
        >
          Try again
        </button>
        <a
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors border"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}