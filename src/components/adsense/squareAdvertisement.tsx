"use client"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SquareAdvertisement() {
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
    <Stack direction="column" flexGrow={1}>
      <Typography color="grey" flexGrow={1} textAlign="left" variant="body2">
        Advertisement
      </Typography>
      <Divider />
      <Box key={pathname} margin={1} minWidth={250} textAlign="center">
        <ins
          className="adsbygoogle"
          data-ad-client="ca-pub-1615921337969017"
          data-ad-format="rectangle"
          data-ad-slot="1058689000"
          data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
          data-full-width-responsive="true"
          style={{
            display: "block",
            height: "100%",
          }}
        />
      </Box>
    </Stack>
  )
}
