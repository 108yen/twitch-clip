"use client"

import { event } from "@/components/googleAnalytics/gtag"
import { SimpleButton } from "@/components/styledui"
import { Alert, Box, Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import postInquiry from "../../../../firebase/server/inquiry"

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
      setSnackbarState({
        message: "お問い合わせ失敗",
        open: true,
        severity: "error",
      })
    } else {
      setSnackbarState({
        message: "お問い合わせ完了",
        open: true,
        severity: "success",
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
    message: string
    open: boolean
    severity: "error" | "info" | "success" | "warning"
  }

  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    message: "",
    open: false,
    severity: "success",
  })

  return (
    <form onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="inquiry"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            color="secondary"
            error={fieldState.invalid}
            fullWidth
            helperText={fieldState.error?.message}
            id="inquiry"
            margin="normal"
            multiline
            rows={4}
          />
        )}
        rules={validationRules.inquiry}
      />
      <Box m={2} textAlign="center">
        <SimpleButton color="primary" type="submit" variant="outlined">
          問い合わせ
        </SimpleButton>
      </Box>
      <Snackbar
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        open={snackbarState.open}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </form>
  )
}
