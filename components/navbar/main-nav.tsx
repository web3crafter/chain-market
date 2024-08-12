import { ThemeToggler } from "@/components/theme-toggler"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export const MainNav = () => {
  return (
    <div className="flex items-center justify-between py-8">
      <div className="flex gap-4">
        <Link href="/">{siteConfig.name}</Link>

        {siteConfig.mainNav.map((item) => (
          <div key={item.title}>{item.title}</div>
        ))}
      </div>
      <div>
        <ThemeToggler />
      </div>
    </div>
  )
}
