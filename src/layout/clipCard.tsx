import { Clip, User } from "@/components/types";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import { useState } from "react";

function ClipCard({
    clip, avatarUrl, index
}: {
    clip: Clip, avatarUrl: string, index: number
}) {
    const [isHovered, setIsHovered] = useState(true);
    const width = 512;

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };

    return <Grid
        key={index}
        item
        xs={12} md={10} lg={6}
        sx={{
            paddingX: { xs: 0, sm: 1 },
            paddingY: { xs: 1, sm: 2 },
        }}
    >
        <Paper
        // sx={{
        //     width: width,
        // }}
        >
            {/* <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            // sx={{
            //     transition: 'transform .2s',
            //     '&:hover': {
            //         overflow: 'visible',
            //         transform: 'scale(1.1)',
            //     },
            // }}
            >
                {isHovered ?
                    <iframe
                        src={clip.embed_url + '&parent=localhost'}
                        height={width * 9 / 16}
                        width={width}
                        allowFullScreen
                        allow="autoplay"
                    /> : <Image
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        width={width}
                        height={width * 9 / 16}
                    />
                } 
            </Box> */}
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
                    // height={width * 9 / 16}
                    // width={width}
                    allowFullScreen
                    allow="autoplay"
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
            >
                <Avatar src={avatarUrl} />
                <Box
                    paddingBottom={1}
                    paddingRight={2}
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
    clips, users
}: {
    clips: Array<Clip>, users: Array<User>
}) {
    return (
        <Grid
            container
            justifyContent="center"
        >
            {clips.map((e, index) => {
                const streamer = users.find((user) => user.id == e.broadcaster_id);
                const avatarUrl = streamer != undefined ? streamer.profile_image_url : '';
                return (
                    <ClipCard clip={e} avatarUrl={avatarUrl} index={index} />
                );
            })}
        </Grid>
    );
}

export default ClipCards;