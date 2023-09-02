'use client'
import { streamersAtom } from "@/components/Atoms";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import StreamerItem from "./StreamerItem";

export default function StreamerList() {
    //streamer info
    const streamersLoadableAtom = loadable(streamersAtom);
    const [streamersValue] = useAtom(streamersLoadableAtom);
    //component
    const loader = <Box key={0} sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
    </Box>;
    function endMessage(message: string) {
        return (
            <Box key={0} sx={{ m: 3, display: "flex", justifyContent: "center" }}>
                <Typography variant='inherit' color='gray'>
                    {message}
                </Typography>
            </Box>
        );
    }

    if (streamersValue.state == "hasError"
        || (streamersValue.state == "hasData"
            && streamersValue.data == undefined)) {
        return endMessage("error");
    } else if (streamersValue.state == "loading") {
        return loader;
    } else {
        return (
            <>
                {
                    streamersValue.data!
                        .map(
                            (streamer, index) =>
                                <StreamerItem key={index} streamer={streamer} />
                        )
                }
            </>
        );
    }
}
