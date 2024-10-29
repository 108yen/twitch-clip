import { getStreamers } from "@/firebase/server"
import { Streamers } from "@/templates"

export default async function StreamersPage() {
  const streamers = await getStreamers()

  return <Streamers streamers={streamers} />
}
