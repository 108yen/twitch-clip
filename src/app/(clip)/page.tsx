import { getClips } from "@/firebase/server"
import { ClipPage } from "@/templates"

export default async function Page() {
  const clipDoc = await getClips("summary")

  return <ClipPage clipDoc={clipDoc} />
}
