import { User } from "@/components/types";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function StreamerCard({
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
        </Box>
    );
}

function StreamerCards({
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
        // paddingY={3}
        // sx={{ flexGrow: 1 }}
        >
            <Typography variant='subtitle1' color='grey'>
                ストリーマー
            </Typography>
            <Divider />
            {streamers.map((e, index) =>
                <StreamerCard streamer={e} key={index} />
            )}
        </Box>
    );
}

export default StreamerCards;