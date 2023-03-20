import { usersAtom } from "@/components/Atoms";
import { User } from "@/components/types";
import DefaultHeader from "@/layout/defaultHeader";
import theme from "@/theme";
import { Launch } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Link from "next/link";

function StreamerItem({
    streamer
}: {
    streamer: User
}) {
    return (
        <Paper
            sx={{
                marginX: { xs: 0, sm: 1 },
                marginY: { xs: 1, sm: 2 },
                p: 2,
                overflow: 'hidden',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Link
                        href={"/streamer/" + streamer.id}
                        style={{
                            textDecoration: 'none',
                            color: theme.palette.text.primary,
                        }}
                    >
                        <Avatar src={streamer.profile_image_url} />
                    </Link>
                    <Typography
                        variant="subtitle1"
                        noWrap
                    >
                        {streamer.display_name}
                    </Typography>
                </Stack>

                <Link
                    href={"https://www.twitch.tv/" + streamer.login}
                    target='_blank'
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Typography
                            variant="body2"
                        >
                            Twitch
                        </Typography>
                        <Launch fontSize="small" />
                    </Stack>
                </Link>
            </Stack>
            <Stack
                ml={6}
                spacing={0}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Typography
                    variant="body2"
                    color="gray"
                >
                    {streamer.description}
                </Typography>
            </Stack>
        </Paper>
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
        return (<>
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
    //seo
    const title = "twitchクリップランキング | ストリーマー一覧";
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
                    <StreamerComponent />
                </Grid>
            </Grid>
        </>
    );
}