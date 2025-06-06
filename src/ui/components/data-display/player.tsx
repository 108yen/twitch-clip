import { AspectRatio, AspectRatioProps, Text } from "@yamada-ui/react"

interface PlayerProps extends AspectRatioProps {
  embedUrl?: string
}

export function Player({ embedUrl, ...rest }: PlayerProps) {
  if (!embedUrl) {
    return (
      <AspectRatio layerStyle="player" ratio={16 / 9} w="full" {...rest}>
        <Text bg={["black", "white"]} color={["white", "black"]}>
          クリップが選択されていません
        </Text>
      </AspectRatio>
    )
  }

  const url = new URL(embedUrl)

  url.searchParams.append("parent", "www.twitchclipsranking.com")
  url.searchParams.append("parent", "twitchclipsranking.com")
  url.searchParams.append("muted", "false")
  url.searchParams.append("autoplay", "true")

  if (process.env.NEXT_PUBLIC_VERCEL_ENV != "production")
    url.searchParams.append("parent", "localhost")

  return (
    <AspectRatio layerStyle="player" ratio={16 / 9} w="full" {...rest}>
      <iframe
        allow="autoplay"
        allowFullScreen
        loading="lazy"
        src={url.toString()}
        title="Twitch Clip Player"
      />
    </AspectRatio>
  )
}
