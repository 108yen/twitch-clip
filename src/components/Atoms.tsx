import { atom } from "jotai";
import { Clip, ClipDoc, User } from "./types";

//todo:ここでfetchしたい
export const usersAtom = atom<Array<User>>([]);
export const clipsAtom = atom<ClipDoc>({
    day: [],
    week: [],
    month: [],
    all: [],
});
export const currentStreamerIdAtom = atom<string>('summary');
export const currentStreamerAtom = atom<User | undefined>(
    (get) => {
        return get(usersAtom).find(user => user.id == get(currentStreamerIdAtom));
    }
);

export const tabAtom = atom<keyof ClipDoc>('day');
export const viewLayoutAtom = atom<string>('list');