"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { createItemAction } from "@/actions/createItem"
import { createItemFormSchema } from "@/lib/schema"
import { useUploadThing } from "@/hooks/use-upload-thing"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadImage } from "@/components/create/upload-image"
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
  const [file, setFile] = useState<File | undefined>()
  const createButtonDisabled = !file || !addressFromWagmi

  const form = useForm<z.infer<typeof createItemFormSchema>>({
    resolver: zodResolver(createItemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  })

  const { startUpload } = useUploadThing("imageUploader", {
    async onClientUploadComplete(res) {
      await createItemAction({
        title: form.getValues("title"),
        description: form.getValues("description"),
        price: form.getValues("price").toString(),
        sellerId: addressFromWagmi as string,
        image: res[0].url,
        createdAt: new Date(Date.now()),
      })

      form.reset()
      setFile(undefined)
    },
  })

  const onSubmit = async (data: z.infer<typeof createItemFormSchema>) => {
    if (!file) {
      console.error("No file selected")
      return
    }

    if (!addressFromWagmi) {
      console.error("No wallet address")
      return
    }

    try {
      await startUpload([file])
    } catch (error) {
      console.log("Upload failed", error)
    }
  }

  return (
    <div className="flex w-full justify-between">
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
              This is the address that will receive the ETH when the item is
              sold.
            </p>
          </div>

          {addressFromWagmi ? (
            <Button type="submit" disabled={createButtonDisabled}>
              Create Item
            </Button>
          ) : (
            <ConnectButton />
          )}
        </form>
      </Form>

      <UploadImage file={file} setFile={setFile} />
    </div>
  )
}
