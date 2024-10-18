import { Streamer } from "@/models/streamer"
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore"

export const streamersConverter: FirestoreDataConverter<{
  streamers: Array<Streamer>
}> = {
  fromFirestore(qds: QueryDocumentSnapshot): { streamers: Array<Streamer> } {
    const data = qds.data()

    if (!data.streamers) {
      new Error("streamersConverter/fromFirestore: data.streamers is undefined")
    }

    const result: Array<Streamer> = []
    for (const i in data.streamers) {
      const streamer = data.streamers[i] as Streamer
      result.push(streamer)
    }

    return { streamers: result }
  },
  toFirestore(doc: { streamers: Array<Streamer> }): DocumentData {
    return doc
  },
}
