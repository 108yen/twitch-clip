import DefaultHeader from "@/layout/defaultHeader";
import { Divider, Grid, Typography } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";

export default function About() {
    const title = "twitchクリップランキング | このサイトについて";
    const description = "twitchクリップランキングの説明ページ";

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
                    xs={12} md={9}
                    justifyContent='center'
                    p={3}
                >
                    <Typography
                        variant="h3"
                        textAlign="center"
                    >
                        本サイトについて
                    </Typography>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        1. はじめに
                    </Typography>
                    <Divider />
                    <Typography
                        variant="body1"
                        pt={2}
                        whiteSpace="pre-line"
                    >
                        {"このサイトは現在構築中です。\nこのウェブサイトを利用する場合、以下の利用規約に同意したものとみなされます。利用規約は、随時変更される場合がありますので、定期的に確認してください。"}
                    </Typography>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        2. 禁止事項
                    </Typography>
                    <Divider />
                    <Typography
                        variant="body1"
                        pt={2}
                        whiteSpace="pre-line"
                    >
                        {"・違法行為、またはそのおそれのある行為\n・公序良俗に反する行為、またはそのおそれのある行為\n・当サイトの運営を妨げる行為、またはそのおそれのある行為\n・当サイトに対する攻撃、またはそのおそれのある行為\n・当サイトのコンテンツをプログラム等を用いて機械的に取得する行為 (Webスクレイピング行為等)"}
                    </Typography>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        3. 免責事項
                    </Typography>
                    <Divider />
                    <Typography
                        variant="body1"
                        pt={2}
                        whiteSpace="pre-line"
                    >
                        {"当サイトは、当サイトの利用によって生じたいかなる損害についても責任を負いません。また、当サイトの利用によって生じた問題については、利用者自身が解決することとします。"}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}