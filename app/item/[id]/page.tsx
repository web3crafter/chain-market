import Image from "next/image"

import { getItem } from "@/data.access/items"

import { BuyButton } from "@/components/buy-button"
import { formatToEther } from "@/lib/utils"

const ItemPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const item = await getItem(Number(id))

  if (!item) {
    return <div>Item not found</div>
  }

  return (
    <div className="flex items-center gap-8">
      <div className="flex h-96 w-1/2 flex-col justify-between">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <p className="text-xl font-semibold">{formatToEther(item.price)}</p>
        <p>{item.description}</p>
        <BuyButton value={formatToEther(item.price)} sellerId={item.sellerId} />
      </div>
      <div className="relative h-96 w-1/2">
        <Image
          src={item.imageUrl[0]}
          fill
          alt="image"
          className="object-contain"
        />
      </div>
    </div>
  )
}
export default ItemPage
