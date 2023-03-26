import { NoDecorationTypography } from "@/components/styledui";
import { HexagonOutlined } from "@mui/icons-material";
import { AppBar, Box, Stack,  Toolbar } from "@mui/material";
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
                                twitch clip ranking
                            </NoDecorationTypography>
                        </Link>
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