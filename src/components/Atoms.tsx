import axios from "axios";
import { atom } from "jotai";
import { ClipDoc, User } from "./types";

//todo:ここでfetchしたい
export const usersAtom = atom<Promise<Array<User>>>(
    async () => {
        const res = await axios.get<Array<User>>('/api/streamers');
        return res?.data;
    }
);

export const clipsAtom = atom<ClipDoc>({
    day: [],
    week: [],
    month: [],
    all: [],
});
export const currentStreamerIdAtom = atom<string>('summary');
export const currentStreamerAtom = atom<Promise<User | undefined>>(
    async (get) => {
        const users = await get(usersAtom);
        return users.find(user => user.id == get(currentStreamerIdAtom));
    }
);

export const tabAtom = atom<keyof ClipDoc>('day');
export const viewLayoutAtom = atom<string>('list');