import { swiperAtom, tabAtom, tabNameListAtom, viewLayoutAtom } from "@/components/Atoms";
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { ViewArray } from '@mui/icons-material';
import ViewListIcon from '@mui/icons-material/ViewList';
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
        : ["day", "week", "month", "all"];
    // swipe
    const [swiper, setSwiper] = useAtom(swiperAtom);
    //full or list layout
    const [viewLayout, setViewLayout] = useAtom(viewLayoutAtom);

    function handleSlideChange(index: number) {
        setTab(index);
    }
    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setTab(newValue);
        swiper?.slideTo(newValue);
    }
    function handleLayoutChange(event: React.MouseEvent<HTMLElement>, newAlignment: string) {
        setViewLayout(newAlignment);
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
                <ToggleButtonGroup
                    size='small'
                    exclusive
                    value={viewLayout}
                    onChange={handleLayoutChange}
                >
                    <ToggleButton value="list">
                        <Tooltip title="リスト表示">
                            <ViewListIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="full">
                        <Tooltip title="埋め込み表示（重い）">
                            <ViewArray />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
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
                >
                    {tabNameList.map((e, index) => <Tab key={index} label={e} value={index} />)}
                </Tabs>
            </Box>
            <Swiper
                modules={[Virtual]}
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