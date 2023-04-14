import { NoDecorationTypography, PaperAppBar, SelectTypography } from "@/components/styledui";
import { HexagonOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, Toolbar, Tooltip } from "@mui/material";
import Link from "next/link";
import NotificationMenu from "./notificationMenu";
import { useEffect, useState } from "react";

export default function DefaultHeader() {
    const [isTransparent, setTransparent] = useState(true);
    function toggleTransparent() {
        window.scrollY == 0 ? setTransparent(true) : setTransparent(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleTransparent);
        return () => window.removeEventListener("scroll", toggleTransparent);
    }, []);

    return (
        <PaperAppBar
            position='sticky'
            isTransparent={isTransparent}
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
                        <Divider
                            orientation="vertical"
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                marginX: 3,
                            }}
                        />
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
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
                                    <SelectTypography
                                        variant="body1"
                                        noWrap
                                    >
                                        Past ranking
                                    </SelectTypography>
                                </Tooltip>
                            </Link>
                            <Link
                                href='/streamers'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Tooltip title="チャンネル一覧">
                                    <SelectTypography
                                        variant="body1"
                                        noWrap
                                    >
                                        Channels
                                    </SelectTypography>
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
        </PaperAppBar>
    );
}