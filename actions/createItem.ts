"use server"

import { items } from "@/db/schema"
import { database } from "@/db/database"
import { redirect } from "next/navigation"
import { CreateItemSchema } from "@/lib/schema"
import { parseEther } from "viem"

export const createItemAction = async (values: CreateItemSchema) => {
  const { title, description, price, sellerId, image, createdAt } = values
  const imageUrls = [image]
  const priceWei = parseEther(price)

  const insertedItemToDB = await database
    ?.insert(items)
    .values({
      title,
      description,
      price: priceWei,
      sellerId,
      imageUrl: imageUrls,
      createdAt,
    })
    .returning()

  redirect(`/item/${insertedItemToDB[0].id}`)
}
