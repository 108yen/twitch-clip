'use client'
import {
    AppBar,
    Box,
    Divider,
    Grid,
    Stack,
    Tab,
    Tabs,
    Toolbar
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'

import StreamerCard from '@/app/(clip)/streamer/[id]/_Component/molecules/streamerCard'
import { Clip } from '@/models/clip'

import PollgateAD from '../../../../../components/pollgateAD'
import { ClipDoc } from '../../../../../models/clipDoc'
import SwiperClipCardList from '../../../_Component/molecules/common/swiperClipCardList'
import { MobileView } from '../../../_Component/organisms/mobileView'
import { PCView } from '../../../_Component/organisms/PCView'

export default function StreamerClipPageTemplate(props: { clipDoc: ClipDoc }) {
    const { clipDoc } = props
    //extract streamerinfo
    const streamerInfo = clipDoc[`streamerInfo`]
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>()
    function handleSetClip(clip: Clip | undefined) {
        setCurrentClip(clip)
    }
    //set select
    const [selectTab, setSelectTab] = useState(0)
    function handleTabChange(
        event: SyntheticEvent<Element, Event>,
        val: number
    ) {
        setSelectTab(val)
    }
    const width = window.innerWidth

    if (currentClip === undefined) {
        return (
            <>
                <Divider />
                <Grid container justifyContent='space-evenly'>
                    <Grid item zeroMinWidth xs={12} md={8}>
                        <AppBar position='relative' elevation={0}>
                            <Toolbar
                                sx={{
                                    display: `flex`,
                                    justifyContent: `center`
                                }}
                            >
                                <Stack
                                    direction='column'
                                    flexGrow={1}
                                    paddingY={5}
                                    justifyContent='center'
                                    overflow='hidden'
                                    maxWidth={800}
                                >
                                    <StreamerCard streamerInfo={streamerInfo} />
                                    <Box
                                        sx={{
                                            justifyContent: `start`,
                                            display: `flex`
                                        }}
                                    >
                                        <Tabs
                                            TabIndicatorProps={{
                                                sx: {
                                                    display: `none`
                                                }
                                            }}
                                            textColor='inherit'
                                            value={selectTab}
                                            onChange={handleTabChange}
                                        >
                                            <Tab
                                                key={0}
                                                label='期間'
                                                value={0}
                                            />
                                            <Tab
                                                key={1}
                                                label='年別'
                                                value={1}
                                            />
                                        </Tabs>
                                    </Box>
                                </Stack>
                            </Toolbar>
                        </AppBar>
                        <SwiperClipCardList
                            clipDoc={clipDoc}
                            setClickedClipUrl={handleSetClip}
                        />
                    </Grid>
                    <Grid
                        item
                        zeroMinWidth
                        md={2}
                        xl={1}
                        display={{ xs: `none`, md: `flex` }}
                        justifyContent='center'
                    >
                        {/* <VerticalAdvertisement /> */}
                        <PollgateAD />
                    </Grid>
                </Grid>
            </>
        )
    } else {
        if (width < 600) {
            return (
                <MobileView
                    clipDoc={clipDoc}
                    currentClip={currentClip}
                    setClickedClip={handleSetClip}
                />
            )
        } else {
            return (
                <PCView
                    clipDoc={clipDoc}
                    currentClip={currentClip}
                    setClickedClip={handleSetClip}
                />
            )
        }
    }
}
