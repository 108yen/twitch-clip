import DefaultHeader from "@/layout/defaultHeader";
import { Grid } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";

export default function PastRanking() {
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
        </>
    );
}