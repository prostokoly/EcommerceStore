import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, OrderController.createOrder);
router.get("/", authenticate, OrderController.getMyOrders);
router.get("/:id", authenticate, OrderController.getOrderDetails);

export default router;
