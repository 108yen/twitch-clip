/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material"
import Link from "next/link"

import {
  BorderPaper,
  NoDecorationTypography,
} from "../../../../../components/styledui"
import { Clip } from "../../../../../models/clip"
import { event } from "@/components/googleAnalytics/gtag"

export default function CardItem(props: {
  clip: Clip
  tab: string
  setClickedClipUrl: (clip: Clip) => void
}) {
  const { clip, tab, setClickedClipUrl } = props

  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      <Stack
        direction="column"
        overflow="hidden"
        spacing={1}
        sx={{ flexGrow: 1 }}
      >
        <BorderPaper
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "56.25%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setClickedClipUrl(clip)
            event("click", {
              label: "click_clip_title",
              clip_title: clip.title,
              ranking_period: tab,
              link_url: clip.url,
            })
          }}
        >
          <img
            src={clip.thumbnail_url}
            alt={clip.title}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </BorderPaper>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link
            href={`/streamer/${clip.broadcaster_id}`}
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
          >
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt="top"
              src={clip.profile_image_url}
            />
          </Link>
          <Stack direction="column" overflow="hidden" flexGrow={1}>
            <Tooltip
              followCursor
              placement="top"
              title={clip.title}
              enterDelay={500}
              enterNextDelay={500}
            >
              <NoDecorationTypography
                variant="body1"
                noWrap
                onClick={() => {
                  setClickedClipUrl(clip)
                  event("click", {
                    label: "click_clip_title",
                    clip_title: clip.title,
                    ranking_period: tab,
                    link_url: clip.url,
                  })
                }}
              >
                {clip.title}
              </NoDecorationTypography>
            </Tooltip>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
            >
              <Link
                href={`/streamer/${clip.broadcaster_id}`}
                prefetch={false}
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography noWrap variant="body1" color="grey">
                  {clip.broadcaster_name}
                </Typography>
              </Link>
              <Typography noWrap variant="body2" color="grey">
                {clip.view_count?.toLocaleString()} views
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
