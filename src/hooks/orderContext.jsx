import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export default function OrderProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            return [];
        }
    });
    const [delivery, setDelivery] = useState(() => {
        return localStorage.getItem("deliveryAddress") || "";
    });
    const [deliveryTime, setDeliveryTime] = useState(() => {
        return localStorage.getItem("deliveryTime") || "";
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        localStorage.setItem("deliveryAddress", delivery);
    }, [delivery]);
    useEffect(() => {
        localStorage.setItem("deliveryTime", deliveryTime);
    }, [deliveryTime]);

    const addToCart = (item, persons) => {
        setCart(prev => {
            const idx = prev.findIndex(i => i.id === item.id);
            const servings = Math.ceil(persons / item.serves);
            const payload = { ...item, persons, servings };
            if (idx > -1) {
                const next = [...prev];
                next[idx] = payload;
                return next;
            }
            return [...prev, payload];
        });
    };

    const removeFromCart = (id) =>
        setCart(prev => prev.filter(i => i.id !== id));

    const clearCart = () => setCart([]);

    return (
        <OrderContext.Provider value={{
            cart,
            delivery, setDelivery,
            deliveryTime, setDeliveryTime,
            addToCart,
            removeFromCart,
            clearCart,
        }}>
            {children}
        </OrderContext.Provider>
    );
}
