"use client"

import { Text, Divider, Box, HStack, StackProps } from "@yamada-ui/react"
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

      <Box key={pathname} w="fit-content" textAlign="center" p={2}>
        <Box
          as="ins"
          className="adsbygoogle"
          display="block"
          textAlign="center"
          data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
          data-ad-format="fluid"
          data-ad-layout="in-article"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-slot="8553448913"
        />
      </Box>
    </HStack>
  )
}
