import React, { useState } from "react";
import { useOrder } from "../hooks/orderContext.jsx";
import CheckoutItem from "../components/Checkout/CheckoutItem";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const {
    cart,
    delivery,
    setDelivery,
    deliveryTime,
    setDeliveryTime,
    clearCart,
  } = useOrder();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum, i) => sum + i.servings * i.price, 0);

  const canOrder = () => {
    if (!deliveryTime) return false;
    const diff = dayjs(deliveryTime).diff(dayjs(), "hour");
    return diff >= 5;
  };

  const handlePlaceOrder = () => {
    if (!canOrder()) {
      setError("Please choose a delivery time at least 5 hours from now.");
      return;
    }
    alert(
      `Order placed!\nTotal: Rs${subtotal.toFixed(2)}\nDeliver to: ${delivery}`
    );
    clearCart();

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Check Out</h1>
        <p className="text-lg">Complete Your Order</p>
      </header>

      <div className="w-full max-w-2xl space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => <CheckoutItem key={item.id} item={item} />)
        )}

        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-xl">
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <label>
              Delivery time:
              <input
                type="datetime-local"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="ml-2 p-1 border rounded"
              />
            </label>
            <label>
              Delivery address:
              <input
                type="text"
                placeholder="123 Main St, City, Country"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="ml-2 p-1 border rounded w-full"
              />
            </label>
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={!cart.length || !canOrder() || !delivery}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
