import { Metadata } from "next"

import getClips from "@/firebase/server/clips"
import getStreamers from "@/firebase/server/streamers"
import generateTemplateMetadata from "@/utils/generateTemplateMetadata"

import StreamerClipPageTemplate from "./_Component/StreamerClipPageTemplate"

export async function generateStaticParams() {
  const streamers = await getStreamers()

  return streamers.slice(0, 100).map((streamer) => ({ id: streamer.id }))
}

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const id = params.id
  const clipDoc = await getClips(id)
  const streamerInfo = clipDoc.streamerInfo

  return generateTemplateMetadata({ caption: streamerInfo?.display_name })
}

export const revalidate = 3600 // 1hour

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const clipDoc = await getClips(id)

  return <StreamerClipPageTemplate clipDoc={clipDoc} />
}
