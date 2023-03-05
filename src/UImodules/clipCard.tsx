import { Clip, User } from "@/components/types";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from 'next/image';
import { useState } from "react";

function ClipCard({
    clip, avatarUrl, index
}: {
    clip: Clip, avatarUrl: string, index: number
}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return <Grid
        key={index}
        item
    // xs={12} md={6} lg={4} xl={3}
    >
        <Paper
            sx={{
                width: 320,
            }}
        >
            <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    transition: 'transform .2s',
                    '&:hover': {
                        overflow: 'visible',
                        transform: 'scale(1.1)',
                    },
                }}
            >
                {isHovered ?
                    <iframe
                        src={clip.embed_url + '&parent=localhost'}
                        height='216px'
                        width='384px'
                        allowFullScreen
                        allow="autoplay"
                    /> : <Image
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        height={180}
                        width={320}
                    />
                }
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
        <Grid container justifyContent="center" spacing={2}>
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