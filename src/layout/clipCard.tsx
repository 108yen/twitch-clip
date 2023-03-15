import { Clip, User } from "@/components/types";
import { Launch } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';

function ListClipCard({
    key,
    clip,
    streamer,
}: {
    key: number
    clip: Clip,
    streamer: User,
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
        <Grid
            key={key}
            item
            xs={12}
            sx={{
                paddingX: { xs: 0, sm: 1 },
                paddingY: { xs: 1, sm: 2 },
            }}
        >
            <Paper>
                <Stack
                    direction="row"
                    sx={{
                        height: { xs: 110, sm: 170 }
                    }}
                >
                    <Image
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        width={imageWidth}
                        height={imageWidth * 9 / 16}
                        style={{
                            width: 'auto',
                            height: '100%'
                        }}
                        quality={100}
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
                                    color: 'black',
                                }}
                            >
                                <Launch fontSize="small" />
                            </Link>

                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Link
                                href={"https://www.twitch.tv/" + streamer.login}
                                target='_blank'
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                <Avatar src={streamer.profile_image_url} />
                            </Link>
                            <Typography noWrap variant="body1">
                                {streamer.display_name}
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
                            視聴数：{clip.view_count}
                        </Typography>
                    </Stack>

                </Stack>
            </Paper>
        </Grid>
    );

}

function FullClipCard({
    key,
    clip,
    streamer,
}: {
    key: number
    clip: Clip,
    streamer: User,
}) {
    return <Grid
        key={key}
        item
        xs={12}
        sx={{
            paddingX: { xs: 0, sm: 1 },
            paddingY: { xs: 1, sm: 2 },
        }}
    >
        <Paper>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '0',
                    paddingBottom: '56.25%',
                }}
            >
                <iframe
                    src={clip.embed_url + '&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com'}
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Box>

            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                paddingX={2}
            >
                <Link
                    href={"https://www.twitch.tv/" + streamer.login}
                    target='_blank'
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                >
                    <Avatar src={streamer.profile_image_url} />
                </Link>
                <Box
                    paddingBottom={1}
                    sx={{
                        overflow: 'hidden',
                        flexGrow: 1,
                    }}>
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
                        <Typography variant='subtitle2'>視聴数：{clip.view_count}</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    </Grid>
}

function ClipCards({
    clips,
    users,
    layout,
}: {
    clips: Array<Clip>,
    users: Array<User>,
    layout: string,
}) {
    //to infinite scroller
    const [viewItemNum, setViewItemNum] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    function loadMore(page: number) {
        //max item num is 50
        if (viewItemNum >= 45) {
            setHasMore(false);
        }
        //load each 5 items
        setViewItemNum(viewItemNum + 5);
    }

    const loader = <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
    </Box>;

    //if chenge clips or layout, reset view item 
    useEffect(() => {
        setViewItemNum(0);
        setHasMore(true);
    }, [clips, layout])

    return (
        <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            loader={loader}
        >
            <Grid
                container
                justifyContent="start"
            >
                {clips.slice(0, viewItemNum).map((e, index) => {
                    const streamer = users.find((user) => user.id == e.broadcaster_id);
                    //!ここで分岐しているの処理上よくないかも
                    if (layout == "full") {
                        return (
                            <FullClipCard
                                key={index}
                                clip={e}
                                streamer={streamer!}
                            />
                        );
                    } else {
                        return (
                            <ListClipCard
                                key={index}
                                clip={e}
                                streamer={streamer!}
                            />
                        );
                    }
                })}
            </Grid>
        </InfiniteScroll>
    );
}

export default ClipCards;