"use server"
import { inquiryScheme } from "@/scheme"
import { parseWithZod } from "@conform-to/zod"
import * as Sentry from "@sentry/nextjs"
import * as admin from "firebase-admin"
import { inquiryConverter } from "./converters/inquiryConverter"
import { db } from "./server"

export async function postInquiry(prevState: unknown, formData: FormData) {
  return await Sentry.withServerActionInstrumentation(
    "post-inquiry",
    {},
    async () => {
      const submission = parseWithZod(formData, {
        schema: inquiryScheme,
      })

      if (submission.status !== "success") {
        return submission.reply({
          formErrors: ["投稿に失敗しました"],
        })
      }

      const inquiryDoc = db
        .collection("inquiries")
        .doc("others")
        .withConverter<{
          inquiry_array: Array<string>
        }>(inquiryConverter)

      try {
        await inquiryDoc.update({
          inquiry_array: admin.firestore.FieldValue.arrayUnion(
            submission.value.content,
          ),
        })

        console.log(
          `info: post inquiry at ${new Date().toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          })}`,
        )
      } catch (error) {
        console.error(error)

        return submission.reply({
          formErrors: ["投稿に失敗しました"],
        })
      }

      return submission.reply()
    },
  )
}
