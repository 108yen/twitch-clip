import { db } from "@/firebase/client"
import postInquiry from "@/firebase/postInquiry";
import { deleteApp } from "firebase/app"
import { doc, getDoc } from "firebase/firestore";
import { mockFirebase } from "firestore-jest-mock";
import { mockArrayUnionFieldValue, mockDoc, mockUpdate } from "firestore-jest-mock/mocks/firestore";

describe('postInquiryのテスト', () => {
    mockFirebase({
        database: {
            inquiries: [
                { id: 'additional_request', inquiry_array: [] },
                { id: 'others', inquiry_array: [] },
            ],
        },
    })
    afterAll(() => {
        deleteApp(db.app);
        jest.clearAllMocks();
    })
    test('ストリーマー追加リクエスト', async () => {
        const postText = 'additional_requesttest';
        await postInquiry('additional_request', postText);
        expect(mockUpdate).toHaveBeenCalledWith('additional_request');
        expect(mockArrayUnionFieldValue).toHaveBeenCalledWith('inquiry_array');
        const docRef = doc(db, 'inquiries', 'additional_request');
        const ds = await getDoc(docRef);
        const data = ds.data() as { inquiry_array: Array<string> } | undefined;
        expect(data).toBeDefined();
        expect(data!.inquiry_array.length).toEqual(1);
        expect(data!.inquiry_array[0]).toEqual(postText);
    })
    test('その他のリクエスト', async () => {
        const postText = 'otherstest';
        await postInquiry('others', postText);
        expect(mockUpdate).toHaveBeenCalledWith('others');
        expect(mockArrayUnionFieldValue).toHaveBeenCalledWith('inquiry_array');
        const docRef = doc(db, 'inquiries', 'others');
        const ds = await getDoc(docRef);
        const data = ds.data() as { inquiry_array: Array<string> } | undefined;
        expect(data).toBeDefined();
        expect(data!.inquiry_array.length).toEqual(1);
        expect(data!.inquiry_array[0]).toEqual(postText);
    })
})