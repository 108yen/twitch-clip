import { z } from "zod"

export const inquiryScheme = z.object({
  content: z
    .string({ error: "入力が必須の項目です" })
    .min(1, { error: "入力が必須の項目です" })
    .max(2000, { error: "2000文字以内で入力して下さい" }),
})
