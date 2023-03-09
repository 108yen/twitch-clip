import { Clip } from '@/components/types';
import { db } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

type Period = "day" | "week" | "month" | "all";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const period: Period = req.query.period as Period;
            const clipsRef = doc(db, "clips", period);
            const clipsSnap = await getDoc(clipsRef);
            const clipsDoc = clipsSnap.data() as { clips: Array<Clip> }
            const clips = clipsDoc.clips;

            res.status(200).json(clips);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}