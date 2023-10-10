import { unstable_cache } from 'next/cache'

import getClips from '../firebase/clips'
import getStreamers from '../firebase/streamers'

export async function cacheClipDoc(id: string) {
    const clipDoc = await unstable_cache(
        async () => {
            const data = await getClips(id)
            return data
        },
        undefined,
        {
            revalidate: 3600
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
        undefined,
        {
            revalidate: 3600
        }
    )()
    return streamers
}
