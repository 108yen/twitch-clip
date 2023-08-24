import { db } from "@/firebase/client"
import postInquiry from "@/firebase/postInquiry";
import { deleteApp } from "firebase/app"

describe('postInquiryのテスト', () => {
    afterAll(() => {
        deleteApp(db.app);
    })
    test('ストリーマー追加リクエスト', async () => {
        await postInquiry('additional_request', 'test')

    })
    test('その他のリクエスト', async () => {
        await postInquiry('others', 'test')

    })
})