"use client"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { useAtom } from "jotai"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { adClickAtom } from "../Atoms"

export default function VerticalAdvertisement({ top = 100 }: { top?: number }) {
  const pathname = usePathname()
  const [isAdClicked, setIsAdClicked] = useAtom(adClickAtom)

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
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
      display={isAdClicked ? "none" : "flex"}
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
              top: 0
            }}
            data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
            data-ad-client="ca-pub-1615921337969017"
            data-ad-slot="1041812482"
            data-ad-format="auto"
            data-full-width-responsive="true"
            onClick={() => {
              setIsAdClicked(true)
            }}
          />
        </Box>
      </Box>
    </Stack>
  )
}
