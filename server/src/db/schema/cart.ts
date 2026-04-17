import {
    pgTable,
    serial,
    integer,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const cartItems = pgTable(
    "cart_items",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id")
            .references(() => users.id)
            .notNull(),
        productId: integer("product_id")
            .references(() => products.id)
            .notNull(),
        quantity: integer("quantity").default(1).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => {
        return {
            uniqueCartUserProduct: unique("unique_cart_user_product").on(
                table.userId,
                table.productId,
            ),
        };
    },
);
