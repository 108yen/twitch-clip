import { currentStreamerIdAtom } from '@/components/Atoms';
import { useAtom } from 'jotai';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import DefaultHeader from '@/layout/defaultHeader';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import { Clip } from '@/components/types';
import { ClipViewLayout } from '@/layout/clipViewLayout';
import { ClipListLayout } from '@/layout/clipListLayout';

export default function Home() {
  const title = "Twitchクリップランキング";
  const description = "Twitch(ツイッチ)クリップの再生数ランキング。※すべての配信者の集計ではありません。";
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
  
  useEffect(() => {
    setCurrentStreamerId('summary');
  }, []);

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
