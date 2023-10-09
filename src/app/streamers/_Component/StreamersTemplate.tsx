'use client'
import { Divider, Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { useState } from 'react'

import { streamersAtom } from '@/components/Atoms'

import StreamerList from './molecules/StreamerList'
import StreamersPageHeader from './molecules/streamersPageHeader'

export default function StreamersTemplate() {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom)
    const [streamersValue] = useAtom(streamersLoadableAtom)
    // search
    const [searchText, setSearchText] = useState<string>(``)
    const filteredStreamer =
        streamersValue.state === `hasData`
            ? streamersValue.data!.filter((streamer) => {
                  return (
                      streamer.display_name?.includes(searchText) ||
                      streamer.login?.includes(searchText)
                  )
              })
            : []
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
                    <StreamerList
                        streamers={filteredStreamer}
                        fetchState={streamersValue.state}
                    />
                </Grid>
            </Grid>
        </>
    )
}
