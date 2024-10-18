"use client"

import { Box, Divider, StackProps, Text, VStack } from "@yamada-ui/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function SideCardAD(props: StackProps) {
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
    <VStack gap={0} {...props}>
      <Text textStyle="adsenseTitle">Advertisement</Text>

      <Divider />

      <Box key={pathname} p={2} textAlign="center">
        <Box
          as="ins"
          className="adsbygoogle"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-format="rectangle"
          data-ad-slot="1058689000"
          data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
          data-full-width-responsive="true"
          display="block"
          textAlign="center"
        />
      </Box>
    </VStack>
  )
}
