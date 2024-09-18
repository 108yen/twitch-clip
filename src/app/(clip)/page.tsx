import ClipPageTemplate from "./_Component/ClipPageTemplate"
import getClips from "@/firebase/server/clips"

export default async function Home() {
  const clipDoc = await getClips("summary")

  return <ClipPageTemplate clipDoc={clipDoc} />
}
