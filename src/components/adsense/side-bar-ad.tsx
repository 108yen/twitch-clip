"use client"

import { Box, BoxProps, Separator, Text, VStack } from "@yamada-ui/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function SideBarAD(props: BoxProps) {
  const pathname = usePathname()

  useEffect(() => {
    try {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      if ((window as any).adsbygoogle) {
        ;(window as any).adsbygoogle.push({})
      }
    } catch (error) {
      console.error(error)
    }
  }, [pathname])

  return (
    <Box
      alignItems="center"
      justifyContent="flex-start"
      position="fixed"
      top={100}
      w="fit-content"
      {...props}
    >
      <VStack alignItems="center" gap={0} position="relative">
        <Text textStyle="adsenseTitle">Advertisement</Text>

        <Separator minW="2xs" />

        <Box key={pathname} p={2} textAlign="center">
          <Box
            as="ins"
            className="adsbygoogle"
            data-ad-client="ca-pub-1615921337969017"
            data-ad-format="auto"
            data-ad-slot="1041812482"
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-full-width-responsive="true"
            display="block"
            minH="2xl"
            minW="2xs"
            position="relative"
            top={0}
          />
        </Box>
      </VStack>
    </Box>
  )
}
