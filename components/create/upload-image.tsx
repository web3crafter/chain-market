"use client"

import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"

interface UploadImageProps {
  file: File | undefined
  setFile: Dispatch<SetStateAction<File | undefined>>
}

export const UploadImage = ({ file, setFile }: UploadImageProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const createObjectUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const objectUrl = URL.createObjectURL(file)
      setImageUrls([...imageUrls, objectUrl])
      setFile(file)
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Upload images</h2>
        <p>Upload at least one image for your item </p>
        <p className="text-sm text-muted-foreground">max size 4MB</p>
      </div>
      <div className="flex w-full items-center justify-center text-teal-500">
        {imageUrls.length > 0 ? (
          <Image src={imageUrls[0]} width={200} height={200} alt="image" />
        ) : (
          <Image
            src="/upload_image_teal.svg"
            width={200}
            height={200}
            alt="image"
          />
        )}
      </div>
      <label
        htmlFor="image-uploader"
        className={cn(
          "hover:cursor-pointer",
          buttonVariants({ variant: "default" }),
        )}
      >
        <input
          id="image-uploader"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => createObjectUrl(e)}
        />
        Select Image
      </label>
    </div>
  )
}
