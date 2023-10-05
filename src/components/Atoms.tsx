import { atom } from 'jotai'
import { Swiper as SwiperCore } from 'swiper'

import { event } from '@/components/gtag'
import getClips from '@/firebase/clips'
import getStreamers from '@/firebase/streamers'
import { ClipDoc } from '@/models/clipDoc'
import { Streamer } from '@/models/streamer'

export const streamersAtom = atom<Promise<Array<Streamer> | undefined>>(
    async () => {
        return await getStreamers()
    }
)

export const clipsAtom = atom<Promise<ClipDoc | undefined>>(async (get) => {
    const id = get(currentStreamerIdValue)
    if (id == undefined) {
        return undefined
    }
    return await getClips(id)
})

const currentStreamerIdValue = atom<string | undefined>(undefined)

const tabValueAtom = atom<number>(0)
export const swiperAtom = atom<SwiperCore | null>(null)

//for reset
export const currentStreamerIdAtom = atom(
    (get) => get(currentStreamerIdValue),
    (_, set, update: string) => {
        set(tabValueAtom, 0)
        set(currentStreamerIdValue, update)
        set(overrideClipCardsDisplayNumAtom, null)
        set(overrideMoreItemIsExistAtom, null)
    }
)
export const tabAtom = atom(
    (get) => get(tabValueAtom),
    (_, set, update: number) => {
        set(tabValueAtom, update)
        set(overrideClipCardsDisplayNumAtom, null)
        set(overrideMoreItemIsExistAtom, null)
    }
)
export const tabNameListAtom = atom<Promise<Array<string>>>(async (get) => {
    const defaultArray: Array<string> = [
        `day`, //
        `week`,
        `month`,
        `year`,
        `all`
    ]
    const currentYear = new Date().getFullYear()
    const clips = await get(clipsAtom)
    const tabArray: Array<string> = []
    if (clips == undefined) {
        return defaultArray
    }
    for (const key in defaultArray) {
        const element = defaultArray[key]
        if (clips[element] != undefined) {
            tabArray.push(element)
        }
    }
    for (let year = currentYear - 1; year >= 2016; year--) {
        if (clips[year.toString()] != undefined) {
            tabArray.push(year.toString())
        }
    }
    const today = new Date()
    for (let index = 0; index < 7; index++) {
        const targetDay = new Date(
            today.getTime() - index * 24 * 60 * 60 * 1000
        )
        const key = `${targetDay.getMonth() + 1}/${targetDay.getDate()}`
        if (clips[key] != undefined) {
            tabArray.push(key)
        }
    }

    return tabArray
})
export const tabNameAtom = atom<Promise<string>>(async (get) => {
    const tabArray = await get(tabNameListAtom)
    return tabArray[get(tabValueAtom)]
})

const overrideClipCardsDisplayNumAtom = atom<number | null>(null)
export const clipCardsDisplayNumAtom = atom(
    (get) => {
        const override = get(overrideClipCardsDisplayNumAtom)
        if (override != null) {
            return override
        } else {
            return 7
        }
    },
    (_, set, update: number) => {
        set(overrideClipCardsDisplayNumAtom, update)
    }
)

const overrideMoreItemIsExistAtom = atom<boolean | null>(null)
export const moreItemIsExistAtom = atom(
    (get) => {
        const override = get(overrideMoreItemIsExistAtom)
        if (override != null) {
            return override
        } else {
            return true
        }
    },
    (get, set, update: boolean) => {
        if (!update && update != get(overrideMoreItemIsExistAtom)) {
            event(`scroll`, {
                label: `load_all_clips`
            })
        }
        set(overrideMoreItemIsExistAtom, update)
    }
)

export const isDarkModeAtom = atom<boolean | undefined>(undefined)
