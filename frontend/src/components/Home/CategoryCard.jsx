import React from "react";

export default function CategoryCard({ category, onSelect }) {
  return (
    <div
      onClick={() => onSelect(category.strCategory)}
      className="cursor-pointer p-4 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
    >
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-center">
        {category.strCategory}
      </h3>
    </div>
  );
}
