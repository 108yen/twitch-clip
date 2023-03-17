import { User } from "@/components/types";
import theme from "@/theme";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";

function StreamerListItem({
    streamer,
    key,
}: {
    streamer: User,
    key: number
}) {
    return (
        <Box
            key={key}
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

function StreamerList({
    streamers
}: {
    streamers: Array<User>
}) {
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
            {streamers.map((e, index) =>
                <StreamerListItem streamer={e} key={index} />
            )}
        </Box>
    );
}

export default StreamerList;