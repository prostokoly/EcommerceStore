import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, ReviewController.create);

router.get("/", ReviewController.getProductReviews);

export default router;
