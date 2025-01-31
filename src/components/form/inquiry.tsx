"use client"
import { postInquiry } from "@/firebase/server/inquiry"
import { inquiryScheme } from "@/scheme"
import { sendGAEvent } from "@/utils/google-analytics"
import { getFormProps, getTextareaProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import {
  Button,
  FormControl,
  Textarea,
  useNotice,
  VStack,
} from "@yamada-ui/react"
import { useActionState, useEffect } from "react"

export function Inquiry() {
  const [lastResult, action, pending] = useActionState(postInquiry, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inquiryScheme })
    },
  })

  const notice = useNotice({ limit: 1, placement: "bottom-left" })

  useEffect(() => {
    sendGAEvent("event", "click", {
      label: "post_inquiry",
    })

    const { status } = form

    if (status == "success") {
      notice({
        status,
        title: "問い合わせ完了",
      })
    } else if (status == "error") {
      notice({
        status,
        title: "問い合わせ失敗",
      })
    }
  }, [form, notice])

  return (
    <VStack
      action={action}
      alignItems="center"
      as="form"
      gap="md"
      {...getFormProps(form)}
      noValidate
    >
      <FormControl
        errorMessage={fields.content.errors}
        invalid={!fields.content.valid}
      >
        <Textarea
          focusBorderColor="primary.500"
          rows={4}
          {...getTextareaProps(fields.content)}
        />
      </FormControl>

      <Button loading={pending} type="submit" variant="outline" w="fit-content">
        問い合わせ
      </Button>
    </VStack>
  )
}
