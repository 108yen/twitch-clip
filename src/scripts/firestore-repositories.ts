import type { Streamer } from "@/models/streamer"

import { clipDocConverter } from "@/firebase/server/converters/clipDocConverter"
import { streamersConverter } from "@/firebase/server/converters/streamersConverter"
import { ClipDoc } from "@/models/clipDoc"
import { DocumentReference } from "firebase-admin/firestore"

export async function getStreamers(db: FirebaseFirestore.Firestore) {
  const streamersDocRef: DocumentReference<{
    streamers: Streamer[]
  }> = db
    .collection("streamers")
    .doc("streamers")
    .withConverter<{ streamers: Streamer[] }>(streamersConverter)

  const ds = await streamersDocRef.get()

  const streamers = ds?.data()?.streamers

  return streamers
}

export async function updateStreamers(
  db: FirebaseFirestore.Firestore,
  streamers: Streamer[],
) {
  const streamersDocRef: DocumentReference<{
    streamers: Streamer[]
  }> = db
    .collection("streamers")
    .doc("streamers")
    .withConverter<{ streamers: Streamer[] }>(streamersConverter)

  await streamersDocRef.set({ streamers }, { merge: true })
}

export async function getClip(db: FirebaseFirestore.Firestore, clipId: string) {
  const clipDocRef: DocumentReference<ClipDoc> = db
    .collection("clips")
    .doc(clipId)
    .withConverter<ClipDoc>(clipDocConverter)

  const ds = await clipDocRef.get()

  const clips = ds?.data()

  return clips
}

export async function updateClip(
  db: FirebaseFirestore.Firestore,
  clipId: string,
  clipDoc: ClipDoc,
) {
  const clipDocRef: DocumentReference<ClipDoc> = db
    .collection("clips")
    .doc(clipId)
    .withConverter<ClipDoc>(clipDocConverter)

  await clipDocRef.set(clipDoc, { merge: true })
}
