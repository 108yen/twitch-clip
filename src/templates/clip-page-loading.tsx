import { PERIODS } from "@/constant/periods"
import { ClipListLayout } from "@/layouts"
import { Center, CircleProgress, Tab, TabList, Tabs } from "@yamada-ui/react"

export function ClipPageLoading() {
  return (
    <ClipListLayout>
      <Tabs align="center" colorScheme="secondary">
        <TabList>
          {PERIODS.trend.map((tab) => (
            <Tab
              _selected={{
                borderColor: "currentColor",
                borderWidth: "2px",
                color: "secondary",
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

      <Center w="full">
        <CircleProgress isAnimation />
      </Center>
    </ClipListLayout>
  )
}
