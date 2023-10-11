import { unstable_cache } from 'next/cache'

import getClips from '../firebase/server/clips'
import getStreamers from '../firebase/server/streamers'

export async function cacheClipDoc(id: string) {
    const clipDoc = await unstable_cache(
        async () => {
            const data = await getClips(id)
            return data
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
            const data = await getStreamers()
            return data
        },
        [`streamer`],
        {
            revalidate: 60
        }
    )()
    return streamers
}
