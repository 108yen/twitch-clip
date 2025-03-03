import { STREAMERS } from "@/constant/streamers"
import { Streamer } from "@/models/streamer"
import "dotenv/config"
import { writeFile } from "fs/promises"

import { getDB } from "./db"
import { getStreamers } from "./firestore-repositories"

function getDiff(streamers: Streamer[]) {
  const added = streamers
    .filter(({ id }) => !STREAMERS.some(({ id: _id }) => id == _id))
    .map(({ display_name }) => display_name)

  const removed = STREAMERS.filter(
    ({ id }) => !streamers.some(({ id: _id }) => id == _id),
  ).map(({ display_name }) => display_name)

  console.log(`Added streamers: ${added}\nRemoved streamers: ${removed}`)
}

async function main() {
  delete process.env.FIRESTORE_EMULATOR_HOST

  const db = getDB()

  const streamers = await getStreamers(db)

  if (!streamers) return

  getDiff(streamers)

  const content = "export const STREAMERS = " + JSON.stringify(streamers)
  await writeFile("src/constant/streamers.ts", content)
}

main()
