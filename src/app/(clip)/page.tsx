import { unstable_cache } from 'next/cache'

import getClips from '../../firebase/server/clips'

import ClipPageTemplate from './_Component/ClipPageTemplate'

export const revalidate = 60

export default async function Home() {
    // const clipDoc = await cacheClipDoc(`summary`)
    const id = `summary`
    const clipDoc = await unstable_cache(
        async () => {
            console.log(`info: cached ${id} clipDoc at ${new Date()}`)
            return await getClips(id)
        },
        [id],
        {
            revalidate: 60
        }
    )()

    return <ClipPageTemplate clipDoc={clipDoc} />
}
