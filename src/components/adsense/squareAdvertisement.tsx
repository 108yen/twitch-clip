'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function SquareAdvertisement() {
    const pathname = usePathname()

    useEffect(() => {
        try {
            window.adsbygoogle = window.adsbygoogle || []
            window.adsbygoogle.push({})
        } catch (error) {
            console.error(error)
        }
    }, [pathname])

    return (
        <Stack direction='column' flexGrow={1}>
            <Typography
                variant='body2'
                color='grey'
                flexGrow={1}
                textAlign='left'
            >
                Advertisement
            </Typography>
            <Divider />
            <Box key={pathname} margin={1} textAlign='center' minWidth={250}>
                <ins
                    className='adsbygoogle'
                    style={{
                        display: `block`,
                        height: `100%`,
                    }}
                    data-adtest={
                        process.env.NODE_ENV === `production` ? `off` : `on`
                    }
                    data-ad-client='ca-pub-1615921337969017'
                    data-ad-slot='1058689000'
                    data-ad-format='rectangle'
                    data-full-width-responsive='true'
                />
            </Box>
        </Stack>
    )
}
