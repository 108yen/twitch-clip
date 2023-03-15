import DefaultHeader from "@/layout/defaultHeader";
import { Divider, Grid, Typography } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";

export default function About() {
    const title = "twitchクリップランキング | このサイトについて";
    const description = "twitchクリップランキングの説明ページ";

    const items: Array<{
        title: string;
        body: string;
    }> = [
            {
                title: "はじめに",
                body: "このウェブサイトを利用する場合、以下の利用規約に同意したものとみなされます。利用規約は、随時変更される場合があります。変更された規約は、サイトに掲載された時点で効力を有します。"
            },
            {
                title: "ランキングについて",
                body:"本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。",
            },
            {
                title: "コンテンツの更新頻度",
                body:"当サイトのコンテンツは、定期的に更新されます。更新頻度については、事前の予告なく変更される場合があります。",
            },
            {
                title: "禁止事項",
                body: "当サイトの利用に際して、以下の行為は禁止とします。\n・違法行為、またはそのおそれのある行為\n・公序良俗に反する行為、またはそのおそれのある行為\n・当サイトの運営を妨げる行為、またはそのおそれのある行為\n・当サイトに対する攻撃、またはそのおそれのある行為\n・当サイトのコンテンツをプログラム等を用いて機械的に取得する行為 (Webスクレイピング行為等)"
            },
            {
                title: "免責事項",
                body: "当サイトは、利用者に提供する情報について、正確性、完全性、信頼性、適用性、またはその他の保証を一切行いません。当サイトは、いかなる損害、損失、または費用に対しても責任を負いません。"
            },
        ];

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
                <Grid
                    item
                    xs={12} md={9} lg={8} xl={7}
                    justifyContent='center'
                    p={3}
                >
                    <Typography
                        variant="h3"
                        pt={10}
                        textAlign="center"
                    >
                        本サイトについて
                    </Typography>
                    {items.map((item, index) => 
                        <>
                            <Typography
                                variant="h4"
                                pt={10}
                            >
                                {index+1}. {item.title}
                            </Typography>
                            <Divider />
                            <Typography
                                variant="body1"
                                pt={2}
                                whiteSpace="pre-line"
                            >
                                {item.body}
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
}