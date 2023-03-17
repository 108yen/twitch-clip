import { User } from "@/components/types";
import theme from "@/theme";
import { Launch } from "@mui/icons-material";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";

function StreamerCard({
    streamer,
}: {
    streamer: User,
}) {
    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Paper
                sx={{
                    p: 2,
                    overflow: 'hidden',
                    maxWidth: 700,
                    minWidth: { xs: 400, md: 600, },
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Link
                            href={"/streamer/" + streamer.id}
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Avatar src={streamer.profile_image_url} />
                        </Link>
                        <Typography
                            variant="subtitle1"
                            noWrap
                        >
                            {streamer.display_name}
                        </Typography>
                    </Stack>

                    <Link
                        href={"https://www.twitch.tv/" + streamer.login}
                        target='_blank'
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Typography
                                variant="body2"
                            >
                                Twitch
                            </Typography>
                            <Launch fontSize="small" />
                        </Stack>
                    </Link>
                </Stack>
                <Stack
                    ml={6}
                    spacing={0}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Typography
                        variant="body2"
                        color="gray"
                    >
                        {streamer.description}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}

export default StreamerCard;