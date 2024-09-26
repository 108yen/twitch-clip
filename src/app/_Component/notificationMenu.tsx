"use client"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useAtom } from "jotai"
import Link from "next/link"
import { useState } from "react"

import { isDarkModeAtom } from "@/components/Atoms"
import { NoDecorationTypography } from "@/components/styledui"
import { usePage } from "@/contexts"

export default function NotificationMenu() {
  const { version } = usePage()
  //dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  })
  const [isSetDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom)
  const isDarkMode =
    isSetDarkMode == undefined ? prefersDarkMode : isSetDarkMode
  function handleSwitchChange() {
    setIsDarkMode(!isDarkMode)
  }
  //menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label="menu"
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 1300,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            height: 40,
            justifyContent: "space-between",
          }}
        >
          <Typography>ダークモード</Typography>
          <Switch
            checked={isDarkMode}
            onChange={handleSwitchChange}
            color="secondary"
          />
        </MenuItem>
        <MenuItem
          sx={{
            height: 40,
          }}
        >
          <Link
            href="/daily"
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
            onClick={handleClose}
          >
            <NoDecorationTypography>日別ランキング</NoDecorationTypography>
          </Link>
        </MenuItem>
        <MenuItem
          sx={{
            height: 40,
          }}
        >
          <Link
            href="/past"
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
            onClick={handleClose}
          >
            <NoDecorationTypography>過去のランキング</NoDecorationTypography>
          </Link>
        </MenuItem>
        <MenuItem
          sx={{
            height: 40,
          }}
        >
          <Link
            href="/streamers"
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
            onClick={handleClose}
          >
            <NoDecorationTypography>ストリーマー一覧</NoDecorationTypography>
          </Link>
        </MenuItem>
        <MenuItem
          sx={{
            height: 40,
          }}
        >
          <Link
            href="/about"
            prefetch={false}
            style={{
              textDecoration: "none",
            }}
            onClick={handleClose}
          >
            <NoDecorationTypography>このサイトについて</NoDecorationTypography>
          </Link>
        </MenuItem>
        <MenuItem
          sx={{
            height: 40,
            justifyContent: "flex-end",
          }}
        >
          <Stack direction="row" justifyContent="space-between" flexGrow={1}>
          <Typography variant="body2" color="gray">
            version:
          </Typography>
          <Typography variant="body2" color="gray">
            {version}
          </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  )
}
