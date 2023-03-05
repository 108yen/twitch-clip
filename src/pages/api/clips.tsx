import { Clip } from '@/components/types';
import { db } from '@/firebase/client';
import { collection, CollectionReference, doc, getDocs, writeBatch } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const col = collection(db, 'clips') as CollectionReference<Clip>;
            const querySnapshot = await getDocs(col);
            const clips = querySnapshot.docs.map((doc) => doc.data());

            // const batch = writeBatch(db);
            // testdata.map(clip => {
            //     const colRef = collection(db, 'clips');
            //     const clipsDoc = doc(db, 'clips', clip.id);
            //     batch.set(clipsDoc, clip);
            // });
            // await batch.commit();

            res.status(200).json(clips);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}