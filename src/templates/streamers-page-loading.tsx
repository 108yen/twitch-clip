import { SearchChannel } from "@/components/form"
import { ClipListLayout } from "@/layouts"
import { Center, CircleProgress } from "@yamada-ui/react"

export function StreamersLoading() {
  return (
    <ClipListLayout>
      <SearchChannel num={0} onChange={() => {}} />

      <Center w="full">
        <CircleProgress isAnimation />
      </Center>
    </ClipListLayout>
  )
}
