import { Cart } from '../models/cart.models.js';

export const addToCart = async (req, res) => {
    const { cartId, item } = req.body;

    if (!cartId || !item?.idMeal) {
        return res.status(400).json({ message: "Missing cartId or item" });
    }

    try {
        let cart = await Cart.findOne({ cartId });

        if (!cart) {
            cart = new Cart({
                cartId,
                items: [{ ...item, quantity: 1 }],
            });
        } else {
            const existingItem = cart.items.find(i => i.idMeal === item.idMeal);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ ...item, quantity: 1 });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item", error });
    }
}

export const getCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await Cart.findOne({ cartId });
        res.status(200).json(cart || { cartId, items: [] });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart", error });
    }
};

export const removeFromCart = async (req, res) => {
    const { cartId, idMeal } = req.body;

    try {
        const cart = await Cart.findOne({ cartId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(i => i.idMeal !== idMeal);
        await cart.save();

        res.status(200).json({ message: "Item removed", cart });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove item", error });
    }
};