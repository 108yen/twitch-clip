import getClips from '../../../firebase/server/clips'
import ClipPageTemplate from '../_Component/ClipPageTemplate'

export const revalidate = 600 //10minutes

export default async function PastRanking() {
    const clipDoc = await getClips(`daily`)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
