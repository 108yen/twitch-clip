import StreamerItem from "./StreamerItem"
import { Streamer } from "@/models/streamer"

export default function StreamerList(props: { streamers: Array<Streamer> }) {
  const { streamers } = props

  return (
    <>
      {streamers.map((streamer, index) => (
        <StreamerItem key={index} streamer={streamer} />
      ))}
    </>
  )
}
