import { usersAtom } from "@/components/Atoms";
import { NoDecorationTypography } from "@/components/styledui";
import { Streamer } from "@/models/streamer";
import { Avatar, Box, Divider, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils"
import Link from "next/link";

function SkeletonItem() {
    return (
        <Box
            sx={{
                paddingY: 1,
            }}>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Skeleton variant="circular" width={40} height={40} />
                <NoDecorationTypography
                    variant="subtitle1"
                    noWrap
                >
                    <Skeleton width={150} />
                </NoDecorationTypography>
            </Stack>
        </Box>
    );
}

function StreamerListItem({
    streamer,
}: {
    streamer: Streamer,
}) {
    return (
        <Box
            sx={{
                paddingY: 1,
            }}>
            <Link
                href={"/streamer/" + streamer.id}
                style={{
                    textDecoration: 'none',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Avatar alt="top" src={streamer.profile_image_url} />
                    <NoDecorationTypography
                        variant="subtitle1"
                        noWrap
                    >
                        {streamer.display_name}
                    </NoDecorationTypography>
                </Stack>
            </Link>
        </Box>
    );
}

function StreamerList() {
    const streamersLoadableAtom = loadable(usersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);

    if (streamersValue.state === "hasData"
        && streamersValue.data != undefined) {
        return (
            <Box
                mt={6}
                mb={3}
                ml={3}
                mr={0}
                width={200}
                overflow="hidden"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant='subtitle1' color='grey'>
                        channels
                    </Typography>

                    <Link
                        href='/streamers'
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography
                            variant='overline'
                            textTransform='none'
                            color='grey'
                        >
                            all→
                        </Typography>
                    </Link>
                </Stack>
                <Divider />
                {streamersValue.data
                    .slice(0, 10)
                    .map((e, index) =>
                        <StreamerListItem streamer={e} key={index} />
                    )}
            </Box>
        );
    } else {
        return (
            <Box
                mt={6}
                mb={3}
                ml={3}
                mr={0}
                overflow="hidden"
            >
                <Typography variant='subtitle1' color='grey'>
                    channels
                </Typography>
                <Divider />
                {Array.from({ length: 10 }).map(
                    (e, index) => <SkeletonItem key={index} />
                )}
            </Box>
        );
    }
}

export default StreamerList;