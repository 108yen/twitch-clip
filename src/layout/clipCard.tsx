import { Clip, User } from "@/components/types";
import { Launch } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

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
                >
                    <Image
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        width={imageWidth}
                        height={imageWidth * 9 / 16}
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
                        <Typography noWrap variant="body1">
                            created_by : {clip.creator_name}
                        </Typography>
                        <Typography noWrap variant="body1">
                            created_at : {clip.created_at}
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
        xs={12} lg={6}
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
                    src={clip.embed_url + '&parent=localhost'}
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
    return (
        <Grid
            container
            justifyContent="center"
        >
            {clips.slice(0, 9).map((e, index) => {
                const streamer = users.find((user) => user.id == e.broadcaster_id);
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
    );
}

export default ClipCards;