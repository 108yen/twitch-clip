import { Streamer } from "@/models/streamer";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";


export const streamersConverter: FirestoreDataConverter<{ streamers: Array<Streamer> }> = {
    fromFirestore(qds: QueryDocumentSnapshot): { streamers: Array<Streamer> } {
        const data = qds.data() as { streamers: Array<Streamer> };
        return data;
    },
    toFirestore(doc: { streamers: Array<Streamer> }): DocumentData {
        return doc;
    },
}