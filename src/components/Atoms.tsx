import { atom } from "jotai";
import { Clip, ClipDoc, User } from "./types";

export const usersAtom = atom<Array<User>>([]);
export const clipsAtom = atom<ClipDoc>({
    day: [],
    week: [],
    month: [],
    all: [],
});

export const tabAtom = atom<keyof ClipDoc>('day');
export const viewLayoutAtom = atom<string>('list');