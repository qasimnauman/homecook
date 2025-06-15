// src/hooks/orderContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCartId } from "../utils/cartId"; // crypto UUID stored in localStorage

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({ children }) {
  const [loadingCart, setLoadingCart] = useState(true);
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(
    () => localStorage.getItem("deliveryAddress") || ""
  );
  const [deliveryTime, setDeliveryTime] = useState(
    () => localStorage.getItem("deliveryTime") || ""
  );
  const cartId = getCartId();

  useEffect(() => {
    setLoadingCart(true);
    axios
      .get(`/api/v1/cart/${cartId}`)
      .then((res) => setCart(res.data.items || []))
      .catch(() => setCart([]))
      .finally(() => setLoadingCart(false));
  }, [cartId]);

  // Load cart from backend on mount
  useEffect(() => {
    axios
      .get(`/api/cart/${cartId}`)
      .then((res) => setCart(res.data.items || []))
      .catch(() => setCart([]));
  }, [cartId]);

  // Persist delivery info
  useEffect(() => {
    localStorage.setItem("deliveryAddress", delivery);
  }, [delivery]);

  useEffect(() => {
    localStorage.setItem("deliveryTime", deliveryTime);
  }, [deliveryTime]);

  // Add item to backend cart
  const addToCart = async (item, persons) => {
    const payload = {
      idMeal: item.idMeal,
      strMeal: item.strMeal,
      strMealThumb: item.strMealThumb,
      quantity: Math.ceil(persons / item.serves || 1), // `serves` must exist
    };

    try {
      const res = await axios.post("/api/v1/cart/add", {
        cartId,
        item: payload,
      });
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Failed to add item", err);
    }
  };

  // Remove item by idMeal
  const removeFromCart = async (idMeal) => {
    try {
      const res = await axios.post("/api/v1/cart/remove", {
        cartId,
        idMeal,
      });
      setCart(res.data.cart.items);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const clearCart = () => {
    setCart([]);
    // Optionally, call backend to delete or clear cart
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        delivery,
        setDelivery,
        deliveryTime,
        setDeliveryTime,
        addToCart,
        removeFromCart,
        clearCart,
        loadingCart,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
