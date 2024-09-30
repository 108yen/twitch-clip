import { event } from "@/components/googleAnalytics/gtag"
import {
  BorderPaper,
  NoDecorationTypography,
  StyledLaunch,
} from "@/components/styledui"
import { Streamer } from "@/models/streamer"
import { Avatar, Stack, Typography } from "@mui/material"
import Link from "next/link"

export default function StreamerItem({ streamer }: { streamer: Streamer }) {
  return (
    <BorderPaper
      sx={{
        height: 140,
        marginX: { sm: 1, xs: 0 },
        marginY: { sm: 3, xs: 2 },
        overflow: "hidden",
        p: 2,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        height="100%"
        justifyContent="flex-start"
        spacing={1}
      >
        <Link
          aria-label="streamer channel page link"
          href={`/streamer/${streamer.id}`}
          prefetch={false}
        >
          <Avatar alt="top" src={streamer.profile_image_url} />
        </Link>
        <Stack
          alignItems="flex-start"
          direction="column"
          height="100%"
          justifyContent="flex-start"
          overflow="hidden"
          width="100%"
        >
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Link
              aria-label="streamer channel page link"
              href={`/streamer/${streamer.id}`}
              prefetch={false}
              style={{
                textDecoration: "none",
              }}
            >
              <NoDecorationTypography noWrap variant="h6">
                {streamer.display_name}
              </NoDecorationTypography>
            </Link>
            <Link
              aria-label="twitch channel page link"
              href={"https://www.twitch.tv/" + streamer.login}
              onClick={() => {
                event("click", {
                  channel_title: streamer.display_name,
                  label: "click_twitch_channel",
                  link_url: "https://www.twitch.tv/" + streamer.login,
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
            variant="body1"
          >
            {streamer.description}
          </Typography>
          <Typography
            color="gray"
            noWrap
            textAlign="end"
            variant="body2"
            width="100%"
          >
            {streamer.follower_num?.toLocaleString() + " followers"}
          </Typography>
        </Stack>
      </Stack>
    </BorderPaper>
  )
}
