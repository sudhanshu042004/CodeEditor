"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const route = useRouter();
  return (
    <div className="h-48 w-48 flex flex-col m-auto justify-center items-center">
      <div className="m-5">
        let get started
      </div>
      <button className="p-5 border-2 rounded" onClick={() => route.push("/login")}>login </button>
    </div>
  );
}
