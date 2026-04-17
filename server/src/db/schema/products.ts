import {
    pgTable,
    serial,
    varchar,
    integer,
    text,
    jsonb,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { brands } from "./brands";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),

    price: integer("price").notNull(),
    oldPrice: integer("old_price"),

    stock: integer("stock").default(0),
    isActive: boolean("is_active").default(true),

    categoryId: integer("category_id").references(() => categories.id),
    brandId: integer("brand_id").references(() => brands.id),

    images: jsonb("images").$type<string[]>(),
    specifications: jsonb("specifications"),

    rating: integer("rating").default(0),
    reviewCount: integer("review_count").default(0),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
