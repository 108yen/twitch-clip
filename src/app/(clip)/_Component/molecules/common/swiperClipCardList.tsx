import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { Virtual, Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import 'swiper/css/virtual'
import { Swiper, SwiperSlide } from 'swiper/react'

import ClipCardList from '@/app/(clip)/_Component/molecules/common/clipCardList'
import { Clip } from '@/models/clip'

import { useWindowSize } from '../../../../../components/hooks'
import { ClipDoc } from '../../../../../models/clipDoc'
import getTabNameList from '../utils/getTabNameList'

export default function SwiperClipCardList(props: {
    clipDoc: ClipDoc
    setClickedClipUrl: (clip: Clip) => void
    sticky?: boolean
}) {
    const { clipDoc, setClickedClipUrl, sticky = false } = props
    //tab index
    const tabNameList = getTabNameList(clipDoc)
    const [tab, setTab] = useState(0)
    const currentTabName = tabNameList[tab]
    const clips = clipDoc[currentTabName] as Array<Clip>
    // swipe
    const [swiper, setSwiper] = useState<SwiperCore | null>(null)
    //style
    const [windowWidth] = useWindowSize()
    const top = (windowWidth * 9) / 16
    const style = sticky ? { position: `sticky`, top: top } : {}

    function handleSlideChange(index: number) {
        setTab(index)
    }
    function handleTabChange(_: React.SyntheticEvent, newValue: number) {
        setTab(newValue)
        swiper?.slideTo(newValue)

        window.scrollTo({
            top: 0,
        })
    }

    return (
        <Stack direction='column' spacing={0.1} sx={{ minWidth: 0 }}>
            <Box
                sx={{
                    ...style,
                    zIndex: 1200,
                    backgroundColor: (theme) =>
                        theme.palette.background.default,
                    borderBottom: 1,
                    borderColor: `divider`,
                    justifyContent: `center`,
                    display: `flex`
                }}
            >
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    variant='scrollable'
                    scrollButtons={true}
                >
                    {tabNameList.map((e, index) => (
                        <Tab key={index} label={e} value={index} />
                    ))}
                </Tabs>
            </Box>
            <Swiper
                modules={[Virtual]}
                allowTouchMove={false}
                virtual
                spaceBetween={100}
                slidesPerView={1}
                simulateTouch={false}
                onSlideChange={(index) => handleSlideChange(index.activeIndex)}
                onSwiper={(swiper) => {
                    const swiperInstance = swiper
                    setSwiper(swiperInstance)
                }}
            >
                {Array.from({ length: tabNameList.length }).map(
                    (value, index) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <ClipCardList
                                clips={clips}
                                tab={currentTabName}
                                setClickedClipUrl={setClickedClipUrl}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </Stack>
    )
}
