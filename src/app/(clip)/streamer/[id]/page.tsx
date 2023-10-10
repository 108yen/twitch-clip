import { Metadata } from 'next'

import StreamerClipPageTemplate from './_Component/StreamerClipPageTemplate'
import getClips from '../../../../firebase/clips'
import { unstable_cache } from 'next/cache'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    searchParams
}: Props): Promise<Metadata> {
    if (typeof searchParams.display_name == `string`) {
        const display_name = searchParams.display_name
        return {
            title: display_name,
            description:
                display_name + `のTwitch(ツイッチ)クリップの再生数ランキング。`
        }
    } else {
        return {}
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id

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

    return <StreamerClipPageTemplate clipDoc={clipDoc} />
}
