'use client'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Divider, Grid, List, ListItem, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Link from "next/link";

import { event } from "@/components/gtag";
import { AboutBodyTypography, BorderPaper } from "@/components/styledui";

import InquiryForm from "./_Component/InquiryForm";

export default function About() {
    return (
        <>
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
                        variant='h3'
                        pt={10}
                        textAlign='center'
                    >
                        本サイトについて
                    </Typography>
                    <Typography
                        variant='h4'
                        pt={10}
                    >
                        1. はじめに
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        当サイトは日本語配信者のTwitchのクリップをランキング形式でまとめた非公式サイトです。各ランキング100件までクリップがリストされます。より多くのクリップを視聴したい場合やチャンネルの分析をしたい場合は以下のサイトを利用ください。
                    </AboutBodyTypography>
                    <List>
                        <ListItem>
                            <Link
                                href='https://streamscharts.com/'
                                aria-label='streams charts link'
                                target='_blank'
                                style={{
                                    textDecoration: `none`,
                                }}
                                onClick={() => {
                                    event(`click`, {
                                        label: `click_streams_charts_link`,
                                        link_url: `https://streamscharts.com/`,
                                    });
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: `underline`
                                        }
                                    }}
                                >
                                    STREAMS CHARTS
                                </AboutBodyTypography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href='https://twitchtracker.com/'
                                aria-label='twitch tracker link'
                                target='_blank'
                                style={{
                                    textDecoration: `none`,
                                }}
                                onClick={() => {
                                    event(`click`, {
                                        label: `click_twitch_tracker_link`,
                                        link_url: `https://twitchtracker.com/`,
                                    });
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: `underline`
                                        }
                                    }}
                                >
                                    Twitch Tracker
                                </AboutBodyTypography>
                            </Link>
                        </ListItem>
                    </List>
                    <Typography
                        variant='h4'
                        pt={10}
                    >
                        2. ランキングについて
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。各ランキングにつき、100件表示可能です。
                    </AboutBodyTypography>
                    <Typography
                        variant='h4'
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
                                    <TableCell align='right'>
                                        毎日0,6,12,18時
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        allランキング
                                    </TableCell>
                                    <TableCell align='right'>
                                        毎月1,16日
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        過去ランキング
                                    </TableCell>
                                    <TableCell align='right'>
                                        毎月4日
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography
                        variant='h4'
                        pt={10}
                    >
                        4. 禁止事項
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <List>
                        <ListItem sx={{ paddingX: 0 }}>
                            <AboutBodyTypography>
                                当サイトの利用に際して、以下の行為は禁止とします。
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                違法行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                公序良俗に反する行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                当サイトの運営を妨げる行為、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                当サイトに対する攻撃、またはそのおそれのある行為
                            </AboutBodyTypography>
                        </ListItem>
                        <ListItem>
                            <AboutBodyTypography>
                                当サイトのコンテンツをプログラム等を用いて機械的に取得する行為 (Webスクレイピング行為等)
                            </AboutBodyTypography>
                        </ListItem>
                    </List>
                    <Typography
                        variant='h4'
                        pt={10}
                    >
                        5. Google Analytics
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <AboutBodyTypography>
                        サイトの利用状況を把握するために、Google Analyticsを使用しています。GoogleによるCookieの利用方法やオプトアウトの方法は、下記のリンクから確認できます。
                    </AboutBodyTypography>
                    <List>
                        <ListItem>
                            <Link
                                href='https://policies.google.com/technologies/cookies?hl=ja'
                                aria-label='google link'
                                target='_blank'
                                style={{
                                    textDecoration: `none`,
                                }}
                                onClick={() => {
                                    event(`click`, {
                                        label: `click_google_link`,
                                        link_url: `https://policies.google.com/technologies/cookies?hl=ja`,
                                    });
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: `underline`
                                        }
                                    }}
                                >
                                    GoogleによるCookieの利用方法
                                </AboutBodyTypography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href='https://support.google.com/analytics/answer/181881?hl=ja'
                                aria-label='google optout link'
                                target='_blank'
                                style={{
                                    textDecoration: `none`,
                                }}
                                onClick={() => {
                                    event(`click`, {
                                        label: `click_google_link`,
                                        link_url: `https://support.google.com/analytics/answer/181881?hl=ja`,
                                    });
                                }}
                            >
                                <AboutBodyTypography
                                    sx={{
                                        "&:hover": {
                                            textDecorationLine: `underline`
                                        }
                                    }}
                                >
                                    Google Analyticsのオプトアウト
                                </AboutBodyTypography>
                            </Link>
                        </ListItem>
                    </List>
                    <Typography
                        variant='h4'
                        pt={10}
                    >
                        6. お問い合わせ
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <InquiryForm />
                    <Stack
                        direction='row'
                        mt={10}
                        flexGrow={1}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Typography
                            variant='caption'
                            color='grey'
                        >
                            developer:
                        </Typography>
                        <Box sx={{ width: (theme) => theme.spacing(1) }} />
                        <Link
                            href='https://github.com/108yen'
                            target='_blank'
                            style={{
                                textDecoration: `none`,
                            }}
                            onClick={() => {
                                event(`click`, {
                                    label: `click_github_link`,
                                    link_url: `https://github.com/108yen`,
                                });
                            }}
                        >
                            <Stack
                                direction='row'
                                alignItems='center'
                            >

                                <GitHubIcon sx={{ fontSize: (theme) => theme.typography.caption.fontSize, color: `grey` }} />
                                <Typography
                                    variant='caption'
                                    color='grey'
                                >
                                    108yen
                                </Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
