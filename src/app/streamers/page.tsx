import { cacheStreamers } from '../../components/unstableCache'

import StreamersTemplate from './_Component/StreamersTemplate'

export default async function StreamersPage() {
    const streamers = await cacheStreamers()

    return <StreamersTemplate streamers={streamers} />
}
