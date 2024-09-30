import getStreamers from "../../firebase/server/streamers"
import StreamersTemplate from "./_Component/StreamersTemplate"

export default async function StreamersPage() {
  const streamers = await getStreamers()

  return <StreamersTemplate streamers={streamers} />
}
