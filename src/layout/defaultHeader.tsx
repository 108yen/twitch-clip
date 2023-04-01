import { NoDecorationTypography } from "@/components/styledui";
import { HexagonOutlined } from "@mui/icons-material";
import { AppBar, Box, Stack, Toolbar, Tooltip } from "@mui/material";
import Link from "next/link";
import NotificationMenu from "./notificationMenu";

export default function DefaultHeader() {
    return (
        <AppBar
            position='sticky'
            sx={{
                boxShadow: 0,
            }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexGrow={1}
                >
                    <Stack direction="row">
                        <HexagonOutlined
                            color='secondary'
                            fontSize='large'
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                mr: 1
                            }}
                        />
                        <Link
                            href='/'
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <NoDecorationTypography
                                variant="h5"
                                noWrap
                            >
                                Twitch clip ranking
                            </NoDecorationTypography>
                        </Link>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            marginX={5}
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        >
                            <Link
                                href='/past'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Tooltip title="過去の年別ランキング">
                                    <NoDecorationTypography
                                        variant="body1"
                                        noWrap
                                    >
                                        Past ranking
                                    </NoDecorationTypography>
                                </Tooltip>
                            </Link>
                            <Link
                                href='/streamers'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Tooltip title="チャンネル一覧">
                                    <NoDecorationTypography
                                        variant="body1"
                                        noWrap
                                    >
                                        Channels
                                    </NoDecorationTypography>
                                </Tooltip>
                            </Link>
                        </Stack>
                    </Stack>
                    <Box
                        sx={{ flexGrow: 1 }}
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    />
                    <NotificationMenu />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}