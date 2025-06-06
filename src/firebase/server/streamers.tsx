import "server-only"
import { DocumentReference } from "firebase-admin/firestore"
import { notFound } from "next/navigation"
import { cache } from "react"
import { db } from "@/firebase/server/server"
import { Streamer } from "@/models/streamer"
import { streamersConverter } from "./converters/streamersConverter"

export const getStreamers = cache(uncached_getStreamers)

async function uncached_getStreamers() {
  const streamersDocRef: DocumentReference<{
    streamers: Array<Streamer>
  }> = db
    .collection("streamers")
    .doc("streamers")
    .withConverter<{ streamers: Array<Streamer> }>(streamersConverter)

  const ds = await streamersDocRef.get().catch((error) => {
    throw new Error(error)
  })
  const streamers = ds?.data()?.streamers
  if (!streamers) {
    notFound()
  }
  console.log(
    `info: get streamers at ${new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    })}`,
  )

  return streamers
}
