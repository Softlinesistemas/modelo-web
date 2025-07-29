'use client'
import React from "react";

export const TagVisual = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <div className="inline-flex items-center bg-green-100 text-gray-900 font-medium px-4 py-1 rounded-full text-sm">
        {value}
      </div>
    </div>
  );
};