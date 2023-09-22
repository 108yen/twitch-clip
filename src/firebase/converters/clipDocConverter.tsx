import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore"

import { ClipDoc } from "@/models/clipDoc"


export const clipDocConverter: FirestoreDataConverter<ClipDoc> = {
    fromFirestore(qds: QueryDocumentSnapshot): ClipDoc {
        const data = qds.data() as ClipDoc
        return data
    },
    toFirestore(doc: ClipDoc): DocumentData {
        return doc
    },
}
