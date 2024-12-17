"use client"
import { SearchChannels } from "@/components/form"
import { AppLayout } from "@/layouts"
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
