import React, { useState } from "react";
import { useOrder } from "../hooks/orderContext.jsx";
import CheckoutItem from "../components/Checkout/CheckoutItem";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCartId } from "../utils/cartId";

export default function CheckoutPage() {
  const {
    cart,
    loadingCart,
    delivery,
    setDelivery,
    deliveryTime,
    setDeliveryTime,
    clearCart,
  } = useOrder();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const defaultPrice = 500; // Fallback price if not present
  const subtotal = cart.reduce((sum, item) => {
    const price = item.price || defaultPrice;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const canOrder = () => {
    if (!deliveryTime || !delivery) return false;
    const diff = dayjs(deliveryTime).diff(dayjs(), "hour");
    return diff >= 5;
  };

  const handlePlaceOrder = async () => {
    if (!canOrder()) {
      setError("Please choose a delivery time at least 5 hours from now.");
      return;
    }

    try {
      const cartId = getCartId(); // Get stored cart ID

      const payload = {
        cartId,
        items: cart,
        deliveryAddress: delivery,
        deliveryTime,
      };

      const res = await axios.post("/api/v1/order/place", payload);

      alert(
        `✅ Order placed!\nTotal: Rs ${res.data.order.total.toFixed(
          2
        )}\nDelivering to: ${res.data.order.deliveryAddress}`
      );

      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-lg text-gray-600">Complete your order below</p>
      </header>

      <div className="w-full max-w-2xl space-y-4">
        {loadingCart ? (
          <p className="text-center text-gray-500">Loading your cart...</p>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => <CheckoutItem key={item.idMeal} item={item} />)
        )}

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-xl">
            Subtotal: <strong>Rs {subtotal.toFixed(2)}</strong>
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <label className="text-sm">
              Delivery Time:
              <input
                type="datetime-local"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            <label className="text-sm">
              Delivery Address:
              <input
                type="text"
                placeholder="123 Main Street, City"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              />
            </label>

            {error && <p className="text-red-600">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              disabled={!cart.length || !canOrder()}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
