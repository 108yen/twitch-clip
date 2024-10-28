import { unstable_getClips } from "@/firebase/server"
import { StreamerClipPage } from "@/templates"
import generateTemplateMetadata from "@/utils/generate-template-metadata"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const id = params.id
  const clipDoc = await unstable_getClips(id)
  const streamerInfo = clipDoc.streamerInfo

  return generateTemplateMetadata({ caption: streamerInfo?.display_name })
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const clipDoc = await unstable_getClips(id)

  return <StreamerClipPage clipDoc={clipDoc} />
}
