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
  // 2. Create a reference for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<ItemData>({
    id: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "", // This will hold the URL to show
  });

  const [imageset, setImageset] = useState<boolean>(false);

  // 3. Function to trigger the file browser
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 4. Function to handle when a user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL to preview the image immediately
      const previewUrl = URL.createObjectURL(file);
      
      setProduct((prev) => ({
        ...prev,
        image: previewUrl, // Set the preview URL so the Image component can show it
      }));
      setImageset(true);
      
      // NOTE: In a real app, you would upload 'file' to a server here.
      // For now, we just show the preview.
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
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  className="hidden" 
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
                     className="object-contain"
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
                <p className="text-center text-xs text-gray-400 mt-2">Click box to upload</p>
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
                        name="title" // FIXED: Was 'name', must match interface 'title'
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
                      ></input>
                    </p>
                  </div>

                  <div className="flex gap-6 items-center">
                    <div className="bg-black/20 px-[2%] rounded-lg">
                      <h2 className="text-sm text-gray-500">Category</h2>
                      <p className="text-gray-800 font-medium">
                        <input
                          type="text"
                          placeholder="Enter Product's Category"
                          onChange={handleChange}
                          name="category"
                        ></input>
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
                          className="w-24 bg-transparent"
                        ></input>
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <button
                      onClick={handleAdd}
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