import { currentStreamerIdAtom } from "@/components/Atoms";
import DefaultHeader from "@/layout/defaultHeader";
import { useAtom } from "jotai";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { Clip } from "@/components/types";
import { ClipListLayout } from "@/layout/clipListLayout";
import { ClipViewLayout } from "@/layout/clipViewLayout";

export default function PastRanking() {
    const title = "Twitchクリップランキング | 過去ランキング";
    const description = "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。";
    //set clicked clip
    const [currentClip, setCurrentClip] = useState<Clip | undefined>();
    function handleSetClip(clip: Clip) {
        setIsViewLayout(true);
        setCurrentClip(clip);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const [, setCurrentStreamerId] = useAtom(currentStreamerIdAtom);

    useEffect(() => {
        setCurrentStreamerId('past_summary');
    }, []);

    //to return listview from view layout
    const [isViewLayout, setIsViewLayout] = useState(false);
    function returnListView() {
        setCurrentClip(undefined);
        setIsViewLayout(false);
    }
    useEffect(() => {
        if (isViewLayout) {
            history.pushState(null, '', null);
            window.addEventListener('popstate', returnListView, false);
        }
        return () => {
            window.removeEventListener('popstate', returnListView, false);
        };
    }, [isViewLayout]);

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: "https://www.twitchclipsranking.com/",
                    title: title,
                    description: description,
                    images: [
                        {
                            url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                url="https://www.twitchclipsranking.com/"
                title={title}
                images={["https://www.twitchclipsranking.com/android-chrome-512x512.png"]}
                datePublished="20230312"
                dateModified="20230312"
                authorName="108yen"
                publisherName="108yen"
                publisherLogo=""
                description={description}
            />
            <DefaultHeader />
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