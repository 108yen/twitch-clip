import { ClipDoc } from '@/components/types';
import { db } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const streamerId = req.query.id as string;
            const clipsRef = doc(db, "clips", streamerId);
            const clipsSnap = await getDoc(clipsRef)
                .catch((error) => {
                    console.error('get ' + streamerId + ' clips error:' + error);
                });
            const clipsDoc = clipsSnap?.data() as ClipDoc;

            res.status(200).json(clipsDoc);
        } catch (error) {
            console.log('error' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}