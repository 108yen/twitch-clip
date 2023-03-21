import { Box, IconButton, Menu, MenuItem, Switch, ToggleButton, Typography, useMediaQuery } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import Link from "next/link";
import { NoDecorationTypography } from "@/components/styledui";
import { useAtom } from "jotai";
import { isDarkModeAtom } from "@/components/Atoms";

export default function NotificationMenu() {
    //darkmode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
        noSsr: true,
    });
    const [isSetDarkMode,setIsDarkMode] = useAtom(isDarkModeAtom);
    const isDarkMode = isSetDarkMode == undefined ? prefersDarkMode : isSetDarkMode;
    function handleSwitchChange() {
        setIsDarkMode(!isDarkMode);
    }
    //menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
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
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography>
                        mode
                    </Typography>
                    <Switch
                        checked={isDarkMode}
                        onChange={handleSwitchChange}
                        color="secondary"
                    />
                </MenuItem>
                <MenuItem>
                    <Link
                        href='/streamers'
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <NoDecorationTypography>
                            ストリーマー一覧
                        </NoDecorationTypography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        href='/about'
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <NoDecorationTypography>
                            このサイトについて
                        </NoDecorationTypography>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
}