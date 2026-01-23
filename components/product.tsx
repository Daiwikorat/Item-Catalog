import React from 'react';
import Image from 'next/image';
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
  return (
    <div className="border p-4 rounded-lg my-2 shadow-sm">
      {/* <Image src = {item.image} alt = {item.title} width={800} height={800} sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/> */}
      <h2 className="font-bold text-lg">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-green-600 font-semibold">${item.price}</p>
    </div>
  );
}