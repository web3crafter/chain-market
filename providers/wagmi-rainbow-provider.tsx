"use client"

import React from "react"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { sepolia } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { env } from "@/env"

const config = getDefaultConfig({
  appName: "Chain Market",
  projectId: env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains: [sepolia],
  ssr: true,
})

const queryClient = new QueryClient()

export const WagmiRainbowProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
