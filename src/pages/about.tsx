import { AboutBodyTypography, BorderPaper } from "@/components/styledui";
import DefaultHeader from "@/layout/defaultHeader";
import { Divider, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";

export default function About() {
    const title = "Twitchクリップランキング | このサイトについて";
    const description = "Twitchクリップランキングの説明ページ";

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
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        1. はじめに
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        このウェブサイトを利用する場合、以下の利用規約に同意したものとみなされます。利用規約は、随時変更される場合があります。
                    </AboutBodyTypography>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        2. ランキングについて
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。各ランキングにつき、50件表示可能です。
                    </AboutBodyTypography>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        3. コンテンツの更新頻度
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        当サイトのコンテンツは、定期的に更新されます。更新頻度については、事前の予告なく変更される場合があります。具体的な更新頻度は以下を参照してください。
                    </AboutBodyTypography>
                    <TableContainer component={BorderPaper} sx={{ marginTop: 5 }}>
                        <Table >
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        day,week,monthランキング
                                    </TableCell>
                                    <TableCell align="right">
                                        毎日10,22時
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        allランキング
                                    </TableCell>
                                    <TableCell align="right">
                                        毎月1,16日
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        過去ランキング
                                    </TableCell>
                                    <TableCell align="right">
                                        毎月4日
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        チャンネル追加
                                    </TableCell>
                                    <TableCell align="right">
                                        毎週月曜日
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        チャンネル情報更新
                                    </TableCell>
                                    <TableCell align="right">
                                        毎週水曜日
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        4. 禁止事項
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <List>
                        <ListItem>
                            <AboutBodyTypography>
                                当サイトの利用に際して、以下の行為は禁止とします。
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                ・違法行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                ・公序良俗に反する行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                ・当サイトの運営を妨げる行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                ・当サイトに対する攻撃、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                ・当サイトのコンテンツをプログラム等を用いて機械的に取得する行為 (Webスクレイピング行為等)
                            </AboutBodyTypography>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </>
    );
}