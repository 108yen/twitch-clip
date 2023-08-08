import { clipCardsDisplayNumAtom, clipsAtom, moreItemIsExistAtom, tabAtom, tabNameAtom, tabNameListAtom, usersAtom } from "@/components/Atoms";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { Typography, Divider, Box, CircularProgress, Stack, Avatar, Skeleton, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Clip, User } from "@/components/types";
import { event } from "nextjs-google-analytics";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { BorderPaper, NoDecorationTypography } from "@/components/styledui";
import { useWindowSize } from "@/components/hooks";

function CardList({
    setClickedClipUrl,
}: {
    setClickedClipUrl: (clip: Clip) => void,
}) {
    //clips data
    const clipsLoadableAtom = loadable(clipsAtom);
    const [clipsValue] = useAtom(clipsLoadableAtom);
    //streamer info
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useAtom(clipCardsDisplayNumAtom);
    const [hasMore, setHasMore] = useAtom(moreItemIsExistAtom);
    //period tab name
    const tabLoadableAtom = loadable(tabNameAtom);
    const [tabValue] = useAtom(tabLoadableAtom);
    //window size
    const [, height] = useWindowSize();

    function loadMore(clips: Clip[]) {
        //if max item num is clips num
        if (viewItemNum >= clips.length - 1) {
            setHasMore(false);
        }
        //load each 1 items
        setViewItemNum(viewItemNum + 1);
    }
    const loader = <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
    </Box>;

    const endMessage = <Box key={0} sx={{ m: 3, display: "flex", justifyContent: "center" }}>
        <Typography variant='inherit' color='gray'>
            no more clips
        </Typography>
    </Box>;

    if (clipsValue.state === "hasData"
        && tabValue.state === "hasData") {
        const tab = tabValue.data;
        if (clipsValue.data != undefined
            && clipsValue.data[tab] != undefined
            && clipsValue.data[tab].length != 0) {
            const clips = clipsValue.data[tab];

            return (
                <InfiniteScroll
                    dataLength={viewItemNum}
                    next={() => { loadMore(clips) }}
                    hasMore={hasMore}
                    loader={loader}
                    endMessage={endMessage}
                    height={height - 133}
                >
                    {clips.slice(0, viewItemNum).map((e, index) => {
                        const streamer = streamersValue.state === 'hasData'
                            ? streamersValue.data?.find((user) => user.id == e.broadcaster_id)
                            : undefined;
                        return (
                            <CardItem
                                key={index}
                                clip={e}
                                streamer={streamer}
                                tab={tab}
                                setClickedClipUrl={setClickedClipUrl}
                            />
                        );
                    })}
                </InfiniteScroll>
            );
        } else {
            return endMessage;
        }
    } else if (clipsValue.state === "loading"
        || tabValue.state === "loading") {
        return loader;
    } else {
        //error handling
        if (clipsValue.state === "hasError") {
            event("error", {
                label: "click_load_error",
            });
        } else if (tabValue.state === "hasError") {
            event("error", {
                label: "tab_load_error",
            });
        }
        return (
            <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant='inherit' color='gray'>
                    load error
                </Typography>
            </Box>
        );
    }
}

function CardItem({
    clip,
    streamer,
    tab,
    setClickedClipUrl,
}: {
    clip: Clip,
    streamer: User | undefined,
    tab: string,
    setClickedClipUrl: (clip: Clip) => void,
}) {
    return (
        <Box
            sx={{
                marginY: 2
            }}
        >
            <Stack
                direction="column"
                overflow="hidden"
                spacing={1}
                sx={{ flexGrow: 1 }}
            >
                <BorderPaper
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 0,
                        paddingBottom: '56.25%',
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        setClickedClipUrl(clip);
                        event("click", {
                            label: "click_clip_title",
                            clip_title: clip.title,
                            ranking_period: tab,
                            link_url: clip.url,
                        });
                    }}
                >
                    <img
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    />
                </BorderPaper>
                <Link
                    href={streamer != undefined ? "/streamer/" + streamer.id : "/"}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        {streamer != undefined
                            ? <Avatar
                                sx={{ width: 35, height: 35 }}
                                alt="top"
                                src={streamer.profile_image_url} />
                            : <Skeleton
                                variant="circular"
                                width={35}
                                height={35} />}
                        <Stack
                            direction="column"
                            overflow="hidden"
                            flexGrow={1}
                        >
                            <NoDecorationTypography
                                variant="body1"
                                noWrap
                            >
                                {clip.title}
                            </NoDecorationTypography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                flexGrow={1}
                            >
                                <Typography noWrap variant="body1" color="grey">
                                    {streamer != undefined
                                        ? streamer.display_name
                                        : <Skeleton width={150} />}
                                </Typography>
                                <Typography noWrap variant="body2" color="grey">
                                    {clip.view_count.toLocaleString()} views
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Link>
            </Stack>
        </Box>
    );
}

export default function SideClipCard({
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
    const tabNameList = tabNameListValue.state === "hasData"
        ? tabNameListValue.data
        : ["day", "week", "month", "year", "all"];

    function handleTabChange(event: SelectChangeEvent<number>) {
        setTab(event.target.value as number);
    }
    return (
        <Stack
            direction="column"
            overflow="hidden"
            flexGrow={1}
        >
            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >

                <Select
                    size="small"
                    value={tab}
                    onChange={handleTabChange}
                >
                    {tabNameList.map((e, index) =>
                        <MenuItem key={index} value={index}>
                            {e}
                        </MenuItem>
                    )}
                </Select>
            </Stack>
            <Typography variant='subtitle1' color='grey'>
                clips
            </Typography>
            <Divider />
            <CardList
                setClickedClipUrl={setClickedClipUrl}
            />
        </Stack>
    );
}