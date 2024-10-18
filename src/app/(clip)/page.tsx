import getClips from "@/firebase/server/clips"
import { ClipPage } from "@/templates"

export default async function Home() {
  const clipDoc = await getClips("summary")

  return <ClipPage clipDoc={clipDoc} />
}
