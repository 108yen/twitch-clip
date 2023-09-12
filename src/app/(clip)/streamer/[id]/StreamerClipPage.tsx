'use client'
import { currentStreamerAtom, currentStreamerIdAtom } from "@/components/Atoms";
import { ClipListLayout } from "@/app/(clip)/_Component/clipListLayout";
import { ClipViewLayout } from "@/app/(clip)/_Component/clipViewLayout";
import StreamerCard from "@/app/(clip)/streamer/[id]/_Component/streamerCard";
import { Clip } from "@/models/clip";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { useEffect, useState } from "react";

export default function StreamerClipPage(props: { id: string }) {
    const id = props.id;
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>();
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip);
    }
    //for set title
    const currentStreamerLoadableAtom = loadable(currentStreamerAtom);
    const [currentStreamerValue] = useAtom(currentStreamerLoadableAtom);
    //for set id
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);
    //to return listview from view layout
    function returnListView() {
        setCurrentClip(undefined);
    }
    useEffect(() => {
        setCurrentStreamerId(id);

        history.pushState(null, '', null);
        window.addEventListener('popstate', returnListView, false);
        return () => {
            window.removeEventListener('popstate', returnListView, false);
        };
    }, []);

    return (
        <>
            {
                currentClip === undefined
                    ? <Grid
                        container
                        justifyContent='center'
                        paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
                    >
                        <Grid item xs={12} md={9}>
                            <StreamerCard />
                        </Grid>
                    </Grid>
                    : null
            }
            {
                currentClip === undefined
                    ? <ClipListLayout
                        setClickedClip={handleSetClip}
                    />
                    : <ClipViewLayout
                        currentClip={currentClip!}
                        setClickedClip={handleSetClip}
                    />
            }
        </>
    );

}