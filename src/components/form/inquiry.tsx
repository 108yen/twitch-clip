"use client"
import { event } from "@/components/googleAnalytics/gtag"
import { postInquiry } from "@/firebase/server"
import {
  Button,
  FormControl,
  Textarea,
  useNotice,
  VStack,
} from "@yamada-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
  inquiry: string
}

export function Inquiry() {
  const notice = useNotice({ placement: "bottom-left" })

  const { control, formState, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      inquiry: "",
    },
  })

  const validationRules = {
    inquiry: {
      minLength: { message: "お問い合わせを入力してください", value: 3 },
      required: "お問い合わせを入力してください",
    },
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    event("click", {
      label: "post_inquiry",
    })
    const result = await postInquiry(data.inquiry)

    if (result?.error) {
      notice({
        status: "error",
        title: "問い合わせ失敗",
      })
    } else {
      notice({
        status: "success",
        title: "問い合わせ完了",
      })

      reset()
    }
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <FormControl
      errorMessage={
        formState.errors.inquiry ? formState.errors.inquiry.message : undefined
      }
      isInvalid={!!formState.errors.inquiry}
      onKeyDown={(e) => checkKeyDown(e)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack alignItems="center" gap="md">
        <Controller
          control={control}
          name="inquiry"
          render={({ field }) => (
            <Textarea
              {...field}
              colorScheme="secondary"
              id="inquiry"
              rows={4}
            />
          )}
          rules={validationRules.inquiry}
        />

        <Button type="submit" variant="outline" w="fit-content">
          問い合わせ
        </Button>
      </VStack>
    </FormControl>
  )
}
