import { Streamer } from "@/models/streamer"
import { db } from "./client";
import { doc, getDoc } from "firebase/firestore";
import { streamersConverter } from "./converters/streamersConverter";
import { event } from "@/components/gtag";

export default async function getStreamers() {
    const streamersRef = doc(db, 'streamers', 'streamers')
        .withConverter<{ streamers: Array<Streamer> }>(streamersConverter);
    const ds = await getDoc(streamersRef)
        .catch((error) => {
            event("error", {
                label: "get_streamer_info_error",
                value: error,
            });
        })

    return ds?.data()?.streamers;
}