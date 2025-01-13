"use server"
import * as Sentry from "@sentry/nextjs"
import * as admin from "firebase-admin"

import { inquiryConverter } from "./converters/inquiryConverter"
import { db } from "./server"

export async function postInquiry(body: string) {
  return await Sentry.withServerActionInstrumentation(
    "post-inquiry",
    {},
    async () => {
      const inquiryDoc = db
        .collection("inquiries")
        .doc("others")
        .withConverter<{
          inquiry_array: Array<string>
        }>(inquiryConverter)

      try {
        await inquiryDoc.update({
          inquiry_array: admin.firestore.FieldValue.arrayUnion(body),
        })

        console.log(
          `info: post inquiry at ${new Date().toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          })}`,
        )
      } catch (error) {
        console.error(error)
        return { error: JSON.stringify(error) }
      }
    },
  )
}
