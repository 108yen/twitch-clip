import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from "firebase-admin/firestore"

export const inquiryConverter: FirestoreDataConverter<{
  inquiry_array: Array<string>
}> = {
  fromFirestore(qds: QueryDocumentSnapshot): {
    inquiry_array: Array<string>
  } {
    const data = qds.data() as { inquiry_array: Array<string> }
    return data
  },
  toFirestore(doc: { inquiry_array: Array<string> }): DocumentData {
    return doc
  }
}
