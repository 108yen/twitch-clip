import assert from 'assert'

// import { doc, getDoc } from 'firebase/firestore'
import {
    CollectionReference,
    DocumentReference
} from 'firebase-admin/firestore'

import { event } from '@/components/gtag'
import { db } from '@/firebase/server/server'
import { ClipDoc } from '@/models/clipDoc'

import { clipDocConverter } from './converters/clipDocConverter'
// export default async function getClips(streamerId: string): Promise<ClipDoc> {
//     const clipsRef = doc(db, `clips`, streamerId).withConverter<ClipDoc>(
//         clipDocConverter
//     )
//     const ds = await getDoc(clipsRef).catch((error) => {
//         event(`error`, {
//             label: `get_` + streamerId + `_clips_error`,
//             value: error
//         })
//     })

//     const clipDoc = ds?.data()
//     assert(
//         typeof clipDoc !== `undefined`,
//         new Error(`getClips: clipDoc is undefined`)
//     )
//     return clipDoc
// }

export default async function getClips(id: string) {
    const clipColRef: CollectionReference<ClipDoc> = db
        .collection(`clips`)
        .withConverter<ClipDoc>(clipDocConverter)
    const clipDocRef = ({
        clipId
    }: {
        clipId: string
    }): DocumentReference<ClipDoc> => clipColRef.doc(clipId)

    const ds = await clipDocRef({ clipId: id })
        .get()
        .catch((error) => {
            event(`error`, {
                label: `get_` + id + `_clips_error`,
                value: error
            })
            throw new Error(error)
        })
    const clipDoc = ds?.data()
    assert(
        typeof clipDoc !== `undefined`,
        new Error(`clips/getClips(): clipId: ${id}, clipDoc is undefined`)
    )

    return clipDoc
}
