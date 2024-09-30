import { event } from "@/components/googleAnalytics/gtag"
import { NoDecorationTypography, StyledLaunch } from "@/components/styledui"
import { Launch } from "@mui/icons-material"
import { Avatar, Box, Paper, Skeleton, Stack, Typography } from "@mui/material"
import Link from "next/link"

import { Streamer } from "../../../../../../models/streamer"

function StreamerCard(props: { streamerInfo: Streamer | undefined }) {
  const { streamerInfo } = props
  if (streamerInfo != undefined) {
    return (
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-start"
        spacing={1}
      >
        <Link
          aria-label="streamer page link"
          href={`/streamer/${streamerInfo.id}`}
          prefetch={false}
          style={{
            textDecoration: "none",
          }}
        >
          <Avatar
            alt="top"
            src={streamerInfo.profile_image_url}
            sx={{ height: 70, width: 70 }}
          />
        </Link>

        <Stack
          direction="column"
          flexGrow={1}
          justifyContent="space-between"
          overflow="hidden"
          spacing={1}
        >
          <Stack
            alignItems="center"
            direction="row"
            flexGrow={1}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography fontWeight="bold" noWrap variant="h5">
              {streamerInfo.display_name}
            </Typography>
            <Link
              aria-label="twitch channel page link"
              href={"https://www.twitch.tv/" + streamerInfo.login}
              onClick={() => {
                event("click", {
                  channel_title: streamerInfo.display_name,
                  label: "click_twitch_channel",
                  link_url: "https://www.twitch.tv/" + streamerInfo.login,
                })
              }}
              style={{
                textDecoration: "none",
              }}
              target="_blank"
            >
              <Stack direction="row" spacing={1}>
                <NoDecorationTypography variant="body2">
                  Twitch
                </NoDecorationTypography>
                <StyledLaunch fontSize="small" />
              </Stack>
            </Link>
          </Stack>
          <Typography
            color="gray"
            height={50}
            overflow="auto"
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            variant="body2"
          >
            {streamerInfo.description}
          </Typography>

          <Typography
            color="gray"
            noWrap
            textAlign="end"
            variant="body2"
            width="100%"
          >
            {streamerInfo.follower_num?.toLocaleString()} followers
          </Typography>
        </Stack>
      </Stack>
    )
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: 700,
          minWidth: { md: 600, xs: 400 },
          overflow: "hidden",
          p: 2,
        }}
      >
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-start"
            spacing={1}
          >
            <Skeleton height={40} variant="circular" width={40} />
            <Typography noWrap variant="subtitle1">
              <Skeleton width={150} />
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography variant="body2">Twitch</Typography>
            <Launch fontSize="small" />
          </Stack>
        </Stack>
        <Stack
          alignItems="flex-start"
          direction="column"
          justifyContent="flex-start"
          ml={6}
          spacing={0}
        >
          <Typography variant="body2">
            <Skeleton width={350} />
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default StreamerCard
