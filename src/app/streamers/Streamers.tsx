'use client'
import { streamersAtom } from "@/components/Atoms";
import { Box, Typography, Divider, Grid, TextField, InputAdornment, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import StreamerList from "./_Component/StreamerList";
import { useState } from "react";

export default function Streamers() {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    // search
    const [searchText, setSearchText] = useState<string>('');
    const filteredStreamer = streamersValue.state === "hasData"
        ? streamersValue.data!
            .filter(streamer => {
                return streamer.display_name?.includes(searchText)
                    || streamer.login?.includes(searchText);
            })
        : [];
    const channelNum = filteredStreamer.length;

    function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value);
    }

    return (
        <>
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid item xs={12} md={9}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        marginX={{ xs: 0, sm: 1 }}
                        mt={{ xs: 2, sm: 5 }}
                        overflow="hidden"
                    >
                        <TextField
                            id="search-text-field"
                            placeholder="search"
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color='action' />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            fullWidth
                            margin="normal"
                            color="secondary"
                            size="small"
                            value={searchText}
                            onChange={handleSearchTextChange}
                            sx={{
                                marginY: 0,
                            }}
                        />
                        <Typography
                            mr={2}
                            variant="h5"
                            color="secondary"
                            textAlign="end"
                            minWidth={150}
                        >
                            {`${channelNum} channels`}
                        </Typography>
                    </Stack>
                    <Divider
                        sx={{
                            marginX: { xs: 0, sm: 1 },
                        }}
                    />
                    <StreamerList
                        streamers={filteredStreamer}
                        fetchState={streamersValue.state}
                    />
                </Grid>
            </Grid >
        </>
    );
}