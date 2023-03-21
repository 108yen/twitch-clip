import { currentStreamerAtom } from "@/components/Atoms";
import theme from "@/theme";
import { Launch } from "@mui/icons-material";
import { Avatar, Box, Paper, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Link from "next/link";

function StreamerCard() {
    const currentStreamerLoadableAtom = loadable(currentStreamerAtom);
    const [currentStreamerValue] = useAtom(currentStreamerLoadableAtom);

    if (currentStreamerValue.state === "hasData"
        && currentStreamerValue.data != undefined) {
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
                        boxShadow: 0,
                        border: "1px solid",
                        borderColor: theme.palette.secondary.main,
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
                                href={"/streamer/" + currentStreamerValue.data.id}
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                <Avatar src={currentStreamerValue.data.profile_image_url} />
                            </Link>
                            <Typography
                                variant="subtitle1"
                                noWrap
                            >
                                {currentStreamerValue.data.display_name}
                            </Typography>
                        </Stack>

                        <Link
                            href={"https://www.twitch.tv/" + currentStreamerValue.data.login}
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
                            {currentStreamerValue.data.description}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        );
    }
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
                        <Skeleton variant="circular" width={40} height={40} />
                        <Typography
                            variant="subtitle1"
                            noWrap
                        >
                            <Skeleton width={150} />
                        </Typography>
                    </Stack>

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
                    >
                        <Skeleton width={350} />
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}

export default StreamerCard;