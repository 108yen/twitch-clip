import { Box, CircularProgress, Typography } from '@mui/material'

import { Streamer } from '@/models/streamer'

import StreamerItem from './StreamerItem'

export default function StreamerList(props: {
    streamers: Array<Streamer>
    fetchState: `hasData` | `hasError` | `loading`
}) {
    const { streamers, fetchState } = props
    //component
    const loader = (
        <Box key={0} sx={{ display: `flex`, justifyContent: `center` }}>
            <CircularProgress color='secondary' />
        </Box>
    )
    function endMessage(message: string) {
        return (
            <Box
                key={0}
                sx={{ m: 3, display: `flex`, justifyContent: `center` }}
            >
                <Typography variant='inherit' color='gray'>
                    {message}
                </Typography>
            </Box>
        )
    }

    if (fetchState == `hasError`) {
        return endMessage(`error`)
    } else if (fetchState == `loading`) {
        return loader
    } else {
        return (
            <>
                {streamers.map((streamer, index) => (
                    <StreamerItem key={index} streamer={streamer} />
                ))}
            </>
        )
    }
}
