import Order from "../models/order.models.js";

export const placeOrder = async (req, res) => {
    try {
        const { cartId, items, deliveryAddress, deliveryTime } = req.body;

        if (!cartId || !items || !items.length || !deliveryAddress || !deliveryTime) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const total = items.reduce((sum, item) => {
            const price = item.price || 500;
            const quantity = item.quantity || 1;
            return sum + price * quantity;
        }, 0);

        const order = await Order.create({
            cartId,
            items,
            deliveryAddress,
            deliveryTime,
            total,
        });

        return res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("❌ Order placement error:", error);
        return res.status(500).json({ message: "Failed to place order", error });
    }
};
