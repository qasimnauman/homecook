import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    strMealThumb: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 500 },
});

const OrderSchema = new mongoose.Schema({
    cartId: { type: String, required: true },
    items: [OrderItemSchema],
    deliveryAddress: { type: String, required: true },
    deliveryTime: { type: Date, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
export default Order;