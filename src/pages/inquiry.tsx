import { SimpleButton } from "@/components/styledui";
import DefaultHeader from "@/layout/defaultHeader";
import { Box, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useState } from "react";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { event } from "nextjs-google-analytics";

export default function About() {
    const title = "Twitchクリップランキング | 問い合わせ";
    const description = "チャンネル追加リクエストページ";

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
        const res = await axios
            .post('/api/inquiry',
                {
                    category: 'additional_request',
                    body: inquiry,
                },
            )
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data);
                } else {
                    console.error(error);
                }
            })
            .then((response) => {
                if (response) {
                    if (response.status == 200) {
                        setInquiry("");
                        setSnackbarOpen(true);
                        event("send_additional_request");
                    }
                }
            });
    }
    function isValidUrl(str:string) {
        const pattern = new RegExp(
            '^(https:\\/\\/www.twitch.tv\\/)', //プロトコルパターン
            'i'
        );
        return pattern.test(str);
    }

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: "https://www.twitchclipsranking.com/",
                    title: title,
                    description: description,
                    images: [
                        {
                            url: "https://www.twitchclipsranking.com/android-chrome-512x512.png",
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                url="https://www.twitchclipsranking.com/"
                title={title}
                images={["https://www.twitchclipsranking.com/android-chrome-512x512.png"]}
                datePublished="20230312"
                dateModified="20230312"
                authorName="108yen"
                publisherName="108yen"
                publisherLogo=""
                description={description}
            />
            <DefaultHeader />

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
                        {"まだリストされていないけど面白い配信者がいれば、是非教えてください。\nチャンネル特定のためチャンネルのURLを記載してください。\n※日本語中心の配信者のみ追加します。\n※必ず追加されるとは限りません。"}
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