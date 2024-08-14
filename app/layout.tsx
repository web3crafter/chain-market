import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { SiteHeader } from "@/components/navbar/site-header"
import { Footer } from "@/components/navbar/footer"
import { WagmiRainbowProvider } from "@/providers/wagmi-rainbow-provider"
import "@rainbow-me/rainbowkit/styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WagmiRainbowProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="container">
              <SiteHeader />
              <div className="py-16">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </WagmiRainbowProvider>
      </body>
    </html>
  )
}
