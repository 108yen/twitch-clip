"use client"

import { ClipGrid } from "@/components/data-display"
import { FavoriteHeader } from "@/components/layouts"
import { AppLayout } from "@/layouts"

export function FavoritePage() {
  return (
    <AppLayout>
      <FavoriteHeader />

      <ClipGrid />
    </AppLayout>
  )
}
