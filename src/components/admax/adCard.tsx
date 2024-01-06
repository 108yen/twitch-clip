'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

type AdmaxAdType = {
    admax_id: string // 広告ID
    type: string // PC/SP切替広告なら"switch"
}

declare global {
    // eslint-disable-next-line no-var
    var admaxads: AdmaxAdType[]
}

export function AdmaxAdsCard() {
    const adMaxId = `0fbf4818eb977f18d6b5063424fffa2d`
    const pathname = usePathname()

    useEffect(() => {
        const tag = document.createElement(`script`)
        tag.src = `https://adm.shinobi.jp/st/t.js`
        tag.async = true
        document.body.appendChild(tag)

        const newAdmaxObj = {
            admax_id: adMaxId,
            type: `banner`
        }
        try {
            ;(globalThis.admaxads = window.admaxads || []).push(newAdmaxObj)
        } catch (error) {
            console.error(error)
        }

        return () => {
            document.body.removeChild(tag)

            const index = globalThis.admaxads.indexOf(newAdmaxObj)
            if (index !== -1) {
                globalThis.admaxads.splice(index, 1)
            }
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
            <Box key={pathname} marginY={1} width='100%' minHeight={250}>
                <div
                    className='admax-ads'
                    data-admax-id={adMaxId}
                    style={{
                        display: `inline-block`,
                        width: 300,
                        height: 250
                    }}
                ></div>
            </Box>
        </Stack>
    )
}

export function AdmaxSideCard({ top = 100 }: { top?: number }) {
    const adMaxId = `ff0daf52401c8d61f8d8248c735f6276`
    const pathname = usePathname()

    useEffect(() => {
        const tag = document.createElement(`script`)
        tag.src = `https://adm.shinobi.jp/st/t.js`
        tag.async = true
        document.body.appendChild(tag)

        const newAdmaxObj = {
            admax_id: adMaxId,
            type: `banner`
        }
        try {
            ;(globalThis.admaxads = window.admaxads || []).push(newAdmaxObj)
        } catch (error) {
            console.error(error)
        }
        return () => {
            document.body.removeChild(tag)

            const index = globalThis.admaxads.indexOf(newAdmaxObj)
            if (index !== -1) {
                globalThis.admaxads.splice(index, 1)
            }
        }
    }, [pathname])

    return (
        <Stack
            direction='column'
            flexGrow={1}
            justifyContent='flex-start'
            alignItems='center'
            position='fixed'
            top={top}
        >
            <Box position='relative'>
                <Typography
                    variant='body2'
                    color='grey'
                    flexGrow={1}
                    textAlign='center'
                >
                    Advertisement
                </Typography>
                <Divider />
                <Box
                    key={pathname}
                    flexGrow={1}
                    width={200}
                    textAlign='center'
                    padding={2}
                >
                    <div
                        className='admax-ads'
                        data-admax-id={adMaxId}
                        style={{
                            display: `inline-block`,
                            width: 160,
                            height: 600
                        }}
                    ></div>
                </Box>
            </Box>
        </Stack>
    )
}
