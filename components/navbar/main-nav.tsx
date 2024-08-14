import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { siteConfig } from "@/config/site"
import { ThemeToggler } from "@/components/theme-toggler"

export const MainNav = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-8">
        <div className="flex gap-4">
          <Link href="/">{siteConfig.name}</Link>

          {siteConfig.mainNav.map((item) => (
            <Link href={item.href} key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <ConnectButton showBalance={false} />
          <ThemeToggler />
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-teal-500 to-primary" />
    </div>
  )
}
