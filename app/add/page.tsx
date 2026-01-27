"use client";
import { useState, useRef } from "react"; // 1. Import useRef
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
      const previewUrl = URL.createObjectURL(file);

      setProduct((prev) => {
        const updated = {
          ...prev,
          image: previewUrl,
        };

        checkFormValidity(updated);
        return updated;
      });

      setImageset(true);
    }
  };

  const checkFormValidity = (data: ItemData) => {
    if (
      data.title &&
      data.description &&
      data.price &&
      data.category 
    ) {
      setFormvalidity(true);
    } else {
      setFormvalidity(false);
    }
  };

  function handleAdd() {
    console.log("Product to Add:", product);
    alert("Check console for product details!");
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
      <div className="min-h-screen bg-gradient-to-t from-[#22C1C3] to-[#FDBB2D] py-10 px-4 flex justify-center items-start">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-2xl font-bold text-white text-center">
              ADD Product Details
            </h1>
          </div>

          <div className="p-8">
            <div className="md:flex md:gap-8 items-start">
              {/* Image column */}
              <div className="md:w-1/3 w-full mb-6 md:mb-0">
                {/* 5. Hidden Input that does the actual work */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden outline-none focus:outline-none focus:ring-0"
                  accept="image/*"
                />

                <div
                  className="w-full h-64 md:h-64 relative flex border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  onClick={handleImageClick}
                >
                  {/* If image IS set, show the uploaded image */}
                  {imageset && product.image ? (
                    <Image
                      src={product.image}
                      fill
                      alt="Uploaded preview"
                      className="object-contain outline-none focus:outline-none focus:ring-0"
                    />
                  ) : (
                    /* If image is NOT set, show the placeholder icon */
                    <Image
                      src="/folder-inspection.png"
                      width={100}
                      height={100}
                      alt="Upload Icon"
                      className="object-contain justify-center mx-auto opacity-50"
                    />
                  )}
                </div>
                {imageset && (
                  <button
                    onClick={removeImage}
                    className="block bg-blue-400 rounded-xs w-[40%] mx-auto mt-[4%] "
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Details column */}
              <div className="md:w-2/3 w-full">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-black/20 px-[2%] rounded-lg">
                    <h2 className="text-sm text-gray-500">Name</h2>
                    <p className="text-lg font-semibold text-gray-800">
                      <input
                        type="text"
                        placeholder="Enter Product's Name"
                        onChange={handleChange}
                        name="title"
                        className="outline-none focus:outline-none focus:ring-0"
                      ></input>
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm text-gray-500">Description</h2>
                    <p className="text-gray-700 bg-gray-200 p-4 rounded-md">
                      <input
                        type="text"
                        placeholder="Enter Product's Description"
                        onChange={handleChange}
                        name="description" // FIXED: Was 'desc', must match interface 'description'
                        className="outline-none focus:outline-none focus:ring-0"
                      ></input>
                    </p>
                  </div>

                  <div className="flex gap-6 items-center">
                    <div className="bg-black/20 px-[2%] rounded-lg">
                      <h2 className="text-sm text-gray-500">Category</h2>
                      <p className="text-gray-800 font-medium">
                        <select
                          name="category"
                          onChange={handleChange}
                          className="bg-transparent outline-none text-gray-800 font-medium"
                        >
                          <option value="" disabled selected>
                            Select Category
                          </option>
                          <option value="Accessories">Accessories</option>
                          <option value="Food">Food</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Home">Home</option>
                        </select>
                      </p>
                    </div>

                    <div className="bg-black/20 px-[2%] rounded-lg">
                      <h2 className="text-sm text-gray-500">Price</h2>
                      <p className="text-gray-800 font-bold text-lg">
                        <input
                          type="number"
                          min="1"
                          max="2000"
                          placeholder="Price"
                          onChange={handleChange}
                          name="price"
                          className="w-24 bg-transparent outline-none focus:outline-none focus:ring-0"
                        ></input>
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={handleAdd}
                      disabled={!formvalidity}
                      className="inline-block w-[40%] text-center bg-[#e14505] hover:bg-[#c83d04] text-white font-bold py-3 rounded-lg shadow-md transition-transform hover:scale-[1.03]"
                    >
                      ADD
                    </button>
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
