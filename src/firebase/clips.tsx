import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { ClipDoc } from '@/models/clipDoc';
import { clipDocConverter } from './converters/clipDocConverters';

export default async function getClips(streamerId: string) {
    const clipsRef = doc(db, "clips", streamerId)
        .withConverter<ClipDoc>(clipDocConverter);
    const ds = await getDoc(clipsRef)
        .catch((error) => {
            console.error('get ' + streamerId + ' clips error:' + error);
        });
    return ds?.data();
}