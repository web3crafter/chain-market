import Link from "next/link"
import Image from "next/image"

import { Item } from "@/db/schema"
import { formatTimestamp, formatToEther } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ItemCardProps {
  item: Item
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="capitalize">
        <CardTitle>{item.title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between">
        <div className="relative flex h-64 w-64 self-center">
          <Image
            src={item.imageUrl[0]}
            alt="image"
            fill
            className="absolute object-contain"
          />
        </div>
        <div className="mt-4">
          <p className="font-semibold">{formatToEther(item.price)}</p>
          <div className="text-sm text-muted-foreground">
            <p>
              Seller: {item.sellerId.slice(0, 5)}...{item.sellerId.slice(-4)}
            </p>
            <p>Created: {formatTimestamp(item.createdAt)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/item/${item.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
