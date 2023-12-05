import { DocumentReference } from 'firebase-admin/firestore'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

import { db } from '@/firebase/server/server'
import { Streamer } from '@/models/streamer'

import { streamersConverter } from './converters/streamersConverter'

const getStreamers = unstable_cache(
    () => uncache_getStreamers(),
    [`get-streamers`],
    {
        revalidate: 10800 //3hours
    }
)
export default getStreamers

async function uncache_getStreamers() {
    const streamersDocRef: DocumentReference<{
        streamers: Array<Streamer>
    }> = db
        .collection(`streamers`)
        .doc(`streamers`)
        .withConverter<{ streamers: Array<Streamer> }>(streamersConverter)

    const ds = await streamersDocRef.get().catch((error) => {
        throw new Error(error)
    })
    const streamers = ds?.data()?.streamers
    if (!streamers) {
        notFound()
    }
    console.log(
        `info: get streamers at ${new Date().toLocaleString(`ja-JP`, {
            timeZone: `Asia/Tokyo`
        })}`
    )

    return streamers
}
