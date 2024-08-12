import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("cm_user", {
  id: text("id").primaryKey(),
  image: text("image"),
})

export const items = pgTable("cm_item", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  fileKey: text("fileKey").notNull(),
  currentBid: integer("currentBid").notNull().default(0),
  startingPrice: integer("startingPrice").notNull().default(0),
  bidInterval: integer("bidInterval").notNull().default(100),
  endDate: timestamp("endDate", { mode: "date" }).notNull(),
})

export type Item = typeof items.$inferSelect
