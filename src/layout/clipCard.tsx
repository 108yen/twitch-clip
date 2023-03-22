import { clipCardsDisplayNumAtom, clipsAtom, moreItemIsExistAtom, tabAtom, tabNameAtom, usersAtom, viewLayoutAtom } from "@/components/Atoms";
import { BorderPaper, StyledLaunch } from "@/components/styledui";
import { Clip, User } from "@/components/types";
import { Avatar, Box, CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

function ListClipCard({
    clip,
    streamer,
}: {
    clip: Clip,
    streamer: User | undefined,
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
                        >
                            {clip.title}
                        </Typography>
                        <Link
                            href={clip.url}
                            target='_blank'
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <StyledLaunch fontSize="small" />
                        </Link>

                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Link
                            href={streamer != undefined ? "/streamer/" + streamer.id : "/"}
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                            }}
                        >
                            {streamer != undefined
                                ? <Avatar src={streamer.profile_image_url} />
                                : <Skeleton variant="circular" width={40} height={40} />}
                        </Link>
                        <Typography noWrap variant="body1">
                            {streamer != undefined
                                ? streamer.display_name
                                : <Skeleton width={150} />}
                        </Typography>
                    </Stack>
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

function FullClipCard({
    clip,
    streamer,
}: {
    clip: Clip,
    streamer: User | undefined,
}) {
    const [loaded, setLoaded] = useState(false);
    function handleLoaded() {
        setLoaded(true);
    }

    return (
        <BorderPaper
            sx={{
                marginX: { xs: 0, sm: 1 },
                marginY: { xs: 1, sm: 2 },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '56.25%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {loaded
                    ? null
                    : <Skeleton
                        variant="rounded"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                }
                <iframe
                    src={clip.embed_url + '&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com'}
                    allowFullScreen
                    loading="lazy"
                    onLoad={handleLoaded}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    />
            </Box>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                paddingX={2}
                mt={1}
            >
                <Link
                    href={streamer != undefined ? "/streamer/" + streamer.id : "/"}
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                >
                    {streamer != undefined
                        ? <Avatar src={streamer.profile_image_url} />
                        : <Skeleton variant="circular" width={40} height={40} />}
                </Link>
                <Box
                    // paddingBottom={1}
                    sx={{
                        overflow: 'hidden',
                        flexGrow: 1,
                    }}
                >
                    <Typography
                        variant='subtitle1'
                        noWrap
                        fontWeight='bold'
                    >
                        {clip.title}
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                    >
                        <Typography variant='subtitle2'>{clip.broadcaster_name}</Typography>
                        <Typography variant='subtitle2'>
                            {clip.view_count.toLocaleString() + " views"}
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </BorderPaper>
    );
}

function ClipCards() {
    //clips data
    const clipsLoadableAtom = loadable(clipsAtom);
    const [clipsValue] = useAtom(clipsLoadableAtom);
    //streamer info
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useAtom(clipCardsDisplayNumAtom);
    const [hasMore, setHasMore] = useAtom(moreItemIsExistAtom);
    //layout full | list
    const [layout] = useAtom(viewLayoutAtom);
    //period tab name
    const [tab] = useAtom(tabNameAtom);


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

    if (clipsValue.state === "hasData") {
        if (clipsValue.data != undefined
            && clipsValue.data[tab] != undefined
            && clipsValue.data[tab].length != 0) {
            const clips = clipsValue.data[tab];

            return (
                <InfiniteScroll
                    dataLength={viewItemNum}
                    next={() => { loadMore(clips) }} //!ごり押し
                    hasMore={hasMore}
                    loader={loader}
                    endMessage={endMessage}
                >
                    {clips.slice(0, viewItemNum).map((e, index) => {
                        const streamer = streamersValue.state === 'hasData'
                            ? streamersValue.data?.find((user) => user.id == e.broadcaster_id)
                            : undefined;
                        //!ここで分岐しているの処理上よくないかも
                        if (layout == "full") {
                            return (
                                <FullClipCard
                                    key={index}
                                    clip={e}
                                    streamer={streamer}
                                />
                            );
                        } else {
                            return (
                                <ListClipCard
                                    key={index}
                                    clip={e}
                                    streamer={streamer}
                                />
                            );
                        }
                    })}
                </InfiniteScroll>
            );
        } else {
            return endMessage;
        }
    } else if (clipsValue.state === "loading") {
        return loader;
    } else {
        return <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant='inherit' color='gray'>
                load error
            </Typography>
        </Box>;
    }
}

export default ClipCards;