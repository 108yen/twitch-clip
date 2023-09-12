'use client'
import { currentStreamerIdAtom } from "@/components/Atoms";
import { ClipListLayout } from "@/app/(clip)/_Component/clipListLayout";
import { ClipViewLayout } from "@/app/(clip)/_Component/clipViewLayout";
import { Clip } from "@/models/clip";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

export default function SummaryClipPageTemplate(props: { id: string }) {
    const { id } = props;
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>();
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip);
    }

    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);

    useEffect(() => {
        setCurrentStreamerId(id);
    }, []);

    //to return listview from view layout
    function returnListView() {
        setCurrentClip(undefined);
    }
    useEffect(() => {
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