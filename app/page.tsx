import { Hero } from "@/component/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full items-center flex-col">
      <Hero />
    </div>
  );
}
