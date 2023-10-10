import assert from 'assert'

import { doc, getDoc } from 'firebase/firestore'

import { event } from '@/components/gtag'
import { Streamer } from '@/models/streamer'

import { db } from './client'
import { streamersConverter } from './converters/streamersConverter'

export default async function getStreamers() {
    const streamersRef = doc(db, `streamers`, `streamers`).withConverter<{
        streamers: Array<Streamer>
    }>(streamersConverter)
    const ds = await getDoc(streamersRef).catch((error) => {
        event(`error`, {
            label: `get_streamer_info_error`,
            value: error
        })
    })

    const streamers = ds?.data()?.streamers
    assert(
        typeof streamers !== `undefined`,
        new Error(`getStreamers: streamres is undefined`)
    )

    return streamers
}
