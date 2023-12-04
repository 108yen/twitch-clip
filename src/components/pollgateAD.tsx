'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'

import ExternalLink from '../app/about/_Component/atoms/externalLink'

import SiteIcon from './sightIcon'

export default function PollgateAD({ top = 100 }: { top?: number }) {
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
                <ExternalLink
                    href='https://poll-gate.com'
                    ariaLabel='Pollgate link'
                    eventLabel='click_Pollgate_link'
                >
                    <Stack
                        direction='column'
                        width={200}
                        height={400}
                        m={1}
                        padding={2}
                        spacing={4}
                        alignItems='center'
                        justifyContent='center'
                        display='flex'
                        border='solid 0.01px'
                        borderColor='text.primary'
                    >
                        <Typography color='text.primary'>
                            アンケート型
                            <br />
                            SNSサービス
                        </Typography>
                        <Stack
                            direction='column'
                            alignItems='center'
                            spacing={1}
                        >
                            <SiteIcon />
                            <Typography color='text.primary'>
                                Pollgate
                            </Typography>
                        </Stack>
                    </Stack>
                </ExternalLink>
            </Box>
        </Stack>
    )
}
