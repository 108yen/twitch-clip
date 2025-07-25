"use client"
import { FormMetadata, getTextareaProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import {
  Button,
  FormControl,
  HelperMessage,
  Textarea,
  useNotice,
  VStack,
} from "@yamada-ui/react"
import { FormEvent, useActionState } from "react"
import { postInquiry } from "@/firebase/server/inquiry"
import { inquiryScheme } from "@/scheme"
import { sendGAEvent } from "@/utils/google-analytics"
import { withCallbacks } from "@/utils/with-callback"

export function Inquiry() {
  const notice = useNotice({ limit: 1, placement: "bottom-left" })

  const [lastResult, action, pending] = useActionState(
    withCallbacks(postInquiry, {
      onError() {
        notice({
          status: "error",
          title: "問い合わせ失敗",
        })
      },
      onStart() {
        sendGAEvent("event", "click", {
          label: "post_inquiry",
        })
      },
      onSuccess() {
        notice({
          status: "success",
          title: "問い合わせ完了",
        })
      },
    }),
    undefined,
  )

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inquiryScheme })
    },
    shouldRevalidate: "onInput",
  })

  function getFormProps<T extends Record<string, any>>({
    errorId,
    id,
    onSubmit,
    valid,
  }: FormMetadata<T>) {
    return {
      "aria-describedby": !valid ? errorId : undefined,
      "aria-invalid": !valid || undefined,
      id,
      noValidate: true,
      onSubmit(event: FormEvent<HTMLDivElement>) {
        onSubmit(event as unknown as FormEvent<HTMLFormElement>)
      },
    }
  }

  return (
    <VStack
      action={action}
      alignItems="center"
      as="form"
      gap="md"
      {...getFormProps(form)}
    >
      <FormControl
        errorMessage={fields.content.errors}
        invalid={!fields.content.valid}
      >
        <Textarea
          focusBorderColor="primary.500"
          maxLength={2000}
          rows={4}
          {...getTextareaProps(fields.content)}
        />

        <HelperMessage textAlign="right">{`${fields.content.value?.length ?? 0}/2000`}</HelperMessage>
      </FormControl>

      <Button loading={pending} type="submit" variant="outline" w="fit-content">
        問い合わせ
      </Button>
    </VStack>
  )
}
