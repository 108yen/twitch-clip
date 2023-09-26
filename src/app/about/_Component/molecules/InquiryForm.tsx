'use client'

import { Box, Snackbar, TextField } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { useState } from "react"

import { SimpleButton } from "@/components/styledui"
import postInquiry from "@/firebase/postInquiry"

export default function InquiryForm() {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    function handleSnackbarClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === `clickaway`) {
            return
        }
        setSnackbarOpen(false)
    };

    const [inquiry, setInquiry] = useState<string>(``)
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInquiry(event.target.value)
    }
    async function handleSubmit() {
        //todo: 案内
        if (inquiry == ``) {
            return
        }
        await postInquiry(`others`, inquiry)
            .then(() => {
                setInquiry(``)
                setSnackbarOpen(true)
            })
    }

    return (
        <>
            <TextField
                id='inquiry'
                fullWidth
                multiline
                rows={4}
                margin='normal'
                color='secondary'
                value={inquiry}
                onChange={handleInputChange}
            />
            <Box textAlign='center' m={2}>
                <SimpleButton
                    variant='outlined'
                    color='primary'
                    onClick={handleSubmit}
                >
                    問い合わせ
                </SimpleButton>
            </Box>
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={6000}
            >
                <MuiAlert
                    variant='filled'
                    onClose={handleSnackbarClose}
                    severity='success'
                    sx={{ width: `100%` }}
                >
                    お問い合わせ完了
                </MuiAlert>
            </Snackbar>
        </>
    )
}
