import { Box, Divider, Stack, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function HorizontalAdvertisement() {
    const pathname = usePathname()

    useEffect(() => {
        try {
            window.adsbygoogle = window.adsbygoogle || []
            window.adsbygoogle.push({})
        } catch (error) {
            // console.error(error)
        }
    }, [pathname])

    return (
        <Box flexGrow={1} position='relative' minHeight={100} overflow='hidden'>
            <Stack
                direction='column'
                flexGrow={1}
                position='absolute'
                width='100%'
                height='100%'
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
                <Box key={pathname} marginY={1}>
                    <ins
                        className='adsbygoogle'
                        style={{
                            display: `block`
                        }}
                        data-ad-format='fluid'
                        data-ad-layout-key='-h8+m-l-bx+n8'
                        data-ad-client='ca-pub-1615921337969017'
                        data-ad-slot='8762220520'
                    />
                </Box>
            </Stack>
        </Box>
    )
}
