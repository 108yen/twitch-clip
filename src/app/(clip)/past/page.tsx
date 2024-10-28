import { getClips } from "@/firebase/server"
import { ClipPage } from "@/templates"

export default async function PastRanking() {
  const clipDoc = await getClips("past_summary")

  return <ClipPage clipDoc={clipDoc} />
}
