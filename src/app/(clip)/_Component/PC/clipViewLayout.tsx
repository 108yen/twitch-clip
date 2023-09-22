import { Stack, Box, Typography, Grid } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";

import { streamersAtom } from "@/components/Atoms";
import { BorderPaper } from "@/components/styledui";
import { Clip } from "@/models/clip";

import { StreamerInfo } from "../streamerInfo";

import SideClipCard from "./sideClipCard";

export function ClipViewLayout({
    currentClip,
    setClickedClip,
}: {
    currentClip: Clip,
    setClickedClip: (clip: Clip) => void,
}) {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    const currentStreamer = streamersValue.state === `hasData`
        ? streamersValue.data?.find((e) => e.id == currentClip.broadcaster_id)
        : undefined;

    return (
        <Grid
            container
            justifyContent='center'
            paddingX={{ xs: 0, md: 5, xl: 15 }}
            columnSpacing={4}
        >
            <Grid item xs={12} sm={9}>
                <Stack
                    direction='column'
                    spacing={1}
                    sx={{ minWidth: 0}}
                >
                    <BorderPaper
                        sx={{
                            marginTop: { xs: 0, md: 5 }
                        }}
                    >
                        <Box
                            sx={{
                                position: `relative`,
                                width: `100%`,
                                height: 0,
                                paddingBottom: `56.25%`,
                                display: `flex`,
                                justifyContent: `center`,
                            }}
                        >
                            <iframe
                                src={currentClip.embed_url + `&parent=localhost&parent=www.twitchclipsranking.com&parent=twitchclipsranking.com`}
                                allowFullScreen
                                loading='lazy'
                                style={{
                                    position: `absolute`,
                                    top: 0,
                                    left: 0,
                                    width: `100%`,
                                    height: `100%`,
                                    border: `none`,
                                }}
                            />
                        </Box>
                    </BorderPaper>
                    <Stack
                        direction='row'
                        overflow='hidden'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        flexGrow={1}
                    >
                        <Typography variant='h6' fontWeight='bold' noWrap>
                            {currentClip.title}
                        </Typography>
                        <Typography
                            align='right'
                            minWidth={95}
                            variant='body2'
                            color='grey'
                        >
                            { `${currentClip.view_count?.toLocaleString()} views`}
                        </Typography>
                    </Stack>
                    <StreamerInfo streamer={currentStreamer} />
                </Stack>
            </Grid>
            <Grid item zeroMinWidth xs={3}>
                <SideClipCard
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
        </Grid>
    );
}
