import assert from 'assert'

import { DocumentReference } from 'firebase-admin/firestore'

import { event } from '@/components/gtag'
import { db } from '@/firebase/server/server'
import { Streamer } from '@/models/streamer'

import { streamersConverter } from './converters/streamersConverter'

export default async function getStreamers() {
    const streamersDocRef: DocumentReference<{
        streamers: Array<Streamer>
    }> = db
        .collection(`streamers`)
        .doc(`streamers`)
        .withConverter<{ streamers: Array<Streamer> }>(streamersConverter)

    const ds = await streamersDocRef.get().catch((error) => {
         event(`error`, {
            label: `get_streamer_info_error`,
            value: error
        })
        throw new Error(error)
    })
    const streamers = ds?.data()?.streamers
    assert(
        typeof streamers !== `undefined`,
        new Error(`StreamerRepository/getStreamers: ds.data() is undefind`)
    )

    return streamers
}
