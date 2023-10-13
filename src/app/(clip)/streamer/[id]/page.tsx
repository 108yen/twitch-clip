import { Metadata } from 'next'

import getClips from '../../../../firebase/server/clips'

import StreamerClipPageTemplate from './_Component/StreamerClipPageTemplate'

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 1200 //20minutes

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
    const clipDoc = await getClips(id)

    return <StreamerClipPageTemplate clipDoc={clipDoc} />
}
