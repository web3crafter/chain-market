import { bigint, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const items = pgTable("cm_items", {
  id: serial("id").primaryKey(),
  sellerId: text("sellerId").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: bigint("price", { mode: "bigint" }).notNull(),
  imageUrl: text("imageUrl").array().notNull().default([]),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
})

export type Item = typeof items.$inferSelect
