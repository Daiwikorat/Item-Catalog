// ./components/showItems.tsx
"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import Product from "./product";
import Image from "next/image";

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
  const [filteredItems, setFilterItems] = useState<Items[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  async function fetchItems() {
    try {
      const res = await axios.get("/api/items");
      setFilterItems(res.data);
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterItems = () => {
    if(!items) return;

    const filter = items.filter((item) => 
      item.title.includes(search)
    );

    setFilterItems(filter);
  }


  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  },[search]);

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
      <header className="px-[3%] py-[15px]">
        <div
          className="bg-[radial-gradient(circle,_#EEAECA_0%,_#94BBE9_100%)]
 w-full h-[50px] rounded-xl flex items-center justify-between px-[2%]"
        >
          <div className="flex gap-5 bg-gradient-to-t from-[#f43b47]/20 to-[#453a94]/20 rounded-2xl h-[80%] w-[40%] px-[2%]">
            <Image
              src="/search.png"
              alt="Search Icon"
              width={30}
              height={30}
              className="self-center"
            />

            <input
              type="text"
              placeholder="Search Item"
              className="w-70 h-8 rounded-sm bg-[#ffffff] pl-3 placeholder:text-gray-500 placeholder:text-sm self-center"
              onChange={handleChange}
            ></input>
          </div>

          <nav
            className="bg-[radial-gradient(circle,_#3F5EFB_0%,_#FC466B_100%)]
 rounded-lg h-[70%] flex items-center gap-5 px-[1%]"
          >
            <Link href="#" className="font-bold">
              Login
            </Link>
            <Link href="#" className="font-bold">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      
      
      <div className="px-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Product key={item.id} item = {item}></Product>
            ))
          ) : (
          <p>
            No Item Found (●'◡'●)
          </p>
        )} 
      </div>
    </>
  );
}
