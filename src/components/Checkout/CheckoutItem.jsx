import React from "react";
import { useOrder } from "../../hooks/orderContext.jsx";

export default function CheckoutItem({ item }) {
  const { removeFromCart } = useOrder();
  const { name, description, image, price, servings, persons, id } = item;

  return (
    <div className="flex flex-row justify-between items-center p-4 bg-amber-100 rounded-lg shadow-md gap-5">
      <img
        className="h-24 w-24 object-cover rounded-lg"
        src={image}
        alt={name}
      />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p>Persons: {persons}</p>
        <p>
          Servings: {servings} @ ${price.toFixed(2)} each
        </p>
        <p className="font-bold">Subtotal: ${(servings * price).toFixed(2)}</p>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
}
