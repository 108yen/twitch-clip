import { User } from '@/components/types';
import { db } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const streamersRef = doc(db, "streamers", "streamers");
            const streamersSnap = await getDoc(streamersRef);
            const streamersDoc = streamersSnap.data() as { streamers: Array<User> }
            const streamers = streamersDoc.streamers;

            res.status(200).json(streamers);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}