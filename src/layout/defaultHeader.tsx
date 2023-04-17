import { NoDecorationTypography, PaperAppBar, SelectTypography } from "@/components/styledui";
import { HexagonOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, SxProps, Theme, Toolbar, Tooltip } from "@mui/material";
import Link from "next/link";
import NotificationMenu from "./notificationMenu";
import { MouseEventHandler, useEffect, useState } from "react";

export default function DefaultHeader() {
    const [isTransparent, setTransparent] = useState(true);
    function toggleTransparent() {
        window.scrollY == 0 ? setTransparent(true) : setTransparent(false);
    }

    const initStyle: SxProps<Theme> = {
        opacity: 0,
    };
    const [style, setStyle] = useState(initStyle);
    function handleOnMouseEnter(event: MouseEventHandler<HTMLAnchorElement>) {
        const { top, bottom, left, right, width, height } = event.currentTarget.getBoundingClientRect();
        // console.log(left);
        setStyle({
            opacity: 1,
            left: left,
            width: width,
            height: height,
            background: "grey",
        });
    }
    function handleOnMouseLeave(event: MouseEventHandler<HTMLAnchorElement>) {
        setStyle({
            opacity: 0,
        });
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
                            sx={{
                                display: { xs: 'none', sm: 'flex' },
                                // ">:nth-of-type(1)": {
                                //     bgcolor: 'red',
                                //     transitionDuration: '1s',
                                // }
                            }}
                        >
                            <Box
                                sx={{
                                    transitionDuration: "0.3s",
                                    position: 'absolute',
                                    zIndex: -1,
                                    borderRadius: 1,
                                    ...style
                                }}
                            />
                            <Box
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                sx={{ paddingX: 1 }}
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
                            </Box>

                            <Box
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                sx={{ paddingX: 1 }}
                            >
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
                            </Box>
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