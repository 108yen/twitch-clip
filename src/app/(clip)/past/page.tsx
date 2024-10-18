import getClips from "@/firebase/server/clips"
import { ClipPage } from "@/templates"

export default async function PastRanking() {
  const clipDoc = await getClips("past_summary")

  return <ClipPage clipDoc={clipDoc} />
}
