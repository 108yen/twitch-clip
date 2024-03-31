import getClips from '../../firebase/server/clips'

import ClipPageTemplate from './_Component/ClipPageTemplate'

export default async function Home() {
    const clipDoc = await getClips(`summary`)
    console.log(`revalidated page`)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
