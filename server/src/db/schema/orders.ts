import {
    pgTable,
    serial,
    integer,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { products } from "./products";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    totalAmount: integer("total_amount").notNull(),
    status: varchar("status").default("pending"),
    shippingAddress: text("shipping_address"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
        .references(() => orders.id)
        .notNull(),
    productId: integer("product_id")
        .references(() => products.id)
        .notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
});

export const ordersRelations = relations(orders, ({ many, one }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));
