import theme from "@/theme";
import { HexagonOutlined } from "@mui/icons-material";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import NotificationMenu from "./notificationMenu";

export default function DefaultHeader() {
    return (
        <AppBar
            position='sticky'
            sx={{
                boxShadow: 0,
            }}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
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
                            <Typography
                                variant="h5"
                                component="div"
                                noWrap
                                sx={{
                                    flexGrow: 1,
                                    color: theme.palette.text.primary,
                                    textDecoration: 'none',
                                }}
                            >
                                twitch clip ranking
                            </Typography>
                        </Link>
                    </Stack>
                    <NotificationMenu />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}