import getClips from "../../../firebase/server/clips"
import ClipPageTemplate from "../_Component/ClipPageTemplate"

export const revalidate = 3600 // 1hour

export default async function PastRanking() {
  const clipDoc = await getClips("past_summary")

  return <ClipPageTemplate clipDoc={clipDoc} />
}
