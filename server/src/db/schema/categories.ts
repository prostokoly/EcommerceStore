import { pgTable, serial, varchar, integer, text } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    image: varchar("image", { length: 500 }),
    description: text("description"),
});
