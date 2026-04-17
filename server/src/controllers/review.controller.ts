import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { reviews } from "../db/schema/reviews";
import { products } from "../db/schema/products";
import { eq, sql, and, desc } from "drizzle-orm";

export const ReviewController = {
    create: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const { productId, rating, comment } = req.body;

            if (!productId || !rating) {
                return res
                    .status(400)
                    .json({ message: "Product ID and Rating are required" });
            }

            const [newReview] = await db
                .insert(reviews)
                .values({
                    userId,
                    productId,
                    rating,
                    comment,
                })
                .returning();

            const result = await db
                .select({
                    avgRating: sql`AVG(${reviews.rating})`,
                    count: sql`COUNT(*)`,
                })
                .from(reviews)
                .where(eq(reviews.productId, productId));

            const avgRating = Number(result[0].avgRating);
            const count = Number(result[0].count);

            await db
                .update(products)
                .set({
                    rating: Math.round(avgRating),
                    reviewCount: count,
                })
                .where(eq(products.id, productId));

            res.status(201).json({ success: true, data: newReview });
        } catch (err) {
            if (String(err).includes("duplicate key")) {
                return res
                    .status(400)
                    .json({
                        message: "You have already reviewed this product",
                    });
            }
            next(err);
        }
    },

    getProductReviews: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { productId } = req.query;
            if (!productId) {
                return res.status(400).json({ message: "Product ID required" });
            }

            const productReviews = await db.query.reviews.findMany({
                where: eq(reviews.productId, Number(productId)),
                with: {
                    user: {
                        columns: { id: true, firstName: true, lastName: true },
                    },
                },
                orderBy: [desc(reviews.createdAt)],
            });

            res.json({
                success: true,
                count: productReviews.length,
                data: productReviews,
            });
        } catch (err) {
            next(err);
        }
    },
};
