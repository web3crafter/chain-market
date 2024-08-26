import { eq } from "drizzle-orm"
import { database } from "@/db/database"

import { items } from "@/db/schema"

export const getAllItems = async () => {
  return await database.query.items.findMany()
}

export const getItem = async (id: number) => {
  return await database.query.items.findFirst({
    where: eq(items.id, id),
  })
}
