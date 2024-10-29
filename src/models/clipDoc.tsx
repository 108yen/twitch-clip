import { Clip } from "./clip"
import { Streamer } from "./streamer"

export class ClipDoc {
  [key: string]: Array<Clip> | Streamer | undefined
  streamerInfo?: Streamer

  constructor(partial?: Partial<ClipDoc>) {
    Object.assign(this, partial)
  }
}
