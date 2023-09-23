import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { Virtual } from 'swiper'
import 'swiper/css'
import 'swiper/css/virtual'
import { Swiper, SwiperSlide } from 'swiper/react'

import ClipCardList from '@/app/(clip)/_Component/common/clipCard'
import { swiperAtom, tabAtom, tabNameListAtom } from '@/components/Atoms'
import { Clip } from '@/models/clip'

import { useWindowSize } from '../../../../components/hooks'

export default function SwiperClipCardList({
    setClickedClipUrl,
    sticky = false
}: {
    setClickedClipUrl: (clip: Clip) => void
    sticky?: boolean
}) {
    //tab index
    const [tab, setTab] = useAtom(tabAtom)
    //get tab name list
    const tabNameListLoadableAtom = loadable(tabNameListAtom)
    const [tabNameListValue] = useAtom(tabNameListLoadableAtom)
    //use this
    const tabNameList =
        tabNameListValue.state === `hasData`
            ? tabNameListValue.data
            : [
                  `day`, //
                  `week`,
                  `month`,
                  `year`,
                  `all`
              ]
    // swipe
    const [swiper, setSwiper] = useAtom(swiperAtom)
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
                {Array.from({ length: tabNameList.length }).map((_, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <ClipCardList setClickedClipUrl={setClickedClipUrl} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Stack>
    )
}
