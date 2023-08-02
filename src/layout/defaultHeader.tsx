import { Div, NoDecorationTypography, PaperAppBar } from "@/components/styledui";
import { HexagonOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, SxProps, Theme, Toolbar, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import NotificationMenu from "./notificationMenu";
import { useEffect, useState } from "react";

export default function DefaultHeader() {
    const [isTransparent, setTransparent] = useState<boolean>(true);
    function toggleTransparent() {
        window.scrollY == 0 ? setTransparent(true) : setTransparent(false);
    }

    const initStyle: SxProps<Theme> = {
        opacity: 0,
    };
    const [style, setStyle] = useState<SxProps<Theme>>(initStyle);
    function handleOnMouseEnter(event: React.MouseEvent) {
        const { top, bottom, left, right, width, height } = event.currentTarget.getBoundingClientRect();
        // console.log(left);
        setStyle({
            opacity: 1,
            left: left,
            width: width,
            height: height,
            background: (theme) => theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
        });
    }
    function handleOnMouseLeave(event: React.MouseEvent) {
        setStyle(initStyle);
    }
    function LinkButton({
        href,
        tooltip,
        title
    }: {
        href: string,
        tooltip: string,
        title: string,
    }) {
        return (
            <Div
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                sx={{
                    paddingX: 2,
                    paddingY: 0.5,
                    transitionDuration: "0.3s",
                    color: (theme) => theme.palette.text.disabled,
                    "&:hover": {
                        color: (theme) => theme.palette.text.primary,
                    },
                }}
            >
                <Link
                    href={href}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <Tooltip title={tooltip}>
                        <Typography
                            variant="body1"
                            noWrap
                        >
                            {title}
                        </Typography>
                    </Tooltip>
                </Link>
            </Div>
        );
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleTransparent);
        return () => window.removeEventListener("scroll", toggleTransparent);
    }, []);

    return (
        <PaperAppBar
            position='sticky'
            istransparent={isTransparent}
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
                            {/* <LinkButton href='/' tooltip='ページトップ' title='Top' /> */}
                            <Div
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                sx={{
                                    paddingX: 2,
                                    paddingY: 0.5,
                                    transitionDuration: "0.3s",
                                    color: (theme) => theme.palette.text.disabled,
                                    "&:hover": {
                                        color: (theme) => theme.palette.text.primary,
                                    },
                                }}
                            >
                                <Link
                                    href='/'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <Tooltip title="ページトップ">
                                        <Typography
                                            variant="body1"
                                            noWrap
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
                                    transitionDuration: "0.3s",
                                    color: (theme) => theme.palette.text.disabled,
                                    "&:hover": {
                                        color: (theme) => theme.palette.text.primary,
                                    },
                                }}
                            >
                                <Link
                                    href='/past'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <Tooltip title="過去の年別ランキング">
                                        <Typography
                                            variant="body1"
                                            noWrap
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
                                    transitionDuration: "0.3s",
                                    color: (theme) => theme.palette.text.disabled,
                                    "&:hover": {
                                        color: (theme) => theme.palette.text.primary,
                                    },
                                }}
                            >
                                <Link
                                    href='/streamers'
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <Tooltip title="チャンネル一覧">
                                        <Typography
                                            variant="body1"
                                            noWrap
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
                            });
                        }}
                    />
                    <NotificationMenu />
                </Stack>
            </Toolbar>
        </PaperAppBar>
    );
}