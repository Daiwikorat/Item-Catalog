// ./app/page.tsx
import Link from "next/link";
import Show from "../components/showItems";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <Show />
      </main>
    </>
  );
}
