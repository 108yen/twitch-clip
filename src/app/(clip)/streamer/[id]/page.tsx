import { Metadata } from 'next'

import getClips from '../../../../firebase/server/clips'

import StreamerClipPageTemplate from './_Component/StreamerClipPageTemplate'

export async function generateMetadata({
    params
}: {
    params: { id: string }
}): Promise<Metadata> {
    const id = params.id
    const clipDoc = await getClips(id)
    const streamerInfo = clipDoc.streamerInfo

    return {
        title: streamerInfo?.display_name,
        description: `${streamerInfo?.display_name}のTwitch(ツイッチ)クリップの再生数ランキング。`
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const clipDoc = await getClips(id)

    return <StreamerClipPageTemplate clipDoc={clipDoc} />
}
