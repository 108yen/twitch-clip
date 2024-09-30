"use client"

import { Box, Divider, HStack, StackProps, Text } from "@yamada-ui/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function InlineAD(props: StackProps) {
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
    <HStack w="full" {...props}>
      <Text textStyle="adsenseTitle">Advertisement</Text>

      <Divider />

      <Box key={pathname} p={2} textAlign="center" w="fit-content">
        <Box
          as="ins"
          className="adsbygoogle"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-format="fluid"
          data-ad-layout="in-article"
          data-ad-slot="8553448913"
          data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
          display="block"
          textAlign="center"
        />
      </Box>
    </HStack>
  )
}
