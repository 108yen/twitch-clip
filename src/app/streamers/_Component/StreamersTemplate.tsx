'use client'
import { Divider, Grid } from '@mui/material'
import { useState } from 'react'

import { Streamer } from '../../../models/streamer'

import StreamerList from './molecules/StreamerList'
import StreamersPageHeader from './molecules/streamersPageHeader'

export default function StreamersTemplate(props: {
    streamers: Array<Streamer>
}) {
    const { streamers } = props
    // search
    const [searchText, setSearchText] = useState<string>(``)
    const filteredStreamer = streamers.filter((streamer) => {
        return (
            streamer.display_name?.includes(searchText) ||
            streamer.login?.includes(searchText)
        )
    })
    const channelNum = filteredStreamer.length

    function handleSearchTextChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setSearchText(event.target.value)
    }

    return (
        <>
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid item xs={12} md={9}>
                    <StreamersPageHeader
                        searchText={searchText}
                        handleSearchTextChange={handleSearchTextChange}
                        channelNum={channelNum}
                    />
                    <Divider
                        sx={{
                            marginX: { xs: 0, sm: 1 }
                        }}
                    />
                    <StreamerList streamers={filteredStreamer} />
                </Grid>
            </Grid>
        </>
    )
}
