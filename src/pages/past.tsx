import { currentStreamerIdAtom } from "@/components/Atoms";
import MainClipCard from "@/layout/mainClipCard";
import DefaultHeader from "@/layout/defaultHeader";
import StreamerList from "@/layout/streamerList";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useEffect } from "react";

export default function PastRanking() {
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);

    useEffect(() => {
        setCurrentStreamerId('past_summary');
    }, []);

    const title = "Twitchクリップランキング | 過去ランキング";
    const description = "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。";

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
            <DefaultHeader />
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid item xs={12} md={9}>
                    <MainClipCard />
                </Grid>
                <Grid item xs={3} display={{ xs: 'none', md: 'flex' }}>
                    <StreamerList />
                </Grid>
            </Grid>
        </>
    );
}