import { Router } from "express";
import {
    addToCart,
    getCart,
    removeFromCart
} from "../controllers/cart.controller.js"

const router = Router();

router.route("/add").post(addToCart);
router.route("/:cartId").get(getCart);
router.route("/remove").post(removeFromCart);

export default router;