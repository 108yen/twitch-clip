'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

type AdmaxAdType = {
    admax_id: string // 広告ID
    type: string // PC/SP切替広告なら"switch"
}

declare global {
    interface Window {
        admaxads: AdmaxAdType[]
    }
}

export function Adsbyadmax() {
    return <script async src='https://adm.shinobi.jp/st/t.js' />
}

export const AdsCard = () => {
    const adMaxId = `0da287b679a64239c0402992bc7c2e32`
    const pathname = usePathname()

    useEffect(() => {
        try {
            window.admaxads = window.admaxads || []
            window.admaxads.push({
                admax_id: adMaxId,
                type: `banner`
            })
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
            <Box
                key={pathname}
                margin={1}
                textAlign='center'
                minWidth={300}
                minHeight={250}
            >
                <div
                    className='admax-ads'
                    data-admax-id={adMaxId}
                    style={{ display: `inline-block` }}
                ></div>
            </Box>
        </Stack>
    )
}
export const PCCard = () => {
    const adMaxId = `0aa7b9e105fd42461725c2bddad1d300`
    const pathname = usePathname()

    useEffect(() => {
        try {
            window.admaxads = window.admaxads || []
            window.admaxads.push({
                admax_id: adMaxId,
                type: `banner`
            })
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
            <Box
                key={pathname}
                margin={1}
                textAlign='center'
                minWidth={300}
                minHeight={250}
            >
                <div
                    className='admax-ads'
                    data-admax-id={adMaxId}
                    style={{ display: `inline-block` }}
                ></div>
            </Box>
        </Stack>
    )
}
