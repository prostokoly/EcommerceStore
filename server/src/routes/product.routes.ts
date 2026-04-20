import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
router.get("/:slug", ProductController.getBySlug);

router.get("/", ProductController.getAll);

router.post("/", authenticate, ProductController.create);
router.put("/:slug", authenticate, ProductController.update);
router.delete("/:slug", authenticate, ProductController.delete);

export default router;
