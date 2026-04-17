import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { categories } from "../db/schema/categories";
import { eq } from "drizzle-orm";

export const CategoryController = {
    getAll: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await db.query.categories.findMany();
            res.json({ success: true, count: list.length, list });
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, slug, description, image } = req.body;
            if (!name || !slug)
                return res
                    .status(400)
                    .json({ message: "Name and slug required" });

            const existing = await db.query.categories.findFirst({
                where: eq(categories.slug, slug),
            });
            if (existing)
                return res.status(400).json({ message: "Slug already exists" });

            const [created] = await db
                .insert(categories)
                .values({ name, slug, description, image })
                .returning();
            res.status(201).json({
                success: true,
                message: "Created",
                created,
            });
        } catch (err) {
            next(err);
        }
    },

    getBySlug: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;

            const category = await db.query.categories.findFirst({
                where: eq(categories.slug, slug),
            });

            if (!category)
                return res.status(404).json({ message: "Not found" });
            res.json({ success: true, category });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;
            const { name, description, image } = req.body;

            const [updated] = await db
                .update(categories)
                .set({ name, description, image })
                .where(eq(categories.slug, slug))
                .returning();

            if (!updated) return res.status(404).json({ message: "Not found" });
            res.json({ success: true, message: "Updated", updated });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;

            const [deleted] = await db
                .delete(categories)
                .where(eq(categories.slug, slug))
                .returning();

            if (!deleted) return res.status(404).json({ message: "Not found" });
            res.json({ success: true, message: "Deleted" });
        } catch (err) {
            next(err);
        }
    },
};
