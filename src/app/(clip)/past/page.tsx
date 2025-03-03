import { getClips } from "@/firebase/server"
import { ClipPage } from "@/ui/templates"

export default async function Page() {
  const clipDoc = await getClips("past_summary")

  return <ClipPage clipDoc={clipDoc} title="Past Ranking" />
}
