"use client"

import { Button } from "@/components/ui/button"

interface BuyButtonProps {
  sellerId: string
  value: string
}

export const BuyButton = ({ value, sellerId }: BuyButtonProps) => {
  return <Button onClick={() => console.log(value, sellerId)}>Buy Now</Button>
}
