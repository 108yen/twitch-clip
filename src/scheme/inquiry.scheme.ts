import { z } from "zod"

export const inquiryScheme = z.object({
  content: z
    .string({ required_error: "入力が必須の項目です" })
    .min(1, { message: "入力が必須の項目です" })
    .max(2000, { message: "2000文字以内で入力して下さい" }),
})
