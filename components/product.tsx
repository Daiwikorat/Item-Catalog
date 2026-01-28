"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Renamed interface to avoid conflict with Component name
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  image?: string;
}

interface ProductProps {
  item: IProduct;
}

export default function Product({ item }: ProductProps) {
  console.log(item.image);
  return (
    <div className="flex flex-col bg-white/67 border p-4 rounded-lg my-2 shadow-sm border-2">
      <div className="relative w-full h-34 mb-4">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
            loading="lazy"
            className="object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
            quality={65}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 font-semibold">
            {item.category}
          </div>
        )}
      </div>
      <h2 className="font-bold text-lg line-clamp-1">{item.title}</h2>
      <p className="text-gray-600 line-clamp-2">{item.description}</p>
      <div className="flex items-end justify-between">
        <p className="text-green-600 font-semibold text-lg mt-auto">
          ${item.price}
        </p>
        <Link
          href={`/view/${item.id}`}
          className="bg-blue-500 rounded-lg text-l w-[25%] h-[90%] flex items-center justify-center"
        >
          {" "}
          View{" "}
        </Link>
        <Link
          href={`/edit/${item.id}`}
          className="bg-blue-500 rounded-lg text-l w-[25%] h-[90%] flex items-center justify-center"
        >
          {" "}
          Edit{" "}
        </Link>
      </div>
    </div>
  );
}
