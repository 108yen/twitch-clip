import { cacheClipDoc } from '../../../components/unstableCache'
import ClipPageTemplate from '../_Component/ClipPageTemplate'

export default async function PastRanking() {
    const clipDoc = await cacheClipDoc(`daily`)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
