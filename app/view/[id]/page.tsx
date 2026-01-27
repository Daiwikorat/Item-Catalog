import axios from "axios";
import Image from "next/image";
import React from "react";

interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export default async function View({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const baseURL = "http://localhost:3000"
  let displayData: ItemData | undefined;

  try {
    const res = await axios.get(`${baseURL}/api/items`);
    const allData: ItemData[] = res.data;
    displayData = allData.find((item) => item.id === id);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>Item not found this product</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D] py-10 px-4 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden">
        {/* Header (matches Edit theme) */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Product Details
          </h1>
          <p className="text-blue-100 text-center text-sm mt-1">
            Name: {displayData.title}
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="md:flex md:gap-8 items-start">
            {/* Image column */}
            <div className="md:w-1/3 w-full mb-6 md:mb-0">
              <div className="relative w-full h-65 md:h-64">
                {displayData.image ? (
                  <Image
                    src={displayData.image}
                    fill
                    alt={displayData.title}
                    className="object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50 text-gray-400">
                    {displayData.title}
                  </div>
                )}
              </div>
            </div>

            {/* Details column */}
            <div className="md:w-2/3 w-full">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-black/20 px-[2%] rounded-lg">
                  <h2 className="text-sm text-gray-500">Name</h2>
                  <p className="text-lg font-semibold text-gray-800">
                    {displayData.title}
                  </p>
                </div>

                <div>
                  <h2 className="text-sm text-gray-500">Description</h2>
                  <p className="text-gray-700 bg-gray-200 p-4 rounded-md">
                    {displayData.description}
                  </p>
                </div>

                <div className="flex gap-6 items-center">
                  <div className="bg-black/20 px-[2%] rounded-lg">
                    <h2 className="text-sm text-gray-500">Category</h2>
                    <p className="text-gray-800 font-medium">
                      {displayData.category}
                    </p>
                  </div>

                  <div className="bg-black/20 px-[2%] rounded-lg">
                    <h2 className="text-sm text-gray-500">Price</h2>
                    <p className="text-gray-800 font-bold text-lg">
                      ${displayData.price}
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-auto pt-6">
                  <a
                    href="#"
                    className="inline-block w-[40%] text-center bg-[#e14505] hover:bg-[#c83d04] text-white font-bold py-3 rounded-lg shadow-md transition-transform hover:scale-[1.03]"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* card */}
    </div>
  );
}
