import { db } from '@/firebase/client';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
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
            const inquiryRef = doc(db, "inquiries", category);
            await updateDoc(inquiryRef, {
                inquiry_array: arrayUnion(body)
            })
                .catch((error) => {
                    console.error('update inquiry value error:' + error);
                });

            res.status(200).end();
        } catch (error) {
            console.log('error' + error);
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
}