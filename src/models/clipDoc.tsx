import { Clip } from "./clip"
import { Streamer } from "./streamer"

export class ClipDoc {
  streamerInfo?: Streamer;
  [key: string]: Array<Clip> | Streamer | undefined

  constructor(partial?: Partial<ClipDoc>) {
    Object.assign(this, partial)
  }
}
