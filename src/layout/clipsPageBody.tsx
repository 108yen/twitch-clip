import { swiperAtom, tabAtom, tabNameListAtom } from "@/components/Atoms";
import { Box, Tab, Tabs } from "@mui/material";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import ClipCards from '@/layout/clipCard';

export default function ClipsPageBody() {
    //tab index
    const [tab, setTab] = useAtom(tabAtom);
    //get tab name list
    const tabNameListLoadableAtom = loadable(tabNameListAtom);
    const [tabNameListValue] = useAtom(tabNameListLoadableAtom);
    //use this
    const tabNameList = tabNameListValue.state === "hasData"
        ? tabNameListValue.data
        : ["day", "week", "month", "year", "all"];
    // swipe
    const [swiper, setSwiper] = useAtom(swiperAtom);

    function handleSlideChange(index: number) {
        setTab(index);
    }
    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTab(newValue);
        swiper?.slideTo(newValue);
    }

    return (
        <>
            <Box
                sx={{
                    m: 1,
                    display: 'flex',
                    justifyContent: "flex-end"
                }}
            >
            </Box>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                marginBottom: 2,
                justifyContent: 'center',
                display: 'flex',
            }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    variant="scrollable"
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
                        <ClipCards />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}