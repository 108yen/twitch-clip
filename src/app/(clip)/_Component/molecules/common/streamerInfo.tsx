import { event } from "@/components/googleAnalytics/gtag"
import { NoDecorationTypography, StyledLaunch } from "@/components/styledui"
import { Avatar, Stack, Typography } from "@mui/material"
import Link from "next/link"

import { Clip } from "../../../../../models/clip"

export function StreamerInfo({ clip }: { clip: Clip }) {
  return (
    <Stack alignItems="center" direction="row" overflow="hidden" spacing={1}>
      <Link
        href={`/streamer/${clip.broadcaster_id}`}
        prefetch={false}
        style={{
          textDecoration: "none",
        }}
      >
        <Avatar
          alt="top"
          src={clip.profile_image_url}
          sx={{ height: 35, width: 35 }}
        />
      </Link>
      <Stack
        alignItems="flex-start"
        direction="row"
        flexGrow={1}
        justifyContent="space-between"
        overflow="hidden"
      >
        <Stack direction="column" overflow="hidden">
          <Link
            aria-label="streamer page link"
            href={`/streamer/${clip.broadcaster_id}`}
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
          >
            <NoDecorationTypography fontWeight="bold" variant="body1">
              {clip.broadcaster_name}
            </NoDecorationTypography>
            <Typography color="grey" variant="inherit">
              {`${
                clip.broadcaster_follower_num?.toLocaleString() ?? ""
              } followers`}
            </Typography>
          </Link>
        </Stack>
        <Link
          aria-label="twitch channel page link"
          href={"https://www.twitch.tv/" + clip.broadcaster_login}
          onClick={() => {
            event("click", {
              channel_title: clip.broadcaster_name,
              label: "click_twitch_channel",
              link_url: "https://www.twitch.tv/" + clip.broadcaster_login,
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
    </Stack>
  )
}
