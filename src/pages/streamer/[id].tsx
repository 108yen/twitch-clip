import { currentStreamerAtom, currentStreamerIdAtom } from "@/components/Atoms";
import DefaultHeader from "@/layout/defaultHeader";
import StreamerList from "@/layout/streamerList";
import { Grid, } from "@mui/material";
import { useAtom } from "jotai";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StreamerCard from "@/layout/streamerCard";
import { loadable } from "jotai/utils";
import MainClipCard from "@/layout/mainClipCard";
import { Clip } from "@/components/types";
import { ClipListLayout } from "@/layout/clipListLayout";
import { ClipViewLayout } from "@/layout/clipViewLayout";

export default function StreamerClip() {
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
  //for get url id
  const router = useRouter();
  const { id } = router.query;
  const streamerId = isString(id) ? id as string : "summary";

  function isString(value: string | string[] | undefined): boolean {
    return typeof value === "string";
  }

  useEffect(() => {
    if (router.isReady) {
      setCurrentStreamerId(streamerId);
    }
  }, [router]);

  const display_name = currentStreamerValue.state === "hasData"
    ? currentStreamerValue.data?.display_name
    : "no data";
  const title = "Twitchクリップランキング | " + display_name;
  const description = display_name + "のTwitch(ツイッチ)クリップの再生数ランキング。";

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