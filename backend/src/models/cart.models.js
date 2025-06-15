import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    strMealThumb: { type: String, required: true },
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model("Cart", CartSchema);
