import { event } from "@/components/googleAnalytics/gtag"
/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material"
import Link from "next/link"

import {
  BorderPaper,
  NoDecorationTypography,
} from "../../../../../components/styledui"
import { Clip } from "../../../../../models/clip"

export default function CardItem(props: {
  clip: Clip
  setClickedClipUrl: (clip: Clip) => void
  tab: string
}) {
  const { clip, setClickedClipUrl, tab } = props

  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      <Tooltip
        enterDelay={500}
        enterNextDelay={500}
        followCursor
        placement="top"
        title={clip.title}
      >
        <Stack
          direction="column"
          overflow="hidden"
          spacing={1}
          sx={{ flexGrow: 1 }}
        >
          <BorderPaper
            onClick={() => {
              setClickedClipUrl(clip)
              event("click", {
                clip_title: clip.title,
                label: "click_clip_title",
                link_url: clip.url,
                ranking_period: tab,
              })
            }}
            sx={{
              cursor: "pointer",
              display: "flex",
              height: 0,
              justifyContent: "center",
              paddingBottom: "56.25%",
              position: "relative",
              width: "100%",
            }}
          >
            <img
              alt={clip.title}
              loading="lazy"
              src={clip.thumbnail_url}
              style={{
                border: "none",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            />
          </BorderPaper>
          <Stack alignItems="center" direction="row" spacing={2}>
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
            <Stack direction="column" flexGrow={1} overflow="hidden">
              <NoDecorationTypography
                noWrap
                onClick={() => {
                  setClickedClipUrl(clip)
                  event("click", {
                    clip_title: clip.title,
                    label: "click_clip_title",
                    link_url: clip.url,
                    ranking_period: tab,
                  })
                }}
                variant="body1"
              >
                {clip.title}
              </NoDecorationTypography>
              <Stack
                alignItems="center"
                direction="row"
                flexGrow={1}
                justifyContent="space-between"
              >
                <Link
                  href={`/streamer/${clip.broadcaster_id}`}
                  prefetch={false}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography color="grey" noWrap variant="body1">
                    {clip.broadcaster_name}
                  </Typography>
                </Link>
                <Typography color="grey" noWrap variant="body2">
                  {clip.view_count?.toLocaleString()} views
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Tooltip>
    </Box>
  )
}
