import "dotenv/config"
import { Clip } from "@/models/clip"
import { ClipDoc } from "@/models/clipDoc"
import { Streamer } from "@/models/streamer"
import * as p from "@clack/prompts"

import { getDB } from "./db"
import { getClip, getStreamers, updateClip } from "./firestore-repositories"

function omitObject<Y extends Record<string, any>, M extends keyof Y>(
  obj: Y,
  keys: M[] | readonly M[],
): Omit<Y, M> {
  if (!keys.length) return obj

  const result: Record<string, any> = {}

  Object.keys(obj).forEach((key) => {
    if (keys.includes(key as M)) return

    result[key] = obj[key]
  })

  return result as Omit<Y, M>
}

async function mergeStreamerTeams(clipDoc: ClipDoc, streamer: Streamer) {
  const resultClipDoc: ClipDoc = {}

  const computedClipDoc = omitObject(clipDoc, ["streamerInfo"])

  const computedTeams =
    streamer.teams?.map(({ display_name, name }) => ({
      display_name,
      name,
    })) ?? []

  for (const key of Object.keys(computedClipDoc)) {
    const clips = computedClipDoc[key] as Clip[]

    const computedClips = clips.map((clip) => ({
      ...clip,
      teams: computedTeams,
    }))

    resultClipDoc[key] = computedClips
  }

  return resultClipDoc
}

async function mergeTeams(clipDoc: ClipDoc, streamers: Streamer[]) {
  const resultClipDoc: ClipDoc = {}

  const computedClipDoc = omitObject(clipDoc, ["streamerInfo"])

  function computedTeams(broadcasterId?: string) {
    if (!broadcasterId) return []

    const streamer = streamers.find(({ id }) => id == broadcasterId)

    const teams =
      streamer?.teams?.map(({ display_name, name }) => ({
        display_name,
        name,
      })) ?? []

    return teams
  }

  for (const key of Object.keys(computedClipDoc)) {
    const clips = computedClipDoc[key] as Clip[]

    const computedClips = clips.map((clip) => ({
      ...clip,
      teams: computedTeams(clip.broadcaster_id),
    }))

    resultClipDoc[key] = computedClips
  }

  return resultClipDoc
}

/**
 * This script is to add teams data in clip document of firestore emulator.
 * It will get teams data from firestore emulator and store teams data to each clips.
 *
 */
async function main() {
  p.intro("Start updating teams data in each clips.")

  const s = p.spinner()

  try {
    s.start("Connecting firestore emulator.")
    const db = getDB()
    s.stop("Connected firestore emulator.")

    s.start("Get streamers from firestore emulator.")
    const streamers = await getStreamers(db)
    s.stop("Complete get streamers.")

    if (!streamers) {
      p.cancel("Streamers is undefined.")
      return
    }

    s.start("Updating each streamers clips.")
    for (const streamer of streamers) {
      s.message(`Updating ${streamer.display_name} clips.`)

      const clipDoc = await getClip(db, streamer.id)
      if (!clipDoc) break

      const computedClipDoc = await mergeStreamerTeams(clipDoc, streamer)

      s.message(`Updated ${streamer.display_name} clips.`)

      await updateClip(db, streamer.id, computedClipDoc)

      s.message(`Stored ${streamer.display_name} clips.`)
    }
    s.stop("Updated each streamers clips.")

    for (const doc of ["summary", "past_summary", "daily"]) {
      s.start(`Updating ${doc} clips.`)
      const clipDoc = await getClip(db, doc)
      if (!clipDoc) {
        p.cancel(`${doc} clipDoc is undefined.`)
        return
      }

      const computedClipDoc = await mergeTeams(clipDoc, streamers)

      await updateClip(db, doc, computedClipDoc)

      s.stop(`Updated ${doc} clips.`)
    }
  } catch (error) {
    s.stop("An error occurred", 500)

    p.cancel(error instanceof Error ? error.message : "Message is missing")
  }

  p.outro("Finish.")
}

main()
