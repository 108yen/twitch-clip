"use client"
import { SearchChannel } from "@/components/form"
import { ClipListLayout } from "@/layouts"
import { Center, Loading } from "@yamada-ui/react"

export function StreamersLoading() {
  return (
    <ClipListLayout>
      <SearchChannel num={0} onChange={() => {}} />

      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    </ClipListLayout>
  )
}
