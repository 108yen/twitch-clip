import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore"
import { Streamer } from "@/models/streamer"

export const streamersConverter: FirestoreDataConverter<{
  streamers: Streamer[]
}> = {
  fromFirestore(qds: QueryDocumentSnapshot): { streamers: Streamer[] } {
    const data = qds.data()

    if (!data.streamers) {
      new Error("streamersConverter/fromFirestore: data.streamers is undefined")
    }

    const result: Streamer[] = []
    for (const i in data.streamers) {
      const streamer = data.streamers[i] as Streamer
      result.push(streamer)
    }

    return { streamers: result }
  },
  toFirestore(doc: { streamers: Streamer[] }): DocumentData {
    return doc
  },
}
