// ./add/page.tsx
"use client";
import { useState, useRef } from "react"; // 1. Import useRef
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export default function Add() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<ItemData>({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const [imageset, setImageset] = useState<boolean>(false);
  const [formvalidity, setFormvalidity] = useState<boolean>(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        setProduct((prev) => {
          const updated = {
            ...prev,
            image: base64String,
          };

          checkFormValidity(updated);
          return updated;
        });

        setImageset(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const checkFormValidity = (data: ItemData) => {
    if (
      data.title.trim() !== "" &&
      data.title.trim().length >= 3 && 
      data.description.trim() !== "" &&
      data.description.trim().length >= 10 &&
      data.category.trim() !== "" &&
      data.price > 0
    ) {
      setFormvalidity(true);
    } else {
      setFormvalidity(false);
    }
  };

  async function handleAdd() {
    console.log("Product to Add:", product);
    const res = await axios.post("/api/items", product);

    if (res.status === 201) {
      alert("Item added successfully :D");
    }

    router.refresh();
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      checkFormValidity(updated);
      return updated;
    });
  };

  const removeImage = () => {
    setProduct((prev) => ({
      ...prev,
      image: "",
    }));
    setImageset(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D] py-6 sm:py-10 px-3 sm:px-4 flex justify-center items-start">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
              ADD Product Details
            </h1>
          </div>

          <div className="p-4 sm:p-8">
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
                  className="w-full h-48 sm:h-64 relative flex border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  onClick={handleImageClick}
                >
                  {imageset && product.image ? (
                    <Image
                      src={product.image}
                      fill
                      alt="Uploaded preview"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full">
                      <Image
                        src="/folder-inspection.png"
                        width={80}
                        height={80}
                        alt="Upload Icon"
                        className="object-contain opacity-50"
                      />
                      <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        Click to upload image
                      </p>
                    </div>
                  )}
                </div>
                {imageset && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="block bg-red-500 hover:bg-red-600 text-white rounded-lg w-full sm:w-[60%] mx-auto mt-3 sm:mt-4 py-2 transition-colors"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Details column */}
              <div className="md:w-2/3 w-full">
                <div className="grid grid-cols-1 gap-4">
                  {/* Name Input */}
                  <div>
                    <div className="bg-black/20 px-3 sm:px-4 py-2 rounded-lg">
                      <h2 className="text-xs sm:text-sm text-gray-600 mb-1">
                        Product Name *
                      </h2>
                      <input
                        type="text"
                        placeholder="Enter Product's Name"
                        onChange={handleChange}
                        name="title"
                        value={product.title}
                        className="w-full bg-transparent outline-none text-sm sm:text-base font-semibold text-gray-800 placeholder:text-gray-500"
                      />
                    </div>
                    {!product.title.trim() && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">
                        Product name is required
                      </p>
                    )}
                  </div>

                  {/* Description Input */}
                  <div>
                    <div className="bg-gray-200 px-3 sm:px-4 py-3 rounded-lg">
                      <h2 className="text-xs sm:text-sm text-gray-600 mb-1">
                        Description *
                      </h2>
                      <textarea
                        placeholder="Enter Product's Description"
                        onChange={handleChange}
                        name="description"
                        value={product.description}
                        rows={3}
                        className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-500 resize-none"
                      />
                    </div>
                    {!product.description.trim() && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">
                        Description is required
                      </p>
                    )}
                  </div>

                  {/* Category and Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <div className="bg-black/20 px-3 sm:px-4 py-2 rounded-lg">
                        <h2 className="text-xs sm:text-sm text-gray-600 mb-1">
                          Category *
                        </h2>
                        <select
                          name="category"
                          onChange={handleChange}
                          value={product.category}
                          className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 font-medium"
                        >
                          <option value="">Select Category</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Food">Food</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Home">Home</option>
                        </select>
                      </div>
                      {!product.category && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">
                          Please select a category
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <div className="bg-black/20 px-3 sm:px-4 py-2 rounded-lg">
                        <h2 className="text-xs sm:text-sm text-gray-600 mb-1">
                          Price ($) *
                        </h2>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          onChange={handleChange}
                          name="price"
                          value={product.price || ""}
                          className="w-full bg-transparent outline-none text-sm sm:text-base font-bold text-gray-800 placeholder:text-gray-500"
                        />
                      </div>
                      {product.price <= 0 && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">
                          Price must be greater than zero
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={handleAdd}
                      disabled={!formvalidity}
                      className="w-full sm:w-auto sm:min-w-[200px] text-center bg-[#e14505] hover:bg-[#c83d04] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all hover:scale-[1.03] active:scale-95"
                    >
                      ADD PRODUCT
                    </button>
                    {!formvalidity && (
                      <p className="text-orange-600 text-xs sm:text-sm mt-2">
                        Please fill all required fields correctly
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
