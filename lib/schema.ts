import { z } from "zod"

//TODO: Add the right validation

export const createItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  sellerId: z.string().min(1),
  image: z.string(),
  createdAt: z.date(),
})

export const createItemFormSchema = createItemSchema.pick({
  title: true,
  description: true,
  price: true,
})

export type CreateItemFormSchema = z.infer<typeof createItemFormSchema>
export type CreateItemSchema = z.infer<typeof createItemSchema>
