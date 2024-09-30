import { Center, Grid, GridItem, SimpleGridProps } from "@yamada-ui/react"
import { PropsWithChildren } from "react"
import VerticalAdvertisement from "@/components/adsense/verticalAdvertisement"

interface ClipListLayoutProps extends SimpleGridProps, PropsWithChildren {}

export function ClipListLayout({ children, ...rest }: ClipListLayoutProps) {
  return (
    <Center>
      <Grid
        templateColumns="repeat(5, 1fr)"
        w="full"
        maxW="9xl"
        py="3"
        px={{ base: "lg", md: "md" }}
        gap="md"
        {...rest}
      >
        <GridItem colSpan={4} w="full">
          {children}
        </GridItem>

        <GridItem colSpan={1} w="full">
          <VerticalAdvertisement />
        </GridItem>
      </Grid>
    </Center>
  )
}
