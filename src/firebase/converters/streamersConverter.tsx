import assert from 'assert'

import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot
} from 'firebase/firestore'

import { Streamer } from '@/models/streamer'

export const streamersConverter: FirestoreDataConverter<{
    streamers: Array<Streamer>
}> = {
    fromFirestore(qds: QueryDocumentSnapshot): { streamers: Array<Streamer> } {
        const data = qds.data()
        assert(
            typeof data.streamers !== `undefined`,
            new Error(
                `streamersConverter/fromFirestore: data.streamers is undefined`
            )
        )

        const result: Array<Streamer> = []
        for (const i in data.streamers) {
            const streamer = data.streamers[i] as Streamer
            result.push(streamer)
        }

        return { streamers: result }
    },
    toFirestore(doc: { streamers: Array<Streamer> }): DocumentData {
        return doc
    }
}
