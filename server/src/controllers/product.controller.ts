import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { products } from "../db/schema/products";
import { eq, and, desc, sql } from "drizzle-orm";

export const ProductController = {
    // Получить все товары (с фильтрами и пагинацией)
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                category,
                brand,
                minPrice,
                maxPrice,
                inStock,
                sort = "newest",
                page = 1,
                limit = 12,
            } = req.query;

            let query = db.select().from(products);

            const conditions = [];

            if (category) {
                conditions.push(eq(products.categoryId, Number(category)));
            }

            if (brand) {
                conditions.push(eq(products.brandId, Number(brand)));
            }

            if (minPrice) {
                conditions.push(sql`${products.price} >= ${Number(minPrice)}`);
            }

            if (maxPrice) {
                conditions.push(sql`${products.price} <= ${Number(maxPrice)}`);
            }

            if (inStock === "true") {
                conditions.push(sql`${products.stock} > 0`);
            }

            let orderBy = desc(products.createdAt);
            if (sort === "price_asc") orderBy = sql`${products.price} ASC`;
            if (sort === "price_desc") orderBy = sql`${products.price} DESC`;
            if (sort === "rating") orderBy = desc(products.rating);

            const offset = (Number(page) - 1) * Number(limit);

            const productList = await query
                .where(and(...conditions))
                .orderBy(orderBy)
                .limit(Number(limit))
                .offset(offset);

            const total = await db
                .select({ count: sql`count(*)` })
                .from(products);

            res.json({
                success: true,
                count: productList.length,
                total: total[0].count,
                page: Number(page),
                pages: Math.ceil(Number(total[0].count) / Number(limit)),
                productList,
            });
        } catch (err) {
            next(err);
        }
    },

    getBySlug: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;

            const product = await db.query.products.findFirst({
                where: eq(products.slug, slug),
            });

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json({ success: true, product });
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                name,
                slug,
                description,
                price,
                oldPrice,
                stock,
                categoryId,
                brandId,
                images,
                specifications,
            } = req.body;

            if (!name || !slug || !price || !categoryId) {
                return res
                    .status(400)
                    .json({ message: "Required fields missing" });
            }

            const [newProduct] = await db
                .insert(products)
                .values({
                    name,
                    slug,
                    description,
                    price: Number(price),
                    oldPrice: oldPrice ? Number(oldPrice) : null,
                    stock: Number(stock) || 0,
                    categoryId: Number(categoryId),
                    brandId: brandId ? Number(brandId) : null,
                    images: images || [],
                    specifications: specifications || {},
                })
                .returning();

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                newProduct,
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;
            const updateData = req.body;

            const [updated] = await db
                .update(products)
                .set(updateData)
                .where(eq(products.slug, slug))
                .returning();

            if (!updated) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json({ success: true, message: "Updated", updated });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const slug = req.params.slug as string;

            const [deleted] = await db
                .delete(products)
                .where(eq(products.slug, slug))
                .returning();

            if (!deleted) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json({ success: true, message: "Deleted" });
        } catch (err) {
            next(err);
        }
    },
};
