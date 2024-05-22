"use client"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { useAtom } from "jotai"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { adClickAtom } from "../Atoms"

export default function SquareAdvertisement() {
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
      display={isAdClicked ? "none" : "flex"}
    >
      <Typography variant="body2" color="grey" flexGrow={1} textAlign="left">
        Advertisement
      </Typography>
      <Divider />
      <Box
        key={pathname}
        margin={1}
        textAlign="center"
        minWidth={250}
        onClick={() => {
          setIsAdClicked(true)
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            height: "100%"
          }}
          data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
          data-ad-client="ca-pub-1615921337969017"
          data-ad-slot="1058689000"
          data-ad-format="rectangle"
          data-full-width-responsive="true"
        />
      </Box>
    </Stack>
  )
}
