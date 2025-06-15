import React, { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useMeals } from "../hooks/useMeals";
import { useOrder } from "../hooks/orderContext";
import CategorySlider from "../components/Home/CategorySlider";
import MealCard from "../components/Home/MealCard";

export default function HomePage() {
  const { categories, loading: loadingCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const { meals, loading: loadingMeals } = useMeals(selectedCategory);
  const { cart, addToCart } = useOrder();

  // 👇 Define handler to ask persons before adding to cart
  const handleAddToCart = (meal) => {
    const input = prompt("How many people are you serving?", "1");
    const persons = parseInt(input);
    if (!isNaN(persons) && persons > 0) {
      // Optionally: meal.serves = 1 (default)
      addToCart({ ...meal, serves: 1 }, persons);
    } else {
      alert("Please enter a valid number.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to Home Cook
      </h1>

      {loadingCategories ? (
        <p className="text-center text-gray-600">Loading categories...</p>
      ) : (
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      {selectedCategory && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Meals in {selectedCategory}
          </h2>
          {loadingMeals ? (
            <p className="text-center text-gray-600">Loading meals...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  onAddToCart={() => handleAddToCart(meal)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
