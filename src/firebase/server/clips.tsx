import assert from 'assert'

import {
    CollectionReference,
    DocumentReference
} from 'firebase-admin/firestore'
import { notFound } from 'next/navigation'

import { db } from '@/firebase/server/server'
import { ClipDoc } from '@/models/clipDoc'

import { clipDocConverter } from './converters/clipDocConverter'

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
            throw new Error(error)
        })
    const clipDoc = ds?.data()
    assert(typeof clipDoc !== `undefined`, notFound())

    return clipDoc
}
