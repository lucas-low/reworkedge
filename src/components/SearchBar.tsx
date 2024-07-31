"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        router.push(`/?search=${encodeURIComponent(searchTerm)}`);
      } else {
        router.push("/");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
      <svg
        className="absolute right-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
}
