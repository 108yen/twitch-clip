'use client'
import { currentStreamerIdAtom } from "@/components/Atoms";
import { ClipListLayout } from "@/layout/clipListLayout";
import { ClipViewLayout } from "@/layout/clipViewLayout";
import DefaultHeader from "@/layout/defaultHeader";
import { Clip } from "@/models/clip";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Home() {
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>();
    function handleSetClip(clip: Clip) {
        setCurrentClip(clip);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);
    //to return listview from view layout
    function returnListView() {
        setCurrentClip(undefined);
    }

    useEffect(() => {
        setCurrentStreamerId('summary');

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