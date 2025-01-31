"use client"

import { Box, Separator, StackProps, Text, VStack } from "@yamada-ui/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function InlineAD(props: StackProps) {
  const pathname = usePathname()

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []

      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error(error)
    }
  }, [pathname])

  return (
    <VStack gap={0} {...props}>
      <Text textStyle="adsenseTitle">Advertisement</Text>

      <Separator />

      <Box key={pathname} p={2} textAlign="center">
        <Box
          as="ins"
          className="adsbygoogle"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-format="fluid"
          data-ad-layout="in-article"
          data-ad-slot="8553448913"
          data-adtest={
            process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "off" : "on"
          }
          display="block"
          maxW="md"
          textAlign="center"
        />
      </Box>
    </VStack>
  )
}
