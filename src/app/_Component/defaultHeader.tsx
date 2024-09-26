"use client"
import { HexagonOutlined } from "@mui/icons-material"
import {
  Box,
  Divider,
  Stack,
  SxProps,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import NotificationMenu from "./notificationMenu"
import { Div, NoDecorationTypography, PaperAppBar } from "@/components/styledui"

export default function DefaultHeader() {
  const [isTransparent, setTransparent] = useState<boolean>(true)

  function toggleTransparent() {
    if (window.scrollY == 0) setTransparent(true)
    else setTransparent(false)
  }

  const initStyle: SxProps<Theme> = {
    opacity: 0,
  }
  const [style, setStyle] = useState<SxProps<Theme>>(initStyle)
  function handleOnMouseEnter(event: React.MouseEvent) {
    const { left, width, height } = event.currentTarget.getBoundingClientRect()
    setStyle({
      opacity: 1,
      left: left,
      width: width,
      height: height,
      background: (theme) =>
        theme.palette.mode === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    })
  }
  function handleOnMouseLeave() {
    setStyle(initStyle)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleTransparent)
    return () => window.removeEventListener("scroll", toggleTransparent)
  }, [])

  const pathname = usePathname()
  const currentPath = pathname.split("/")[1]
  function setCurrentPageColor(theme: Theme, pagePath: string) {
    return pagePath == currentPath
      ? theme.palette.text.primary
      : theme.palette.text.disabled
  }

  return (
    <PaperAppBar
      position="sticky"
      istransparent={`${isTransparent}`}
      sx={{
        zIndex: 1201,
      }}
    >
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" flexGrow={1}>
          <Stack direction="row">
            <HexagonOutlined
              color="secondary"
              fontSize="large"
              sx={{
                display: { xs: "none", sm: "flex" },
                mr: 1,
              }}
            />
            <Link
              href="/"
              aria-label="top"
              prefetch={false}
              style={{
                textDecoration: "none",
              }}
            >
              <NoDecorationTypography variant="h5" noWrap>
                Twitch clip ranking
              </NoDecorationTypography>
            </Link>
            <Divider
              orientation="vertical"
              sx={{
                display: { xs: "none", sm: "flex" },
                marginX: 3,
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Box
                sx={{
                  transitionDuration: "0.3s",
                  position: "absolute",
                  zIndex: -1,
                  borderRadius: 1,
                  ...style,
                }}
              />
              {/* <LinkButton href='/' tooltip='ページトップ' title='Top' /> */}
              <Div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                sx={{
                  paddingX: 2,
                  paddingY: 0.5,
                }}
              >
                <Link
                  href="/"
                  aria-label="top"
                  prefetch={false}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Tooltip title="ページトップ">
                    <Typography
                      variant="body1"
                      noWrap
                      sx={{
                        transitionDuration: "0.3s",
                        color: (theme) => setCurrentPageColor(theme, ""),
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      Top
                    </Typography>
                  </Tooltip>
                </Link>
              </Div>
              <Div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                sx={{
                  paddingX: 2,
                  paddingY: 0.5,
                }}
              >
                <Link
                  href="/daily"
                  prefetch={false}
                  aria-label="daily clip page link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Tooltip title="日別ランキング">
                    <Typography
                      variant="body1"
                      noWrap
                      sx={{
                        transitionDuration: "0.3s",
                        color: (theme) => setCurrentPageColor(theme, "daily"),
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      Daily ranking
                    </Typography>
                  </Tooltip>
                </Link>
              </Div>
              <Div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                sx={{
                  paddingX: 2,
                  paddingY: 0.5,
                }}
              >
                <Link
                  href="/past"
                  prefetch={false}
                  aria-label="past clip page link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Tooltip title="過去の年別ランキング">
                    <Typography
                      variant="body1"
                      noWrap
                      sx={{
                        transitionDuration: "0.3s",
                        color: (theme) => setCurrentPageColor(theme, "past"),
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      Past ranking
                    </Typography>
                  </Tooltip>
                </Link>
              </Div>
              <Div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                sx={{
                  paddingX: 2,
                  paddingY: 0.5,
                }}
              >
                <Link
                  href="/streamers"
                  prefetch={false}
                  aria-label="channel list page link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Tooltip title="チャンネル一覧">
                    <Typography
                      variant="body1"
                      noWrap
                      component="div"
                      sx={{
                        transitionDuration: "0.3s",
                        color: (theme) =>
                          setCurrentPageColor(theme, "streamers"),
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      Channels
                    </Typography>
                  </Tooltip>
                </Link>
              </Div>
            </Stack>
          </Stack>
          <Box
            sx={{ flexGrow: 1 }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          />

          <NotificationMenu />
        </Stack>
      </Toolbar>
    </PaperAppBar>
  )
}
