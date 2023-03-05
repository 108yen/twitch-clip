import { User } from '@/components/types';
import { db } from '@/firebase/client';
import { addDoc, collection, CollectionReference, doc, getDocs, writeBatch, WriteBatch } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        try {
            const col = collection(db, 'streamers') as CollectionReference<User>;
            const querySnapshot = await getDocs(col);
            const users = querySnapshot.docs.map((doc) => doc.data());

            // const batch = writeBatch(db);
            // users.map(user =>
            // {
            //     const colRef = collection(db, 'streamers');
            //     const id = doc(colRef).id;
            //     const streamersDoc = doc(db, 'streamers', id);
            //     batch.set(streamersDoc, user);
            // }
            // );
            // await batch.commit();

            res.status(200).json(users);
        } catch (error) {
            console.log('エラー：' + error);
            res.status(400);
        }
    } else {
        res.status(400);
    }
}