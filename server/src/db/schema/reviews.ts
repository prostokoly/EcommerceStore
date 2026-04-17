import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const reviews = pgTable(
    "reviews",
    {
        id: serial("id").primaryKey(),

        userId: integer("user_id")
            .references(() => users.id)
            .notNull(),
        productId: integer("product_id")
            .references(() => products.id)
            .notNull(),
        rating: integer("rating").notNull(), // 1-5
        comment: text("comment"),

        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => {
        return {
            uniqueUserProduct: unique("unique_user_product").on(
                table.userId,
                table.productId,
            ),
        };
    },
);
