import { SideBarAD } from "@/components/adsense"
import { Center, Grid, GridItem, SimpleGridProps } from "@yamada-ui/react"
import { PropsWithChildren } from "react"

interface ClipListLayoutProps extends SimpleGridProps, PropsWithChildren {}

export function ClipListLayout({ children, ...rest }: ClipListLayoutProps) {
  return (
    <Center>
      <Grid
        gap="md"
        maxW="9xl"
        px={{ base: "lg", lg: "md", sm: "xs" }}
        py="3"
        templateColumns="repeat(5, 1fr)"
        w="full"
        {...rest}
      >
        <GridItem colSpan={{ base: 4, lg: 5 }} w="full">
          {children}
        </GridItem>

        <GridItem
          colSpan={{ base: 1, lg: 0 }}
          display={{ base: "flex", lg: "none" }}
          justifyContent="center"
          w="full"
        >
          <SideBarAD />
        </GridItem>
      </Grid>
    </Center>
  )
}
