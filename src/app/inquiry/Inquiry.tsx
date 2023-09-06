'use client'
import { SimpleButton } from "@/components/styledui";
import postInquiry from "@/firebase/postInquiry";
import { Box, Grid, Snackbar, TextField, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";

export default function Inquiry() {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    function handleSnackbarClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const [inquiry, setInquiry] = useState<string>("");
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInquiry(event.target.value);
    }
    async function handleSubmit() {
        //todo: 案内
        if (!isValidUrl(inquiry)) {
            return;
        }
        await postInquiry('additional_request', inquiry)
            .then(() => {
                setInquiry("");
                setSnackbarOpen(true);
            });
    }
    function isValidUrl(str: string) {
        const pattern = new RegExp(
            '^(https:\\/\\/www.twitch.tv\\/)', //プロトコルパターン
            'i'
        );
        return pattern.test(str);
    }

    return (
        <>
            <Grid
                container
                justifyContent='center'
                paddingX={{ xs: 0, md: 5, lg: 15, xl: 20 }}
            >
                <Grid
                    item
                    xs={12} md={9} lg={8} xl={7}
                    justifyContent='center'
                    p={3}
                >
                    <Typography
                        variant="body2"
                        whiteSpace="pre-line"
                    >
                        {"まだリストされていないけど面白い配信者がいれば、是非教えてください。\nチャンネル特定のためチャンネルのURLを記載してください。"}
                    </Typography>
                    <TextField
                        id="url"
                        label="チャンネルURL"
                        placeholder="https://www.twitch.tv/"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        value={inquiry}
                        onChange={handleInputChange}
                    />
                    <Box textAlign="center" m={2}>
                        <SimpleButton
                            variant="outlined"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            リクエスト
                        </SimpleButton>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={6000}
            >
                <MuiAlert
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    リクエスト完了
                </MuiAlert>
            </Snackbar>
        </>
    );
}