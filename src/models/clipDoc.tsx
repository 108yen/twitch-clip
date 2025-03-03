import { Clip } from "./clip"
import { Streamer } from "./streamer"

export interface ClipDoc {
  [key: string]: Array<Clip> | Streamer | undefined
  streamerInfo?: Streamer
}
