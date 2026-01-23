// ./app/page.tsx 
import Link from "next/link";
import Show from "../components/showItems";

export default function Home() {
  return (
    <>
      <header className="px-[2%] py-[15px]">
        <div className="bg-[#D0F1BF] w-full h-[50px] rounded-xl flex items-center justify-between px-[1%]">
          <p className="text-[#646536] font-bold">Seta</p>

          <nav className="bg-[#483D03] rounded-lg h-[70%] flex items-center gap-5 px-[1%]">
            <Link href="#" className="font-bold">
              Login
            </Link>
            <Link href="#" className="font-bold">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main>
      <Show/>
      </main>

    </>
  );
}
