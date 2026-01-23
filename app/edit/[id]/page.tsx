'use client';

import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  // 1. Unwrap the params Promise (Next.js 15 requirement for Client Components)
  const { id } = use(params);
  const router = useRouter();

  // 2. State for the form data and loading status
  const [formData, setFormData] = useState<ItemData>({
    id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // 3. Fetch Data on Mount
  useEffect(() => {
    async function fetchItemData() {
      try {
        // Fetch all items (or specific item if your API supports /api/items/[id])
        const res = await axios.get('/api/items');
        
        // Find the specific item matching the ID from params
        const foundItem = res.data.find((item: ItemData) => item.id === id);

        if (foundItem) {
          setFormData(foundItem);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchItemData();
  }, [id]);

  // 4. Handle Input Changes (Controlled Inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5. Handle Submit (Update & Redirect)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    try {
      // Sending PUT request to your API
      await axios.put('/api/items', {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        // You can add price/category here if your API supports updating them
      });

      // Redirect to root page automatically
      router.push('/');
      router.refresh(); // Ensure the home page shows new data
    } catch (err) {
      alert('Failed to update item');
      console.error(err);
    }
  };

  // 6. Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 7. Error UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-500 font-bold">
        {error}
      </div>
    );
  }

  // 8. Main UI
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
        
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Edit Product Details
          </h1>
          <p className="text-blue-100 text-center text-sm mt-1">ID: {id}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Product Title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Product Description"
            />
          </div>

          {/* Read-Only Price (Optional Context) */}
          <div>
             <label className="block text-gray-700 font-semibold mb-2">Price (Read-only)</label>
             <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-500">
                ${formData.price}
             </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
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