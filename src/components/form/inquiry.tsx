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

  const { control, handleSubmit, reset } = useForm<Inputs>({
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
    <VStack
      alignItems="center"
      as="form"
      gap="md"
      onKeyDown={(e) => checkKeyDown(e)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="inquiry"
        render={({ field, fieldState }) => (
          <FormControl
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
          >
            <Textarea
              {...field}
              colorScheme="secondary"
              id="inquiry"
              rows={4}
            />
          </FormControl>
        )}
        rules={validationRules.inquiry}
      />

      <Button type="submit" variant="outline" w="fit-content">
        問い合わせ
      </Button>
    </VStack>
  )
}
