import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from "date-fns"
import { formatEther } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp: Date) => {
  return formatDistance(timestamp, new Date(), { addSuffix: true })
}

export const formatToEther = (wei: bigint) => {
  const priceEth = formatEther(wei)
  return `${Number(priceEth).toFixed(4)} ETH`
}
