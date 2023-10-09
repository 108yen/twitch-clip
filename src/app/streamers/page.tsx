import { unstable_cache } from 'next/cache'

import getStreamers from '../../firebase/streamers'

import StreamersTemplate from './_Component/StreamersTemplate'

export default async function StreamersPage() {
    // const streamers = await cachedGetStreamers()
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

    return <StreamersTemplate streamers={streamers} />
}
