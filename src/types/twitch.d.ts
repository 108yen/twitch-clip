declare module "https://player.twitch.tv/js/embed/v1.js" {
  interface PlayerOptions {
    autoplay?: boolean
    height: number | string
    muted?: boolean
    parent: string[]
    time?: string
    video: string
    width: number | string
  }

  interface PlaybackStats {
    backendVersion: string
    bufferSize: number
    codecs: string
    displayResolution: string
    fps: number
    hlsLatencyBroadcaster: number
    playbackRate: number
    skippedFrames: number
    videoResolution: string
  }

  class Player {
    constructor(id: string, options: PlayerOptions): void

    disableCaptions(): void
    enableCaptions(): void
    getChannel(): string
    getCurrentTime(): number
    getDuration(): number
    getEnded(): boolean
    getMuted(): boolean
    getPlaybackStats(): PlaybackStats
    getQualities(): string[]
    getQuality(): string
    getVideo(): string
    getVolume(): number
    isPaused(): boolean
    pause(): void
    play(): void
    seek(timestamp: number): void
    setChannel(channel: string): void
    setCollection(collectionID: string, videoID: string): void
    setMuted(muted: boolean): void
    setQuality(quality: string): void
    setVideo(videoID: string, timestamp: number): void
    setVolume(volumelevel: number): void
  }

  export const Twitch = {
    Player: Player,
  }
}
