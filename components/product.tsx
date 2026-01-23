import React from "react";
import Image from "next/image";
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
    
    <div className="border p-4 rounded-lg my-2 shadow-sm border-2">
      <div className="relative w-full h-34 mb-4">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          loading="lazy"
          className="object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
          quality={65}
        />
      </div>
      <h2 className="font-bold text-lg">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-green-600 font-semibold">${item.price}</p>
    </div>
  );
}
