import { Metadata, ResolvingMetadata } from "next";
import StreamerClipPage from "./StreamerClipPage";

export async function generateMetadata({
    params,
    searchParams,
    parent,
}: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined },
    parent: ResolvingMetadata,
}): Promise<Metadata> {
    if (typeof searchParams.display_name == 'string') {
        const display_name = searchParams.display_name;
        return {
            title: display_name,
            description: display_name + 'のTwitch(ツイッチ)クリップの再生数ランキング。',
        }
    } else {
        return {};
    }

}

export default function Page({
    params
}: {
    params: { id: string },
}) {
    const id = params.id;

    return <StreamerClipPage id={id} />
}