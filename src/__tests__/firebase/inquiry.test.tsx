import { db } from "@/firebase/client"
import postInquiry from "@/firebase/postInquiry";
import { deleteApp } from "firebase/app"
import { doc, getDoc } from "firebase/firestore";

describe('postInquiryのテスト', () => {
    afterAll(() => {
        deleteApp(db.app);
        jest.clearAllMocks();
    })
    test('ストリーマー追加リクエスト', async () => {
        //! 本番環境の書き換えが発生するテスト,読み取り権限もない
        // const postText = 'additional_requesttest';
        // await postInquiry('additional_request', postText);
        // const docRef = doc(db, 'inquiries', 'additional_request');
        // const ds = await getDoc(docRef);
        // const data = ds.data() as { inquiry_array: Array<string> } | undefined;
        // expect(data).toBeDefined();
        // expect(data!.inquiry_array[-1]).toEqual(postText);
    })
    test('その他のリクエスト', async () => {
        // const postText = 'otherstest';
        // await postInquiry('others', postText);
        // const docRef = doc(db, 'inquiries', 'others');
        // const ds = await getDoc(docRef);
        // const data = ds.data() as { inquiry_array: Array<string> } | undefined;
        // expect(data).toBeDefined();
        // expect(data!.inquiry_array[-1]).toEqual(postText);
    })
})