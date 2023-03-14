import theme from "@/theme";
import { HexagonOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function DefaultHeader() {
    return (
        <AppBar position='static'>
            <Toolbar>
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
            </Toolbar>
        </AppBar>
    );
}