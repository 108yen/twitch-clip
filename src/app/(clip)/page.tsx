import getClips from '../../firebase/server/clips'

import ClipPageTemplate from './_Component/ClipPageTemplate'

export const revalidate = 600 //10minutes

export default async function Home() {
    // const clipDoc = await cacheClipDoc(`summary`)

    const id = `summary`
    console.log(`info: cached ${id} clipDoc at ${new Date()}`)
    
    const clipDoc = await getClips(id)

    return <ClipPageTemplate clipDoc={clipDoc} />
}
