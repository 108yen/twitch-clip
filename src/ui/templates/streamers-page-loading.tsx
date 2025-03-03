"use client"
import { SearchChannels } from "@/ui/components/form"
import { AppLayout } from "@/ui/layouts"
import { Center, Heading, HStack, Loading, Skeleton } from "@yamada-ui/react"

export function StreamersLoading() {
  return (
    <AppLayout>
      <HStack my={{ base: "lg", sm: "md" }} p={0} w="full">
        <Skeleton>
          <Heading as="h1" fontWeight="medium" size="xl">
            Past Ranking
          </Heading>
        </Skeleton>
      </HStack>

      <SearchChannels num={0} onChange={() => {}} />

      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    </AppLayout>
  )
}
