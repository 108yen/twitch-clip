'use client'
import { currentStreamerAtom, currentStreamerIdAtom } from "@/components/Atoms";
import { ClipListLayout } from "@/layout/clipListLayout";
import { ClipViewLayout } from "@/layout/clipViewLayout";
import StreamerCard from "@/layout/streamerCard";
import { Clip } from "@/models/clip";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import { Metadata, ResolvingMetadata } from "next";
import { useEffect, useState } from "react";

//todo use clientを使わない
// export async function generateMetadata(
//     params: { id: string },
//     parent: ResolvingMetadata,
// ): Promise<Metadata> {
//     const id = params.id;

//     return {
//         title: id,
//         description: id + 'のTwitch(ツイッチ)クリップの再生数ランキング。',
//     }
// }

export default function StreamerClipPage({
    params
}: {
    params: { id: string },
}) {
    const id = params.id;


    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>();
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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