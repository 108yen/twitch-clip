import { db } from "@/firebase/server/server"
import { ClipDoc } from "@/models/clipDoc"
import {
  CollectionReference,
  DocumentReference,
} from "firebase-admin/firestore"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import { cache } from "react"

import { clipDocConverter } from "./converters/clipDocConverter"

export const unstable_getClips = unstable_cache(uncached_getClips, ["clips"])

export const getClips = cache(async (id: string) => uncached_getClips(id))

async function uncached_getClips(id: string) {
  const clipColRef: CollectionReference<ClipDoc> = db
    .collection("clips")
    .withConverter<ClipDoc>(clipDocConverter)
  const clipDocRef = ({
    clipId,
  }: {
    clipId: string
  }): DocumentReference<ClipDoc> => clipColRef.doc(clipId)

  const ds = await clipDocRef({ clipId: id })
    .get()
    .catch((error) => {
      throw new Error(error)
    })
  const clipDoc = ds?.data()
  if (!clipDoc) {
    notFound()
  }
  console.log(
    `info: get ${id} clipDoc at ${new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    })}`,
  )

  return clipDoc
}
