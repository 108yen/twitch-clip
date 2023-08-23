import { usersAtom } from "@/components/Atoms";
import { BorderPaper, NoDecorationTypography, StyledLaunch } from "@/components/styledui";
import { Streamer } from "@/models/streamer";
import DefaultHeader from "@/layout/defaultHeader";
import { Avatar, Box, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import { event } from "nextjs-google-analytics";

function StreamerItem({
    streamer
}: {
    streamer: Streamer
}) {
    return (
        <BorderPaper
            sx={{
                marginX: { xs: 0, sm: 1 },
                marginY: { xs: 2, sm: 3 },
                p: 2,
                height: 140,
                overflow: 'hidden',
            }}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                height={'100%'}
                spacing={1}
            >
                <Link
                    href={"/streamer/" + streamer.id}
                >
                    <Avatar src={streamer.profile_image_url} />
                </Link>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    width="100%"
                    height="100%"
                    overflow="hidden"
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Link
                            href={"/streamer/" + streamer.id}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <NoDecorationTypography
                                variant="h6"
                                noWrap
                            >
                                {streamer.display_name}
                            </NoDecorationTypography>
                        </Link>
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
                    <Typography
                        variant="body1"
                        color="gray"
                        height={50}
                        overflow="auto"
                        sx={{
                            msOverflowStyle: "none",
                            scrollbarWidth: "none",
                            "::-webkit-scrollbar": {
                                display: "none",
                            }
                        }}
                    >
                        {streamer.description}
                    </Typography>
                    <Typography
                        noWrap
                        variant="body2"
                        color="gray"
                        textAlign="end"
                        width="100%"
                    >
                        {streamer.follower_num?.toLocaleString() + " followers"}
                    </Typography>
                </Stack>
            </Stack>
        </BorderPaper>
    );
}

function StreamerComponent() {
    //streamer info
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    //component
    const loader = <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
    </Box>;
    function endMessage(message: string) {
        return (
            <Box key={0} sx={{ m: 3, display: "flex", justifyContent: "center" }}>
                <Typography variant='inherit' color='gray'>
                    {message}
                </Typography>
            </Box>
        );
    }

    if (streamersValue.state == "hasError"
        || (streamersValue.state == "hasData"
            && streamersValue.data == undefined)) {
        return endMessage("error");
    } else if (streamersValue.state == "loading") {
        return loader;
    } else {
        return (
            <>
                {
                    streamersValue.data!
                        .map(
                            (streamer, index) =>
                                <StreamerItem key={index} streamer={streamer} />
                        )
                }
            </>
        );
    }
}

export default function Streamers() {
    //streamer info
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    const channelNum = streamersValue.state === "hasData" ? streamersValue.data?.length : undefined;
    //seo
    const title = "Twitchクリップランキング | ストリーマー一覧";
    const description = "ランキング集計しているストリーマーの一覧ページです。";

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: "https://www.twitchclipsranking.com/",
                    title: title,
                    description: description,
                    images: [
                        {
                            url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                url="https://www.twitchclipsranking.com/"
                title={title}
                images={["https://www.twitchclipsranking.com/android-chrome-512x512.png"]}
                datePublished="20230312"
                dateModified="20230312"
                authorName="108yen"
                publisherName="108yen"
                publisherLogo=""
                description={description}
            />
            {/* header */}
            <DefaultHeader />
            {/* body */}

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
                    <StreamerComponent />
                    <Box
                        m={3}
                        flexGrow={1}
                        alignItems="center"
                        textAlign="center"
                    >
                        <Link
                            href="/inquiry"
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