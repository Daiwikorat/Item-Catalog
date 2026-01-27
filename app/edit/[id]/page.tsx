"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Interface for your specific data structure
interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string; // Optional
}

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  // const [fieldvalidation,setFieldvalidation] = useState<boolean>(true);

  const [formData, setFormData] = useState<ItemData>({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchItemData() {
      try {
        const res = await axios.get("/api/items");
        const foundItem = res.data.find((item: ItemData) => item.id === id);

        if (foundItem) {
          setFormData(foundItem);
        } else {
          setError("Item not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchItemData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch("/api/items", {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      });

      router.push("/");
      router.refresh();
    } catch (err) {
      alert("Failed to update item");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D] py-10 px-4 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Edit Product Details
          </h1>
          <p className="text-blue-100 text-center text-sm mt-1">
            Name: {formData.title}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Product Title"
            />
            {!formData.title && (<h1 className="text-red-500">Can't Leave Empty</h1>)}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Product Description"
            />
            {!formData.description && (<h1 className="text-red-500">Can't Leave Empty</h1>)}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="Accessories">Accessories</option>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (In $Dollor)
            </label>
            <input
              name="price"
              type="number"
              value={formData.price}
              min="1"
              max="5000"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Product Description"
            />
            {!formData.price && (<h1 className="text-red-500">Can't Leave Empty</h1>)}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled = {!formData.title || !formData.description || !formData.price}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-95"
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
