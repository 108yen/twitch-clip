import axios, { AxiosRequestConfig } from "axios";
import { updateDoc } from "firebase/firestore";
import { atom, Getter } from "jotai";
import { ClipDoc, User } from "./types";

export const usersAtom = atom<Promise<Array<User>>>(
    async () => {
        //todo: catch実装
        const res = await axios.get<Array<User>>('/api/streamers');
        return res?.data;
    }
);

export const clipsAtom = atom<Promise<ClipDoc | undefined>>(
    async (get) => {
        const config: AxiosRequestConfig = {
            url: '/api/clips',
            method: 'GET',
            params: {
                id: get(currentStreamerIdAtom),
            },
            paramsSerializer: { indexes: null }
        }
        const res = await axios<ClipDoc>(config)
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data);
                } else {
                    console.error(error);
                }
                return undefined;
            });
        return res?.data;
    }
);

export const currentStreamerIdAtom = atom<string>('summary');
export const currentStreamerAtom = atom<Promise<User | undefined>>(
    async (get) => {
        const users = await get(usersAtom);
        return users.find(user => user.id == get(currentStreamerIdAtom));
    }
);

const tabValueAtom = atom<keyof ClipDoc>('day');
const viewLayoutValueAtom = atom<string>('list');

//for reset
export const tabAtom = atom(
    (get) => get(tabValueAtom),
    (get, set, update: keyof ClipDoc) => {
        set(tabValueAtom, update);
        set(overrideClipCardsDisplayNumAtom, null);
        set(overrideMoreItemIsExistAtom, null);
    }
);
export const viewLayoutAtom = atom(
    (get) => get(viewLayoutValueAtom),
    (get, set, update: string) => {
        set(viewLayoutValueAtom, update);
        set(overrideClipCardsDisplayNumAtom, null);
        set(overrideMoreItemIsExistAtom, null);
    }
);

const overrideClipCardsDisplayNumAtom = atom<number | null>(null);
export const clipCardsDisplayNumAtom = atom(
    (get) => {
        const override = get(overrideClipCardsDisplayNumAtom);
        if (override != null) {
            return override;
        } else {
            return get(viewLayoutAtom) == 'full' ? 3 : 7;
        }
    },
    (get, set, update: number) => {
        set(overrideClipCardsDisplayNumAtom, update);
    }
);


const overrideMoreItemIsExistAtom = atom<boolean | null>(null);
export const moreItemIsExistAtom = atom(
    (get) => {
        const override = get(overrideMoreItemIsExistAtom);
        if (override != null) {
            return override;
        } else {
            return true;
        }
    },
    (get, set, update: boolean) => {
        set(overrideMoreItemIsExistAtom, update);
    }
);