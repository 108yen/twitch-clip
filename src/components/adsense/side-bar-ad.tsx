"use client"

import { Text, Divider, Box, BoxProps } from "@yamada-ui/react"
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
      position="fixed"
      top={100}
      w="xs"
      justifyContent="flex-start"
      alignItems="center"
      border="solid"
      {...props}
    >
      <Box position="relative">
        <Text textStyle="adsenseTitle">Advertisement</Text>

        <Divider />

        <Box key={pathname} w={200} textAlign="center" p={2}>
          <Box
            as="ins"
            className="adsbygoogle"
            display="block"
            position="relative"
            top={0}
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-ad-client="ca-pub-1615921337969017"
            data-ad-slot="1041812482"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </Box>
      </Box>
    </Box>
  )
}
