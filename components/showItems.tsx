// ./components/showItems.tsx
"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import Product from "./product";

interface Items {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  image?: string;
}

export default function Show() {
  const [items, setItems] = useState<Items[]>();
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchItems() {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="px-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
