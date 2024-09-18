"use client"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function VerticalAdvertisement({ top = 100 }: { top?: number }) {
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
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="flex-start"
      alignItems="center"
      position="fixed"
      top={top}
    >
      <Box position="relative">
        <Typography
          variant="body2"
          color="grey"
          flexGrow={1}
          textAlign="center"
        >
          Advertisement
        </Typography>
        <Divider />
        <Box
          key={pathname}
          flexGrow={1}
          width={200}
          textAlign="center"
          padding={2}
        >
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              position: "relative",
              top: 0,
            }}
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-ad-client="ca-pub-1615921337969017"
            data-ad-slot="1041812482"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </Box>
      </Box>
    </Stack>
  )
}
