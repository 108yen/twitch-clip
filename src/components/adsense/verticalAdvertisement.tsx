import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function VerticalAdvertisement() {
    const pathname = usePathname()

    useEffect(() => {
        try {
            console.log(`push ads`)
            window.adsbygoogle = window.adsbygoogle || []
            window.adsbygoogle.push({})
        } catch (error) {
            console.error(error)
        }
    }, [pathname])

    return (
        <Box
            key={pathname}
            flexGrow={1}
            height={400}
            textAlign='center'
            padding={1}
            // borderTop='solid'
            // borderBottom='solid'
            border='solid 0.5px'
            borderColor='gray'

        >
            <ins
                className='adsbygoogle'
                style={{
                    display: `block`,
                    height: `100%`
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
    )
}
