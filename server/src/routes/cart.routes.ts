import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, CartController.getCart);
router.post("/add", authenticate, CartController.addToCart);
router.put("/update/:productId", authenticate, CartController.updateQuantity);
router.delete(
    "/remove/:productId",
    authenticate,
    CartController.removeFromCart,
);
router.delete("/clear", authenticate, CartController.clearCart);

export default router;
