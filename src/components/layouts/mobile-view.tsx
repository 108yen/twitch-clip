import { ClipListTabs, StreamerInfo } from "@/components/data-display"
import { useClip } from "@/contexts"
import { AspectRatio, VStack } from "@yamada-ui/react"

export function MobileView() {
  const { currentClip } = useClip()

  const src = `${currentClip?.embed_url}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`

  return (
    <VStack gap={1}>
      <AspectRatio
        apply="layoutStyles.borderCard"
        position="sticky"
        ratio={16 / 9}
        top={0}
        w="full"
        zIndex="freeza"
      >
        <iframe allowFullScreen loading="lazy" src={src} />
      </AspectRatio>

      {/* ClipInfo */}

      <StreamerInfo />

      <ClipListTabs />
    </VStack>
  )
}
