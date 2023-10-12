import getStreamers from '../../firebase/server/streamers'

import StreamersTemplate from './_Component/StreamersTemplate'

export const revalidate = 600 //10minutes

export default async function StreamersPage() {
    const streamers = await getStreamers()

    return <StreamersTemplate streamers={streamers} />
}
