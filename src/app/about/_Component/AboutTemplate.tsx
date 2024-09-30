import { AboutBodyTypography, BorderPaper } from "@/components/styledui"
import TwitterIcon from "@mui/icons-material/Twitter"
import {
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"

import ExternalLink from "./atoms/externalLink"
import InquiryForm from "./molecules/InquiryForm"

export default function AboutTemplate() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        paddingX={{ lg: 15, md: 5, xl: 20, xs: 0 }}
      >
        <Grid item justifyContent="center" lg={8} md={9} p={3} xl={7} xs={12}>
          <Typography pt={10} textAlign="center" variant="h3">
            本サイトについて
          </Typography>
          <Typography pt={10} variant="h4">
            1. はじめに
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <AboutBodyTypography>
            当サイトは日本語配信者のTwitchのクリップをランキング形式でまとめた非公式サイトです。各ランキング100件までクリップがリストされます。より多くのクリップを視聴したい場合やチャンネルの分析をしたい場合は以下のサイトを利用ください。
          </AboutBodyTypography>
          <List>
            <ListItem>
              <ExternalLink
                ariaLabel="streams charts link"
                eventLabel="click_streams_charts_link"
                href="https://streamscharts.com/"
              >
                <AboutBodyTypography
                  sx={{
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  STREAMS CHARTS
                </AboutBodyTypography>
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink
                ariaLabel="twitch tracker link"
                eventLabel="click_twitch_tracker_link"
                href="https://twitchtracker.com/"
              >
                <AboutBodyTypography
                  sx={{
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  Twitch Tracker
                </AboutBodyTypography>
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink
                ariaLabel="twitch stats link"
                eventLabel="click_twitch_stats_link"
                href="https://twitchstats.net/twitch-clip-search"
              >
                <AboutBodyTypography
                  sx={{
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  Twitch Stats and analysis
                </AboutBodyTypography>
              </ExternalLink>
            </ListItem>
          </List>
          <Typography pt={10} variant="h4">
            2. ランキングについて
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <AboutBodyTypography>
            本サイトに掲載されるランキングは、すべてのストリーマーのランキングではなく、登録されたストリーマーのランキングです。各ランキングにつき、100件表示可能です。
          </AboutBodyTypography>
          <Typography pt={10} variant="h4">
            3. コンテンツの更新頻度
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <AboutBodyTypography>
            当サイトのコンテンツは、定期的に更新されます。更新頻度については、事前の予告なく変更される場合があります。具体的な更新頻度は以下を参照してください。
            表示の更新は20分程度ずれる可能性があります。
          </AboutBodyTypography>
          <TableContainer component={BorderPaper} sx={{ marginTop: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>dayランキング</TableCell>
                  <TableCell align="right">3時間毎</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>week,month,yearランキング</TableCell>
                  <TableCell align="right">毎日0時</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>allランキング</TableCell>
                  <TableCell align="right">毎月1日</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>日別ランキング</TableCell>
                  <TableCell align="right">毎日0時</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>年別ランキング</TableCell>
                  <TableCell align="right">毎月1日</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography pt={10} variant="h4">
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
                当サイトのコンテンツをプログラム等を用いて機械的に取得する行為
                (Webスクレイピング行為等)
              </AboutBodyTypography>
            </ListItem>
          </List>
          <Typography pt={10} variant="h4">
            5. Google Analytics
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <AboutBodyTypography>
            サイトの利用状況を把握するために、Google
            Analyticsを使用しています。GoogleによるCookieの利用方法やオプトアウトの方法は、下記のリンクから確認できます。
          </AboutBodyTypography>
          <List>
            <ListItem>
              <ExternalLink
                ariaLabel="google link"
                eventLabel="click_google_link"
                href="https://policies.google.com/technologies/cookies?hl=ja"
              >
                <AboutBodyTypography
                  sx={{
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  GoogleによるCookieの利用方法
                </AboutBodyTypography>
              </ExternalLink>
            </ListItem>
            <ListItem>
              <ExternalLink
                ariaLabel="google optout link"
                eventLabel="click_google_link"
                href="https://support.google.com/analytics/answer/181881?hl=ja"
              >
                <AboutBodyTypography
                  sx={{
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  Google Analyticsのオプトアウト
                </AboutBodyTypography>
              </ExternalLink>
            </ListItem>
          </List>
          <Typography pt={10} variant="h4">
            6. Google AdSense
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <AboutBodyTypography>
            当サイトでは、広告提供の一環としてGoogle
            AdSenseを使用しています。広告はパーソナライズされることがあり、お使いの興味や訪問履歴に基づいて表示されます。
            <ExternalLink
              ariaLabel="myadcenter link"
              eventLabel="click_myadcenter_link"
              href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings"
            >
              <AboutBodyTypography
                sx={{
                  "&:hover": {
                    textDecorationLine: "underline",
                  },
                  display: "inline",
                }}
              >
                広告の設定
              </AboutBodyTypography>
            </ExternalLink>
            からパーソナライズ広告を無効にすることができます。
          </AboutBodyTypography>
          <Typography pt={10} variant="h4">
            7. お問い合わせ
          </Typography>
          <Divider sx={{ marginY: 1 }} />
          <InquiryForm />
          <Stack
            alignItems="center"
            direction="row"
            flexGrow={1}
            justifyContent="center"
            mt={10}
            spacing={1}
          >
            <Typography color="grey" variant="caption">
              developer:
            </Typography>
            <ExternalLink
              ariaLabel="twitter link"
              eventLabel="click_twitter_link"
              href="https://twitter.com/108yen___"
            >
              <Stack alignItems="center" direction="row">
                <TwitterIcon
                  sx={{
                    color: "grey",
                    fontSize: 14,
                  }}
                />
                <Typography color="grey" variant="caption">
                  108yen
                </Typography>
              </Stack>
            </ExternalLink>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
