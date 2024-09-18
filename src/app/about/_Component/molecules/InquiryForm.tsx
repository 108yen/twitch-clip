"use client"

import { Alert, Box, Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import postInquiry from "../../../../firebase/server/inquiry"
import { event } from "@/components/googleAnalytics/gtag"
import { SimpleButton } from "@/components/styledui"

type Inputs = {
  inquiry: string
}

export default function InquiryForm() {
  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      inquiry: "",
    },
  })

  const validationRules = {
    inquiry: {
      required: "お問い合わせを入力してください",
      minLength: { value: 3, message: "お問い合わせを入力してください" },
    },
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    event("click", {
      label: "post_inquiry",
    })
    const result = await postInquiry(data.inquiry)

    if (result?.error) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "お問い合わせ失敗",
      })
    } else {
      setSnackbarState({
        open: true,
        severity: "success",
        message: "お問い合わせ完了",
      })
      reset()
    }
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  function handleSnackbarClose() {
    setSnackbarState((prev) => {
      return { ...prev, open: false }
    })
  }

  type SnackbarStateProps = {
    open: boolean
    severity: "success" | "info" | "warning" | "error"
    message: string
  }

  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    open: false,
    severity: "success",
    message: "",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
      <Controller
        name="inquiry"
        control={control}
        rules={validationRules.inquiry}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="inquiry"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            color="secondary"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Box textAlign="center" m={2}>
        <SimpleButton type="submit" variant="outlined" color="primary">
          問い合わせ
        </SimpleButton>
      </Box>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </form>
  )
}
