import { Streamers } from "@/templates"

import getStreamers from "../../firebase/server/streamers"

export default async function StreamersPage() {
  const streamers = await getStreamers()

  return <Streamers streamers={streamers} />
}
