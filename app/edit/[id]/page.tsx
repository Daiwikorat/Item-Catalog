"use client";
import React, { useState, useEffect, use, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ItemData>({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const [originalImage, setOriginalImage] = useState<string>("");
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [imageset, setImageset] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchItemData() {
      try {
        const res = await axios.get("/api/items");
        const foundItem = res.data.find((item: ItemData) => item.id === id);

        if (foundItem) {
          setFormData(foundItem);
          setOriginalImage(foundItem.image || "");
          setImageset(!!foundItem.image);
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        setFormData((prev) => ({
          ...prev,
          image: base64String,
        }));

        setImageChanged(true);
        setImageset(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
    setImageset(false);
    setImageChanged(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData: any = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      };

      // Only include image if it was changed
      if (imageChanged) {
        updateData.image = formData.image;
      }

      await axios.patch("/api/items", updateData);

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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden">
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
        <form onSubmit={handleUpdate} className="p-4 sm:p-8">
          <div className="md:flex md:gap-8 items-start">
            {/* Image column */}
            <div className="md:w-1/3 w-full mb-6 md:mb-0">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <div
                className="w-full h-64 md:h-64 relative flex border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                onClick={handleImageClick}
              >
                {imageset && formData.image ? (
                  <Image
                    src={formData.image}
                    fill
                    alt="Product preview"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Image
                      src="/folder-inspection.png"
                      width={100}
                      height={100}
                      alt="Upload Icon"
                      className="object-contain opacity-50"
                    />
                    <p className="text-gray-400 text-sm mt-2">Click to upload</p>
                  </div>
                )}
              </div>

              {imageset && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="block bg-red-500 hover:bg-red-600 text-white rounded-lg w-full sm:w-[60%] mx-auto mt-4 py-2 transition-colors"
                >
                  Remove Image
                </button>
              )}
              
              {imageChanged && (
                <p className="text-center text-sm text-orange-600 mt-2">
                  Image will be updated
                </p>
              )}
            </div>

            {/* Details column */}
            <div className="md:w-2/3 w-full space-y-4">
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
                {!formData.title && (
                  <h1 className="text-red-500 text-sm mt-1">Can't Leave Empty</h1>
                )}
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
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Product Description"
                />
                {!formData.description && (
                  <h1 className="text-red-500 text-sm mt-1">Can't Leave Empty</h1>
                )}
              </div>

              {/* Category and Price in flex for larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <option value="">Select Category</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Food">Food</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Home">Home</option>
                  </select>
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    min="1"
                    max="5000"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="0.00"
                  />
                  {!formData.price && (
                    <h1 className="text-red-500 text-sm mt-1">Can't Leave Empty</h1>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={!formData.title || !formData.description || !formData.price || !formData.category}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 sm:flex-none bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}