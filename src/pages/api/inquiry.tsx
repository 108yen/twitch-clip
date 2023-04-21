import { db } from '@/firebase/client';
import {  arrayUnion, doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        try {
            const category = req.body.category as string;
            const body = req.body.body as string;
            
            //caterory: others, additional_request
            // await db.collection("inquiries").doc(category).update({
            //     inquiry_array: FieldValue.arrayUnion(body)
            // });
            const inquiryRef = doc(db, "inquiries", category);
            await updateDoc(inquiryRef, {
                inquiry_array: arrayUnion(body)
                // inquiry_array: [body]
            });

            res.status(200).end();
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
}