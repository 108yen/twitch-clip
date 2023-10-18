import { Box, Stack, Tab, Tabs } from '@mui/material'
import { useMemo, useState } from 'react'
import { Swiper as SwiperCore, Virtual } from 'swiper'
import 'swiper/css'
import 'swiper/css/virtual'
import { Swiper, SwiperSlide } from 'swiper/react'

import ClipCardList from '@/app/(clip)/_Component/molecules/common/clipCardList'
import { Clip } from '@/models/clip'

import { useWindowSize } from '../../../../../components/hooks'
import { ClipDoc } from '../../../../../models/clipDoc'
import getTabNameList from '../../utils/getTabNameList'

export default function SwiperClipCardList(props: {
    clipDoc: ClipDoc
    setClickedClipUrl: (clip: Clip) => void
    sticky?: boolean
}) {
    const { clipDoc, setClickedClipUrl, sticky = false } = props
    //tab index
    const tabNameList = useMemo(() => getTabNameList(clipDoc), [clipDoc])
    const [tab, setTab] = useState(0)
    // swipe
    const [swiper, setSwiper] = useState<SwiperCore | null>(null)
    //style
    const [windowWidth] = useWindowSize()
    const top = (windowWidth * 9) / 16
    const style = sticky ? { position: `sticky`, top: top } : {}

    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useState(7)
    const [hasMore, setHasMore] = useState(true)

    function loadAll() {
        setHasMore(false)
    }

    function incrementViewItemNum() {
        setViewItemNum(viewItemNum + 1)
    }

    function resetState() {
        setHasMore(true)
        setViewItemNum(7)
    }

    function handleTabChange(_: React.SyntheticEvent, newValue: number) {
        resetState()
        // change tab
        setTab(newValue)
        swiper?.slideTo(newValue)

        window.scrollTo({
            top: 0
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
                virtual
                allowTouchMove={false}
                spaceBetween={50}
                slidesPerView={1}
                simulateTouch={false}
                onSwiper={(swiper) => {
                    const swiperInstance = swiper
                    setSwiper(swiperInstance)
                }}
            >
                {tabNameList.map((tab, index) => {
                    const clips = clipDoc[tab] as Array<Clip>
                    return (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <ClipCardList
                                key={index}
                                hasMore={hasMore}
                                viewItemNum={viewItemNum}
                                loadAll={loadAll}
                                incrementViewItemNum={incrementViewItemNum}
                                clips={clips}
                                tab={tab}
                                setClickedClipUrl={setClickedClipUrl}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Stack>
    )
}
