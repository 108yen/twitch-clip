"use client"

import { Box, BoxProps, Divider, Text } from "@yamada-ui/react"
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
      <Box alignItems="center" position="relative">
        <Text textStyle="adsenseTitle">Advertisement</Text>

        <Divider />

        <Box key={pathname} p={2} textAlign="center" w="fit-content">
          <Box
            as="ins"
            className="adsbygoogle"
            data-ad-client="ca-pub-1615921337969017"
            data-ad-format="auto"
            data-ad-slot="1041812482"
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-full-width-responsive="true"
            display="block"
            position="relative"
            top={0}
          />
        </Box>
      </Box>
    </Box>
  )
}
