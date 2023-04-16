import { ClipDoc } from '@/components/types';
import { db } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        try {
            const category = req.body.category as string;
            console.log(category);
            //example for push firestore 
            //caterory: others, additionnal_request
            // await db.collection("inquiries").doc(category).update({
            //     inquery_array: FieldValue.arrayUnion(body)
            // });

            res.status(200);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}