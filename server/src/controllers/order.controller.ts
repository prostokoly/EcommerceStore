import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { orders, orderItems } from "../db/schema/orders";
import { cartItems } from "../db/schema/cart";
import { products } from "../db/schema/products";
import { eq, desc, and, inArray } from "drizzle-orm";

export const OrderController = {
    createOrder: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;
            const { shippingAddress, items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ message: "Cart is empty" });
            }

            let totalAmount = 0;
            const itemsToInsert = [];

            for (const item of items) {
                const product = await db.query.products.findFirst({
                    where: eq(products.id, item.id),
                });
                if (!product) {
                    return res.status(404).json({ message: "Cart is empty" });
                }
                const price = product.price || 0;
                const quantity = item.quantity || 1;
                totalAmount += price * quantity;
                itemsToInsert.push({
                    productId: item.id,
                    quantity: quantity,
                    price: price,
                });
            }
            if (isNaN(totalAmount)) {
                totalAmount = 0;
            }
            const [newOrder] = await db
                .insert(orders)
                .values({
                    userId,
                    totalAmount: Math.round(totalAmount),
                    status: "pending",
                    shippingAddress: shippingAddress || "Not specified",
                })
                .returning();

            const itemsWithOrderId = itemsToInsert.map((item) => ({
                ...item,
                orderId: newOrder.id,
            }));

            await db.insert(orderItems).values(itemsWithOrderId);

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: newOrder,
            });
        } catch (err) {
            next(err);
        }
    },

    getMyOrders: async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId;

            const userOrders = await db
                .select()
                .from(orders)
                .where(eq(orders.userId, userId))
                .orderBy(desc(orders.createdAt));

            res.json({ success: true, count: userOrders.length, userOrders });
        } catch (err) {
            next(err);
        }
    },

    getOrderDetails: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;

            const order = await db.query.orders.findFirst({
                where: eq(orders.id, Number(id)),
                with: {
                    orderItems: {
                        with: {
                            product: true,
                        },
                    },
                },
            });

            if (!order)
                return res.status(404).json({ message: "Order not found" });

            res.json({ success: true, order });
        } catch (err) {
            next(err);
        }
    },
};
