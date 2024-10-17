import getClips from "@/firebase/server/clips"
import { ClipPage } from "@/templates"

export default async function PastRanking() {
  const clipDoc = await getClips("daily")

  return <ClipPage clipDoc={clipDoc} />
}
