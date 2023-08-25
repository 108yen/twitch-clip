import { ClipDoc } from "@/models/clipDoc";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";


export const clipDocConverter: FirestoreDataConverter<ClipDoc> = {
    fromFirestore(qds: QueryDocumentSnapshot): ClipDoc {
        const data = qds.data() as ClipDoc;
        return data;
    },
    toFirestore(doc: ClipDoc): DocumentData {
        return doc;
    },
}