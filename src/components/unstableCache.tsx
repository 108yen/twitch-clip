import { unstable_cache } from 'next/cache'

import getClips from '../firebase/server/clips'
import getStreamers from '../firebase/server/streamers'

export async function cacheClipDoc(id: string) {
    const clipDoc = await unstable_cache(
        async () => {
            console.log(`info: cached ${id} clipDoc at ${new Date()}`)
            return await getClips(id)
        },
        [id],
        {
            revalidate: 60
        }
    )()
    return clipDoc
}

export async function cacheStreamers() {
    const streamers = await unstable_cache(
        async () => {
            console.log(`info: cached streamers at ${new Date()}`)
            return await getStreamers()
        },
        [`streamer`],
        {
            revalidate: 60
        }
    )()
    return streamers
}
