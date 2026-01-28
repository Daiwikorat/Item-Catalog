// app/components/LoadingScreen.tsx
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D] flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-sm w-full">
        
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#e14505] rounded-full animate-spin border-t-transparent"></div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-700 mt-2">Loading...</h2>
        <p className="text-gray-500 text-sm">Fetching product details</p>
      </div>
    </div>
  );
}