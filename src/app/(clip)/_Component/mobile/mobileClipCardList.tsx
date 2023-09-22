import { Stack, Box, Tabs, Tab } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { tabAtom, tabNameListAtom, swiperAtom } from "@/components/Atoms";
import { useWindowSize } from "@/components/hooks";
import { Clip } from "@/models/clip";

import ClipCards from "../clipCard";

export default function MobileClipCardList({
    setClickedClipUrl,
}: {
    setClickedClipUrl: (clip: Clip) => void,
}) {
    //tab index
    const [tab, setTab] = useAtom(tabAtom);
    //get tab name list
    const tabNameListLoadableAtom = loadable(tabNameListAtom);
    const [tabNameListValue] = useAtom(tabNameListLoadableAtom);
    //use this
    const tabNameList = tabNameListValue.state === `hasData`
        ? tabNameListValue.data
        : [`day`,
`week`,
`month`,
`year`,
`all`];
    // swipe
    const [swiper, setSwiper] = useAtom(swiperAtom);
    //window size
    const [windowWidth] = useWindowSize();
    const top = windowWidth * 9 / 16;

    function handleSlideChange(index: number) {
        setTab(index);
    }
    function handleTabChange(_: React.SyntheticEvent, newValue: number) {
        setTab(newValue);
        swiper?.slideTo(newValue);
    }


    return (
        <Stack
            direction='column'
            spacing={0.1}
            sx={{ minWidth: 0}}
        >
            <Box
                sx={{
                position: `sticky`,
                top: top,
                zIndex: 1200,
                backgroundColor:theme => theme.palette.background.default,
                borderBottom: 1,
                borderColor: `divider`,
                justifyContent: `center`,
                display: `flex`,
            }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    variant='scrollable'
                    scrollButtons={true}
                >
                    {tabNameList.map((e, index) => <Tab key={index} label={e} value={index} />)}
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
                        const swiperInstance = swiper;
                        setSwiper(swiperInstance);
                    }}
                    >
                    {Array.from({ length: tabNameList.length }).map((e, index) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <ClipCards
                                setClickedClipUrl={setClickedClipUrl}
                                // height={listHeight}
                                />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </Stack>
    );
}
