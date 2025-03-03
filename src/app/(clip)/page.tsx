import { getClips } from "@/firebase/server"
import { ClipPage } from "@/ui/templates"

export default async function Page() {
  const clipDoc = await getClips("summary")

  return <ClipPage clipDoc={clipDoc} title="Trend Ranking" />
}
