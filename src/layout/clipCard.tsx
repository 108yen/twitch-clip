import { clipCardsDisplayNumAtom, clipsAtom, moreItemIsExistAtom, tabNameAtom, usersAtom } from "@/components/Atoms";
import { BorderPaper, NoDecorationTypography, StyledLaunch } from "@/components/styledui";
import { Clip, User } from "@/components/types";
import { Avatar, Box, CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroll-component';
import { event } from "nextjs-google-analytics";

function ListClipCard({
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
    const imageWidth = 300;

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            timeZone: "Asia/Tokyo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        const formattedDate = new Intl.DateTimeFormat('ja-JP', options).format(date);
        return formattedDate;
    }

    return (
        <BorderPaper
            sx={{
                marginX: { xs: 0, sm: 1 },
                marginY: { xs: 1, sm: 2 },
            }}
        >
            <Stack
                direction="row"
                overflow="hidden"
                sx={{
                    height: { xs: 110, sm: 170 }
                }}
            >
                <img
                    src={clip.thumbnail_url}
                    alt={clip.title}
                    width={imageWidth}
                    height={imageWidth * 9 / 16}
                    loading="lazy"
                    style={{
                        width: 'auto',
                        height: '100%'
                    }}
                />
                <Stack
                    direction="column"
                    overflow="hidden"
                    p={1}
                    sx={{ flexGrow: 1 }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant='h6'
                            noWrap
                            fontWeight='bold'
                            component='div'
                            sx={{
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
                            {clip.title}
                        </Typography>
                        <Link
                            href={clip.url}
                            target='_blank'
                            style={{
                                textDecoration: 'none',
                            }}
                            onClick={() => {
                                event("click", {
                                    label: "click_twitch_clip_link",
                                    clip_title: clip.title,
                                    ranking_period: tab,
                                    link_url: clip.url,
                                });
                            }}
                        >
                            <StyledLaunch fontSize="small" />
                        </Link>

                    </Stack>
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
                                ? <Avatar src={streamer.profile_image_url} />
                                : <Skeleton variant="circular" width={40} height={40} />}
                            <NoDecorationTypography noWrap variant="body1">
                                {streamer != undefined
                                    ? streamer.display_name
                                    : <Skeleton width={150} />}
                            </NoDecorationTypography>
                        </Stack>
                    </Link>
                    <Typography
                        noWrap
                        variant="body1"
                        display={{ xs: 'none', sm: 'flex' }}
                    >
                        created_by : {clip.creator_name}
                    </Typography>
                    <Typography
                        noWrap
                        variant="body1"
                        display={{ xs: 'none', sm: 'flex' }}
                    >
                        created_at : {formatDate(clip.created_at)}
                    </Typography>
                    <Typography
                        noWrap
                        variant="body1"
                        color="gray"
                        textAlign="end"
                    >
                        {clip.view_count.toLocaleString() + " views"}
                    </Typography>
                </Stack>
            </Stack>
        </BorderPaper>
    );

}

function ClipCards({
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
                <>
                    <InfiniteScroll
                        dataLength={viewItemNum}
                        next={() => { loadMore(clips) }}
                        hasMore={hasMore}
                        loader={loader}
                        endMessage={endMessage}
                    >
                        {clips.slice(0, viewItemNum).map((e, index) => {
                            const streamer = streamersValue.state === 'hasData'
                                ? streamersValue.data?.find((user) => user.id == e.broadcaster_id)
                                : undefined;
                            return (
                                <ListClipCard
                                    key={index}
                                    clip={e}
                                    streamer={streamer}
                                    tab={tab}
                                    setClickedClipUrl={setClickedClipUrl}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </>
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

export default ClipCards;