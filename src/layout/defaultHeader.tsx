import { HexagonOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";

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
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    twitch clip ranking
                </Typography>
            </Toolbar>
        </AppBar>
    );
}