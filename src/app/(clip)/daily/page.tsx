import { unstable_cache } from 'next/cache'

import getClips from '../../../firebase/clips'
import SummaryClipPageTemplate from '../_Component/SummaryClipPageTemplate'

export default async function PastRanking() {
    const clipDoc = await unstable_cache(
        async () => {
            const data = await getClips(`daily`)
            return data
        },
        undefined,
        {
            revalidate: 3600
        }
    )()
    return <SummaryClipPageTemplate clipDoc={clipDoc} />
}
