import {
  Center,
  Heading,
  HStack,
  Loading,
  Skeleton,
  Tab,
  TabList,
  Tabs,
} from "@yamada-ui/react"
import { CONSTANT } from "@/constant"
import { AppLayout } from "@/ui/layouts"

export function ClipPageLoading() {
  return (
    <AppLayout>
      <HStack my={{ base: "lg", sm: "md" }} p={0} w="full">
        <Skeleton>
          <Heading as="h1" fontWeight="medium" size="xl">
            Past Ranking
          </Heading>
        </Skeleton>
      </HStack>

      <Tabs align="center" index={0}>
        <TabList>
          {CONSTANT.PERIODS.trend.map((tab) => (
            <Tab
              _selected={{
                borderColor: "currentColor",
                borderWidth: "2px",
                color: "primary.500",
              }}
              fontSize="sm"
              key={tab}
              p={3}
              w="4xs"
            >
              {tab.toUpperCase()}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Center h="3xs" w="full">
        <Loading fontSize="2xl" />
      </Center>
    </AppLayout>
  )
}
