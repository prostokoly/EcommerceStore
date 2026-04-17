import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { cartItems } from "../db/schema/cart";
import { products } from "../db/schema/products";
import { eq, and, sql } from "drizzle-orm";

export const CartController = {
    getCart: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;

            const items = await db
                .select({
                    id: cartItems.id,
                    productId: cartItems.productId,
                    quantity: cartItems.quantity,
                    product: products,
                })
                .from(cartItems)
                .leftJoin(products, eq(cartItems.productId, products.id))
                .where(eq(cartItems.userId, userId));

            const total = items.reduce((sum, item) => {
                if (item.product) {
                    return sum + item.product.price * item.quantity;
                }
                return sum;
            }, 0);

            res.json({ success: true, count: items.length, total, items });
        } catch (err) {
            next(err);
        }
    },

    addToCart: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const { productId, quantity = 1 } = req.body;

            if (!productId) {
                return res.status(400).json({ message: "Product ID required" });
            }

            const existingItem = await db.query.cartItems.findFirst({
                where: and(
                    eq(cartItems.userId, userId),
                    eq(cartItems.productId, productId),
                ),
            });

            if (existingItem) {
                const [updated] = await db
                    .update(cartItems)
                    .set({ quantity: existingItem.quantity + quantity })
                    .where(eq(cartItems.id, existingItem.id))
                    .returning();

                return res.json({
                    success: true,
                    message: "Cart updated",
                    updated,
                });
            }

            const [newItem] = await db
                .insert(cartItems)
                .values({
                    userId,
                    productId,
                    quantity,
                })
                .returning();

            res.status(201).json({
                success: true,
                message: "Added to cart",
                newItem,
            });
        } catch (err) {
            next(err);
        }
    },

    updateQuantity: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const { productId } = req.params;
            const { quantity } = req.body;

            if (quantity === 0) {
                await db
                    .delete(cartItems)
                    .where(
                        and(
                            eq(cartItems.userId, userId),
                            eq(cartItems.productId, Number(productId)),
                        ),
                    );

                return res.json({
                    success: true,
                    message: "Removed from cart",
                });
            }

            const [updated] = await db
                .update(cartItems)
                .set({ quantity })
                .where(
                    and(
                        eq(cartItems.userId, userId),
                        eq(cartItems.productId, Number(productId)),
                    ),
                )
                .returning();

            if (!updated) {
                return res.status(404).json({ message: "Cart item not found" });
            }

            res.json({ success: true, message: "Updated", updated });
        } catch (err) {
            next(err);
        }
    },

    removeFromCart: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const { productId } = req.params;

            await db
                .delete(cartItems)
                .where(
                    and(
                        eq(cartItems.userId, userId),
                        eq(cartItems.productId, Number(productId)),
                    ),
                );

            res.json({ success: true, message: "Removed from cart" });
        } catch (err) {
            next(err);
        }
    },

    clearCart: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;

            await db.delete(cartItems).where(eq(cartItems.userId, userId));

            res.json({ success: true, message: "Cart cleared" });
        } catch (err) {
            next(err);
        }
    },
};
