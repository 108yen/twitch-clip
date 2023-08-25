import { Grid } from "@mui/material";
import MainClipCard from "./mainClipCard";
import StreamerList from "./streamerList";
import { Clip } from "@/models/clip";

export function ClipListLayout({
    setClickedClip,
}: {
    setClickedClip:(clip:Clip)=>void,
}) {
    return (
        <Grid
            container
            justifyContent='center'
            paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
        >
            <Grid item zeroMinWidth xs={12} md={9}>
                <MainClipCard
                    setClickedClipUrl={setClickedClip}
                />
            </Grid>
            <Grid item zeroMinWidth xs={3} display={{ xs: 'none', md: 'flex' }}>
                <StreamerList />
            </Grid>
        </Grid>
    );
}