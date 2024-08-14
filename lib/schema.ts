import { z } from "zod"

//TODO: Add the right validation

export const createItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  image: z.string().min(1),
  sellerId: z.optional(z.string().min(1)),
})

export type CreateItemSchema = z.infer<typeof createItemSchema>
