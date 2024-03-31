import { uncache_getClips } from '../../firebase/server/clips'

import ClipPageTemplate from './_Component/ClipPageTemplate'

export const revalidate = 600 // 10minutes

export default async function Home() {
    // const clipDoc = await getClips(`summary`)
    const clipDoc = await uncache_getClips(`summary`)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
