'use client'
import { Box, Stack, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function VerticalAdvertisement() {
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
        <Box flexGrow={1} position='relative' top={50}>
            <Stack
                direction='column'
                overflow='hidden'
                flexGrow={1}
                position='absolute'
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
                    textAlign='center'
                >
                    Advertisement
                </Typography>
                <Box
                    key={pathname}
                    flexGrow={1}
                    width={200}
                    height={700}
                    textAlign='center'
                    padding={2}
                    borderTop='solid'
                    borderBottom='solid'
                    borderColor='gray'
                    sx={{ borderWidth: `0.5px` }}
                >
                    <ins
                        className='adsbygoogle'
                        style={{
                            display: `block`,
                            margin: `auto`,
                            width: 160,
                            height: 600
                        }}
                        data-adtest={
                            process.env.NODE_ENV === `production` ? `off` : `on`
                        }
                        data-ad-client='ca-pub-1615921337969017'
                        data-ad-slot='1041812482'
                        data-ad-format='auto'
                        data-full-width-responsive='true'
                    />
                </Box>
            </Stack>
        </Box>
    )
}
