import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { brands } from "../db/schema/brands";
import { eq } from "drizzle-orm";

export const BrandController = {
    getAll: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await db.query.brands.findMany();
            res.json({ success: true, count: list.length, list });
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, slug, description, logo } = req.body;
            if (!name || !slug)
                return res
                    .status(400)
                    .json({ message: "Name and slug required" });

            const existing = await db.query.brands.findFirst({
                where: eq(brands.slug, slug),
            });
            if (existing)
                return res.status(400).json({ message: "Slug already exists" });

            const [created] = await db
                .insert(brands)
                .values({ name, slug, description, logo })
                .returning();
            res.status(201).json({
                success: true,
                message: "Brand created",
                created,
            });
        } catch (err) {
            next(err);
        }
    },

    getBySlug: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;
            const brand = await db.query.brands.findFirst({
                where: eq(brands.slug, slug),
            });

            if (!brand) return res.status(404).json({ message: "Not found" });
            res.json({ success: true, brand });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;
            const { name, description, logo } = req.body;

            const [updated] = await db
                .update(brands)
                .set({ name, description, logo })
                .where(eq(brands.slug, slug))
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
                .delete(brands)
                .where(eq(brands.slug, slug))
                .returning();

            if (!deleted) return res.status(404).json({ message: "Not found" });
            res.json({ success: true, message: "Deleted" });
        } catch (err) {
            next(err);
        }
    },
};
