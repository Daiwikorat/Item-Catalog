// ./components/showItems.tsx
"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import Product from "./product";
import Image from "next/image";
import Loading from './loading';

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
  const [items, setItems] = useState<Items[]>([]);
  const [filteredItems, setFilterItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filteron, setFilteron] = useState<boolean>();

  const [err, setError] = useState<string | null>(null);

  // Filter for the catagory
  const [acc, setAcc] = useState<boolean>(false);
  const [food, setFood] = useState<boolean>(false);
  const [beauty, setBeauty] = useState<boolean>(false);
  const [home, setHome] = useState<boolean>(false);
  const [elec, setElec] = useState<boolean>(false);

  async function fetchItems() {
    try {
      const res = await axios.get("/api/items");
      setFilterItems(res.data);
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch items");
      setLoading(false);
    }
  }

  if (err) {
    throw new Error(err);
  }

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterItems = () => {
    if (!items) return;

    const query = search.trim().toLowerCase();

    const filter = items.filter((item) =>
      item.title.toLowerCase().includes(query),
    );

    setFilterItems(filter);
  };

  const applyFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 

    let newFilter: Items[] = [];
    let filter;
    if (home) {
      newFilter.push(
        ...items.filter((item) => item.category === "Home"));
    }

    if (beauty) {
      newFilter.push(
        ...items.filter((item) => item.category === "Beauty"));
    }

    if (elec) {
      newFilter.push(
        ...items.filter((item) => item.category === "Electronics"),
      );
    }

    if (acc) {
      newFilter.push(
        ...items.filter((item) => item.category === "Accessories"),
      );
    }

    if (food) {
      newFilter.push(...items.filter((item) => item.category === "Food"));
    }

    if (!home && !beauty && !elec && !acc && !food) {
      fetchItems();
    }

    if (search) {
      const query = search.trim().toLowerCase();

      newFilter = newFilter.filter((item) =>
        item.title.toLowerCase().includes(query),
      );
    }

    setFilteron(false);
    setFilterItems(newFilter);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [search]);

  if (loading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      <header className="px-[3%] py-[15px]">
        <div className="bg-[radial-gradient(circle,_#EEAECA_0%,_#94BBE9_100%)] w-full h-[50px] rounded-xl flex items-center justify-between px-[2%]">
          {/* Search Bar - responsive width */}
          <div className="flex gap-2 sm:gap-5 bg-gradient-to-t from-[#f43b47]/20 to-[#453a94]/20 rounded-2xl h-[80%] w-[55%] sm:w-[40%] px-[2%]">
            <Image
              src="/search.png"
              alt="Search Icon"
              width={30}
              height={30}
              className="self-center w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
            />
            <input
              type="text"
              placeholder="Search Item"
              className="w-full h-8 rounded-sm bg-transparent outline-none pl-1 sm:pl-3 placeholder:text-gray-600 placeholder:text-xs sm:placeholder:text-sm self-center text-gray-800 text-sm"
              onChange={handleChangeSearch}
            />
          </div>

          {/* Buttons - responsive sizing */}
          <div className="flex gap-2 sm:gap-4 items-center h-[80%]">
            {/* Filter Button */}
            <div
              onClick={() => setFilteron(!filteron)}
              className="bg-[radial-gradient(circle,_#3F5EFB_0%,_#FC466B_100%)] rounded-lg h-full flex items-center justify-center px-2 sm:px-4 cursor-pointer hover:scale-105 transition-transform"
            >
              <Image
                src="/filter.png"
                alt="Filter"
                width={25}
                height={25}
                className="self-center w-[18px] h-[18px] sm:w-[25px] sm:h-[25px]"
              />
            </div>

            {/* Add Item Button */}
            <Link
              href={`/add`}
              className="bg-orange-500 rounded-lg h-full flex items-center justify-center px-3 sm:px-6 text-white text-xs sm:text-sm font-medium cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform whitespace-nowrap"
            >
              <span className="hidden sm:inline">Add Item</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Filter Modal - responsive positioning and sizing */}
      {filteron && (
        <div
          className="absolute z-10 mt-2 right-2 sm:right-6 md:right-10 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[22%] bg-white rounded-xl p-4 shadow-lg"
        >
          <h1 className="font-bold mx-auto mb-3 text-sm sm:text-base">
            Enter Your filter items
          </h1>
          <form className="flex flex-col">
            <ul className="mx-[8%] space-y-2 text-sm sm:text-base">
              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="catagory"
                  id="Accessories"
                  checked={acc}
                  onChange={() => setAcc(!acc)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Accessories"
                  className="cursor-pointer break-words whitespace-normal"
                >
                  Accessories
                </label>
              </li>

              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="catagory"
                  id="Electronics"
                  checked={elec}
                  onChange={() => setElec(!elec)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Electronics"
                  className="cursor-pointer break-words whitespace-normal"
                >
                  Electronics
                </label>
              </li>

              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="catagory"
                  id="Food"
                  checked={food}
                  onChange={() => setFood(!food)}
                  className="cursor-pointer break-words whitespace-normal"
                />
                <label
                  htmlFor="Food"
                  className="cursor-pointer break-words whitespace-normal"
                >
                  Food
                </label>
              </li>

              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="catagory"
                  id="Beauty"
                  checked={beauty}
                  onChange={() => setBeauty(!beauty)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Beauty"
                  className="cursor-pointer break-words whitespace-normal"
                >
                  Beauty
                </label>
              </li>

              <li className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="catagory"
                  id="Home"
                  checked={home}
                  onChange={() => setHome(!home)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="Home"
                  className="cursor-pointer break-words whitespace-normal"
                >
                  Home Items
                </label>
              </li>
            </ul>

            <button
              onClick={(e) => applyFilter(e)}
              className="w-[50%] sm:w-[30%] mx-auto bg-blue-500 text-white rounded-lg py-2 mt-4 hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Apply
            </button>
          </form>
        </div>
      )}

      {/* Products Grid - already responsive */}
      <div className="px-4 sm:px-10 grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Product key={item.id} item={item}></Product>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[50vh]">
            <h1 className="text-lg sm:text-xl font-semibold text-center px-4">
              No Items Found (┬┬﹏┬┬)
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
