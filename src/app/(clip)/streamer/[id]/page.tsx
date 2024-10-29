import { STREAMERS } from "@/constant/streamers"
import { unstable_getClips } from "@/firebase/server"
import { StreamerClipPage } from "@/templates"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { Metadata } from "next"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const streamer = STREAMERS.find(({ id: _id }) => _id == id)

  if (!streamer) {
    return generateTemplateMetadata({ caption: "****" })
  }

  return generateTemplateMetadata({ caption: streamer.display_name })
}

export default async function Page({ params }: Props) {
  const { id } = params

  const clipDoc = await unstable_getClips(id)

  return <StreamerClipPage clipDoc={clipDoc} />
}
