import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { ClipDoc } from '@/models/clipDoc';
import { clipDocConverter } from './converters/clipDocConverter';
import { event } from "@/components/gtag";

export default async function getClips(streamerId: string) {
    const clipsRef = doc(db, "clips", streamerId)
        .withConverter<ClipDoc>(clipDocConverter);
    const ds = await getDoc(clipsRef)
        .catch((error) => {
            console.error('get ' + streamerId + ' clips error:' + error);
            event("error", {
                label: 'get_' + streamerId + '_clips_error:',
                value: error,
            });
        });
    return ds?.data();
}