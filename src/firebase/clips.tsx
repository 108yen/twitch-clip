import assert from 'assert'

import { doc, getDoc } from 'firebase/firestore'

import { event } from '@/components/gtag'
import { db } from '@/firebase/client'
import { ClipDoc } from '@/models/clipDoc'

import { clipDocConverter } from './converters/clipDocConverter'

export default async function getClips(streamerId: string): Promise<ClipDoc> {
    const clipsRef = doc(db, `clips`, streamerId).withConverter<ClipDoc>(
        clipDocConverter
    )
    const ds = await getDoc(clipsRef).catch((error) => {
        event(`error`, {
            label: `get_` + streamerId + `_clips_error`,
            value: error
        })
    })

    const clipDoc = ds?.data()
    assert(
        typeof clipDoc !== `undefined`,
        new Error(`getClips: clipDoc is undefined`)
    )
    return clipDoc
}
