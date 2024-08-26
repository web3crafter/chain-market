import { database } from "@/db/database"

import { ItemCard } from "@/components/item-card"
import { getAllItems } from "@/data.access/items"

const HomePage = async () => {
  const items = await getAllItems()

  return (
    <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </main>
  )
}

export default HomePage
