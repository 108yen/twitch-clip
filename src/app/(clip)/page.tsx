import getClips from "../../firebase/server/clips"

import ClipPageTemplate from "./_Component/ClipPageTemplate"

export const revalidate = 3600 // 1hour

export default async function Home() {
  const clipDoc = await getClips("summary")

  return <ClipPageTemplate clipDoc={clipDoc} />
}
