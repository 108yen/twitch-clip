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
        <Box
            flexGrow={1}
            position='relative'
            height={150}
            overflow='hidden'
            marginBottom={1}
        >
            <Stack
                direction='column'
                flexGrow={1}
                position='absolute'
                width='100%'
                height='100%'
                left='50%'
                sx={{
                    transform: `translateX(-50%)`,
                    '-webkit-transform': `translateX(-50%)`,
                    '-ms-transform': `translateX(-50%)`
                }}
            >
                <Typography
                    variant='body2'
                    color='grey'
                    flexGrow={1}
                    textAlign='left'
                >
                    Advertisement
                </Typography>
                <Divider />
                <Box key={pathname} margin={1}>
                    <ins
                        className='adsbygoogle'
                        style={{
                            display: `inline-block`,
                            height: `130px`,
                            width: `100%`
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
        </Box>
    )
}
