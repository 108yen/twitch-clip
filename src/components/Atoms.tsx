import { atom } from "jotai";
import { Clip, ClipDoc, User } from "./types";

export const usersAtom = atom<Array<User>>([]);
export const clipsAtom = atom<ClipDoc>({
    day: [],
    week: [],
    month: [],
    all: [],
});
export const currentStreamerAtom = atom<User>({
    id: 'undefined',
    login: 'undefined',
    display_name: 'undefined',
    type: 'undefined',
    broadcaster_type: 'undefined',
    description: 'undefined',
    profile_image_url: 'undefined',
    offline_image_url: 'undefined',
    view_count: 0,
    created_at: 'undefined',

});

export const tabAtom = atom<keyof ClipDoc>('day');
export const viewLayoutAtom = atom<string>('list');