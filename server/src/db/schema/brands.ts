import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    logo: varchar("logo", { length: 500 }),
    description: text("description"),
});
