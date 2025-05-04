import React from "react";
import { useOrder } from "../hooks/orderContext.jsx";
import useMenuInfo from "../hooks/fetchData";
import MenuItem from "../components/Home/MenuItem";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const menuItems = useMenuInfo();
  const { cart } = useOrder();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="pt-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Home Cook</h1>
        <p className="text-lg mb-4">Your one-stop solution to all your cravings.</p>
      </header>

      <section className="w-full max-w-2xl p-4">
        <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-semibold">Menu</h2>
            <p className="text-gray-600">Choose from our delicious menu items below:</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>Items in Cart: <strong>{cart.length}</strong></p>
            <button
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 bg-orange-700 text-white rounded-2xl hover:bg-orange-800"
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96 space-y-4">
          {menuItems.length > 0 ? (
            menuItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))
          ) : (
            <p>Loading menu…</p>
          )}
        </div>
      </section>
    </div>
  );
}
