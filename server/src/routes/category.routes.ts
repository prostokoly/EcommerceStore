import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate, isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:slug", CategoryController.getBySlug);

router.post("/", authenticate, CategoryController.create);
router.put("/:slug", authenticate, CategoryController.update);
router.delete("/:slug", authenticate, CategoryController.delete);

export default router;
