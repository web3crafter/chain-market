"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAccount } from "wagmi"

import { CreateItemSchema, createItemSchema } from "@/lib/schema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export const CreateForm = () => {
  const { address: addressFromWagmi } = useAccount()

  const form = useForm<z.infer<typeof createItemSchema>>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0",
      image: "imageUrl",
    },
  })

  const onSubmit = (data: z.infer<typeof createItemSchema>) => {
    const newData: CreateItemSchema = {
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      sellerId: addressFromWagmi,
    }
    console.log("submittedData:", newData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-xl flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are you selling?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your item</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your sale price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="font-semibold">Recipient address</p>
          </div>
          <p>{addressFromWagmi}</p>
          <p>
            This is the address that will receive the ETH when the item is sold.
          </p>
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <p>{form.getValues("image")}</p>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Crate Item</Button>
      </form>
    </Form>
  )
}
