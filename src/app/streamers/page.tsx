import { getStreamers } from "@/firebase/server"
import { Streamers } from "@/ui/templates"

export default async function Page() {
  const streamers = await getStreamers()

  return <Streamers streamers={streamers} />
}
