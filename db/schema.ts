import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const items = pgTable("cm_item", {
  id: serial("id").primaryKey(),
  sellerId: text("sellerId").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  price: integer("currentBid").notNull().default(0),
})

export type Item = typeof items.$inferSelect
