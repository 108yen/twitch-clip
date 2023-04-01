import axios, { AxiosRequestConfig } from "axios";
import { atom } from "jotai";
import { ClipDoc, User } from "./types";
import { Swiper as SwiperCore } from 'swiper';

export const usersAtom = atom<Promise<Array<User> | undefined>>(
    async () => {
        const res = await axios.get<Array<User>>('/api/streamers')
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

export const clipsAtom = atom<Promise<ClipDoc | undefined>>(
    async (get) => {
        if (get(currentStreamerIdValue) == undefined) {
            return undefined;
        }
        const id = get(currentStreamerIdValue);
        const config: AxiosRequestConfig = {
            url: '/api/clips',
            method: 'GET',
            params: {
                id: id,
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

// const pastYearsAtom = atom<Promise<Array<string>>>(
//     async (get) => {
//         const currentYear = (new Date()).getFullYear();
//         const clips = await get(clipsAtom);
//         let result: Array<string> = [];
//         if (clips == undefined) {
//             return result;
//         }
//         for (let year = currentYear - 1; year >= 2016; year--) {
//             if (clips[year.toString()] != undefined) {
//                 result.push(year.toString());
//             }
//         }
//         return result;
//     }
// );

const currentStreamerIdValue = atom<string | undefined>(undefined);
export const currentStreamerAtom = atom<Promise<User | undefined>>(
    async (get) => {
        if (get(currentStreamerIdAtom) == undefined) {
            return undefined;
        }
        const users = await get(usersAtom);
        return users != undefined
            ? users.find(user => user.id == get(currentStreamerIdAtom))
            : undefined;
    }
);

const tabValueAtom = atom<number>(0);
const viewLayoutValueAtom = atom<string>('list');
export const swiperAtom = atom<SwiperCore | null>(null);

//for reset
export const currentStreamerIdAtom = atom(
    (get) => get(currentStreamerIdValue),
    (_, set, update: string) => {
        set(tabValueAtom, 0);
        set(currentStreamerIdValue, update);
        set(overrideClipCardsDisplayNumAtom, null);
        set(overrideMoreItemIsExistAtom, null);
    }
);
export const tabAtom = atom(
    (get) => get(tabValueAtom),
    (_, set, update: number) => {
        set(tabValueAtom, update);
        set(overrideClipCardsDisplayNumAtom, null);
        set(overrideMoreItemIsExistAtom, null);
    }
);
export const tabNameListAtom = atom<Promise<Array<string>>>(
    async (get) => {
        const defaultArray: Array<string> = ['day', 'week', 'month', 'all'];
        const currentYear = (new Date()).getFullYear();
        const clips = await get(clipsAtom);
        let tabArray: Array<string> = [];
        if (clips == undefined) {
            return defaultArray;
        }
        for (const key in defaultArray) {
            const element = defaultArray[key];
            if (clips[element] != undefined) {
                tabArray.push(element);
            }
        }
        for (let year = currentYear - 1; year >= 2016; year--) {
            if (clips[year.toString()] != undefined) {
                tabArray.push(year.toString());
            }
        }

        return tabArray;
    }
);
export const tabNameAtom = atom<Promise<string>>(
    async (get) => {
        const tabArray = await get(tabNameListAtom);
        return tabArray[get(tabValueAtom)];
    }
);
export const viewLayoutAtom = atom(
    (get) => get(viewLayoutValueAtom),
    (_, set, update: string) => {
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
    (_, set, update: number) => {
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
    (_, set, update: boolean) => {
        set(overrideMoreItemIsExistAtom, update);
    }
);

export const isDarkModeAtom = atom<boolean | undefined>(undefined);