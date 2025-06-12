"use client";

import React from "react";

interface MessageFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export type FilterType = "todos" | "não lidos" | "favoritos";

const filters: FilterType[] = ["todos", "não lidos", "favoritos"];

export default function MessageFilter({
  activeFilter,
  onFilterChange,
}: MessageFilterProps) {
  return (
    <div className="flex justify-around bg-white py-2 shadow">
      {filters.map((filter: FilterType) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter || "")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition ${
            activeFilter === filter
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
