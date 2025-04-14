import { AspectRatio, AspectRatioProps } from "@yamada-ui/react"

interface PlayerProps extends AspectRatioProps {
  embedUrl?: string
}

export function Player({ embedUrl, ...rest }: PlayerProps) {
  const src = `${embedUrl}&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com&muted=false&autoplay=true`

  return (
    <AspectRatio layerStyle="player" ratio={16 / 9} w="full" {...rest}>
      <iframe allow="autoplay" allowFullScreen loading="lazy" src={src} />
    </AspectRatio>
  )
}
