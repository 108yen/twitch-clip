'use client'
import { streamersAtom } from "@/components/Atoms";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Link from "next/link";
import StreamerList from "./StreamerList";

export default function StreamersPageBody() {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    const channelNum = streamersValue.state === "hasData" ? streamersValue.data?.length : undefined;

    return (
        <>
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid item xs={12} md={9}>
                    <Box
                        sx={{
                            marginX: { xs: 0, sm: 1 },
                            mt: { xs: 2, sm: 5 },
                            overflow: 'hidden',
                        }}
                    >
                        <Typography
                            mr={2}
                            variant="h5"
                            color="secondary"
                            textAlign="end"
                        >
                            {channelNum?.toLocaleString() + " channels"}
                        </Typography>
                        <Divider />
                    </Box>
                    <StreamerList />
                    <Box
                        m={3}
                        flexGrow={1}
                        alignItems="center"
                        textAlign="center"
                    >
                        <Link
                            href="/inquiry"
                            aria-label="inquiry page link"
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="grey"
                                sx={{
                                    "&:hover": {
                                        textDecorationLine: "underline",
                                    }
                                }}
                            >
                                チャンネル追加リクエスト
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}