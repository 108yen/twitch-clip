import { Clip, ClipDoc } from '@/components/types';
import { db } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            // const period: Period = req.query.period as Period;
            const streamerId = req.query.id as string;
            const clipsRef = doc(db, "clips", streamerId);
            const clipsSnap = await getDoc(clipsRef);
            const clipsDoc = clipsSnap.data() as ClipDoc;

            res.status(200).json(clipsDoc);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}