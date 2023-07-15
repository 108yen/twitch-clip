import { AboutBodyTypography, BorderPaper, SimpleButton } from "@/components/styledui";
import DefaultHeader from "@/layout/defaultHeader";
import { Box, Divider, Grid, List, ListItem, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { event } from "nextjs-google-analytics";

export default function About() {
    const title = "Twitchクリップランキング | このサイトについて";
    const description = "Twitchクリップランキングの説明ページ";

    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    function handleSnackbarClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const [inquiry, setInquiry] = useState<string>("");
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInquiry(event.target.value);
    }
    async function handleSubmit() {
        //todo: 案内
        if (inquiry == "") {
            return;
        }
        const res = await axios
            .post('/api/inquiry',
                {
                    category: 'others',
                    body: inquiry,
                },
            )
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data);
                } else {
                    console.error(error);
                }
            })
            .then((response) => {
                if (response) {
                    if (response.status == 200) {
                        setInquiry("");
                        setSnackbarOpen(true);
                        event("click", {
                            label:"send_inquiry",
                        });
                    }
                }
            });
    }

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
                        本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。各ランキングにつき、100件表示可能です。
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
                                        day,week,month,yearランキング
                                    </TableCell>
                                    <TableCell align="right">
                                        毎日0,6,12,18時
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
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        5. Google Analytics
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        サイトの利用状況を把握するために、Google Analyticsを使用しています。GoogleによるCookieの利用方法やオプトアウトの方法は、下記のリンクから確認できます。
                    </AboutBodyTypography>
                    <ul>
                        <li>
                            <Link
                                href="https://policies.google.com/technologies/cookies?hl=ja"
                                target='_blank'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: 'underline'
                                        }
                                    }}
                                >
                                    GoogleによるCookieの利用方法
                                </AboutBodyTypography>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://support.google.com/analytics/answer/181881?hl=ja"
                                target='_blank'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: 'underline'
                                        }
                                    }}
                                >
                                    Google Analyticsのオプトアウト
                                </AboutBodyTypography>
                            </Link>
                        </li>
                    </ul>
                    <Typography
                        variant="h4"
                        pt={10}
                    >
                        6. お問い合わせ
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <TextField
                        id="inquiry"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        color="secondary"
                        value={inquiry}
                        onChange={handleInputChange}
                    />
                    <Box textAlign="center" m={2}>
                        <SimpleButton
                            variant="outlined"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            問い合わせ
                        </SimpleButton>
                    </Box>

                    <Stack
                        direction="row"
                        mt={10}
                        flexGrow={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            variant="caption"
                            color="grey"
                        >
                            developer:
                        </Typography>
                        <Box sx={{ width: (theme) => theme.spacing(1) }} />
                        <Link
                            href="https://github.com/108yen"
                            target='_blank'
                            style={{
                                textDecoration: 'none',
                            }}
                            onClick={() => {
                                event("click", {
                                    label: "click_github_link",
                                    link_url: "https://github.com/108yen",
                                });
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                            >

                                <GitHubIcon sx={{ fontSize: (theme) => theme.typography.caption.fontSize, color: "grey" }} />
                                <Typography
                                    variant="caption"
                                    color="grey"
                                >
                                    108yen
                                </Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={6000}
            >
                <MuiAlert
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    お問い合わせ完了
                </MuiAlert>
            </Snackbar>
        </>
    );
}