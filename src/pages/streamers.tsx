import DefaultHeader from "@/layout/defaultHeader";
import { Grid } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";

export default function Streamers() {
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
                    
                </Grid>
            </Grid>
        </>
    );
}