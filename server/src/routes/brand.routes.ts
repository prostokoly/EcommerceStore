import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { authenticate, isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", BrandController.getAll);
router.get("/:slug", BrandController.getBySlug);

router.post("/", authenticate, BrandController.create);
router.put("/:slug", authenticate, BrandController.update);
router.delete("/:slug", authenticate, BrandController.delete);

export default router;
