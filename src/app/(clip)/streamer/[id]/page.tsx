import { Metadata } from "next"

import StreamerClipPage from "./StreamerClipPage"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    {  searchParams }: Props,
): Promise<Metadata> {
    if (typeof searchParams.display_name == `string`) {
        const display_name = searchParams.display_name
        return {
            title: display_name,
            description: display_name + `のTwitch(ツイッチ)クリップの再生数ランキング。`,
        }
    } else {
        return {}
    }

}

export default function Page({
    params
}: {
    params: { id: string },
}) {
    const id = params.id

    return <StreamerClipPage id={id} />
}
