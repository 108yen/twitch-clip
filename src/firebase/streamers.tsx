import { Streamer } from "@/models/streamer"
import { db } from "./client";
import { doc, getDoc } from "firebase/firestore";
import { streamersConverter } from "./converters/streamersConverter";

export default async function getStreamers() {
    const streamers: Array<Streamer> | undefined = [];
    const streamersRef = doc(db, 'streamers', 'streamers')
        .withConverter<{ streamers: Array<Streamer> }>(streamersConverter);
    const ds = await getDoc(streamersRef)
        .catch((error) => {
            console.error('get streamer info error');
        })

    return ds?.data()?.streamers;
}