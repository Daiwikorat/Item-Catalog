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
  const [items, setItems] = useState<Items[]>([]);
  const [filteredItems, setFilterItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filteron, setFilteron] = useState<boolean>();

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
      console.log(error);
    }
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
    e.preventDefault(); // Took 15 min to understand why page was refreashing itself, then found this guy :(

    let newFilter: Items[] = [];
    let filter;
    if (home) {
      newFilter.push(...items.filter((item) => item.category === "Home"));
    }

    if (beauty) {
      newFilter.push(...items.filter((item) => item.category === "Beauty"));
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
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-xl font-semibold">Loading...</h1>
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
              onChange={handleChangeSearch}
            ></input>
          </div>

          <div
            onClick={() => {
              setFilteron(!filteron);
            }}
            className="bg-[radial-gradient(circle,_#3F5EFB_0%,_#FC466B_100%)]
 rounded-lg h-[70%] flex items-center gap-5 px-[1%]"
          >
            <Image
              src="/filter.png"
              alt="Filter"
              width={30}
              height={30}
              className="self-center"
            />
          </div>
        </div>
      </header>

      {filteron && (
        <div className="bg-white rounded-xl flex flex-col justify-center w-[20%] h-[35%] ml-[75%] mt-[-1%] absolute z-1">
          <h1 className="font-bold mx-auto">Enter Your filter items</h1>
          <form className="flex flex-col">
            <ul className="mx-[8%]">
              <li>
                <input
                  type="checkbox"
                  name="catagory"
                  id="Accessories"
                  checked={acc}
                  onChange={() => {
                    setAcc(!acc);
                  }}
                />{" "}
                Accessories{" "}
              </li>

              <li>
                <input
                  type="checkbox"
                  name="catagory"
                  id="Electronics"
                  checked={elec}
                  onChange={() => {
                    setElec(!elec);
                  }}
                />{" "}
                Electronics{" "}
              </li>

              <li>
                <input
                  type="checkbox"
                  name="catagory"
                  id="Food"
                  checked={food}
                  onChange={() => {
                    setFood(!food);
                  }}
                />{" "}
                Food{" "}
              </li>
              <li>
                <input
                  type="checkbox"
                  name="catagory"
                  id="Beauty"
                  checked={beauty}
                  onChange={() => {
                    setBeauty(!beauty);
                  }}
                />{" "}
                Beauty{" "}
              </li>
              <li>
                <input
                  type="checkbox"
                  name="catagory"
                  id="Home"
                  checked={home}
                  onChange={() => {
                    setHome(!home);
                  }}
                />{" "}
                Home Items{" "}
              </li>
            </ul>

            <button
              onClick={(e) => applyFilter(e)}
              className="w-[30%] mx-auto bg-blue-500 text-white rounded-lg"
            >
              {" "}
              Apply{" "}
            </button>
          </form>
        </div>
      )}

      <div className="px-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Product key={item.id} item={item}></Product>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-xl font-semibold">No Items Found (┬┬﹏┬┬)</h1>
          </div>
        )}
      </div>
    </>
  );
}
