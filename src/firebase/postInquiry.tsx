import { arrayUnion, doc, updateDoc } from "firebase/firestore"

import { event } from "@/components/gtag"

import { db } from "./client"
import { inquiryConverter } from "./converters/inquiryConverter"

export default async function postInquiry(
    category: `additional_request` | `others`,
    body: string
) {
    const inquiryRef = doc(db, `inquiries`, category)
        .withConverter<{ inquiry_array: Array<string> }>(inquiryConverter)

    await updateDoc(inquiryRef, {
        inquiry_array: arrayUnion(body)
    })
        .catch((error) => {
            event(`error`, {
                label: `update_inquiry_error`,
                value: error,
            })
        })
        .then(() => {
            event(`click`, {
                label: `send_inquiry`,
            })
        })
}
