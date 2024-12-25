import { LayoutGridIcon, Rows3Icon } from "@yamada-ui/lucide"
import {
  Heading,
  HStack,
  SegmentedControl,
  SegmentedControlButton,
  Spacer,
  StackProps,
} from "@yamada-ui/react"

interface FavoriteHeaderProps extends StackProps {
  handleChangeLayout: (value: string) => void
}

export function FavoriteHeader({
  handleChangeLayout,
  ...rest
}: FavoriteHeaderProps) {
  return (
    <HStack marginY={{ base: "md", sm: "sm" }} p={0} w="full" {...rest}>
      <Heading as="h2" size="lg">
        Favorite
      </Heading>

      <Spacer />

      <SegmentedControl
        defaultValue="grid"
        minW="2xs"
        onChange={handleChangeLayout}
      >
        <SegmentedControlButton aria-label="Grid layout" value="grid">
          <LayoutGridIcon />
        </SegmentedControlButton>
        <SegmentedControlButton aria-label="Table layout" value="table">
          <Rows3Icon />
        </SegmentedControlButton>
      </SegmentedControl>
    </HStack>
  )
}
