import { Avatar, Stack, Typography } from "@mui/material"
import Link from "next/link"

import { event } from "@/components/googleAnalytics/gtag"
import {
  BorderPaper,
  NoDecorationTypography,
  StyledLaunch,
} from "@/components/styledui"
import { Streamer } from "@/models/streamer"

export default function StreamerItem({ streamer }: { streamer: Streamer }) {
  return (
    <BorderPaper
      sx={{
        marginX: { xs: 0, sm: 1 },
        marginY: { xs: 2, sm: 3 },
        p: 2,
        height: 140,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        height="100%"
        spacing={1}
      >
        <Link
          href={`/streamer/${streamer.id}`}
          aria-label="streamer channel page link"
          prefetch={false}
        >
          <Avatar alt="top" src={streamer.profile_image_url} />
        </Link>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="100%"
          height="100%"
          overflow="hidden"
        >
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Link
              href={`/streamer/${streamer.id}`}
              aria-label="streamer channel page link"
              prefetch={false}
              style={{
                textDecoration: "none",
              }}
            >
              <NoDecorationTypography variant="h6" noWrap>
                {streamer.display_name}
              </NoDecorationTypography>
            </Link>
            <Link
              href={"https://www.twitch.tv/" + streamer.login}
              aria-label="twitch channel page link"
              target="_blank"
              style={{
                textDecoration: "none",
              }}
              onClick={() => {
                event("click", {
                  label: "click_twitch_channel",
                  channel_title: streamer.display_name,
                  link_url: "https://www.twitch.tv/" + streamer.login,
                })
              }}
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
            variant="body1"
            color="gray"
            height={50}
            overflow="auto"
            sx={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {streamer.description}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            color="gray"
            textAlign="end"
            width="100%"
          >
            {streamer.follower_num?.toLocaleString() + " followers"}
          </Typography>
        </Stack>
      </Stack>
    </BorderPaper>
  )
}
