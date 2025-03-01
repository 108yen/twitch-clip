import { STREAMERS } from "@/constant/streamers"
import { unstable_getClips } from "@/firebase/server"
import { StreamerClipPage } from "@/ui/templates"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { id } = params

  const streamer = STREAMERS.find(({ id: _id }) => _id == id)

  if (!streamer) {
    return generateTemplateMetadata({ caption: "unkonow" })
  }

  return generateTemplateMetadata({ caption: streamer.display_name })
}

export default async function Page(props: Props) {
  const params = await props.params
  const { id } = params

  const clipDoc = await unstable_getClips(id)

  const title = clipDoc.streamerInfo?.display_name ?? "unkonow"

  return (
    <>
      <title>{`${title} | Twitchクリップランキング`}</title>
      <meta
        content={`${title}のTwitch(ツイッチ)クリップの再生数ランキング。`}
        property="description"
      />

      <StreamerClipPage clipDoc={clipDoc} />
    </>
  )
}
