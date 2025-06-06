import { getClips } from "@/firebase/server"
import { ClipPage } from "@/ui/templates"

export default async function Page() {
  const clipDoc = await getClips("daily")

  return <ClipPage clipDoc={clipDoc} title="Daily Ranking" />
}
