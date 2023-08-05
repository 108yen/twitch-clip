import { BorderPaper, NoDecorationTypography, StyledLaunch } from "@/components/styledui";
import { Stack, Box, Typography, Grid, Avatar, Skeleton } from "@mui/material";
import MainClipCard from "./mainClipCard";
import SideClipCard from "./sideClipCard";
import { Clip, User } from "@/components/types";
import { usersAtom } from "@/components/Atoms";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Link from "next/link";
import { event } from "nextjs-google-analytics";

export function ClipViewLayout({
    currentClip,
    setClickedClip,
}: {
    currentClip: Clip,
    setClickedClip: (clip: Clip) => void,
}) {
    //streamer info
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    const currentStreamer = streamersValue.state === 'hasData'
        ? streamersValue.data?.find((e) => e.id == currentClip.broadcaster_id)
        : undefined;

    function StreamerInfo({ streamer }: { streamer: User | undefined }) {
        if (streamer != undefined) {
            return (
                <Stack
                    direction="row"
                    overflow="hidden"
                    alignItems="center"
                    spacing={1}
                >
                    <Link
                        href={"/streamer/" + streamer.id}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Avatar
                            sx={{ width: 35, height: 35 }}
                            src={streamer.profile_image_url} />
                    </Link>
                    <Stack
                        direction="row"
                        overflow="hidden"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexGrow={1}
                    >
                        <Stack
                            direction="column"
                            overflow="hidden"
                        >
                            <Link
                                href={"/streamer/" + streamer.id}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <NoDecorationTypography variant="body1" fontWeight="bold">
                                    {streamer.display_name}
                                </NoDecorationTypography>
                                <Typography variant="inherit" color="grey">
                                    {streamer.follower_num?.toLocaleString()} followers
                                </Typography>
                            </Link>
                        </Stack>
                        <Link
                            href={"https://www.twitch.tv/" + streamer.login}
                            target='_blank'
                            style={{
                                textDecoration: 'none',
                            }}
                            onClick={() => {
                                event("click", {
                                    label: "click_twitch_channel",
                                    channel_title: streamer.display_name,
                                    link_url: "https://www.twitch.tv/" + streamer.login,
                                });
                            }}

                        >
                            <Stack
                                direction="row"
                                spacing={1}
                            >
                                <NoDecorationTypography
                                    variant="body2"
                                >
                                    Twitch
                                </NoDecorationTypography>
                                <StyledLaunch fontSize="small" />
                            </Stack>
                        </Link>
                    </Stack>
                </Stack>
            );
        } else {
            return (
                <Stack
                    direction="row"
                    overflow="hidden"
                    spacing={1}
                >
                    <Skeleton
                        variant="circular"
                        width={35}
                        height={35} />
                    <Stack
                        direction="column"
                        overflow="hidden"
                    >
                        <Skeleton width={150} />
                    </Stack>
                </Stack>

            );
        }
    }

    return (
        <Grid
            container
            justifyContent='center'
            paddingX={{ xs: 0, md: 5, xl: 15 }}
            spacing={4}
        >
            <Grid item xs={12} md={9}>
                <Stack
                    direction="column"
                    overflow="hidden"
                    spacing={1}
                >
                    <BorderPaper
                        sx={{
                            marginTop: { xs: 0, md: 5 }
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
                            <iframe
                                src={currentClip.embed_url + '&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com'}
                                allowFullScreen
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
                        </Box>
                    </BorderPaper>
                    <Stack
                        direction="row"
                        overflow="hidden"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexGrow={1}
                    >
                        <Typography variant="h6" fontWeight="bold" noWrap>
                            {currentClip.title}
                        </Typography>
                        <Typography variant="body2" color="grey">
                            {currentClip.view_count?.toLocaleString()} views
                        </Typography>
                    </Stack>
                    <StreamerInfo streamer={currentStreamer} />
                </Stack>
            </Grid>
            <Grid item zeroMinWidth xs={3} display={{ xs: 'none', md: 'flex' }}>
                <SideClipCard
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
            <Grid item zeroMinWidth xs={12} display={{ xs: 'flex', md: 'none' }}>
                <MainClipCard
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
        </Grid>
    );
}