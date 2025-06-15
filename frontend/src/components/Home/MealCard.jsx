import React from "react";

export default function MealCard({ meal, onAddToCart }) {
  return (
    <div className="p-4 border rounded-xl shadow bg-white hover:shadow-md transition">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h4 className="text-md font-semibold mb-2 line-clamp-2">
        {meal.strMeal}
      </h4>
      <button
        className="w-full py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
