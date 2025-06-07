import { HStack, StackProps, Tag } from "@yamada-ui/react"
import Link from "next/link"
import { Team } from "@/models/streamer"

export interface TeamTagProps extends StackProps {
  teams?: Team[]
}

export function TeamTag({ teams, ...rest }: TeamTagProps) {
  return (
    <HStack gap={{ base: "sm", sm: "xs" }} {...rest}>
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
