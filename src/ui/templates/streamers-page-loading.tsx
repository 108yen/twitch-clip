"use client"
import { SearchChannels } from "@/ui/components/form"
import { AppLayout } from "@/ui/layouts"
import { Center, Loading } from "@yamada-ui/react"

export function StreamersLoading() {
  return (
    <AppLayout>
      <SearchChannels num={0} onChange={() => {}} />

      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    </AppLayout>
  )
}
