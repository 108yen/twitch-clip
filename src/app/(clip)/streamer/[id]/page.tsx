import getClips from "@/firebase/server/clips"
import getStreamers from "@/firebase/server/streamers"
import { StreamerClipPage } from "@/templates"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { Metadata } from "next"

export async function generateStaticParams() {
  if (process.env.VERCEL_ENV != "production") return []

  const streamers = await getStreamers()
  return streamers.slice(0, 100).map((streamer) => ({ id: streamer.id }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const id = params.id
  const clipDoc = await getClips(id)
  const streamerInfo = clipDoc.streamerInfo

  return generateTemplateMetadata({ caption: streamerInfo?.display_name })
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const clipDoc = await getClips(id)

  return <StreamerClipPage clipDoc={clipDoc} />
}
