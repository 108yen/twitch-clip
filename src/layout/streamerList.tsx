import { usersAtom } from "@/components/Atoms";
import { User } from "@/components/types";
import theme from "@/theme";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils"
import Link from "next/link";

function StreamerListItem({
    streamer,
}: {
    streamer: User,
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
                    color: theme.palette.text.primary,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Avatar src={streamer.profile_image_url} />
                    <Stack
                        ml={1}
                        spacing={0}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="subtitle1"
                            noWrap
                        >
                            {streamer.display_name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="gray"
                            noWrap
                        >
                            {streamer.description}
                        </Typography>
                    </Stack>
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
                overflow="hidden"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant='subtitle1' color='grey'>
                        ストリーマー
                    </Typography>

                    <Link
                        href='/streamers'
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography
                            variant='overline'
                            color='grey'
                        >
                            一覧
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
                    ストリーマー
                </Typography>
                <Divider />
                {/*
                //todo:skeleton
                 {streamersValue.data.map((e, index) =>
                    <StreamerListItem streamer={e} key={index} />
                )} */}
            </Box>
        );
    }
}

export default StreamerList;