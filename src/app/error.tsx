"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Server Error
      </h2>
      <p className="text-gray-500 mb-8">
        Oops! Something went wrong on our end.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
