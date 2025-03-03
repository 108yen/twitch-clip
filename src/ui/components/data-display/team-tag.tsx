import { Team } from "@/models/streamer"
import { HStack, Tag } from "@yamada-ui/react"
import Link from "next/link"

export interface TeamTagProps {
  teams?: Team[]
}

export function TeamTag({ teams }: TeamTagProps) {
  return (
    <HStack gap={{ base: "md", sm: "xs" }}>
      {teams?.map(({ display_name }, index) => (
        <Tag
          as={Link}
          href={`/streamers?text=${display_name}`}
          key={index}
          size="sm"
          target="_blank"
          variant="outline"
        >
          {display_name}
        </Tag>
      ))}
    </HStack>
  )
}
