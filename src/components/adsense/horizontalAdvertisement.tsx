"use client"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function HorizontalAdvertisement() {
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
    <Stack direction="column" width="100%">
      <Typography color="grey" flexGrow={1} textAlign="left" variant="body2">
        Advertisement
      </Typography>
      <Divider />
      <Box key={pathname} marginTop={0.5}>
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-format="fluid"
          data-ad-layout="in-article"
          data-ad-slot="8553448913"
          style={{
            display: "block",
            textAlign: "center",
          }}
        />
      </Box>
    </Stack>
  )
}
