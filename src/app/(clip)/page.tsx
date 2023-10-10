import { cacheClipDoc } from '../../components/unstableCache'

import ClipPageTemplate from './_Component/ClipPageTemplate'

export default async function Home() {
    const clipDoc = await cacheClipDoc(`summary`)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
